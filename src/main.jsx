import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './mobile-fix.css'
import App from './App.jsx'

const ORDER_URL = 'https://order.casastegui.com/order'

function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

function enhanceMobileNavigation() {
  const setup = () => {
    const header = document.querySelector('header')
    if (!header || document.querySelector('.casa-mobile-menu-button')) return

    const menuButton = document.createElement('button')
    menuButton.type = 'button'
    menuButton.className = 'casa-mobile-menu-button'
    menuButton.setAttribute('aria-label', 'Open Casa Stegui navigation')
    menuButton.setAttribute('aria-expanded', 'false')
    menuButton.innerHTML = '<span></span><span></span>'
    header.appendChild(menuButton)

    const drawer = document.createElement('div')
    drawer.className = 'casa-mobile-nav-drawer'
    drawer.setAttribute('aria-hidden', 'true')
    drawer.innerHTML = `
      <button class="casa-mobile-nav-backdrop" type="button" aria-label="Close navigation"></button>
      <aside class="casa-mobile-nav-panel" aria-label="Mobile navigation">
        <div class="casa-mobile-nav-head">
          <p>Casa Stegui</p>
          <button type="button" aria-label="Close navigation">×</button>
        </div>
        <nav>
          <button data-page="home">Home</button>
          <button data-page="work">Portfolio</button>
          <button data-page="packages">Pricing</button>
          <button data-page="about">About</button>
          <button data-page="contact">Contact</button>
          <a href="/quote/">Get a Quote</a>
          <a href="${ORDER_URL}">Book Your Shoot</a>
        </nav>
      </aside>
    `
    document.body.appendChild(drawer)

    const openDrawer = () => {
      drawer.classList.add('is-open')
      drawer.setAttribute('aria-hidden', 'false')
      menuButton.setAttribute('aria-expanded', 'true')
      document.body.classList.add('casa-menu-open')
    }

    const closeDrawer = () => {
      drawer.classList.remove('is-open')
      drawer.setAttribute('aria-hidden', 'true')
      menuButton.setAttribute('aria-expanded', 'false')
      document.body.classList.remove('casa-menu-open')
    }

    menuButton.addEventListener('click', openDrawer)
    drawer.querySelector('.casa-mobile-nav-backdrop')?.addEventListener('click', closeDrawer)
    drawer.querySelector('.casa-mobile-nav-head button')?.addEventListener('click', closeDrawer)
    drawer.querySelectorAll('[data-page]').forEach((button) => {
      button.addEventListener('click', () => {
        const label = button.textContent?.trim()
        const navButton = [...document.querySelectorAll('header nav button')].find((item) => item.textContent?.trim() === label)
        navButton?.click()
        closeDrawer()
      })
    })
  }

  onReady(() => setTimeout(setup, 650))
}

function enhanceImagesAndPerformance() {
  const setup = () => {
    document.querySelectorAll('img').forEach((image, index) => {
      if (index > 1) image.setAttribute('loading', 'lazy')
      image.setAttribute('decoding', 'async')
    })
  }

  onReady(() => setTimeout(setup, 1000))
}

function enhanceGoogleReviews() {
  const setup = () => {
    if (document.querySelector('.casa-google-reviews-section')) return

    const selectedWorkHeading = [...document.querySelectorAll('p')].find((item) => item.textContent?.includes('Selected Work'))
    const selectedWorkSection = selectedWorkHeading?.closest('section')
    if (!selectedWorkSection) return

    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://elfsightcdn.com/platform.js'
      script.async = true
      document.body.appendChild(script)
    }

    const reviewsSection = document.createElement('section')
    reviewsSection.className = 'casa-google-reviews-section border-b border-[#fffef6]/10 px-[6%] py-28'
    reviewsSection.innerHTML = `
      <div class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45"><span class="text-[#fe7f2d]">—</span> Google Reviews</p>
          <h2 class="max-w-5xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">Trusted by Central Texas Realtors.</h2>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-[#fffef6]/60">Real feedback from clients who booked Casa Stegui for professional listing media, fast delivery, and clear communication.</p>
        </div>
        <a href="https://www.google.com/search?q=Casa+Stegui+Media+reviews" target="_blank" rel="noopener noreferrer" class="text-xs font-bold uppercase tracking-[0.28em] text-[#fe7f2d]">Read on Google →</a>
      </div>
      <div class="rounded-2xl border border-[#fffef6]/10 bg-[#252422] p-5 shadow-[0_0_80px_rgba(254,127,45,0.08)]">
        <div class="elfsight-app-15ad62a5-707f-46f1-86d5-f98520e1b8f8" data-elfsight-app-lazy></div>
      </div>
    `

    selectedWorkSection.insertAdjacentElement('afterend', reviewsSection)
  }

  onReady(() => setTimeout(setup, 1400))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

enhanceMobileNavigation()
enhanceImagesAndPerformance()
enhanceGoogleReviews()
