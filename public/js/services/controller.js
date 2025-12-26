/**
 * Listens to events and swaps out web components.
 */

import '../components/home-page.js'
import '../components/login-form.js'
import '../components/search-bar.js'

const container = document.getElementById("container")

function show(component) {
	container.replaceChildren(component)
}

document.addEventListener("open-login", () => {
	const loginForm = document.createElement("login-form")
	show(loginForm)
})

document.addEventListener("open-search", () => {
	const searchBar = document.createElement("search-bar")
	show(searchBar)
})