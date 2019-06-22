const replacements = new Map([
    ["⁰", 0],
    ["¹", 1],
    ["²", 2],
    ["³", 3],
    ["⁴", 4],
    ["⁵", 5],
    ["⁶", 6],
    ["⁷", 7],
    ["⁸", 8],
    ["⁹", 9],
])

const superToNormal = (text, prefix = "") => {
    let replaced = text.toString()

    for (const [key, value] of replacements) {
        replaced = replaced.replace(new RegExp(`(${prefix})[${key}]+`, "gi"), `$1${value}`)
    }

    return replaced
}

const normalToSuper = (text, prefix = "") => {
    let replaced = text.toString()

    for (const [key, value] of replacements) {
        replaced = replaced.replace(new RegExp(`(${prefix})[${value}]+`, "gi"), `$1${key}`)
    }

    return replaced
}

export { superToNormal, normalToSuper }
