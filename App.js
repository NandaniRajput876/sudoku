// src/App.js
import React, { useState } from 'react';
import SudokuGrid from './components/SudokuGrid';
import { isValidSudoku, solveSudoku } from './utils/sudokuSolver';
import './App.css';

const App = () => {
    const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
    const [error, setError] = useState(null);

    const handleChange = (e, rowIndex, colIndex) => {
        const value = parseInt(e.target.value) || 0;
        const newGrid = grid.map((row, rIdx) =>
            row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
        );
        setGrid(newGrid);
    };

    const handleValidate = () => {
        if (isValidSudoku(grid)) {
            setError(null);
            alert('Sudoku entries are valid!');
        } else {
            setError('Invalid Sudoku entries.');
        }
    };

    const handleSolve = () => {
        if (!isValidSudoku(grid)) {
            setError('Invalid Sudoku entries. Cannot solve.');
            return;
        }

        const solvedGrid = solveSudoku(grid);
        if (solvedGrid) {
            setGrid(solvedGrid);
            setError(null);
        } else {
            setError('No solution exists for this Sudoku.');
        }
    };

    return (
        <div className="App">
            <h1>Sudoku Solver</h1>
            {error && <div className="error">{error}</div>}
            <SudokuGrid grid={grid} onChange={handleChange} />
            <div className="buttons">
                <button onClick={handleValidate}>Validate</button>
                <button onClick={handleSolve}>Solve</button>
            </div>
        </div>
    );
};

export default App;
