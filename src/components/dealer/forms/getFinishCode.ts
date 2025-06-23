import { FinishCode, FinishName } from "../../../types/product/common";

export function toPascalCase(str: string) {
    return str
        .replace(/[_\-\s]+/g, ' ')                     // Replace _, -, or multiple spaces with single space
        .split(' ')                                     // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
        .join('');                                      // Join without spaces
}

export function getFinishCode(name: FinishName): FinishCode | undefined {
    const color = toPascalCase(name)
    const key = (Object.keys(FinishName) as Array<keyof typeof FinishName>).find(
        (k) => FinishName[k] === color
    )

    return key ? FinishCode[key] : undefined
}