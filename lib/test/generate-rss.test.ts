import { setupMockFs, restoreFs } from './generate-rss.mockfs';
import { vi } from 'vitest';
import fs from 'fs';
import { getMarkdownFiles, fileToRssItem } from '../src/generate-rss';
describe('getMarkdownFiles', () => {
    beforeAll(() => {
        setupMockFs({
            '/mockdir/a.md': '# A\n内容A',
            '/mockdir/b.md': '# B\n内容B',
            '/mockdir/c.txt': 'not md',
        });
    });
    afterAll(() => {
        restoreFs();
    });
        beforeEach(() => {
            setupMockFs({
                '/mockdir/a.md': '# A\n内容A',
                '/mockdir/b.md': '# B\n内容B',
                '/mockdir/c.txt': 'not md',
            });
        });
        afterEach(() => {
            restoreFs();
        });
        it('should return only markdown files', () => {
            const files = getMarkdownFiles('/mockdir');
            expect(files).toEqual(['/mockdir/a.md', '/mockdir/b.md']);
        });
});
describe('fileToRssItem', () => {
    beforeAll(() => {
        setupMockFs({
            '/mockdir/a.md': '# A\n内容A',
        });
    });
    afterAll(() => {
        restoreFs();
    });
        beforeEach(() => {
            setupMockFs({
                '/mockdir/a.md': '# A\n内容A',
            });
        });
        afterEach(() => {
            restoreFs();
        });
        it('should generate correct RSS item from file', () => {
            // mock process.env.SITE_URL 和 CONTENT_DIR
            process.env.SITE_URL = 'https://example.com';
            process.env.CONTENT_DIR = '/mockdir';
        const item = fileToRssItem('/mockdir/a.md', '/mockdir', 'https://example.com');
            expect(item).toContain('<title>A</title>');
            expect(item).toContain('<description><![CDATA[内容A]]></description>');
            expect(item).toContain('<link>https://example.com/a.html</link>');
        });
});
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { generateRss, extractTitle, extractDescription } from '../src/generate-rss';
import * as rssModule from '../src/generate-rss';

describe('generateRss', () => {
    it('should generate valid RSS XML from items', () => {
        const items = [
            '<item><title>Test</title></item>'
        ];
        const rss = generateRss(items);
        expect(rss).toContain('<rss');
        expect(rss).toContain('<item>');
        expect(rss).toContain('Test');
    });

    it('should handle empty items array', () => {
        const rss = generateRss([]);
        expect(rss).toContain('<rss');
        expect(rss).not.toContain('<item>');
    });
});

describe('extractTitle', () => {
    it('should extract title from markdown', () => {
        expect(extractTitle('# 标题\n内容')).toBe('标题');
    });
    it('should return 未命名 if no title', () => {
        expect(extractTitle('内容')).toBe('未命名');
    });
});

describe('extractDescription', () => {
    it('should extract description from markdown', () => {
        expect(extractDescription('# 标题\n描述内容')).toBe('描述内容');
    });
    it('should return empty string if no description', () => {
        expect(extractDescription('# 标题\n')).toBe('');
    });
});

describe('ensureSiteUrl', () => {
    it('should call process.exit if SITE_URL is not set', () => {
    const originalEnv = process.env.SITE_URL;
    delete process.env.SITE_URL;
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((code?: number|string|null|undefined): never => { return undefined as never; });
    rssModule.ensureSiteUrl();
    expect(exitSpy).toHaveBeenCalledWith(1);
    process.env.SITE_URL = originalEnv;
    });
});

describe('getMarkdownFiles recursion', () => {
    it('should recursively find markdown files in subdirectories', () => {
        // mock fs.readdirSync 和 fs.statSync
        const structure = {
            '/mockdir/a.md': '# A',
            '/mockdir/sub/b.md': '# B',
            '/mockdir/sub/c.txt': 'not md',
        };
    vi.spyOn(fs, 'readdirSync').mockImplementation((dir: any): any => {
            if (dir === '/mockdir') return ['a.md', 'sub'] as unknown as string[];
            if (dir === '/mockdir/sub') return ['b.md', 'c.txt'] as unknown as string[];
            return [] as unknown as string[];
        });
        vi.spyOn(fs, 'statSync').mockImplementation((filePath: any) => {
            class MockStats {
                constructor(private isDir: boolean) {}
                isDirectory() { return this.isDir; }
                isFile() { return !this.isDir; }
                isBlockDevice() { return false; }
                isCharacterDevice() { return false; }
                isSymbolicLink() { return false; }
                isFIFO() { return false; }
                isSocket() { return false; }
                mtime = new Date('2025-08-14');
                atime = new Date('2025-08-14');
                ctime = new Date('2025-08-14');
                birthtime = new Date('2025-08-14');
                size = 100;
                ino = 1;
                dev = 1;
                mode = 0o100644;
                nlink = 1;
                uid = 1000;
                gid = 1000;
                rdev = 1;
                blksize = 4096;
                blocks = 1;
                atimeMs = Date.now();
                mtimeMs = Date.now();
                ctimeMs = Date.now();
                birthtimeMs = Date.now();
                atimeNs = BigInt(Date.now());
                mtimeNs = BigInt(Date.now());
                ctimeNs = BigInt(Date.now());
                birthtimeNs = BigInt(Date.now());
            }
            if (filePath === '/mockdir/sub') {
                return new MockStats(true);
            }
            return new MockStats(false);
        });
        const files = rssModule.getMarkdownFiles('/mockdir');
        expect(files).toEqual(['/mockdir/a.md', '/mockdir/sub/b.md']);
        vi.restoreAllMocks();
    });
});

describe('main', () => {
    it('should write empty RSS if no markdown files', () => {
        const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
        vi.spyOn(rssModule, 'ensureSiteUrl').mockImplementation(() => {});
        vi.spyOn(rssModule, 'getMarkdownFiles').mockReturnValue([]);
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        rssModule.main();
        expect(writeSpy).toHaveBeenCalled();
        writeSpy.mockRestore();
        logSpy.mockRestore();
    });
    it('should write RSS if markdown files exist', () => {
        vi.spyOn(rssModule, 'ensureSiteUrl').mockImplementation(() => {});
        vi.spyOn(rssModule, 'getMarkdownFiles').mockReturnValue(['/mockdir/a.md']);
        vi.spyOn(rssModule, 'fileToRssItem').mockReturnValue('<item></item>');
        const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        rssModule.main();
        expect(writeSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalled();
        writeSpy.mockRestore();
        logSpy.mockRestore();
    });
});
