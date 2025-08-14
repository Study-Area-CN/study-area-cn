import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { exit } from 'process';

dotenv.config();

const CONTENT_DIR = path.resolve(__dirname, `../../${process.env.SITE_RSS_CONTENT_DIR}`);
const OUTPUT_FILE = path.resolve(__dirname, `../../${process.env.SITE_RSS_OUT_FILE}`);
const SITE_URL = process.env.SITE_URL;

console.log(`SITE_URL: ${SITE_URL}`);
if (SITE_URL == undefined) {
  console.error('请在 .env 文件或环境变量中设置 SITE_URL 环境变量');
  exit(1);
}

function getMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)/m);
  return match ? match[1].trim() : '未命名';
}

function extractDescription(content: string): string {
  const match = content.match(/^(?:#.*\n)?([^#\n][^\n]{0,120})/m);
  return match ? match[1].trim() : '';
}

function fileToRssItem(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8');
  const title = extractTitle(content);
  const description = extractDescription(content);
  const stat = fs.statSync(filePath);
  const relPath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/');
  const url = `${SITE_URL}/${relPath.replace(/\.md$/, '.html')}`;
  const pubDate = new Date(stat.mtime).toUTCString();

  return `    <item>\n      <title>${title}</title>\n      <link>${url}</link>\n      <description><![CDATA[${description}]]></description>\n      <pubDate>${pubDate}</pubDate>\n      <guid>${url}</guid>\n    </item>`;
}

function generateRss(items: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Study Area RSS</title>\n    <link>${SITE_URL}</link>\n    <description>最新内容订阅</description>\n${items.join('\n')}\n  </channel>\n</rss>`;
}

function main() {
  console.log('CONTENT_DIR:', CONTENT_DIR);
  const files = getMarkdownFiles(CONTENT_DIR);
  console.log('找到 Markdown 文件数量:', files.length);
  if (files.length === 0) {
    console.warn('未找到任何 Markdown 文件，请检查 CONTENT_DIR 路径和目录内容。');
    fs.writeFileSync(OUTPUT_FILE, generateRss([]), 'utf-8');
    return;
  }
  const items = files.map(fileToRssItem);
  const rss = generateRss(items);
  fs.writeFileSync(OUTPUT_FILE, rss, 'utf-8');
  console.log(`RSS 已生成: ${OUTPUT_FILE}`);
}

main();
