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
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 1rem;
			width: 150px;
			height: 30px;
			border-radius: 5px;
			margin: 10px 20px 0 20px;
		}

		button:hover {
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
				alert(error.errors)
				console.log(error.errors)
			}
		}

		#openSearch() {
			this.dispatchEvent(new CustomEvent('open-search', {
				bubbles: true, composed: true
			}))
		}
	}
)