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
			width: 70%;
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

		h1, h2, p {
			font-family: "Segoe UI", sans-serif;
		}
	</style>

	<div id="page">
		<h1>Order Details</h1>
		<div id="invoice">
			<h1 id="ono">Invoice for order:</h1>
			<h2>Shipping Address</h2>
				<p id="name"></p>
				<p id="address"></p>
			<h2>Books</h2>
			<table>
				<tr>
					<th>ISBN</th>
					<th>Title</th>
					<th>$</th>
					<th>Quantity</th>
				</tr>
			</table>
			<h2 id="total">Order Total:</h2>
		</div>
	</div>
`

customElements.define('order-invoice', 
	class Invoice extends HTMLElement {
		#ono
		#name
		#address
		#table
		#total

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#ono = this.shadowRoot.querySelector('#ono')
			this.#name = this.shadowRoot.querySelector('#name')
			this.#address = this.shadowRoot.querySelector('#address')
			this.#table = this.shadowRoot.querySelector('table')
			this.#total = this.shadowRoot.querySelector('#total')
		}

		connectedCallback() {
			this.#fetchItems()
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #fetchItems() {
			try {
				const ono = this.getAttribute('ono')
				const order = await getOrder(ono)
				this.#render(order)
			} catch (error) {
				alert(error.message)
				console.log(error)
			}
		}

		#render({ order, orderDetails, total }) {
			this.#renderOrder(order)
			this.#renderBooks(orderDetails)
			this.#renderTotal(total)
		}

		#renderOrder(order) {
			this.#ono.textContent = `Invoice for order: ${order.ono}`
			this.#name.textContent = `Name: ${order.fname} ${order.lname}`
			this.#address.textContent = 
			`Address: ${order.shipAddress}, ${order.shipCity} ${order.shipZip}`
		}

		#renderBooks(orderDetails) {
			orderDetails.forEach((item) => {
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

		#renderTotal(total) {
			this.#total.textContent = `Order Total: $${total.total}`
		}
	}
)