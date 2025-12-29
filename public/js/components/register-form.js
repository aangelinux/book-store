/**
 * Web component representing a form for registration.
 */

import { register } from '../services/api.js'

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
			width: 200px;
			height: 40px;
			margin-bottom: 10px;
			border-radius: 5px;
		}

		button:hover {
			cursor: pointer;
		}
	</style>

	<div>
		<h2>Register</h2>
		<form>
			<label for="fname">First name:</label><br>
			<input type="text" id="fname" name="fname"><br>

			<label for="lname">Last name:</label><br>
			<input type="text" id="lname" name="lname"><br>

			<label for="address">Address:</label><br>
			<input type="text" id="address" name="address"><br>

			<label for="city">City:</label><br>
			<input type="text" id="city" name="city"><br>

			<label for="zip">Zip code:</label><br>
			<input type="text" id="zip" name="zip"><br>

			<label for="phone">Phone number:</label><br>
			<input type="tel" id="phone" name="phone"><br>

			<label for="email">Email:</label><br>
			<input type="email" id="email" name="email"><br>

			<label for="password">Password:</label><br>
			<input type="password" id="password" name="password">
		</form>
		<button id="registerBtn">Register</button>
	</div>
`

customElements.define('register-form', 
	class RegisterForm extends HTMLElement {
		#registerBtn

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#registerBtn = this.shadowRoot.getElementById('registerBtn')
		}

		connectedCallback() {
			this.#registerBtn.addEventListener('click', () => {
				const memberInfo = this.#getInfo()
				this.#register(memberInfo)
			})
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#getInfo() {
			return [
				this.shadowRoot.getElementById('fname').value,
				this.shadowRoot.getElementById('lname').value,
				this.shadowRoot.getElementById('address').value,
				this.shadowRoot.getElementById('city').value,
				this.shadowRoot.getElementById('zip').value,
				this.shadowRoot.getElementById('phone').value,
				this.shadowRoot.getElementById('email').value,
				this.shadowRoot.getElementById('password').value,
			]
		}

		async #register(memberInfo) {
			try {
				await register(memberInfo)
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