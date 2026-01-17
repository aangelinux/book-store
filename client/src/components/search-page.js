/**
 * Web component representing a search page.
 */

import { getBooks, addToCart } from '../services/api.js'
import './book-card.js'

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
			font-family: "Segoe UI", sans-serif;
			font-size: 2rem;
			margin: 15px 0 15px 0;
		}

		form {
			margin-bottom: 15px;
		}

		label {
			font-family: "Segoe UI", sans-serif;
			font-size: 1.2rem;			
		}

		input {
			margin: 3px 0 4px 0;
			font-weight: bold;
			font-family: "Segoe UI", sans-serif;
			font-size: 1.2rem;
			width: 400px;
			height: 30px;
			border: 1.5px solid grey;
			border-radius: 5px;
		}

		button {
			width: 200px;
			height: 35px;
			padding: 5px;
			margin: 5px;
			display: flex;
			align-self: center;
			align-items: center;
			justify-content: center;
			font-family: "Segoe UI", sans-serif;
			font-size: 1rem;
			background-color: #1180db;
			color: #fff;
			border: 1px solid transparent;
			border-radius: 15px;
		}

		button:hover, button:focus {
			background-color: #07c;
			cursor: pointer;
		}

		#paginationButtons {
			display: flex;
			flex-direction: row;
		}

		#pageInfo {
			align-self: center;
			font-weight: bold;
			font-family: "Segoe UI", sans-serif;
			font-size: 1.2rem;
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

		<h2>Our Books</h2>
		<div id="paginationButtons">
			<button id="prev">Previous page</button>
			<button id="next">Next page</button>
		</div>
	</div>
`

customElements.define('search-page', 
	class SearchPage extends HTMLElement {
		#input = { type: '', value: '' }
		#currentPage = 1
		#pages
		#prevBtn
		#nextBtn
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
			this.#prevBtn = this.shadowRoot.getElementById('prev')
			this.#nextBtn = this.shadowRoot.getElementById('next')
			this.#author = this.shadowRoot.getElementById('author')
			this.#authorBtn = this.shadowRoot.getElementById('authorBtn')
			this.#title = this.shadowRoot.getElementById('title')
			this.#titleBtn = this.shadowRoot.getElementById('titleBtn')
			this.#subject = this.shadowRoot.getElementById('subject')
			this.#subjectBtn = this.shadowRoot.getElementById('subjectBtn')
		}

		connectedCallback() {
			this.addEventListener('add-to-cart', (e) => this.#addToCart(e.detail), 
			{ signal: this.abortController.signal })

			this.#subjectBtn.addEventListener('click', (e) => {
				e.preventDefault()
				this.#getInput('subject', this.#subject.value)
			}, { signal: this.abortController.signal })
			this.#authorBtn.addEventListener('click', (e) => {
				e.preventDefault()
				this.#getInput('author', this.#author.value)
			}, { signal: this.abortController.signal })
			this.#titleBtn.addEventListener('click', (e) => {
				e.preventDefault()
				this.#getInput('title', this.#title.value)
			}, { signal: this.abortController.signal })

			this.#prevBtn.addEventListener('click', (e) => this.#getPrevPage(e),
			{ signal: this.abortController.signal })
			this.#nextBtn.addEventListener('click', (e) => this.#getNextPage(e),
			{ signal: this.abortController.signal })			
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #addToCart(details) {
			try {
				await addToCart({ isbn: details.book.isbn, quantity: details.quantity })
			} catch (error) {
				alert(error.message)
				console.log(error)
			}
		}

		async #getInput(type, value) {
			this.#currentPage = 1
			this.#input = { type, value }
			if (this.#input.value) {
				await this.#search()
			}
		}

		async #getPrevPage(e) {
			e.preventDefault()
			if (this.#currentPage > 1) {
				this.#currentPage--
				await this.#search()
			}
		}

		async #getNextPage(e) {
			e.preventDefault()
			if (this.#currentPage < this.#pages) {
				this.#currentPage++
				await this.#search()
			}
		}

		async #search() {
			try {
				const { books, pages } = await getBooks(this.#input, this.#currentPage)
				this.#pages = pages
				this.#createListing(books)
				this.#updatePageInfo(pages)
			} catch (error) {
				alert(error.message)
				console.log(error)
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

		#updatePageInfo(pages) {
			const currentPages = this.shadowRoot.querySelector('#pageInfo')
			if (currentPages) {
				currentPages.remove()
			}

			const pageInfo = document.createElement('p')
			pageInfo.textContent = `Page ${this.#currentPage} of ${pages}`
			pageInfo.id = 'pageInfo'
			this.shadowRoot.querySelector('#paginationButtons').after(pageInfo)
		}
	}
)