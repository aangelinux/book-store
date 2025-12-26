/**
 * Web component representing a search bar.
 */

const template = document.createElement('template')
template.innerHTML = `
	<style>
	</style>

	<div>
		<h1>Search Bar</h1>
	</div>
`

customElements.define('search-bar', 
	class SearchBar extends HTMLElement {
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