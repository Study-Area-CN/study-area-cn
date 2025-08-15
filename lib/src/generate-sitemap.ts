import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SITE_URL = process.env.SITE_URL;
const SITE_MAP_FILE = process.env.SITE_MAP_OUT_FILE;
const SITE_MAP_CONTENT_DIR = process.env.SITE_MAP_CONTENT_DIR || 'book';

if (!SITE_URL) {
    console.error('请在 .env 文件或环境变量中设置 SITE_URL 环境变量');
    process.exit(1);
}

const ROOT_DIR = path.resolve(__dirname, `../../${SITE_MAP_CONTENT_DIR}`);
const OUTPUT_PATH = path.resolve(__dirname, `../../${SITE_MAP_FILE || 'book/sitemap.xml'}`);

function walkDir(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(fullPath);
        }
    });
    return fileList;
}

function toUrl(filePath: string): string {
        const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
        const siteUrl = (SITE_URL || '').replace(/\/$/, '');
        return `${siteUrl}/${relPath}`;
}

function generateSitemap(urls: string[]): string {
    const urlSet = urls.map(url => `    <url>\n        <loc>${url}</loc>\n    </url>`).join('\n');
    return `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n${urlSet}\n</urlset>`;
}

function main() {
    const htmlFiles = walkDir(ROOT_DIR);
    const urls = htmlFiles.map(toUrl);
    const sitemap = generateSitemap(urls);
    fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf-8');
    console.log(`Sitemap 已生成: ${OUTPUT_PATH}`);
}

main();
