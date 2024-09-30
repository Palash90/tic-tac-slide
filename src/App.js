import React, { useState } from 'react';
import { Alert, Container, Row, Stack } from 'react-bootstrap';
import './index.css'; // Using your index.css
import allColors from './playerColors';
import ControlPanel from './ControlPanel';
import GameGrid from './GameGrid.js';
import { AppContext } from './AppContext.js';
import { addWinner } from './logic.js';
import I18nLabel from './I18nLabel.js';

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
  const [moveActivated, setMoveActivated] = useState(true);

  const isGameOver = () => {
    return colors.filter(c => !winners.includes(c.val)).length === 1;
  }

  const setWinner = (winner) => {
    addWinner(winner, winners, setWinners);
  }
  const clearWinners = () => setWinners([]);

  const changePlayer = () => {
    setSelectedColor(getNextColor());
    setCellClicked(false);
    setTurnComplete(true);
  }

  const getNextColor = () => {
    const activeColors = colors.filter(c => !winners.includes(c.val));
    const selectedColorIndex = activeColors.findIndex(c => c.val === selectedColor);

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
    moveActivated, setMoveActivated, isGameOver
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Container className="grid-container main-content p-2 dark-theme" fluid>
        <Row>
          <ControlPanel colors={colors} allColors={allColors} setColors={setColors} />
        </Row>
        <Row>
          {isGameOver() ?
            <Alert variant='info'><I18nLabel msg="GAME_OVER"></I18nLabel></Alert> :
            <Alert variant='secondary' />}
        </Row>
        <Row>
          <GameGrid />
        </Row>
      </Container>
    </AppContext.Provider >
  );


};

export default GridApp;
