require("dotenv").config()

const withCSS = require("@zeit/next-css")

module.exports = withCSS({
    env: {
        url: process.env.APP_URL,
    },
})
