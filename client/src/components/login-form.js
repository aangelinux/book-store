/**
 * Web component representing a login form.
 */

import { login } from '../services/api.js'

const template = document.createElement('template')
template.innerHTML = `
	<style>
		div {
			align-items: center;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		h2 {
			font-weight: bold;
			font-family: "Segoe UI", sans-serif;
			font-size: 2rem;
		}

		label {
			margin: 10px;
			font-family: "Segoe UI", sans-serif;
			font-size: 1.2rem;			
		}

		input {
			margin: 10px;
			font-weight: bold;
			font-family: "Segoe UI", sans-serif;
			font-size: 1.2rem;
			width: 400px;
			height: 30px;
			border: 1.5px solid grey;
			border-radius: 5px;
		}

		button {
			width: 300px;
			height: 45px;
			padding: 5px;
			margin: 5px;
			display: flex;
			align-self: center;
			align-items: center;
			justify-content: center;
			font-family: "Segoe UI", sans-serif;
			font-size: 1.2rem;
			background-color: #1180db;
			color: #fff;
			border: 1px solid transparent;
			border-radius: 15px;
		}

		button:hover, button:focus {
			background-color: #07c;
			cursor: pointer;
		}

		#back {
			position: fixed;
			top: 10px;
			left: 10px;
			width: 150px;
			height: 40px;
		}
	</style>

	<div>
		<h2>Log In</h2>
		<button id="back">Back to Home</button>
		<form>
			<label for="email">Email:</label><br>
			<input type="text" id="email" name="email"><br>
			<label for="password">Password:</label><br>
			<input type="password" id="password" name="password">
		</form>
		<button id="login">Log In</button>
	</div>
`

customElements.define('login-form', 
	class LoginForm extends HTMLElement {
		#email
		#password
		#loginBtn
		#backBtn

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#email = this.shadowRoot.getElementById('email')
			this.#password = this.shadowRoot.getElementById('password')
			this.#loginBtn = this.shadowRoot.getElementById('login')
			this.#backBtn = this.shadowRoot.getElementById('back')
		}

		connectedCallback() {
			this.#loginBtn.addEventListener('click', () => this.#login(),
				{ signal: this.abortController.signal })
			this.#backBtn.addEventListener('click', () => {
				this.dispatchEvent(new CustomEvent('open-home', { bubbles: true, composed: true }))
			}, { signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #login() {
			try {
				await login({ email: this.#email.value, password: this.#password.value})
				this.dispatchEvent(
					new CustomEvent('add-navbar', { bubbles: true, composed: true }))
				this.dispatchEvent(
					new CustomEvent('open-search', { bubbles: true, composed: true }))
			} catch (error) {
				Swal.fire({ text: error.message })
				console.log(error)
			}
		}
	}
)