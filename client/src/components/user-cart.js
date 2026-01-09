/**
 * Web component representing a user cart.
 */

import { getCart, order } from '../services/api.js'

const template = document.createElement('template')
template.innerHTML = `
	<style>
		div {
			align-items: center;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		table {
			width: 75%;
			padding: 10px;
			border-collapse: collapse;
			font-family: 'Monaco', monospace;
		}

		th {
			padding: 10px;
			font-weight: bold;
		}

		td {
			padding: 10px;
		}

		tr:nth-child(even) {
			background-color: lightgray;
		}

		h1 {
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 2rem;
		}

		h2 {
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;
		}

		button {
			margin-top: 5px;
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;
			width: 200px;
			height: 30px;
			margin-bottom: 20px;
			border-radius: 5px;
		}

		button:hover {
			cursor: pointer;
		}
	</style>

	<div>
		<h1>Shopping Cart</h1>
		<table>
			<tr>
				<th>ISBN</th>
				<th>Title</th>
				<th>$</th>
				<th>Quantity</th>
			</tr>
		</table>
		<h2 id="total">Total: 0</h2>
		<button>Checkout</button>
	</div>
`

customElements.define('user-cart',
	class Cart extends HTMLElement {
		#table
		#total
		#checkoutBtn
		#items = []
		#prices = []

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.abortController = new AbortController()
			this.#table = this.shadowRoot.querySelector('table')
			this.#total = this.shadowRoot.querySelector('#total')
			this.#checkoutBtn = this.shadowRoot.querySelector('button')
		}

		connectedCallback() {
			this.#render()
			this.#fetchItems()

			this.#checkoutBtn.addEventListener('click', () => this.#checkout())
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #fetchItems() {
			try {
				this.#items = await getCart()
				if (this.#items.length > 0) {
					this.#render()
				}
			} catch (error) {
				alert(JSON.stringify(error.details.errors))
				console.log(error.details.errors)
			}
		}

		#render() {
			this.#items.forEach((item) => {
				this.#prices.push(item.price)
				const data = Object.values(item)
				const row = document.createElement('tr')

				for (const value of data) {
					const cell = document.createElement('td')
					cell.textContent = value
					row.appendChild(cell)
				}
				this.#table.appendChild(row)
			})
			this.#calculateTotal()
		}

		#calculateTotal() {
			this.#prices.forEach((price) => Number(price))
			const price = this.#prices.reduce((a, b) => a + b, 0)

			this.#total.textContent = `Total: ${price}`
		}

		async #checkout() {
			try {
				await order()
				this.dispatchEvent(new CustomEvent('order-placed', {
					detail: this.#total, bubbles: true, composed: true
				}))
			} catch (error) {
				alert(error.details.errors)
				console.log(error.details.errors)
			}
		}
	}
)