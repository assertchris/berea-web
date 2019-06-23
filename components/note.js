import PropTypes from "prop-types"
import { superToNormal } from "../helpers"

const Note = ({ number, text }) => {
    const html = text.replace(/[\u0590-\u05FF]+/g, match => `<span class="hebrew text-base">${match}</span>`)

    return (
        <div className="mb-2 text-sm">
            <a
                href={`#note-${superToNormal(number)}`}
                id={`note-description-${superToNormal(number)}`}
                className="mr-1 focus:outline-none focus:bg-green-500 focus:text-white p-1"
            >
                {number}
            </a>
            <span dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}

Note.propTypes = {
    number: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

export { Note }
