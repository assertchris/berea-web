import PropTypes from "prop-types"
import { superToNormal } from "../helpers"
import he from "he"

const Verse = ({ number, text }) => {
    let html = he
        .decode(text)
        .replace('"content"', '"content" dir="ltr"')
        .replace(
            /([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g,
            "<a dir='ltr' href='#note-description-$1' class='relative inline no-underline focus:outline-none focus:bg-green-500 focus:text-white text-lg p-1' id='note-$1'>$1</a>",
        )
        .replace(
            /[\u0590-\u05FF]+/g,
            match =>
                `</span>&nbsp;<span class="hebrew text-xl" dir="rtl">${match}</span>&nbsp;<span class="content" dir="ltr">`,
        )

    html = superToNormal(html, "note-description-")
    html = superToNormal(html, "note-")

    return (
        <div className="mb-2 verse">
            <span className="text-xs mr-1 text-gray-600">{number}</span>
            <span dir="ltr" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}

Verse.propTypes = {
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
}

export { Verse }
