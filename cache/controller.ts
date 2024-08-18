
import fs from 'fs';
import path from 'path';

export const cacheFilePathAccess = path.join('/cache', 'spotify-access-tokens.json');
export const cacheFilePathRefresh = path.join('/cache', 'spotify-refresh-tokens.json');

export const ensureCacheDirExists = (cacheDir: any) => {
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }
};
export const readCache = (cacheFilePath: any) => {
    if (fs.existsSync(cacheFilePath)) {
        return JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
    }
    return null;
};


export const writeCache = (data: any, cacheFilePath: any) => {
    ensureCacheDirExists('/cache');
    fs.writeFileSync(cacheFilePath, JSON.stringify(data));
};