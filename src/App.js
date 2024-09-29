import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import './index.css'; // Using your index.css
import allColors from './playerColors';
import ControlPanel from './ControlPanel';
import GameGrid from './GameGrid.js';
import { AppContext } from './AppContext.js';
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
  const [turnComplete, setTurnComplete] = useState(true);
  const [size] = useState(8); // Grid size (both rows and columns)
  const [grid, setGrid] = useState(initializeGrid(8));
  const [selectedColor, setSelectedColor] = useState(colors[0].val); // Default color selection
  const [selectedColorName, setSelectedColorName] = useState(colors[0].name); // Default color selection
  const [winners, setWinners] = useState([]); // State to store winner color
  const [cellClicked, setCellClicked] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const setWinner = (winner) => addWinner(winner, winners, setWinners);
  const clearWinners = () => setWinners([]);

  const changePlayer = () => {
    setCellClicked(false);
    setTurnComplete(true);
    setSelectedColor(getNextColor());
    setTurnComplete(true);
  }

  const getNextColor = () => {
    const activeColors = colors.filter(c => !winners.includes(c.val));
    const selectedColorIndex = activeColors.findIndex(c => c.val === selectedColor);

    if (activeColors.length === 1) {
      setGameOver(true);
    }

    if (selectedColorIndex === activeColors.length - 1) {
      return activeColors[0].val;
    } else {
      return activeColors[selectedColorIndex + 1].val;
    }
  };

  const contextValue = {
    colors, setColors, allColors, size, grid,
    setGrid, selectedColor, setSelectedColor,
    selectedColorName, setSelectedColorName,
    winners, setWinner, initializeGrid, clearWinners,
    cellClicked, setCellClicked, getNextColor,
    turnComplete, setTurnComplete, changePlayer,
    gameOver, setGameOver
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Container className="grid-container main-content p-4 dark-theme">
        <ControlPanel colors={colors} allColors={allColors} setColors={setColors} />
        {gameOver ? <Alert variant='info'>Game Over</Alert> : <></>}
        <GameGrid />
      </Container>
    </AppContext.Provider>
  );
};

export default GridApp;
