// macOS-style overlay scrollbars with scroll-based fade
// Scrollbars appear during scrolling and fade out after scrolling stops
// Also appear briefly on initial load and on hover

// Add class to show scrollbars
const showScrollbars = (element: Element) => {
  element.classList.add("scrollbars-visible")
}

// Remove class to hide scrollbars
const hideScrollbars = (element: Element) => {
  element.classList.remove("scrollbars-visible")
}

// Find all scrollable elements
const getScrollableElements = (): Element[] => {
  const elements: Element[] = []
  
  // Add main window scroll (body/html) - this is the main page scrollbar
  if (document.body) elements.push(document.body)
  if (document.documentElement) elements.push(document.documentElement)
  
  // Check main content areas
  const center = document.querySelector(".center")
  const article = document.querySelector("article")
  const sidebars = document.querySelectorAll(".sidebar")
  
  if (center) elements.push(center)
  if (article) elements.push(article)
  sidebars.forEach(sidebar => elements.push(sidebar))
  
  // Also check for any element with overflow
  document.querySelectorAll("*").forEach(el => {
    const style = window.getComputedStyle(el)
    if (
      (style.overflowY === "auto" || style.overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight &&
      !elements.includes(el)
    ) {
      elements.push(el)
    }
  })
  
  return elements
}

// Handle scroll events with debouncing
const scrollTimeouts = new Map<Element, number>()

const handleScroll = (element: Element) => {
  // Show scrollbars immediately when scrolling starts
  showScrollbars(element)
  
  // Clear existing timeout
  const existingTimeout = scrollTimeouts.get(element)
  if (existingTimeout) {
    clearTimeout(existingTimeout)
  }
  
  // Hide scrollbars after scrolling stops (1 second delay, like macOS)
  const timeout = window.setTimeout(() => {
    hideScrollbars(element)
    scrollTimeouts.delete(element)
  }, 1000)
  
  scrollTimeouts.set(element, timeout)
}

// Show scrollbars briefly on initial load (like macOS)
const showInitialScrollbars = () => {
  const elements = getScrollableElements()
  elements.forEach(element => {
    if (element.scrollHeight > element.clientHeight) {
      showScrollbars(element)
      // Hide after 2 seconds
      setTimeout(() => {
        hideScrollbars(element)
      }, 2000)
    }
  })
}

// Setup scroll listeners for all scrollable elements
const setupScrollListeners = () => {
  const elements = getScrollableElements()
  
  // Handle window scroll separately (for main page scrollbar)
  const handleWindowScroll = () => {
    // Show scrollbars on body/html when window scrolls
    if (document.body) handleScroll(document.body)
    if (document.documentElement) handleScroll(document.documentElement)
  }
  
  // Listen to window scroll for main page scrollbar
  window.addEventListener("scroll", handleWindowScroll, { passive: true })
  scrollHandlers.set(window as any, handleWindowScroll)
  
  elements.forEach(element => {
    // Skip body/html - we handle those via window scroll
    if (element === document.body || element === document.documentElement) {
      return
    }
    
    // Remove existing listeners if any
    const existingScrollHandler = scrollHandlers.get(element)
    const existingHoverEnterHandler = hoverEnterHandlers.get(element)
    const existingHoverLeaveHandler = hoverLeaveHandlers.get(element)
    
    if (existingScrollHandler) {
      element.removeEventListener("scroll", existingScrollHandler)
    }
    if (existingHoverEnterHandler) {
      element.removeEventListener("mouseenter", existingHoverEnterHandler)
    }
    if (existingHoverLeaveHandler) {
      element.removeEventListener("mouseleave", existingHoverLeaveHandler)
    }
    
    // Create new scroll handler
    const scrollHandler = () => handleScroll(element)
    element.addEventListener("scroll", scrollHandler, { passive: true })
    scrollHandlers.set(element, scrollHandler)
    
    // Create hover handlers (as fallback) - only for internal scrollable containers
    // Don't show on hover for main page (body/html) - only on scroll
    const hoverEnterHandler = () => showScrollbars(element)
    const hoverLeaveHandler = () => {
      // Only hide if not currently scrolling
      if (!scrollTimeouts.has(element)) {
        hideScrollbars(element)
      }
    }
    
    element.addEventListener("mouseenter", hoverEnterHandler, { passive: true })
    element.addEventListener("mouseleave", hoverLeaveHandler, { passive: true })
    
    hoverEnterHandlers.set(element, hoverEnterHandler)
    hoverLeaveHandlers.set(element, hoverLeaveHandler)
  })
}

// Store all handlers for cleanup
const scrollHandlers = new Map<Element, () => void>()
const hoverEnterHandlers = new Map<Element, () => void>()
const hoverLeaveHandlers = new Map<Element, () => void>()

// Cleanup function
const cleanup = () => {
  // Clear all timeouts
  scrollTimeouts.forEach(timeout => clearTimeout(timeout))
  scrollTimeouts.clear()
  
  // Remove all event listeners
  scrollHandlers.forEach((handler, element) => {
    if (element === window) {
      window.removeEventListener("scroll", handler as any)
    } else {
      element.removeEventListener("scroll", handler)
      hideScrollbars(element)
    }
  })
  scrollHandlers.clear()
  
  hoverEnterHandlers.forEach((handler, element) => {
    element.removeEventListener("mouseenter", handler)
  })
  hoverEnterHandlers.clear()
  
  hoverLeaveHandlers.forEach((handler, element) => {
    element.removeEventListener("mouseleave", handler)
  })
  hoverLeaveHandlers.clear()
}

// Initialize on page load
document.addEventListener("nav", () => {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    showInitialScrollbars()
    setupScrollListeners()
  }, 100)
  
  // Cleanup on navigation
  window.addCleanup(cleanup)
})

// Also run on initial load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      showInitialScrollbars()
      setupScrollListeners()
    }, 100)
  })
} else {
  setTimeout(() => {
    showInitialScrollbars()
    setupScrollListeners()
  }, 100)
}
