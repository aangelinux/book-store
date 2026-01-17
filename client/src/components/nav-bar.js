/**
 * Web component representing a navigation bar for authorized users.
 */

import { getUser, logout } from '../services/api.js'

const template = document.createElement('template')
template.innerHTML = `
	<style>
		div {
			width: 100vw;
			height: 10vh;
			background-color: white;
			top: 0;
			display: flex;
			flex-direction: row;
			gap: 15px;
			margin-bottom: 15px;
			box-shadow: 15px 5px 15px 5px rgba(0, 0, 0, 0.055);
		}

		button {
			width: 130px;
			height: 35px;
			padding: 5px;
			margin: 5px;
			display: flex;
			align-self: center;
			align-items: center;
			justify-content: center;
			font-family: "Segoe UI", sans-serif;
			font-size: 1rem;
			background-color: #1180db;
			color: #fff;
			border: 1px solid transparent;
			border-radius: 15px;
		}

		button:hover, button:focus {
			background-color: #07c;
			cursor: pointer;
		}

		img {
			margin: 10px 15px 10px 25px;
		}

		#greeting {
			font-family: "Segoe UI", sans-serif;
			font-size: 1.1rem;
			font-weight: bold;
			justify-content: center;
			align-self: center;
			margin: 10px;
		}

		#cartBtn {
			margin-inline-end: 40px;
			margin-left: auto;
		}
	</style>

	<div>
		<img src="/images/books.png" alt="books"/>
		<button id="logoutBtn">Logout</button>
		<button id="searchBtn">Search Page</button>
		<p id="greeting"></p>
		<button id="cartBtn">View Cart</button>
	</div>
`

customElements.define('nav-bar', 
	class NavBar extends HTMLElement {
		#logoutBtn
		#searchBtn
		#cartBtn
		#greeting

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#logoutBtn = this.shadowRoot.querySelector('#logoutBtn')
			this.#searchBtn = this.shadowRoot.querySelector('#searchBtn')
			this.#cartBtn = this.shadowRoot.querySelector('#cartBtn')
			this.#greeting = this.shadowRoot.querySelector('#greeting')
		}

		connectedCallback() {
			this.#fetchUser()

			this.#logoutBtn.addEventListener('click', () => this.#logout(),
				{ signal: this.abortController.signal })
			this.#searchBtn.addEventListener('click', () => this.#openSearch(),
				{ signal: this.abortController.signal })
			this.#cartBtn.addEventListener('click', () => this.#openCart(),
				{ signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #fetchUser() {
			try {
				const { fname, lname } = await getUser()
				this.#greeting.textContent = `Welcome, ${fname} ${lname}`
			} catch (error) {
				alert(error.message)
				console.log(error)
			}
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

		#openCart() {
			this.dispatchEvent(new CustomEvent('open-cart', {
				bubbles: true, composed: true
			}))
		}
	}
)