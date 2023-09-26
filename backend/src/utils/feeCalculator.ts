// Calculate fees depending parcels weight
export function calculateFee(weight: number): number {
    if (weight <= 1) return 1;
    if (weight <= 5) return 2;
    if (weight <= 10) return 3;
    if (weight <= 20) return 5;
    return 10;
}
