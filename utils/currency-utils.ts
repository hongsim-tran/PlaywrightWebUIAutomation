export function convertCurrencyToNumber(currencyString: string): number {
    const numberPart = currencyString.replace(/[^0-9.-]+/g, "");
    return parseFloat(numberPart);
}

export function convertCurrenciesToNumberArray(currencyStrings: string[]): number[] {
    const currencies = [];
    for (const str of currencyStrings) {
        const numberPart = str.replace(/[^0-9.-]+/g, "");
        currencies.push(parseFloat(numberPart));
    }
    return currencies;
}