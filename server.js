require("dotenv").config()

const express = require("express")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.use("/fonts", express.static("fonts"))

        server.get(["/read/:book", "/read/:book/:chapter"], (req, res) => {
            const page = "/read"

            const params = {
                book: req.params.book,
                chapter: req.params.chapter,
            }

            app.render(req, res, page, params)
        })

        server.get("*", (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, error => {
            if (error) {
                throw error
            }

            console.log(`Ready on ${process.env.APP_URL}`)
        })
    })
    .catch(exception => {
        console.error(exception.stack)
        process.exit(1)
    })
