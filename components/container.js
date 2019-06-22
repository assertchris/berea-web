import "../styles.css"

const Container = ({ children, className }) => (
    <div className={`container mx-auto px-4 antialiased ${className ? className : ""}`}>{children}</div>
)

export { Container }
