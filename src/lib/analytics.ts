// Simple client-side analytics for static portfolio
export const trackEvent = (eventType: string, eventData?: any) => {
  // For static portfolio, we can use console logging or integrate with services like:
  // - Google Analytics
  // - Vercel Analytics  
  // - Plausible Analytics
  
  if (typeof window !== 'undefined') {
    console.log(`📊 Analytics: ${eventType}`, eventData)
    
    // Example: Send to Google Analytics if available
    if ((window as any).gtag) {
      (window as any).gtag('event', eventType, eventData)
    }
  }
}

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page })
}

export const trackProjectView = (projectId: string, projectTitle: string) => {
  trackEvent('project_view', { project_id: projectId, project_title: projectTitle })
}

export const trackContactSubmit = (formData: any) => {
  trackEvent('contact_submit', { name: formData.name })
}
