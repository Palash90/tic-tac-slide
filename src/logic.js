// Function to check if 4 blocks of the same color are in a row, column, or diagonal
export function checkForWinner(grid, setWinner) {
    const size = grid.length; // Assuming square grid

    // Check rows for four consecutive elements
    for (let i = 0; i < size; i++) {
        for (let j = 0; j <= size - 4; j++) {
            const rowSegment = grid[i].slice(j, j + 4); // Get a segment of 4
            if (checkLine(rowSegment)) {
                setWinner(rowSegment[0].color);
                return;
            }
        }
    }

    // Check columns for four consecutive elements
    for (let j = 0; j < size; j++) {
        for (let i = 0; i <= size - 4; i++) {
            const columnSegment = [
                grid[i][j],
                grid[i + 1][j],
                grid[i + 2][j],
                grid[i + 3][j]
            ]; // Collect 4 elements from the column
            if (checkLine(columnSegment)) {
                setWinner(columnSegment[0].color);
                return;
            }
        }
    }

    // Check diagonals
    // Top-left to bottom-right diagonals
    for (let i = 0; i <= size - 4; i++) {
        for (let j = 0; j <= size - 4; j++) {
            const diagonal1 = [
                grid[i][j],
                grid[i + 1][j + 1],
                grid[i + 2][j + 2],
                grid[i + 3][j + 3]
            ]; // Collect 4 elements from the diagonal
            if (checkLine(diagonal1)) {
                setWinner(diagonal1[0].color);
                return;
            }
        }
    }

    // Top-right to bottom-left diagonals
    for (let i = 0; i <= size - 4; i++) {
        for (let j = 3; j < size; j++) {
            const diagonal2 = [
                grid[i][j],
                grid[i + 1][j - 1],
                grid[i + 2][j - 2],
                grid[i + 3][j - 3]
            ]; // Collect 4 elements from the diagonal
            if (checkLine(diagonal2)) {
                setWinner(diagonal2[0].color);
                return;
            }
        }
    }
};



// Helper function to check if all blocks in a line (row/column/diagonal) have the same color
const checkLine = (line) => {
    //const color = line[0].color;
    //return color && line.every(cell => cell.color === color);
    for (let i = 0; i <= line.length - 4; i++) {
        const color = line[i].color;
        // Check if the current color is defined and if the next three elements have the same color
        if (color && line[i + 1].color === color && line[i + 2].color === color && line[i + 3].color === color) {
            return true; // Found four consecutive elements with the same color
        }
    }
    return false; // No consecutive four elements found with the same color
};

export function handleColumnShift(colIndex, direction, grid, setWinner, setGrid) {
    const newGrid = [...grid];
    const column = newGrid.map(row => row[colIndex]);
    if (direction === 'up') {
        column.push(column.shift()); // Shift up
    } else {
        column.unshift(column.pop()); // Shift down
    }
    newGrid.forEach((row, i) => (row[colIndex] = column[i]));
    setGrid(newGrid);
    checkForWinner(newGrid, setWinner); // Check for a winner after shifting
};

export function handleRowShift(rowIndex, direction, grid, setWinner, setGrid) {
    const newGrid = [...grid];
    if (direction === 'left') {
        newGrid[rowIndex].push(newGrid[rowIndex].shift()); // Shift left
    } else {
        newGrid[rowIndex].unshift(newGrid[rowIndex].pop()); // Shift right
    }
    setGrid(newGrid);
    checkForWinner(newGrid, setWinner); // Check for a winner after shifting
};