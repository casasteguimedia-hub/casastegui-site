import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

enhanceMobileCta()
enhanceMobileNavigation()
enhanceImagesAndPerformance()
enhanceMobileFooter()
