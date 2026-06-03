import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './mobile-fix.css'
import App from './App.jsx'
import MobileHome from './MobileHome.jsx'

const isMobileHome = window.matchMedia('(max-width: 767px)').matches && window.location.pathname === '/'

function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

function enhanceDesktopHomepage() {
  if (window.matchMedia('(max-width: 767px)').matches || window.location.pathname !== '/') return

  const removeProcessSection = () => {
    const processLabel = [...document.querySelectorAll('p')].find((item) =>
      item.textContent?.toLowerCase().includes('process')
    )
    const processHeading = [...document.querySelectorAll('h2')].find((item) =>
      item.textContent?.toLowerCase().includes('simple workflow for busy agents')
    )
    const processSection = processHeading?.closest('section') || processLabel?.closest('section')

    if (processSection) {
      processSection.remove()
    }
  }

  const addGoogleReviews = () => {
    if (document.querySelector('.casa-desktop-google-reviews')) return

    const selectedWorkHeading = [...document.querySelectorAll('p')].find((item) =>
      item.textContent?.toLowerCase().includes('selected work')
    )
    const selectedWorkSection = selectedWorkHeading?.closest('section')
    if (!selectedWorkSection) return

    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://elfsightcdn.com/platform.js'
      script.async = true
      document.body.appendChild(script)
    }

    const reviewsSection = document.createElement('section')
    reviewsSection.className = 'casa-desktop-google-reviews border-b border-[#fffef6]/10 px-[6%] py-28'
    reviewsSection.innerHTML = `
      <div class="mb-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p class="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45"><span class="text-[#fe7f2d]">—</span> Google Reviews</p>
          <h2 class="max-w-5xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">Trusted by Central Texas Realtors.</h2>
        </div>
        <p class="max-w-2xl text-xl leading-9 text-[#fffef6]/60">Real feedback from clients who booked Casa Stegui for professional listing media, fast delivery, and clear communication.</p>
      </div>
      <div class="rounded-2xl border border-[#fffef6]/10 bg-[#252422] p-8 shadow-[0_0_90px_rgba(254,127,45,0.12)]">
        <div class="elfsight-app-15ad62a5-707f-46f1-86d5-f98520e1b8f8" data-elfsight-app-lazy></div>
      </div>
    `

    selectedWorkSection.insertAdjacentElement('afterend', reviewsSection)
  }

  setTimeout(() => {
    removeProcessSection()
    addGoogleReviews()
  }, 500)

  setTimeout(() => {
    removeProcessSection()
    addGoogleReviews()
  }, 1400)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMobileHome ? <MobileHome /> : <App />}
  </StrictMode>,
)

onReady(enhanceDesktopHomepage)
