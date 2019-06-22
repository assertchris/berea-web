import PropTypes from "prop-types"
import { superToNormal } from "../helpers"

const Verse = ({ number, text }) => {
    let html = text
        .replace(
            /([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g,
            "<a href='#note-description-$1' class='no-underline focus:outline-none focus:bg-green-500 focus:text-white' id='note-$1'>$1</a>",
        )
        .replace(/[\u0590-\u05FF]+/g, match => `<span class="hebrew">${match}</span> `)

    html = superToNormal(html, "note-description-")
    html = superToNormal(html, "note-")

    return (
        <div className="mb-2">
            <span className="text-xs mr-1 text-gray-600">{number}</span>
            <span dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}

Verse.propTypes = {
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
}

export { Verse }
