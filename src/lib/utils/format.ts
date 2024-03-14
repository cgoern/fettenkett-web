export function distance(
	amount: number,
	digitsMin: number = 2,
	digitsMax: number = 2,
	locale: string = 'en-US',
): string {
	return new Intl.NumberFormat(locale, {
		style: 'unit',
		unit: 'kilometer',
		unitDisplay: 'short',
		minimumFractionDigits: digitsMin,
		maximumFractionDigits: digitsMax,
	}).format(amount)
}
