// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  // Suppress specific Google Maps errors that are known to cause 404s
  if (event.message && (
    event.message.includes('google') ||
    event.message.includes('maps') ||
    event.message.includes('Failed to fetch')
  )) {
    console.warn('Suppressed external API error:', event.message);
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Suppress promise rejections from external APIs
  if (event.reason && typeof event.reason === 'string' && (
    event.reason.includes('google') ||
    event.reason.includes('maps') ||
    event.reason.includes('Failed to fetch') ||
    event.reason.includes('Network error')
  )) {
    console.warn('Suppressed promise rejection:', event.reason);
    event.preventDefault();
  }
});

export {};
