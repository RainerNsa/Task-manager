import { Metric } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

export const sendToAnalytics = ({ name, delta }: { name: string; delta: number }) => {
  if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
    window.gtag('event', name, {
      value: delta,
      metric_id: name,
      metric_value: delta,
      metric_delta: delta,
    });
  }
};

export default reportWebVitals;