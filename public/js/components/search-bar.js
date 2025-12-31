/**
 * Web component representing a search bar.
 */

import { retrieveBooks } from '../services/api.js'

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
			margin-top: 5px;
			font-weight: bold;
			font-family: 'Monaco', monospace;
			font-size: 1.2rem;
			width: 200px;
			height: 30px;
			margin-bottom: 20px;
			border-radius: 5px;
		}

		button:hover {
			cursor: pointer;
		}
	</style>

	<div>
		<h2>Our Books</h2>
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
			this.#author = this.shadowRoot.getElementById('author')
			this.#authorBtn = this.shadowRoot.getElementById('authorBtn')
			this.#title = this.shadowRoot.getElementById('title')
			this.#titleBtn = this.shadowRoot.getElementById('titleBtn')
			this.#subject = this.shadowRoot.getElementById('subject')
			this.#subjectBtn = this.shadowRoot.getElementById('subjectBtn')
		}

		connectedCallback() {
			this.#authorBtn.addEventListener('click', (e) => {
				e.preventDefault()
				this.#searchByAuthor()
			})
			this.#titleBtn.addEventListener('click', (e) => {
				e.preventDefault()
				this.#searchByTitle()
			})
			this.#subjectBtn.addEventListener('click', (e) => {
				e.preventDefault()
				this.#searchBySubject()
			})
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #searchByAuthor() {
			const author = this.#author.value

			if (author) {
				try {
					await retrieveBooks({ value: author, type: 'author' })
					this.dispatchEvent(new CustomEvent('show-booklist', {
					bubbles: true, composed: true
				}))
				} catch (error) {
					alert(error.details.errors)
					console.log(error.details.errors)
				}
			}
		}

		async #searchByTitle() {
			const title = this.#title.value

			if (title) {
				try {
					await retrieveBooks({ value: title, type: 'title' })
					this.dispatchEvent(new CustomEvent('show-booklist', {
					bubbles: true, composed: true
				}))
				} catch (error) {
					alert(error.details.errors)
					console.log(error.details.errors)
				}
			}
		}

		async #searchBySubject() {
			const subject = this.#subject.value

			if (subject) {
				try {
					await retrieveBooks({ value: subject, type: 'subject' })
					this.dispatchEvent(new CustomEvent('show-booklist', {
					bubbles: true, composed: true
				}))
				} catch (error) {
					alert(error.details.errors)
					console.log(error.details.errors)
				}
			}
		}
	}
)