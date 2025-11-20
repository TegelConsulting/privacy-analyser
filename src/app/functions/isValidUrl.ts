export const isValidUrl = (s: string) => {
    try {
        const url = new URL(s); 
        return ["http:", "https:"].includes(url.protocol);
    } catch (error) {
        return false;       
    }
}