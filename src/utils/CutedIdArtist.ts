export const getArtistId = (url: string): string => {
    return url.split("/").pop() || "";
};