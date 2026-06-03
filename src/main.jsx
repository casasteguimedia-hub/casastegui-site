import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

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
          <a href="mailto:casastegui.media@gmail.com?subject=Casa%20Stegui%20Quote%20Request">Request Quote</a>
          <a href="tel:+14073614831">Call Casa Stegui</a>
          <a href="mailto:casastegui.media@gmail.com">Email Casa Stegui</a>
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(setup, 300))
  } else {
    setTimeout(setup, 300)
  }
}

enhanceMobileCta()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
