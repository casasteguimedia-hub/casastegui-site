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
  const fallbackMarkup = `
    <div class="casa-google-review-fallback" aria-label="Casa Stegui Google reviews">
      <article>
        <div><span>★★★★★</span><strong>Valeria Ortiz</strong></div>
        <p>Quality customer service, quick turnaround, and professional work.</p>
      </article>
      <article>
        <div><span>★★★★★</span><strong>Anthony Hernandez</strong></div>
        <p>Very professional, responsive, and easy to work with from start to finish.</p>
      </article>
      <article>
        <div><span>★★★★★</span><strong>Amy Wagner</strong></div>
        <p>Excellent services with clear communication and reliable delivery.</p>
      </article>
    </div>
  `

  const styleFallback = () => {
    if (document.getElementById('casa-google-review-fallback-style')) return

    const style = document.createElement('style')
    style.id = 'casa-google-review-fallback-style'
    style.textContent = `
      .casa-google-review-fallback {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
        width: 100%;
      }

      .casa-google-review-fallback article {
        border: 1px solid rgba(255, 254, 246, 0.10);
        border-radius: 18px;
        background: rgba(37, 36, 34, 0.92);
        padding: 26px;
        min-height: 210px;
      }

      .casa-google-review-fallback div {
        display: grid;
        gap: 12px;
        margin-bottom: 18px;
      }

      .casa-google-review-fallback span {
        color: #fe7f2d;
        font-size: 18px;
        letter-spacing: 0.08em;
      }

      .casa-google-review-fallback strong {
        color: #fffef6;
        font-family: Georgia, serif;
        font-size: 22px;
        font-weight: 500;
      }

      .casa-google-review-fallback p {
        color: rgba(255, 254, 246, 0.64);
        font-size: 16px;
        line-height: 1.75;
        margin: 0;
      }

      @media (max-width: 767px) {
        .casa-google-review-fallback {
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .casa-google-review-fallback article {
          min-height: auto;
          padding: 22px;
        }

        .casa-google-review-fallback strong {
          font-size: 20px;
        }

        .casa-google-review-fallback p {
          font-size: 15px;
          line-height: 1.65;
        }
      }
    `
    document.head.appendChild(style)
  }

  const replaceEmptyWidgets = () => {
    styleFallback()

    document.querySelectorAll('.elfsight-app-15ad62a5-707f-46f1-86d5-f98520e1b8f8').forEach((widget) => {
      widget.removeAttribute('data-elfsight-app-lazy')

      const hasVisibleContent = widget.textContent.trim().length > 0 || widget.children.length > 0
      if (!hasVisibleContent) {
        widget.outerHTML = fallbackMarkup
      }
    })
  }

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
    } else {
      const script = document.createElement('script')
      script.src = 'https://elfsightcdn.com/platform.js'
      script.async = true
      script.addEventListener('load', refresh)
      document.body.appendChild(script)
    }
  }

  requestAnimationFrame(run)
  setTimeout(run, 500)
  setTimeout(run, 1500)
  setTimeout(replaceEmptyWidgets, 2600)
  setTimeout(replaceEmptyWidgets, 4200)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMobileHome ? <MobileHome /> : <App />}
  </StrictMode>,
)

removeLegacyBottomBlocks()
initializeGoogleReviews()
