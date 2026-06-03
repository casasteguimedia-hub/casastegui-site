import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './mobile-fix.css'
import App from './App.jsx'

const ORDER_URL = 'https://order.casastegui.com/order'
const EMAIL = 'casastegui.media@gmail.com'
const PHONE_URL = 'tel:+14073614831'

function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

function enhanceMobileCta() {
  const setup = () => {
    const floatingWrap = document.querySelector('.casa-floating-wrap')
    const quoteLink = document.querySelector('.casa-floating-quote')

    if (!floatingWrap || !quoteLink || document.querySelector('.casa-quote-sheet')) return

    quoteLink.removeAttribute('href')
    quoteLink.setAttribute('role', 'button')
    quoteLink.setAttribute('aria-label', 'Open quote options')
    quoteLink.setAttribute('aria-expanded', 'false')
    quoteLink.classList.add('casa-floating-action')
    quoteLink.innerHTML = '<span aria-hidden="true">+</span>'

    const sheet = document.createElement('div')
    sheet.className = 'casa-quote-sheet'
    sheet.setAttribute('aria-hidden', 'true')
    sheet.innerHTML = `
      <button class="casa-quote-backdrop" type="button" aria-label="Close quote options"></button>
      <section class="casa-quote-panel" aria-label="Casa Stegui quick actions">
        <div class="casa-quote-handle"></div>
        <div class="casa-quote-header">
          <p>Casa Stegui</p>
          <button class="casa-quote-close" type="button" aria-label="Close quote options">×</button>
        </div>
        <h2>What do you need?</h2>
        <div class="casa-quote-actions">
          <a href="/quote/">Check Availability</a>
          <a href="mailto:${EMAIL}?subject=Casa%20Stegui%20Quote%20Request">Request Quote</a>
          <a href="${PHONE_URL}">Call Casa Stegui</a>
          <a href="mailto:${EMAIL}">Email Casa Stegui</a>
        </div>
      </section>
    `
    document.body.appendChild(sheet)

    const openSheet = () => {
      sheet.classList.add('is-open')
      sheet.setAttribute('aria-hidden', 'false')
      quoteLink.setAttribute('aria-expanded', 'true')
      document.body.classList.add('casa-sheet-open')
    }

    const closeSheet = () => {
      sheet.classList.remove('is-open')
      sheet.setAttribute('aria-hidden', 'true')
      quoteLink.setAttribute('aria-expanded', 'false')
      document.body.classList.remove('casa-sheet-open')
    }

    quoteLink.addEventListener('click', (event) => {
      event.preventDefault()
      openSheet()
    })

    sheet.querySelector('.casa-quote-backdrop')?.addEventListener('click', closeSheet)
    sheet.querySelector('.casa-quote-close')?.addEventListener('click', closeSheet)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeSheet()
    })
  }

  onReady(() => setTimeout(setup, 400))
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
      if (!image.getAttribute('width')) image.setAttribute('width', '1600')
      if (!image.getAttribute('height')) image.setAttribute('height', '1200')
    })
  }

  onReady(() => setTimeout(setup, 1000))
}

function enhanceMobileFooter() {
  const setup = () => {
    const footer = document.querySelector('footer')
    if (!footer || footer.querySelector('.casa-mobile-footer-actions')) return

    const actions = document.createElement('div')
    actions.className = 'casa-mobile-footer-actions'
    actions.innerHTML = `
      <a href="${PHONE_URL}">Call</a>
      <a href="mailto:${EMAIL}">Email</a>
      <a href="/quote/">Quote</a>
    `
    footer.prepend(actions)

    const serviceAreaText = [...footer.querySelectorAll('p')].find((item) => /Killeen|Copperas Cove|Harker Heights|Georgetown/.test(item.textContent || ''))
    if (serviceAreaText && !footer.querySelector('.casa-service-accordion')) {
      const details = document.createElement('details')
      details.className = 'casa-service-accordion'
      details.innerHTML = `<summary>Service Areas</summary><p>${serviceAreaText.textContent}</p>`
      serviceAreaText.replaceWith(details)
    }
  }

  onReady(() => setTimeout(setup, 1100))
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

enhanceMobileCta()
enhanceMobileNavigation()
enhanceImagesAndPerformance()
enhanceMobileFooter()
enhanceGoogleReviews()
