/**
 * Web component representing a search bar.
 */

import { retrieveBooks } from '../services/api.js'
import '../components/book-card.js'

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
		<h2>Search for Books</h2>
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

		<h2>Books</h2>
	</div>
`

customElements.define('search-page', 
	class SearchPage extends HTMLElement {
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
				this.#searchBy('author', this.#author.value)
			})
			this.#titleBtn.addEventListener('click', (e) => {
				e.preventDefault()
				this.#searchBy('title', this.#title.value)
			})
			this.#subjectBtn.addEventListener('click', (e) => {
				e.preventDefault()
				this.#searchBy('subject', this.#subject.value)
			})
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #searchBy(type, value) {
			if (value) {
				try {
					const { books, pages } = await retrieveBooks({ value, type })
					this.#createListing(books)
					this.#updatePagination(pages)
				} catch (error) {
					alert(error.details.errors)
					console.log(error.details.errors)
				}
			}
		}

		#createListing(books) {
			const currentBooks = this.shadowRoot.querySelectorAll('book-card')
			if (currentBooks) {
				currentBooks.forEach(book => { book.remove() })
			}

			books.forEach(book => {
				const card = document.createElement('book-card')
				card.book = book
				this.shadowRoot.appendChild(card)
			})
		}

		#updatePagination(pages) {
			console.log(pages)
		}
	}
)