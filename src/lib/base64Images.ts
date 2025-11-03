import { AvatarSprites } from "./sprites";

type Base64ImageResponse = {
    url: string;
    base64: string;
    source: 'cache' | 'fetch';
}

// cashe base64 images to avoid redundant fetches
const base64ImageCache: Record<string, string> = {};

export const fetchBase64Images = async (urls: string[], base64Url: string): Promise<Base64ImageResponse[]> => {
    // filter out urls that are already cached
    const urlsToFetch = urls.filter(url => !base64ImageCache[url]);

    if (urlsToFetch.length === 0) {
        // all images are cached
        return urls.map(url => ({
            url,
            base64: base64ImageCache[url],
            source: 'cache'
        }));
    }

    try {
        const urlParam = encodeURIComponent(urlsToFetch.join(','));
        const res = await fetch(`${base64Url}?urls=${urlParam}`);
        const data = await res.json();

        data.forEach((item: Base64ImageResponse) => {
            base64ImageCache[item.url] = item.base64;
        });

        // merge cached images with newly fetched ones
        const result: Base64ImageResponse[] = urls.map(url => {
            if (base64ImageCache[url]) {
                return {
                    url,
                    base64: base64ImageCache[url],
                    source: 'cache'
                };
            } else {
                const fetchedItem = data.find((item: Base64ImageResponse) => item.url === url);
                return fetchedItem ? { ...fetchedItem, source: 'fetch' } : { url, base64: '', source: 'fetch' };
            }
        });

        return result;
    } catch (error) {
        console.error('Error fetching base64 images:', error);
        return [];
    }
}

export const enrichAvatarSpritesWithBase64 = async (
    avatarSprites: AvatarSprites,
    base64Url: string
): Promise<AvatarSprites> => {
    const urls = Object.values(avatarSprites).map(sprite => sprite.backgroundUrl);
    const base64Images = await fetchBase64Images(urls, base64Url);

    const enrichedSprites: AvatarSprites = { ...avatarSprites };
    Object.values(avatarSprites).forEach(sprite => {
        const base64Image = base64Images.find(img => img.url === sprite.backgroundUrl);
        if (base64Image) {
            enrichedSprites[sprite.spriteType] = {
                ...sprite,
                backgroundUrl: base64Image.base64
            };
        }
    });

    return enrichedSprites;
};
