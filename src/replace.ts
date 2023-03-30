import icons from "./icons"

function replace() {
    if (typeof document === "undefined") {
        throw new Error("`replace()` only works in a browser environment.")
    }

    document.querySelectorAll("[data-kimaris]").forEach((element) => replaceElement(element))
}

function replaceElement(element: Element) {
    const elementAttrs = element.attributes
    const name = elementAttrs.getNamedItem("data-kimaris")!!
    elementAttrs.removeNamedItem("data-kimaris")
    if (icons.has(name.value)) {
        const svg = icons.get(name.value)!!.toSvg(elementAttrs)
        element.replaceWith(svg)
    }
}

export default replace
