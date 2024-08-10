
export const isValidSudoku = (grid) => {
    const isValid = (arr) => {
        const filtered = arr.filter((num) => num !== 0);
        return new Set(filtered).size === filtered.length;
    };

    for (let i = 0; i < 9; i++) {
        const row = grid[i];
        const col = grid.map(row => row[i]);
        const box = grid
            .slice(Math.floor(i / 3) * 3, Math.floor(i / 3) * 3 + 3)
            .flatMap(row => row.slice((i % 3) * 3, (i % 3) * 3 + 3));

        if (!isValid(row) || !isValid(col) || !isValid(box)) return false;
    }
    return true;
};

export const solveSudoku = (grid) => {
    const findEmpty = (grid) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) return [i, j];
            }
        }
        return null;
    };

    const isValidNumber = (grid, num, pos) => {
        const [row, col] = pos;

        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num && i !== col) return false;
            if (grid[i][col] === num && i !== row) return false;
            const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(col / 3) + i % 3;
            if (grid[boxRow][boxCol] === num && boxRow !== row && boxCol !== col) return false;
        }

        return true;
    };

    const solve = () => {
        const currentPos = findEmpty(grid);

        if (currentPos === null) return true;

        for (let i = 1; i < 10; i++) {
            if (isValidNumber(grid, i, currentPos)) {
                const [x, y] = currentPos;
                grid[x][y] = i;

                if (solve()) return true;

                grid[x][y] = 0;
            }
        }

        return false;
    };

    if (solve()) return grid;
    return null;
};
