class Icon {
    name: string
    value: string

    constructor(key: string, value: string) {
        this.name = key
        this.value = value
    }

    toSvg(attributes: NamedNodeMap): HTMLElement {
        const svg = document.createElement('svg')
        svg.innerHTML = this.value
        for (let i = 0; i < attributes.length; i++) {
            svg.setAttributeNode(attributes[i])
        }
        return svg
    }
}

export default Icon
