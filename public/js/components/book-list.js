/**
 * Web component representing a list of books.
 */

const template = document.createElement('template')
template.innerHTML = `
	<style>
	</style>

	<div>
		<ul>
			<li>Book</li>
		</ul>
	</div>
`

customElements.define('book-list',
	class BookList extends HTMLElement {
		#currentBooks

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