/**
 * Web component representing a user cart.
 */

const template = document.createElement('template')
template.innerHTML = `
	<style>
	</style>

	<div>
	</div>
`

customElements.define('user-cart',
	class Cart extends HTMLElement {
		#currentBooks

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
		}
	}
)