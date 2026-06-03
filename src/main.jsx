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
      <div class="casa-google-rating-summary">
        <div class="casa-google-brand-mark">G</div>
        <strong>5.0</strong>
        <span class="casa-google-summary-stars" aria-label="5 star rating">★★★★★</span>
        <small>3 Google reviews</small>
      </div>

      <article class="casa-google-card">
        <div class="casa-google-card-top">
          <div class="casa-google-avatar">V</div>
          <div class="casa-google-meta">
            <strong>Valeria Ortiz <em>✓</em></strong>
            <small>Google Review · 5 days ago</small>
          </div>
        </div>
        <div class="casa-google-stars" aria-label="5 star review">★★★★★</div>
        <p>If you want QUALITY Casa Stegui Media is the best.</p>
      </article>

      <article class="casa-google-card">
        <div class="casa-google-card-top">
          <div class="casa-google-avatar casa-google-photo-avatar">A</div>
          <div class="casa-google-meta">
            <strong>Anthony Hernandez <em>✓</em></strong>
            <small>Google Review · 5 days ago</small>
          </div>
        </div>
        <div class="casa-google-stars" aria-label="5 star review">★★★★★</div>
        <p>Very professional, responsive, and easy to work with. The photos came out amazing and really made the property stand out.</p>
        <a href="https://www.google.com/search?q=Casa+Stegui+Media+Google+reviews" target="_blank" rel="noopener noreferrer">Read more on Google</a>
      </article>

      <article class="casa-google-card">
        <div class="casa-google-card-top">
          <div class="casa-google-avatar casa-google-amy-avatar">A</div>
          <div class="casa-google-meta">
            <strong>Amy Wagner <em>✓</em></strong>
            <small>Google Review · 1 month ago</small>
          </div>
        </div>
        <div class="casa-google-stars" aria-label="5 star review">★★★★★</div>
        <p>Excellent services with very quick turnaround time. Will definitely be my go to company for real estate photography.</p>
        <a href="https://www.google.com/search?q=Casa+Stegui+Media+Google+reviews" target="_blank" rel="noopener noreferrer">Read more on Google</a>
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

      .casa-google-rating-summary {
        grid-column: 1 / -1;
        display: inline-flex;
        align-items: center;
        gap: 12px;
        width: fit-content;
        border: 1px solid rgba(255, 254, 246, 0.08);
        border-radius: 14px;
        background: rgba(30, 30, 29, 0.92);
        padding: 18px 22px;
        box-shadow: inset 0 1px 0 rgba(255, 254, 246, 0.04), 0 22px 60px rgba(0, 0, 0, 0.22);
      }

      .casa-google-brand-mark {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #fffef6;
        color: #4285f4;
        font-size: 18px;
        font-weight: 900;
        font-family: Arial, Helvetica, sans-serif;
      }

      .casa-google-rating-summary strong {
        color: #fffef6;
        font-size: 24px;
        font-weight: 800;
        font-family: Arial, Helvetica, sans-serif;
      }

      .casa-google-summary-stars {
        color: #fbbc04;
        font-size: 26px;
        letter-spacing: 0.02em;
        line-height: 1;
      }

      .casa-google-rating-summary small {
        color: rgba(255, 254, 246, 0.58);
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
      }

      .casa-google-card {
        border: 1px solid rgba(255, 254, 246, 0.08);
        border-radius: 14px;
        background: rgba(30, 30, 29, 0.94);
        color: #fffef6;
        padding: 26px;
        min-height: 255px;
        box-shadow: inset 0 1px 0 rgba(255, 254, 246, 0.035), 0 22px 55px rgba(0, 0, 0, 0.18);
        font-family: Arial, Helvetica, sans-serif;
      }

      .casa-google-card-top {
        display: grid;
        grid-template-columns: 50px 1fr;
        align-items: center;
        gap: 14px;
        margin-bottom: 18px;
      }

      .casa-google-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #7e57c2;
        color: #ffffff;
        font-size: 22px;
        font-weight: 800;
      }

      .casa-google-photo-avatar { background: #1a73e8; }
      .casa-google-amy-avatar { background: #e8710a; }

      .casa-google-meta {
        display: grid;
        gap: 4px;
        min-width: 0;
      }

      .casa-google-meta strong {
        color: #fffef6;
        font-size: 16px;
        font-weight: 800;
        line-height: 1.25;
      }

      .casa-google-meta em {
        color: #fe7f2d;
        font-style: normal;
        font-size: 13px;
        margin-left: 4px;
      }

      .casa-google-meta small {
        color: rgba(255, 254, 246, 0.42);
        font-size: 13px;
        line-height: 1.3;
      }

      .casa-google-stars {
        color: #fbbc04;
        font-size: 20px;
        letter-spacing: 0.02em;
        margin-bottom: 14px;
        line-height: 1;
      }

      .casa-google-card p {
        color: rgba(255, 254, 246, 0.86);
        font-size: 16px;
        line-height: 1.62;
        margin: 0 0 10px;
      }

      .casa-google-card a {
        color: #fe7f2d;
        font-size: 15px;
        font-weight: 800;
        text-decoration: none;
      }

      @media (max-width: 767px) {
        .casa-google-review-fallback {
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .casa-google-rating-summary {
          width: 100%;
          justify-content: flex-start;
          padding: 18px 20px;
        }

        .casa-google-summary-stars {
          font-size: 25px;
        }

        .casa-google-card {
          min-height: auto;
          padding: 24px;
          border-radius: 12px;
        }

        .casa-google-card p {
          font-size: 16px;
        }
      }
    `
    document.head.appendChild(style)
  }

  const forceReviewsVisible = () => {
    styleFallback()

    document.querySelectorAll('.elfsight-app-15ad62a5-707f-46f1-86d5-f98520e1b8f8').forEach((widget) => {
      widget.removeAttribute('data-elfsight-app-lazy')
      widget.outerHTML = fallbackMarkup
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
  setTimeout(forceReviewsVisible, 2400)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMobileHome ? <MobileHome /> : <App />}
  </StrictMode>,
)

removeLegacyBottomBlocks()
initializeGoogleReviews()
