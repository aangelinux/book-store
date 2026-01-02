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
			font-family: 'Monaco', monospace;
			border: 2px solid grey;
			border-radius: 5px;
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
		#info
		#cartBtn
		#quantityField

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#cartBtn = this.shadowRoot.querySelector('button')
			this.#quantityField = this.shadowRoot.querySelector('input')
		}

		connectedCallback() {
			this.#cartBtn.addEventListener('click', () => {
				const addToCart = new CustomEvent('add-to-cart', {
					detail: { book: this.#info, quantity: this.#quantityField.value },
					bubbles: true, composed: true
				})
				this.dispatchEvent(addToCart)
			})
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		set book(info) {
			this.#info = info

			this.shadowRoot.querySelector('#title').textContent = info.title
			this.shadowRoot.querySelector('#author').textContent = `Author: ${info.author}`
			this.shadowRoot.querySelector('#isbn').textContent = `ISBN ${info.isbn}`
			this.shadowRoot.querySelector('#price').textContent = `Price ${info.price}`
			this.shadowRoot.querySelector('#subject').textContent = `Subject ${info.subject}`
		}
	}
)