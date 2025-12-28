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
			font-family: 'Monaco', monospace;
			font-size: 2rem;			
		}

		img {
			width: 700px;
			height: auto;
			margin-bottom: 20px;
		}

		button {
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;
			width: 300px;
			height: 50px;
			margin-bottom: 10px;
			border-radius: 5px;
		}

		button:hover {
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
			this.#loginBtn.addEventListener('click', this.#openLogin)
			this.#registerBtn.addEventListener('click', this.#openRegister)
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