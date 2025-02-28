export const startPerformanceTracking = () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const { performance } = window
      
      const measure = (name: string) => {
        const startMark = `${name}-start`
        const endMark = `${name}-end`
        
        performance.mark(startMark)
        
        return {
          end: () => {
            performance.mark(endMark)
            performance.measure(name, startMark, endMark)
            const duration = performance.getEntriesByName(name)[0].duration
            console.log(`${name} took ${duration.toFixed(2)}ms`)
          }
        }
      }
      
      return { measure }
    }
    
    return { measure: () => ({ end: () => {} }) }
  }