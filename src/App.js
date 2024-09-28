import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Dropdown, DropdownButton, Alert } from 'react-bootstrap';
import './index.css'; // Using your index.css
import { checkForWinner, handleColumnShift, handleRowShift } from './logic';
import allColors from './playerColors';


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

  const [colors, setColors] = useState(allColors.slice(0, 2));
  const [size] = useState(8); // Grid size (both rows and columns)
  const [grid, setGrid] = useState(initializeGrid(8));
  const [selectedColor, setSelectedColor] = useState(colors[0].val); // Default color selection
  const [selectedColorName, setSelectedColorName] = useState(colors[0].name); // Default color selection
  const [darkTheme, setDarkTheme] = useState(true); // Theme state
  const [winner, setWinner] = useState(null); // State to store winner color

  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    const cell = newGrid[rowIndex][colIndex];

    // Only allow color change if the cell is not locked
    if (!cell.locked) {
      cell.color = selectedColor;
      cell.locked = true; // Lock the cell after it gets a color
      setGrid(newGrid);
      checkForWinner(newGrid, setWinner); // Check for a winner after setting a color
    }
  };

  return (
    <Container className={`grid-container p-4 ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Row className="mb-4">
        <Col md={3}>
          <input
            type="number"
            className="form-control"
            value={colors.length}
            max={6}
            min={2}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              var playerColors = allColors.slice(0,value);
              setColors(playerColors)
            }}
            placeholder="Number of players"
          />
        </Col>
        <Col md={3}>
          <DropdownButton
            id="dropdown-basic-button"
            title={`Selected Color: ${selectedColorName}`}
            className="w-100"
            style={{ color: { selectedColor } }}
            variant={darkTheme ? 'secondary' : 'primary'}
          >
            {colors.map((color) => (
              <Dropdown.Item
                key={color.val}
                onClick={() => { setSelectedColor(color.val); setSelectedColorName(color.name) }}
                style={{ backgroundColor: color.val, color: 'white', textAlign: 'center' }}
              >
                {color.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col md={3} className="text-end">
          <Button variant={darkTheme ? 'light' : 'dark'} onClick={() => {
            setWinner(null);
            setGrid(initializeGrid(size));
          }}>
            Restart
          </Button>
        </Col>
      </Row>

      {winner && (
        <Alert variant="success" className="text-center">
          {`${allColors.find(t => t.val === winner).name} is the winner!`}
        </Alert>
      )}

      <div className="grid shadow-lg p-3 rounded">
        {grid.map((row, rowIndex) => (
          <div className="grid-row d-flex align-items-center mb-2" key={rowIndex}>
            <Button
              variant="outline-success"
              className="rotate-button"
              onClick={() => handleRowShift(rowIndex, 'left', grid, setWinner, setGrid)}
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
              onClick={() => handleRowShift(rowIndex, 'right', grid, setWinner, setGrid)}
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
                onClick={() => handleColumnShift(colIndex, 'up', grid, setWinner, setGrid)}
              >
                {'^'}
              </Button>
              <Button
                variant="outline-success"
                className="rotate-button"
                onClick={() => handleColumnShift(colIndex, 'down', grid, setWinner, setGrid)}
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
