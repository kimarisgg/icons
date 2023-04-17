import fs from 'fs';
import path from 'path';
import svgo from "svgo"
import prettier from "prettier"
import { minify } from 'html-minifier';

const svgoConfig = {
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    convertShapeToPath: false,
                    mergePaths: false,
                },
            },
        },
    ],
};

const prettierConfig = {
    tabWidth: 2,
    parser: "html",
    sortAttributes: true
}

const processIcons = (dir) =>
    fs.readdirSync(dir).flatMap((subdir) => {
        const subdirPath = path.join(dir, subdir);
        if (fs.statSync(subdirPath).isDirectory()) {
            return fs
                .readdirSync(subdirPath)
                .filter((file) => path.extname(file) === ".svg")
                .map((file) => {
                    const filePath = path.join(subdirPath, file);
                    const content = fs.readFileSync(filePath, "utf8");

                    const optimizedContent = svgo.optimize(content, svgoConfig).data
                    const formattedContent = prettier.format(optimizedContent, prettierConfig)
                    fs.writeFileSync(filePath, formattedContent)

                    const svgContent = optimizedContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
                    const value = svgContent ? svgContent[1] : "";
                    const minifiedValue = minify(value, {
                        collapseWhitespace: true,
                        removeComments: true,
                    });
                    return {
                        name: path.basename(file, ".svg"),
                        type: subdir,
                        value: minifiedValue,
                    };
                });
        }
        return [];
    });

const icons = processIcons("icons");
const json = JSON.stringify(icons, null, 2);
fs.writeFileSync("src/generated/icons.json", json);
