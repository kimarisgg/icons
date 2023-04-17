import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

const getIcons = (dir) =>
    fs.readdirSync(dir).flatMap((subdir) => {
        const subdirPath = path.join(dir, subdir);
        if (fs.statSync(subdirPath).isDirectory()) {
            return fs
                .readdirSync(subdirPath)
                .filter((file) => path.extname(file) === ".svg")
                .map((file) => {
                    const filePath = path.join(subdirPath, file);
                    const content = fs.readFileSync(filePath, "utf8");
                    const svgContent = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
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

const icons = getIcons("icons");
const json = JSON.stringify(icons, null, 2);
fs.writeFileSync("src/generated/icons.json", json);
