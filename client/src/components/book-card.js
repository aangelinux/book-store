/**
 * Web component representing a book card.
 */


const template = document.createElement('template')
template.innerHTML = `
	<style>
		div {
			justify-self: center;
			margin-bottom: 15px;
			padding: 10px;
			width: 75%;
			font-family: "Segoe UI", sans-serif;
			border: 2px solid grey;
			border-radius: 5px;
		}

		h3 {
			margin: 10px 0 8px 0;
		}

		input {
			width: 180px;
			height: 21px;
			border: 1.5px solid grey;
			border-radius: 5px;
		}

		button {
			width: 100px;
			height: 25px;
			padding: 5px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-family: "Segoe UI", sans-serif;
			font-size: .8rem;
			background-color: #1180db;
			color: #fff;
			border: 1px solid transparent;
			border-radius: 4px;
		}

		button:hover, button:focus {
			background-color: #07c;
			cursor: pointer;
		}
	</style>

	<div>
    <h3 id="title"></h3>
    <p id="author"></p>
    <p id="isbn"></p>
    <p id="subject"></p>
    <p id="price"></p>

    <input type="number" min="1" value="1">
    <button>Add to cart</button>
	</div>
`

customElements.define('book-card', 
	class BookCard extends HTMLElement {
		#info  // need to pass to user-cart component
		#cartBtn
		#quantity

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#cartBtn = this.shadowRoot.querySelector('button')
			this.#quantity = this.shadowRoot.querySelector('input')
		}

		connectedCallback() {
			this.#cartBtn.addEventListener('click', () => {
				this.#addToCart()
			}, { signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		set book(info) {
			this.#info = info
			this.shadowRoot.querySelector('#title').textContent = info.title
			this.shadowRoot.querySelector('#author').textContent = `Author: ${info.author}`
			this.shadowRoot.querySelector('#isbn').textContent = `ISBN: ${info.isbn}`
			this.shadowRoot.querySelector('#price').textContent = `Price: ${info.price}`
			this.shadowRoot.querySelector('#subject').textContent = `Subject: ${info.subject}`
		}

		#addToCart() {
			if (this.#quantity.value < 1) {
				return Swal.fire({ text: 'Invalid quantity. Please select a positive number' })
			} else {
				const addToCart = new CustomEvent('add-to-cart', {
					detail: { book: this.#info, quantity: this.#quantity.value },
					bubbles: true, composed: true })
				this.dispatchEvent(addToCart)
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "Book has been saved to cart",
					showConfirmButton: false,
					timer: 1000
				})
			}
		}
	}
)