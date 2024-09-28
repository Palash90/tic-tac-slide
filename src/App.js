import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Dropdown, DropdownButton, Alert } from 'react-bootstrap';
import './index.css'; // Using your index.css
import { checkForWinner, handleColumnShift, handleRowShift } from './logic';
import allColors from './playerColors';
import { PeopleFill, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Icon6CircleFill, Icon2CircleFill, Icon3CircleFill, Icon4CircleFill, Icon5CircleFill, ArrowClockwise } from 'react-bootstrap-icons';
import ControlPanel from './ControlPanel';

import { useContext } from 'react';
import { AppContext } from './AppContext.js';

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
  const [winner, setWinner] = useState(null); // State to store winner color

  const contextValue = {
    colors, allColors, setColors, size, grid,
    setGrid, selectedColor, setSelectedColor,
    selectedColorName, setSelectedColorName,
    winner, setWinner, initializeGrid
  }

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
    <AppContext.Provider value={contextValue}>
      <Container className="grid-container main-content p-4 dark-theme">
        <ControlPanel colors={colors} allColors={allColors} setColors={setColors} />

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
                <ArrowLeft />
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
                <ArrowRight />
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
                  <ArrowUp />
                </Button>
                <Button
                  variant="outline-success"
                  className="rotate-button"
                  onClick={() => handleColumnShift(colIndex, 'down', grid, setWinner, setGrid)}
                >
                  <ArrowDown />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </AppContext.Provider>
  );
};

export default GridApp;
