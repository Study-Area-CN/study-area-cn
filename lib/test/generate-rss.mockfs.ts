import fs from 'fs';
import path from 'path';
import { vi } from 'vitest';

// Vitest mock 文件系统工具
let _structure: Record<string, string> = {};

export function setupMockFs(structure: Record<string, string>) {
    _structure = structure;
    vi.spyOn(fs, 'readdirSync').mockImplementation((dir: fs.PathLike) => {
        const dirStr = typeof dir === 'string' ? dir : dir.toString();
        return Object.keys(_structure)
            .filter(f => path.dirname(f) === dirStr)
            .map(f => path.basename(f));
    });
    vi.spyOn(fs, 'statSync').mockImplementation((filePath: fs.PathLike) => {
        // 返回最简 Stats mock，仅满足 isDirectory 和 mtime
        return {
            isDirectory: () => false,
            mtime: new Date('2025-08-14'),
        } as any;
    });
    vi.spyOn(fs, 'readFileSync').mockImplementation((filePath: fs.PathOrFileDescriptor, options?: any) => {
        const fileStr = typeof filePath === 'string' ? filePath : filePath.toString();
        return _structure[fileStr] || '';
    });
}

export function restoreFs() {
    vi.restoreAllMocks();
    _structure = {};
}