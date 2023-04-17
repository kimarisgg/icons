import defaultAttributes from "./default"

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
        const svg = document.createElement("svg")
        svg.innerHTML = this.value
        this.setDefaultAttributes(svg)
        for (let i = 0; i < attributes.length; i++) {
            svg.setAttributeNode(attributes[i])
        }
        return svg
    }

    setDefaultAttributes(element: Element) {
        const defAttr = defaultAttributes.get(this.type)
        if (defAttr !== undefined) {
            Object.entries(defAttr).forEach(([key, value]) => {
                if (value !== undefined) {
                    element.setAttribute(key, value.toString())
                }
            })
        }
    }
}

export default Icon
