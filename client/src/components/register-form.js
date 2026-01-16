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
			width: 700px;
			height: 30px;			
		}

		button {
			width: 200px;
			height: 45px;
			padding: 8px;
			margin: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: "Segoe UI", sans-serif;
			font-size: 1.2rem;
			background-color: #0095ff;
			color: #fff;
			border: 1px solid transparent;
			border-radius: 7px;
			box-shadow: rgba(255, 255, 255, .4) 0 1px 0 0 inset;
		}

		button:hover, button:focus {
			background-color: #07c;
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
				const memberInfo = this.#getFormInput()
				this.#register(memberInfo)
			}, { signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#getFormInput() {
			return {
				fname: this.shadowRoot.getElementById('fname').value,
				lname: this.shadowRoot.getElementById('lname').value,
				address: this.shadowRoot.getElementById('address').value,
				city: this.shadowRoot.getElementById('city').value,
				zip: this.shadowRoot.getElementById('zip').value,
				phone: this.shadowRoot.getElementById('phone').value,
				email: this.shadowRoot.getElementById('email').value,
				password: this.shadowRoot.getElementById('password').value,
			}
		}

		async #register(memberInfo) {
			try {
				await register(memberInfo)
				this.dispatchEvent(new CustomEvent('add-navbar', {
					bubbles: true, composed: true
				}))
				this.dispatchEvent(new CustomEvent('open-search', {
					bubbles: true, composed: true
				}))
			} catch (error) {
				alert(error.message)
				console.log(error)
			}
		}
	}
)