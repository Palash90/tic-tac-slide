// Function to check if 4 blocks of the same color are in a row, column, or diagonal
export function checkForWinner(grid, setWinner, winners) {
    const size = grid.length; // Assuming square grid
    
    const checkAndSetWinningLine = (line) => {
        if (checkLine(line, winners)) {
            line.map((i) => i["winningCell"] = true);
            setWinner(line[0].color);
            return;
        }
    }

    // Check rows for four consecutive elements
    for (let i = 0; i < size; i++) {
        for (let j = 0; j <= size - 4; j++) {
            const rowSegment = grid[i].slice(j, j + 4); // Get a segment of 4
            checkAndSetWinningLine(rowSegment);
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
            checkAndSetWinningLine(columnSegment);
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
            checkAndSetWinningLine(diagonal1);
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
            checkAndSetWinningLine(diagonal2);
        }
    }
};



// Helper function to check if all blocks in a line (row/column/diagonal) have the same color
const checkLine = (line, winners) => {
    //const color = line[0].color;
    //return color && line.every(cell => cell.color === color);
    for (let i = 0; i <= line.length - 4; i++) {
        const color = line[i].color;
        // Check if the current color is defined and if the next three elements have the same color
        if (color && line[i + 1].color === color && line[i + 2].color === color && line[i + 3].color === color && !winners.includes(color)) {
            return true; // Found four consecutive elements with the same color
        }
    }
    return false; // No consecutive four elements found with the same color
};

export function handleColumnShift(colIndex, direction, grid, setWinner, setGrid, winners) {
    const newGrid = grid.map(row => row.map(cell => {return {...cell, winningCell: false}}));
    const column = newGrid.map(row => row[colIndex]);
    if (direction === 'up') {
        column.push(column.shift()); // Shift up
    } else {
        column.unshift(column.pop()); // Shift down
    }
    newGrid.forEach((row, i) => (row[colIndex] = column[i]));
    setGrid(newGrid);
    checkForWinner(newGrid, setWinner, winners); // Check for a winner after shifting
};

export function handleRowShift(rowIndex, direction, grid, setWinner, setGrid, winners) {
    const newGrid = grid.map(row => row.map(cell => {return {...cell, winningCell: false}}))
    if (direction === 'left') {
        newGrid[rowIndex].push(newGrid[rowIndex].shift()); // Shift left
    } else {
        newGrid[rowIndex].unshift(newGrid[rowIndex].pop()); // Shift right
    }
    setGrid(newGrid);
    checkForWinner(newGrid, setWinner, winners); // Check for a winner after shifting
};

export function addWinner(winner, winners, setWinners) {
    if (!winners.includes(winner)) {
        setWinners([...winners, winner])
    }
}