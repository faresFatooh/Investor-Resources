import React, { useEffect, useRef, useState } from 'react';

interface WidgetLoaderProps {
  widgetId: string;
  isActive: boolean;
}

const WIDGET_LOADER_POLL_INTERVAL = 100; // ms
const WIDGET_LOADER_POLL_TIMEOUT = 3000; // ms

export const WidgetLoader: React.FC<WidgetLoaderProps> = ({ widgetId, isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isLoaded = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!isActive || !container) {
      // Reset loading state if component becomes inactive
      if (!isActive) setIsLoading(true);
      return;
    }

    const loadWidget = () => {
      try {
        if (isLoaded.current) {
          if (typeof window.WidgetLoader.reinit === 'function') {
            window.WidgetLoader.reinit(widgetId);
          }
        } else {
          window.WidgetLoader.load(widgetId, container);
          isLoaded.current = true;
        }
        setError(null);
      } catch (err) {
        const errorMsg = `Failed to load or reinitialize widget: ${widgetId}`;
        console.error(errorMsg, err);
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    let pollAttempts = 0;
    const maxPollAttempts = WIDGET_LOADER_POLL_TIMEOUT / WIDGET_LOADER_POLL_INTERVAL;

    const poll = setInterval(() => {
      if (typeof window.WidgetLoader !== 'undefined') {
        clearInterval(poll);
        loadWidget();
      } else {
        pollAttempts++;
        if (pollAttempts > maxPollAttempts) {
          clearInterval(poll);
          const errorMsg = `Widget loader script did not become available within ${WIDGET_LOADER_POLL_TIMEOUT / 1000}s.`;
          console.error(errorMsg);
          setError(errorMsg);
          setIsLoading(false);
        }
      }
    }, WIDGET_LOADER_POLL_INTERVAL);

    return () => {
      clearInterval(poll);
    };
  }, [isActive, widgetId]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]">
      {isActive && isLoading && !error && (
        <div className="flex items-center justify-center h-full p-4 text-center">
          <p className="text-gray-500">Loading widget...</p>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-full p-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};
