import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './mobile-fix.css'
import './mobile-footer.css'
import App from './App.jsx'
import MobileHome from './MobileHome.jsx'

const isMobileHome = window.matchMedia('(max-width: 767px)').matches && window.location.pathname === '/'

function removeLegacyBottomBlocks() {
  if (window.location.pathname !== '/') return

  const isLegacyBlock = (element) => {
    const text = element.textContent?.replace(/\s+/g, ' ').trim().toLowerCase() || ''

    const hasLegacyHowItWorks =
      text.includes('how it works') &&
      text.includes('simple booking for busy agents') &&
      text.includes('1. book or request a quote')

    const hasLegacyAgentTrust =
      text.includes('agent trust') &&
      text.includes('built for repeat realtor relationships')

    return hasLegacyHowItWorks || hasLegacyAgentTrust
  }

  const cleanup = () => {
    const candidates = [...document.querySelectorAll('section, div')]

    candidates.forEach((element) => {
      if (!element.isConnected) return
      if (element.id === 'root') return
      if (element.closest('.casa-mobile-menu-panel')) return

      if (isLegacyBlock(element)) {
        element.remove()
      }
    })

    document.querySelectorAll('.casa-mobile-home > .casa-mobile-sticky-book + button, .casa-mobile-home > button:last-child').forEach((button) => {
      const text = button.textContent?.trim()
      if (text === '+') button.remove()
    })
  }

  requestAnimationFrame(cleanup)
  setTimeout(cleanup, 250)
  setTimeout(cleanup, 900)
  setTimeout(cleanup, 1800)
}

function initializeGoogleReviews() {
  const run = () => {
    document.querySelectorAll('.elfsight-app-15ad62a5-707f-46f1-86d5-f98520e1b8f8').forEach((widget) => {
      widget.removeAttribute('data-elfsight-app-lazy')
    })

    const refresh = () => {
      if (window.elfsight && typeof window.elfsight.reload === 'function') {
        window.elfsight.reload()
      }
    }

    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')

    if (existingScript) {
      refresh()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://elfsightcdn.com/platform.js'
    script.async = true
    script.addEventListener('load', refresh)
    document.body.appendChild(script)
  }

  requestAnimationFrame(run)
  setTimeout(run, 500)
  setTimeout(run, 1500)
  setTimeout(run, 3000)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMobileHome ? <MobileHome /> : <App />}
  </StrictMode>,
)

removeLegacyBottomBlocks()
initializeGoogleReviews()
