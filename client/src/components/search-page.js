/**
 * Web component representing a search bar.
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

		#cart {
			width: 150px;
			align-self: flex-start;
			margin-left: 10px;
			position: absolute;
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
		}

		button {
			width: 200px;
			height: 35px;
			padding: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: "Segoe UI", sans-serif;
			font-size: 1rem;
			background-color: #0095ff;
			color: #fff;
			border: 1px solid transparent;
			border-radius: 5px;
			box-shadow: rgba(255, 255, 255, .4) 0 1px 0 0 inset;
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
		<button id="cart">View Cart</button>

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
		#currentSearch = { type: '', value: '' }
		#currentPage = 1
		#cartBtn
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
			this.#cartBtn = this.shadowRoot.getElementById('cart')
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
			this.#authorBtn.addEventListener('click', (e) => {
				this.#currentPage = 1
				this.#currentSearch = { type: 'author', value: this.#author.value }
				e.preventDefault()
				this.#searchBy(this.#currentSearch)
			})
			this.#titleBtn.addEventListener('click', (e) => {
				this.#currentPage = 1
				this.#currentSearch = { type: 'title', value: this.#title.value }
				e.preventDefault()
				this.#searchBy(this.#currentSearch)
			})
			this.#subjectBtn.addEventListener('click', (e) => {
				this.#currentPage = 1
				this.#currentSearch = { type: 'subject', value: this.#subject.value }
				e.preventDefault()
				this.#searchBy(this.#currentSearch)
			})
			this.#prevBtn.addEventListener('click', (e) => {
				if (this.#currentPage > 1) {
					this.#currentPage--
					e.preventDefault()
					this.#searchBy(this.#currentSearch)
				}
			})
			this.#nextBtn.addEventListener('click', (e) => {
				this.#currentPage++  //TODO: need to add an if-check for final page
				e.preventDefault()
				this.#searchBy(this.#currentSearch)				
			})
			this.#cartBtn.addEventListener('click', (e) => {
				this.#openCart()		
			})
			this.addEventListener('add-to-cart', (e) => {
				this.#addToCart(e.detail)
			})
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		async #searchBy({ type, value }) {
			if (value) {
				try {
					const res = await getBooks({ type, value }, this.#currentPage)
					if (this.#currentPage <= res.pages) {
						this.#createListing(res.books)
						this.#updatePageInfo(res.pages)
					}
				} catch (error) {
					alert(error.message)
				  console.log(error)
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

		#updatePageInfo(pages) {
			const currentPages = this.shadowRoot.querySelector('#pageInfo')
			if (currentPages) {
				currentPages.remove()
			}

			const pageInfo = document.createElement('p')
			pageInfo.textContent = `Page ${this.#currentPage} of ${pages}`
			pageInfo.id = 'pageInfo'
			pageInfo.className = 'pageInfo'
			this.shadowRoot.querySelector('#paginationButtons').after(pageInfo)
		}

		async #addToCart(details) {
			try {
				await addToCart({ isbn: details.book.isbn, quantity: details.quantity })
			} catch (error) {
				alert(error.message)
				console.log(error)
			}
		}

		#openCart() {
			this.dispatchEvent(new CustomEvent('open-cart', {
				bubbles: true, composed: true
			}))
		}
	}
)