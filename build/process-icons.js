import fs from "fs"
import path from "path"
import svgo from "svgo"
import prettier from "prettier"
import { minify } from "html-minifier"

import _brand from "../src/config/brand.default.json" assert { type: "json" }
import _common from "../src/config/common.default.json" assert { type: "json" }

const svgoConfigs = new Map()

const prettierConfig = {
    tabWidth: 2,
    parser: "html",
    sortAttributes: true
}

const processDefaultAttributes = (attributes) => Object.entries(attributes).map(([key, value]) => ({ [key]: value }))

const getSVGOConfig = (attributesToAdd) => {
    return {
        plugins: [
            {
                name: "preset-default",
                params: {
                    overrides: {
                        convertShapeToPath: false,
                        mergePaths: false
                    }
                }
            },
            {
                name: "addAttributesToSVGElement",
                params: {
                    attributes: [...attributesToAdd, { xmlns: "http://www.w3.org/2000/svg" }]
                }
            }
        ]
    }
}

const processIcons = (dir) =>
    fs.readdirSync(dir).flatMap((subdir) => {
        const subdirPath = path.join(dir, subdir)
        if (fs.statSync(subdirPath).isDirectory()) {
            return fs
                .readdirSync(subdirPath)
                .filter((file) => path.extname(file) === ".svg")
                .map((file) => {
                    const filePath = path.join(subdirPath, file)
                    const content = fs.readFileSync(filePath, "utf8")

                    const optimizedContent = svgo.optimize(content, svgoConfigs.get(subdir)).data
                    const formattedContent = prettier.format(optimizedContent, prettierConfig)
                    fs.writeFileSync(filePath, formattedContent)

                    const svgContent = optimizedContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)
                    const value = svgContent ? svgContent[1] : ""
                    const minifiedValue = minify(value, {
                        collapseWhitespace: true,
                        keepClosingSlash: true,
                        removeComments: true
                    })
                    return {
                        name: path.basename(file, ".svg"),
                        type: subdir,
                        value: minifiedValue
                    }
                })
        }
        return []
    })

svgoConfigs.set("brand", getSVGOConfig(processDefaultAttributes(_brand)))
svgoConfigs.set("common", getSVGOConfig(processDefaultAttributes(_common)))

const icons = processIcons("icons")
const json = JSON.stringify(icons, null, 2)
fs.writeFileSync("src/generated/icons.json", json)
