export const deepClone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
