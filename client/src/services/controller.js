/**
 * Handles event flows and swaps out web components.
 */

import '../components/home-page.js'
import '../components/register-form.js'
import '../components/login-form.js'
import '../components/search-page.js'
import '../components/user-cart.js'
import '../components/order-invoice.js'
import '../components/nav-bar.js'

function show(component) {
	const container = document.getElementById('container')
	container.replaceChildren(component)
}

document.addEventListener('add-navbar', () => {
	const navBar = document.createElement('nav-bar')
	document.getElementById('container').before(navBar)
})

document.addEventListener('open-home', () => {
	const navBar = document.querySelector('nav-bar')
	if (navBar) navBar.remove()
	const homePage = document.createElement('home-page')
	show(homePage)
})

document.addEventListener('open-register', () => {
	const registerForm = document.createElement('register-form')
	show(registerForm)
})

document.addEventListener('open-login', () => {
	const loginForm = document.createElement('login-form')
	show(loginForm)
})

document.addEventListener('open-search', () => {
	const searchPage = document.createElement('search-page')
	show(searchPage)
})

document.addEventListener('open-cart', () => {
	const cart = document.createElement('user-cart')
	show(cart)
})

document.addEventListener('order-placed', (e) => {
	const invoice = document.createElement('order-invoice')
	invoice.setAttribute('ono', e.detail)
	show(invoice)
})