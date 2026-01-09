/**
 * Web component representing an invoice.
 */

import { getOrder } from '../services/api.js'

const template = document.createElement('template')
template.innerHTML = `
	<style>
		#page {
			align-items: center;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		#invoice {
			border: 1px solid grey;
			border-radius: 5px;
			align-items: center;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	</style>

	<div id="page">
		<h1>Order Details</h1>
		<div id="invoice">
			<h1 id="ono">Invoice for order:</h1>
			<h2>Shipping Address</h2>
			<p id="name"></p>
			<p id="address></p>
			<h2>Books</h2>
			<table>
				<tr>
					<th>ISBN</th>
					<th>Title</th>
					<th>$</th>
					<th>Quantity</th>
				</tr>
			</table>
			<h1 id="total">Order Total:</h2>
		</div>
	</div>
`

customElements.define('order-invoice', 
	class Invoice extends HTMLElement {
		#books = []
		#table
		#total

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
		}

		connectedCallback() {
			this.#render()
			this.#fetchItems()
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #fetchItems() {
			try {
				const ono = this.getAttribute('ono')
				const order = await getOrder(ono)
			} catch (error) {
				alert(JSON.stringify(error.details.errors))
				console.log(error.details.errors)
			}
			this.#render()
		}

		#render() {
			this.#renderBooks()
			this.#renderOrderDetails()
			this.#renderTitle()
		}

		#renderOrderDetails() {

		}

		#renderBooks() {
			this.#books.forEach((item) => {
				const data = Object.values(item)
				const row = document.createElement('tr')

				for (const value of data) {
					const cell = document.createElement('td')
					cell.textContent = value
					row.appendChild(cell)
				}
				this.#table.appendChild(row)
			})
		}

		#renderTitle() {

		}
	}
)