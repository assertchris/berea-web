import { Component } from "react"
import Router from "next/router"

class Index extends Component {
    static getInitialProps({ res }) {
        if (res) {
            res.writeHead(302, {
                Location: "/read",
            })

            res.end()
        }

        if (process.browser) {
            Router.push("/read")
        }

        return {}
    }

    render() {
        return null
    }
}

export default Index
