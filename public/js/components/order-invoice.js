/**
 * Web component representing an invoice.
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
	</style>

	<div>
		<h1>Order Details</h1>
	</div>
`

customElements.define('order-invoice', 
	class Invoice extends HTMLElement {
		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
		}

		connectedCallback() {
		}

		disconnectedCallback() {
			this.abortController.abort()
		}
	}
)