/**
 * Web component representing a search bar.
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

		h2 {
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 2rem;
		}

		label {
			margin: 10px;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;			
		}

		input {
			margin: 10px;
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;
			width: 400px;
			height: 30px;			
		}

		button {
			margin-top: 20px;
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;
			width: 300px;
			height: 40px;
			margin-bottom: 10px;
			border-radius: 5px;
		}

		button:hover {
			cursor: pointer;
		}
	</style>

	<div>
		<h2>Search Bar</h2>
		<form>
			<label for="subject">Select subject:</label><br>
			<input type="text" id="subject" name="subject"><br>
			<button id="subjectBtn">Filter by subject</button><br>

			<label for="author">Search by author:</label><br>
			<input type="text" id="author" name="author"><br>
			<button id="authorBtn">Search by author</button><br>

			<label for="title">Search by title:</label><br>
			<input type="text" id="title" name="title"><br>
			<button id="titleBtn">Search by title</button>
		</form>
	</div>
`

customElements.define('search-bar', 
	class SearchBar extends HTMLElement {
		#subject
		#subjectBtn
		#author
		#authorBtn
		#title
		#titleBtn

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
			
			this.abortController = new AbortController()
			this.#subject = this.shadowRoot.getElementById('subject')
			this.#subjectBtn = this.shadowRoot.getElementById('subjectBtn')
			this.#author = this.shadowRoot.getElementById('author')
			this.#authorBtn = this.shadowRoot.getElementById('authorBtn')
			this.#title = this.shadowRoot.getElementById('title')
			this.#titleBtn = this.shadowRoot.getElementById('titleBtn')
		}

		connectedCallback() {
		}

		disconnectedCallback() {
			this.abortController.abort()
		}
	}
)