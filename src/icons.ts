import _icons from "./generated/icons.json"
import Icon from "./icon"

const icons = _icons as Array<Icon>

export default icons.reduce(function (map, obj) {
    map.set(obj.name, new Icon(obj.name, obj.type, obj.value))
    return map
}, new Map<string, Icon>())
