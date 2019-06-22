import { Component } from "react"
import PropTypes from "prop-types"
import books from "@berea/data/books"

class Selector extends Component {
    static propTypes = {
        onSelect: PropTypes.func,
    }

    static defaultProps = {
        onSelect: (book, chapter) => console.log(`selected ${book} ${chapter}`),
    }

    state = {
        book: undefined,
    }

    onSelectBook = book => {
        this.setState({ book })
    }

    onSelectChapter = chapter => {
        const { onSelect } = this.props
        const { book } = this.state

        onSelect(book, chapter)
    }

    render() {
        const { book } = this.state
        const { onSelectBook, onSelectChapter } = this

        if (!book) {
            return (
                <div className="flex items-center justify-center w-full bg-gray-200 min-h-screen">
                    <div className="container mx-auto flex flex-row flex-wrap items-center justify-center p-2">
                        {books.map(book => (
                            <button
                                key={book.id}
                                onClick={() => onSelectBook(book.id)}
                                className="w-64 h-16 py-1 px-2 text-green-500 bg-white m-1 rounded-lg flex flex-col items-center justify-center leading-tight"
                            >
                                {book.name}
                                <span className="text-xs text-green-400">{book.translation}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )
        }

        const chapters = Array(books.find(next => next.id === book).chapters).fill(null)

        return (
            <div className="flex items-center justify-center w-full bg-gray-200 min-h-screen">
                <div className="container mx-auto flex flex-row flex-wrap items-center justify-center p-2">
                    {chapters.map((_, i) => (
                        <button
                            key={`${book.id}-${i}`}
                            onClick={() => onSelectChapter(i + 1)}
                            className="w-16 h-16 py-1 px-2 text-green-500 bg-white m-1 rounded-lg"
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        )
    }
}

export { Selector }
