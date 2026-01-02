/**
 * Listens to events and swaps out web components.
 */

import '../components/home-page.js'
import '../components/register-form.js'
import '../components/login-form.js'
import '../components/search-page.js'

const container = document.getElementById('container')

function show(component) {
	container.replaceChildren(component)
}

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