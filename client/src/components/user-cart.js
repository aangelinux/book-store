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
			font-family: "Segoe UI", sans-serif;
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
			font-family: "Segoe UI", sans-serif;
			font-size: 2rem;
		}

		h2 {
			font-weight: bold;
			font-family: "Segoe UI", sans-serif;			
			font-size: 1.2rem;
		}

		button {
			width: 200px;
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
			this.#fetchItems()
			this.#checkoutBtn.addEventListener('click', () => this.#checkout(),
				{ signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #fetchItems() {
			try {
				const { items, total } = await getCart()
				if (items.length > 0) {
					this.#render({ items, total })
				}
			} catch (error) {
				alert(error.message)
				console.log(error)
			}
		}

		#render({ items, total }) {
			items.forEach((item) => {
				const data = Object.values(item)
				const row = document.createElement('tr')

				for (const value of data) {
					const cell = document.createElement('td')
					cell.textContent = value
					row.appendChild(cell)
				}
				this.#table.appendChild(row)
			})
			this.#total.textContent = `Total: $${total}`
		}

		async #checkout() {
			try {
				const ono = await order()  // need to pass ono to order-invoice
				this.dispatchEvent(new CustomEvent('order-placed', {
					detail: ono, bubbles: true, composed: true
				}))
			} catch (error) {
				alert(error.message)
				console.log(error)
			}
		}
	}
)