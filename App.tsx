import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useScreenSize } from './hooks/useScreenSize';
import { SECTIONS } from './constants';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { ContentPanel } from './components/ContentPanel';
import { WidgetLoader } from './components/WidgetLoader';
import { FactSheetSection } from './components/FactSheetSection';
import { CorporateDocsSection } from './components/CorporateDocsSection';
import { ShareInfoSection } from './components/ShareInfoSection';
import { GetInTouchSection } from './components/GetInTouchSection';

const App: React.FC = () => {
    const { isDesktop } = useScreenSize();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const mainContainerRef = useRef<HTMLDivElement>(null);
    const scrollAccumulator = useRef(0);
    const scrollTimeout = useRef<number | null>(null);

    useEffect(() => {
        window.AOS.init({ duration: 800, once: true });
    }, []);

    // Desktop: Wheel-based scrolling
    const handleWheel = useCallback((event: WheelEvent) => {
        if (!isDesktop || isScrolling) return;

        scrollAccumulator.current += event.deltaY;

        if (Math.abs(scrollAccumulator.current) > 80) {
            setIsScrolling(true);
            setActiveIndex(prev => {
                const next = scrollAccumulator.current > 0 ? prev + 1 : prev - 1;
                return Math.max(0, Math.min(SECTIONS.length - 1, next));
            });
            scrollAccumulator.current = 0;
            setTimeout(() => setIsScrolling(false), 800); // Cooldown to match transition
        }
    }, [isDesktop, isScrolling]);
    
    useEffect(() => {
        const container = mainContainerRef.current;
        if (isDesktop && container) {
            container.addEventListener('wheel', handleWheel);
            return () => container.removeEventListener('wheel', handleWheel);
        }
    }, [isDesktop, handleWheel]);

    // Mobile: IntersectionObserver-based scrolling
    useEffect(() => {
        if (isDesktop) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = SECTIONS.findIndex(sec => sec.id === entry.target.id);
                        if (index !== -1) {
                            setActiveIndex(index);
                        }
                    }
                });
            },
            { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
        );

        const sections = document.querySelectorAll('.content-panel-mobile');
        sections.forEach(sec => observer.observe(sec));

        return () => sections.forEach(sec => observer.unobserve(sec));
    }, [isDesktop]);

    const renderSectionContent = (sectionId: string, isActive: boolean) => {
        const section = SECTIONS.find(s => s.id === sectionId)!;
        switch (sectionId) {
            case 'fact-sheet':
                return <FactSheetSection isActive={isActive} />;
            case 'corporate-documents':
                return <CorporateDocsSection isActive={isActive} />;
            case 'share-information':
                return <ShareInfoSection isActive={isActive} />;
            case 'get-in-touch':
                return <GetInTouchSection isActive={isActive} />;
            default:
                return section.widgetIds ? (
                  section.widgetIds.map(id => <WidgetLoader key={id} widgetId={id} isActive={isActive} />)
                ) : <div className="p-4">Content for {section.title}</div>;
        }
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="text-left mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-dark-blue">Investor Resources</h1>
            </header>

            {isDesktop ? (
                <div id="ir-sticky-frame" ref={mainContainerRef} className="lg:flex lg:h-[85vh] lg:sticky lg:top-0">
                    <Sidebar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    <main className="flex-1 relative overflow-hidden">
                        {SECTIONS.map((section, index) => (
                            <ContentPanel
                                key={section.id}
                                id={section.id}
                                title={section.title}
                                isActive={index === activeIndex}
                                isDesktop={isDesktop}
                            >
                                {renderSectionContent(section.id, index === activeIndex)}
                            </ContentPanel>
                        ))}
                    </main>
                </div>
            ) : (
                <>
                    <MobileNav activeIndex={activeIndex} />
                    <main>
                         {SECTIONS.map((section, index) => (
                            <div key={section.id} id={section.id} className="content-panel-mobile min-h-[90vh] pt-24 -mt-16">
                                <ContentPanel
                                    id={section.id}
                                    title={section.title}
                                    isActive={true}
                                    isDesktop={isDesktop}
                                >
                                    {renderSectionContent(section.id, true)}
                                </ContentPanel>
                            </div>
                        ))}
                    </main>
                </>
            )}
        </div>
    );
};

export default App;