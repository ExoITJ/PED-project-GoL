export const calculateGrid = (rows: number, columns: number): boolean[][] =>
    Array(rows)
        .fill(false)
        .map(() => Array(columns).fill(false));
