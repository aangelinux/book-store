/**
 * Web component representing a navigation bar for authorized users.
 */

import { logout } from '../services/api.js'

const template = document.createElement('template')
template.innerHTML = `
	<style>
		div {
			width: 100vw;
			height: 10vh;
			background-color: lightgray;
			top: 0;
			display: flex;
			flex-direction: row;
			margin-bottom: 15px;
		}

		button {
			width: 130px;
			height: 35px;
			padding: 8px;
			margin: 5px;
			display: flex;
			align-self: center;
			align-items: center;
			justify-content: center;
			font-family: "Segoe UI", sans-serif;
			font-size: 1rem;
			background-color: #0095ff;
			color: #fff;
			border: 1px solid transparent;
			border-radius: 5px;
			box-shadow: rgba(255, 255, 255, .4) 0 1px 0 0 inset;
		}

		button:hover, button:focus {
			background-color: #07c;
			cursor: pointer;
		}
	</style>

	<div>
		<button id="logoutBtn">Logout</button>
		<button id="searchBtn">Search Page</button>
	</div>
`

customElements.define('nav-bar', 
	class NavBar extends HTMLElement {
		#logoutBtn
		#searchBtn

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#logoutBtn = this.shadowRoot.querySelector('#logoutBtn')
			this.#searchBtn = this.shadowRoot.querySelector('#searchBtn')
		}

		connectedCallback() {
			this.#logoutBtn.addEventListener('click', () => this.#logout())
			this.#searchBtn.addEventListener('click', () => this.#openSearch())
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #logout() {
			try {
				await logout()
				this.dispatchEvent(new CustomEvent('open-home', {
					bubbles: true, composed: true
				}))
			} catch (error) {
				alert(error.message)
				console.log(error)
			}
		}

		#openSearch() {
			this.dispatchEvent(new CustomEvent('open-search', {
				bubbles: true, composed: true
			}))
		}
	}
)