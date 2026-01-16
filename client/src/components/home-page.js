/**
 * Web component representing a bookstore's home page.
 */

const template = document.createElement('template')
template.innerHTML = `
	<style>
		div {
			align-items: center;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		h1 {
			font-weight: bold;
			font-family: "Segoe UI", sans-serif;
			font-size: 2rem;			
		}

		img {
			width: 700px;
			height: auto;
			margin-bottom: 20px;
		}

		button {
			width: 300px;
			height: 50px;
			padding: 8px;
			margin: 5px;
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
		<h1>Online Bookstore</h1>
		<img src="/images/books.avif" alt="Books"></img>
		<button id="login">LOGIN</button>
		<button id="register">REGISTER</button>
	</div>
`

customElements.define('home-page', 
	class Home extends HTMLElement {
		#loginBtn
		#registerBtn

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#loginBtn = this.shadowRoot.getElementById("login")
			this.#registerBtn = this.shadowRoot.getElementById("register")
		}

		connectedCallback() {
			this.#loginBtn.addEventListener('click', this.#openLogin,
				{ signal: this.abortController.signal })
			this.#registerBtn.addEventListener('click', this.#openRegister,
				{ signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#openLogin() {
			this.dispatchEvent(new CustomEvent('open-login', 
				{ bubbles: true, composed: true }))
		}

		#openRegister() {
			this.dispatchEvent(new CustomEvent('open-register', 
				{ bubbles: true, composed: true }))
		}
	}
)