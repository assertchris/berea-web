import { Component, Fragment } from "react"
import Router from "next/router"
import { Swipeable } from "react-swipeable"
import books from "@berea/data/books"
import { Container, Note, Selector, Verse } from "../components"
import { ArrowLeft, ArrowRight } from "../icons"

class Read extends Component {
    static async getInitialProps({ query }) {
        const book = query.book || books[0].id
        const chapter = query.chapter || 1

        const data = await import(`@berea/data/books/${book}/${chapter}`)

        return {
            book,
            chapter,
            data: data.default,
        }
    }

    state = {
        isSelecting: undefined,
    }

    onStartSelect = () => {
        this.setState({ isSelecting: true })
    }

    onSelect = (book, chapter) => {
        Router.push(`/read/${book}/${chapter}`)
    }

    onLeft = () => {
        const { book, chapter } = this.props

        const sortedBooks = books.sort((a, b) => a.order - b.order)
        const bookData = books.find(next => next.id === book)

        let previousBook = book
        let previousChapter = chapter

        if (Number(chapter) === 1) {
            if (bookData.order === 1) {
                const { id, chapters } = sortedBooks[sortedBooks.length - 1]
                previousBook = id
                previousChapter = chapters
            } else {
                const { id, chapters } = sortedBooks.find(next => next.order === bookData.order - 1)
                previousBook = id
                previousChapter = chapters
            }
        } else {
            previousChapter = Number(chapter) - 1
        }

        Router.push(`/read/${previousBook}/${previousChapter}`)
    }

    onRight = () => {
        const { book, chapter } = this.props

        const sortedBooks = books.sort((a, b) => a.order - b.order)
        const bookData = books.find(next => next.id === book)

        let nextBook = book
        let nextChapter = chapter

        if (Number(chapter) === bookData.chapters) {
            if (bookData.order === sortedBooks.length) {
                nextBook = sortedBooks[0].id
                nextChapter = 1
            } else {
                const { id } = sortedBooks.find(next => next.order === bookData.order + 1)
                nextBook = id
                nextChapter = 1
            }
        } else {
            nextChapter = Number(chapter) + 1
        }

        Router.push(`/read/${nextBook}/${nextChapter}`)
    }

    render() {
        const { book, chapter, data } = this.props
        const { isSelecting } = this.state

        const bookData = books.find(next => next.id === book)

        if (isSelecting) {
            return <Selector onSelect={this.onSelect} />
        }

        return (
            <Swipeable onSwipedLeft={this.onRight} onSwipedRight={this.onLeft}>
                <Container className="pt-4 md:pt-16 container mx-auto flex justify-center">
                    <button
                        onClick={this.onStartSelect}
                        className={
                            "flex flex-col items-center justify-center mr-2 leading-tight text-green-500 bg-grey-100"
                        }
                    >
                        <span className="flex flex-row text-lg">
                            <span className="mr-2">{bookData.name}</span>
                            {chapter}
                        </span>
                        <span className="text-green-400 text-sm">{bookData.translation}</span>
                    </button>
                </Container>
                <Container className="leading-relaxed pt-4 md:pt-16">
                    <div className="w-full text-lg lg:columns-2">
                        {data.verses.map((verse, i) => (
                            <Verse key={i} number={i + 1} text={verse} />
                        ))}
                    </div>
                    <hr className="bg-gray-200 mt-6 flex md:hidden" />
                </Container>
                <Container className="leading-relaxed py-4 md:py-16 justify-between flex-row hidden md:flex">
                    <button
                        onClick={this.onLeft}
                        className={
                            "flex flex-col items-center justify-center mr-2 leading-tight text-green-300 bg-grey-100 py-2 px-4"
                        }
                    >
                        <span className="w-6 h-6">
                            <ArrowLeft />
                        </span>
                    </button>
                    <button
                        onClick={this.onRight}
                        className={
                            "flex flex-col items-center justify-center mr-2 leading-tight text-green-300 bg-grey-100 py-2 px-4"
                        }
                    >
                        <span className="w-6 h-6">
                            <ArrowRight />
                        </span>
                    </button>
                </Container>
                {Object.keys(data.notes).length > 0 && (
                    <Fragment>
                        <Container className="pt-4 md:pt-0 pb-4 md:pb-16 justify-between flex flex-col">
                            <div id="notes">
                                {Object.keys(data.notes).map(key => (
                                    <Note key={key} number={key} text={data.notes[key]} />
                                ))}
                            </div>
                        </Container>
                    </Fragment>
                )}
            </Swipeable>
        )
    }
}

export default Read
