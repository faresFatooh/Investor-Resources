import React, { useEffect, useRef, useState } from 'react';

interface WidgetLoaderProps {
  widgetId: string;
  isActive: boolean;
}

export const WidgetLoader: React.FC<WidgetLoaderProps> = ({ widgetId, isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!isActive || !container) {
      return;
    }

    // If widget is already loaded, just reinitialize it.
    if (isLoaded.current) {
      if (window.WidgetLoader && typeof window.WidgetLoader.reinit === 'function') {
        try {
          window.WidgetLoader.reinit(widgetId);
        } catch (err) {
          console.error(`Failed to reinitialize widget ${widgetId}:`, err);
        }
      }
      return;
    }

    const attemptToLoadWidget = () => {
      if (!window.WidgetLoader) {
        console.error("Widget loader script not available.");
        setError("Widget loader script not available.");
        setIsLoading(false);
        return;
      }

      try {
        window.WidgetLoader.load(widgetId, container);
        isLoaded.current = true;
        setError(null);
      } catch (err) {
        console.error(`Failed to load widget ${widgetId}:`, err);
        setError(`Failed to load widget: ${widgetId}`);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    setError(null);

    // If WidgetLoader is already available, load immediately.
    if (window.WidgetLoader) {
      attemptToLoadWidget();
      return;
    }

    // Otherwise, poll for the script.
    const intervalId = setInterval(() => {
      if (window.WidgetLoader) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        attemptToLoadWidget();
      }
    }, 200);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      if (!isLoaded.current) {
        console.error("Timed out waiting for Widget Loader script.");
        attemptToLoadWidget(); // This will now fail with a proper error message
      }
    }, 10000); // 10 seconds timeout

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [isActive, widgetId]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]">
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading Widget...</p>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};
