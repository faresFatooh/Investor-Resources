
export interface Section {
  id: string;
  title: string;
  widgetIds?: string[];
}

export interface DocumentLink {
  title: string;
  url: string;
}

export interface DocumentCategory {
  name: string;
  documents: DocumentLink[];
}

export interface WidgetLoader {
  load: (widgetId: string, element: HTMLElement, options?: object) => void;
  reinit: (widgetId: string) => void;
}

declare global {
  interface Window {
    WidgetLoader: WidgetLoader;
    AOS: {
      init: (options?: object) => void;
      refresh: () => void;
    };
  }
}
