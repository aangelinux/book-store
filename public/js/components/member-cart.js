/**
 * Web component representing a member cart.
 */

const template = document.createElement('template')
template.innerHTML = `
	<style>
	</style>

	<div>
	</div>
`

customElements.define('member-cart',
	class Cart extends HTMLElement {
		#currentBooks

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
		}
	}
)