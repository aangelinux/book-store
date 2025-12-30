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
			font-family: 'Monaco', monospace;
			font-size: 2rem;
		}

		label {
			margin: 10px;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;			
		}

		input {
			margin: 10px;
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;
			width: 400px;
			height: 30px;			
		}

		button {
			margin-top: 20px;
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;
			width: 300px;
			height: 40px;
			margin-bottom: 10px;
			border-radius: 5px;
		}

		button:hover {
			cursor: pointer;
		}
	</style>

	<div>
		<h2>Log In</h2>
		<form>
			<label for="email">Email:</label><br>
			<input type="text" id="email" name="email"><br>
			<label for="password">Password:</label><br>
			<input type="text" id="password" name="password">
		</form>
		<button id="login">Log In</button>
	</div>
`

customElements.define('login-form', 
	class LoginForm extends HTMLElement {
		#email
		#password
		#loginBtn

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#email = this.shadowRoot.getElementById('email')
			this.#password = this.shadowRoot.getElementById('password')
			this.#loginBtn = this.shadowRoot.getElementById('login')
		}

		connectedCallback() {
			this.#loginBtn.addEventListener('click', () => this.#login())
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #login() {
			const memberInfo = {
				email: this.#email.value,
				password: this.#password.value
			}

			try {
				await login(memberInfo)
				this.dispatchEvent(new CustomEvent('open-search', {
					bubbles: true, composed: true
				}))
			} catch (error) {
				alert(error.details.errors)
				console.log(error.details.errors)
			}
		}
	}
)