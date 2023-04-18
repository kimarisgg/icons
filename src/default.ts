import _brand from "./config/brand.default.json"
import _common from "./config/common.default.json"

export interface DefaultAttributes {
    xmlns?: string
    width?: number
    height?: number
    viewBox?: string
    fill?: string
    stroke?: string
    "stroke-width"?: number
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
}

const defaultAttributes: Map<string, DefaultAttributes> = new Map<string, DefaultAttributes>()

defaultAttributes.set("brand", _brand as DefaultAttributes)
defaultAttributes.set("common", _common as DefaultAttributes)

export default defaultAttributes
