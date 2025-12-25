/**
 * Web component representing a login form.
 */

const template = document.createElement('template')
template.innerHTML = `
	<style>

	</style>

	<div>
		<form></form>
	</div>
`

customElements.define('login-form', 
	class LoginForm extends HTMLElement {
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