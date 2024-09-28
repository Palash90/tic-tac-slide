import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Dropdown, DropdownButton, Alert } from 'react-bootstrap';
import './index.css'; // Using your index.css

const colors = ['#FF6347', '#4682B4', '#FFD700', '#32CD32'];

const GridApp = () => {
  
  // Initialize grid with unique IDs and no initial color
  const initializeGrid = (size) => {
    return Array.from({ length: size }, (_, rowIndex) =>
      Array.from({ length: size }, (_, colIndex) => ({
        id: `${rowIndex}-${colIndex}`,
        color: '', // No initial color
        locked: false // Flag to prevent color changes once a color is set
      }))
    );
  };

  const [size, setSize] = useState(4); // Grid size (both rows and columns)
  const [grid, setGrid] = useState(initializeGrid(4));
  const [selectedColor, setSelectedColor] = useState(colors[0]); // Default color selection
  const [darkTheme, setDarkTheme] = useState(false); // Theme state
  const [winner, setWinner] = useState(null); // State to store winner color


  const handleRowShift = (rowIndex, direction) => {
    const newGrid = [...grid];
    if (direction === 'left') {
      newGrid[rowIndex].push(newGrid[rowIndex].shift()); // Shift left
    } else {
      newGrid[rowIndex].unshift(newGrid[rowIndex].pop()); // Shift right
    }
    setGrid(newGrid);
    checkForWinner(newGrid); // Check for a winner after shifting
  };

  const handleColumnShift = (colIndex, direction) => {
    const newGrid = [...grid];
    const column = newGrid.map(row => row[colIndex]);
    if (direction === 'up') {
      column.push(column.shift()); // Shift up
    } else {
      column.unshift(column.pop()); // Shift down
    }
    newGrid.forEach((row, i) => (row[colIndex] = column[i]));
    setGrid(newGrid);
    checkForWinner(newGrid); // Check for a winner after shifting
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    const cell = newGrid[rowIndex][colIndex];

    // Only allow color change if the cell is not locked
    if (!cell.locked) {
      cell.color = selectedColor;
      cell.locked = true; // Lock the cell after it gets a color
      setGrid(newGrid);
      checkForWinner(newGrid); // Check for a winner after setting a color
    }
  };

  const handleThemeToggle = () => {
    setDarkTheme(!darkTheme);
  };

  // Function to check if 4 blocks of the same color are in a row, column, or diagonal
  const checkForWinner = (grid) => {
    for (let i = 0; i < size; i++) {
      // Check rows
      if (checkLine(grid[i])) {
        setWinner(grid[i][0].color);
        return;
      }
      // Check columns
      const column = grid.map(row => row[i]);
      if (checkLine(column)) {
        setWinner(column[0].color);
        return;
      }
    }
    // Check diagonals
    const diagonal1 = grid.map((row, i) => row[i]);
    const diagonal2 = grid.map((row, i) => row[size - 1 - i]);
    if (checkLine(diagonal1) || checkLine(diagonal2)) {
      setWinner(diagonal1[0].color || diagonal2[0].color);
    }
  };

  // Helper function to check if all blocks in a line (row/column/diagonal) have the same color
  const checkLine = (line) => {
    const color = line[0].color;
    return color && line.every(cell => cell.color === color);
  };

  return (
    <Container className={`grid-container p-4 ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Row className="mb-4">
        <Col md={4}>
          <input
            type="number"
            className="form-control"
            value={size}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setSize(value);
              setGrid(initializeGrid(value));
            }}
            placeholder="Grid Size"
          />
        </Col>
        <Col md={4}>
          <DropdownButton
            id="dropdown-basic-button"
            title={`Selected Color: ${selectedColor}`}
            className="w-100"
            variant={darkTheme ? 'secondary' : 'primary'}
          >
            {colors.map((color) => (
              <Dropdown.Item
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color, color: 'white', textAlign: 'center' }}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col md={4} className="text-end">
          <Button variant={darkTheme ? 'light' : 'dark'} onClick={handleThemeToggle}>
            Toggle {darkTheme ? 'Light' : 'Dark'} Theme
          </Button>
        </Col>
      </Row>

      {winner && (
        <Alert variant="success" className="text-center">
          {`${winner.charAt(0).toUpperCase() + winner.slice(1)} is the winner!`}
        </Alert>
      )}

      <div className="grid shadow-lg p-3 rounded">
        {grid.map((row, rowIndex) => (
          <div className="grid-row d-flex align-items-center mb-2" key={rowIndex}>
            <Button
              variant="outline-success"
              className="rotate-button"
              onClick={() => handleRowShift(rowIndex, 'left')}
            >
              {'<'}
            </Button>
            {row.map((cell, colIndex) => (
              <div
                className="grid-cell border rounded mx-1 shadow-sm"
                key={cell.id}
                style={{ backgroundColor: cell.color || 'transparent' }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell.id}
              </div>
            ))}
            <Button
              variant="outline-success"
              className="rotate-button"
              onClick={() => handleRowShift(rowIndex, 'right')}
            >
              {'>'}
            </Button>
          </div>
        ))}
        <div className="grid-column-controls d-flex justify-content-center mt-3">
          {Array.from({ length: size }).map((_, colIndex) => (
            <div key={colIndex} className="d-flex flex-column align-items-center mx-2">
              <Button
                variant="outline-success"
                className="rotate-button"
                onClick={() => handleColumnShift(colIndex, 'up')}
              >
                {'^'}
              </Button>
              <Button
                variant="outline-success"
                className="rotate-button"
                onClick={() => handleColumnShift(colIndex, 'down')}
              >
                {'v'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default GridApp;
