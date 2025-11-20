export const generateRandomDigits = (length: number): string => {
        const chars = "ABCDE12345"
        let result = "";
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * chars.length);
            result += chars[index];
        }
        return result;
}  