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
    <div class="casa-google-review-fallback" aria-label="Casa Stegui Google Business reviews">
      <article class="casa-google-card">
        <div class="casa-google-card-top">
          <div class="casa-google-avatar">V</div>
          <div class="casa-google-meta">
            <strong>Valeria Ortiz</strong>
            <span>Google review</span>
          </div>
          <div class="casa-google-g" aria-label="Google">G</div>
        </div>
        <div class="casa-google-stars" aria-label="5 star review">★★★★★ <span>5.0</span></div>
        <p>Quality customer service, quick turnaround, and professional work.</p>
        <a href="https://www.google.com/search?q=Casa+Stegui+Media+Google+reviews" target="_blank" rel="noopener noreferrer">Read on Google</a>
      </article>
      <article class="casa-google-card">
        <div class="casa-google-card-top">
          <div class="casa-google-avatar">A</div>
          <div class="casa-google-meta">
            <strong>Anthony Hernandez</strong>
            <span>Google review</span>
          </div>
          <div class="casa-google-g" aria-label="Google">G</div>
        </div>
        <div class="casa-google-stars" aria-label="5 star review">★★★★★ <span>5.0</span></div>
        <p>Very professional, responsive, and easy to work with from start to finish.</p>
        <a href="https://www.google.com/search?q=Casa+Stegui+Media+Google+reviews" target="_blank" rel="noopener noreferrer">Read on Google</a>
      </article>
      <article class="casa-google-card">
        <div class="casa-google-card-top">
          <div class="casa-google-avatar">A</div>
          <div class="casa-google-meta">
            <strong>Amy Wagner</strong>
            <span>Google review</span>
          </div>
          <div class="casa-google-g" aria-label="Google">G</div>
        </div>
        <div class="casa-google-stars" aria-label="5 star review">★★★★★ <span>5.0</span></div>
        <p>Excellent services with clear communication and reliable delivery.</p>
        <a href="https://www.google.com/search?q=Casa+Stegui+Media+Google+reviews" target="_blank" rel="noopener noreferrer">Read on Google</a>
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

      .casa-google-card {
        border: 1px solid rgba(218, 220, 224, 0.85);
        border-radius: 14px;
        background: #ffffff;
        color: #202124;
        padding: 22px;
        min-height: 230px;
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
        font-family: Arial, Helvetica, sans-serif;
      }

      .casa-google-card-top {
        display: grid;
        grid-template-columns: 46px 1fr 32px;
        align-items: center;
        gap: 12px;
        margin-bottom: 18px;
      }

      .casa-google-avatar {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #7e57c2;
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;
      }

      .casa-google-card:nth-child(2) .casa-google-avatar {
        background: #1a73e8;
      }

      .casa-google-card:nth-child(3) .casa-google-avatar {
        background: #e8710a;
      }

      .casa-google-meta {
        display: grid;
        gap: 2px;
      }

      .casa-google-meta strong {
        color: #202124;
        font-size: 16px;
        font-weight: 700;
        line-height: 1.25;
      }

      .casa-google-meta span {
        color: #5f6368;
        font-size: 13px;
        line-height: 1.3;
      }

      .casa-google-g {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #4285f4;
        background: #f8fafd;
        border: 1px solid #e8eaed;
        font-size: 18px;
        font-weight: 800;
        font-family: Arial, Helvetica, sans-serif;
      }

      .casa-google-stars {
        color: #fbbc04;
        font-size: 18px;
        letter-spacing: 0.03em;
        margin-bottom: 14px;
        line-height: 1;
      }

      .casa-google-stars span {
        color: #3c4043;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0;
        margin-left: 8px;
      }

      .casa-google-card p {
        color: #3c4043;
        font-size: 15px;
        line-height: 1.65;
        margin: 0 0 18px;
      }

      .casa-google-card a {
        color: #1a73e8;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
      }

      .casa-google-card a:hover {
        text-decoration: underline;
      }

      @media (max-width: 767px) {
        .casa-google-review-fallback {
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .casa-google-card {
          min-height: auto;
          padding: 20px;
          border-radius: 14px;
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
