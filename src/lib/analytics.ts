import { ReportHandler } from 'web-vitals'

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

export const sendToAnalytics = ({ name, delta }: { name: string; delta: number }) => {
  if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
    window.gtag('event', name, {
      value: delta,
      metric_id: name,
      metric_value: delta,
      metric_delta: delta,
    })
  }
}

export default reportWebVitals