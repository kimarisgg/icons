import defaultAttributes, { DefaultAttributes } from "./default"

class Icon {
    name: string
    type: string
    value: string

    constructor(key: string, type: string, value: string) {
        this.name = key
        this.type = type
        this.value = value
    }

    toSvg(attributes: NamedNodeMap): HTMLElement {
        const parser = new DOMParser()
        const svg = parser.parseFromString(
            `<svg xmlns="http://www.w3.org/2000/svg">${this.value}</svg>`,
            "image/svg+xml"
        ).documentElement
        this.setDefaultAttributes(svg)
        for (const attribute of attributes) {
            svg.setAttribute(attribute.name, attribute.value)
        }
        return svg
    }

    private setDefaultAttributes(element: Element) {
        const defAttr = defaultAttributes.get(this.type) as DefaultAttributes
        Object.entries(defAttr).forEach(([key, value]) => {
            element.setAttribute(key, value.toString())
        })
    }
}

export default Icon
