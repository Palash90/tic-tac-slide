import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './index.css'; // Using your index.css
import allColors from './playerColors';
import ControlPanel from './ControlPanel';
import GameGrid from './GameGrid.js';
import { AppContext } from './AppContext.js';
import Winner from './Winner.js';
import { addWinner } from './logic.js';

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
  const [winners, setWinners] = useState([]); // State to store winner color

  const setWinner = (winner) => addWinner(winner, winners, setWinners);
  const clearWinners = () => setWinners([]);
  
  const contextValue = {
    colors, setColors, allColors, size, grid,
    setGrid, selectedColor, setSelectedColor,
    selectedColorName, setSelectedColorName,
    winners, setWinner, initializeGrid, clearWinners
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Container className="grid-container main-content p-4 dark-theme">
        <ControlPanel colors={colors} allColors={allColors} setColors={setColors} />
        <Winner />
        <GameGrid />
      </Container>
    </AppContext.Provider>
  );
};

export default GridApp;
