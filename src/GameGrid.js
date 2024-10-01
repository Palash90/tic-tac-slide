import { AppContext } from './AppContext';
import { useContext } from 'react';
import { checkForWinner, handleColumnShift, handleRowShift } from './logic';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import PlayerAward from './PlayerAward';
import NavigationButton from './NavigationButton';

export default function GameGrid() {
    const { selectedColor, winners, setWinner, grid, isGameOver, moveActivated, setGrid, size, setCellClicked, turnComplete, setTurnComplete, changePlayer } = useContext(AppContext);
    const handleCellClick = (rowIndex, colIndex) => {
        const newGrid = [...grid];
        const cell = newGrid[rowIndex][colIndex];

        // Only allow color change if the cell is not locked and if the selected color is not winner and the previous turn is complete
        if (!cell.locked && !winners.includes(selectedColor) && !isGameOver() && (turnComplete || !moveActivated)) {
            cell.color = selectedColor;
            cell.locked = true; // Lock the cell after it gets a color
            setGrid(newGrid);
            setCellClicked(true);
            setTurnComplete(false);
            checkForWinner(newGrid, setWinner, winners); // Check for a winner after setting a color
        }
    };

    const getCellStyle = (cell) => {
        var lockedBg = "linear-gradient(to top right, #333333, " + cell.color + ", #666666, " + cell.color + ", #999999, " + cell.color + ", #cccccc, " + cell.color + ", white)";
        var noColorBg = "transparent";
        var activeBg = "linear-gradient(to bottom right, " + cell.color + ", #666666)";
        var style = {};

        if (!cell.color) {
            style = { background: noColorBg }
        } else if (winners.includes(cell.color)) {
            style = { background: lockedBg, transform: "scale(1)" }
        } else {
            style = { background: activeBg }
        }

        if (cell.winningCell) {
            style = { ...style, transform: "scale(1.3)" }
        }

        return style
    }

    return <div className="grid shadow-lg p-3 rounded">
        {grid.map((row, rowIndex) => (
            <div className="grid-row d-flex align-items-center mb-2" key={rowIndex}>

                <NavigationButton key={"left-" + rowIndex} direction='left' action={() => handleRowShift(rowIndex, 'left', grid, setWinner, setGrid, winners)} />

                {row.map((cell, colIndex) => (
                    <div
                        className="grid-cell border rounded mx-1 shadow-sm"
                        key={cell.id}
                        style={getCellStyle(cell)}
                        onClick={() => {
                            handleCellClick(rowIndex, colIndex);
                            if (!moveActivated) {
                                setGrid(grid)
                                checkForWinner(grid, setWinner, winners);
                                changePlayer();
                            }
                        }}
                    >
                        <PlayerAward player={cell.color} winners={winners} size={40} />
                    </div>
                ))}
                <NavigationButton key={"right-" + rowIndex} direction='right' action={() => handleRowShift(rowIndex, 'right', grid, setWinner, setGrid, winners)} />
            </div>
        ))}
        <div className="grid-column-controls d-flex justify-content-center mt-3">
            {Array.from({ length: size }).map((_, colIndex) => (
                <div key={colIndex} className="d-flex flex-column align-items-center mx-2">
                    <NavigationButton key={"up-" + colIndex} direction='up' action={() => handleColumnShift(colIndex, 'up', grid, setWinner, setGrid, winners)} />
                    <NavigationButton key={"down-" + colIndex} direction='down' action={() => handleColumnShift(colIndex, 'down', grid, setWinner, setGrid, winners)} />
                </div>
            ))}
        </div>
    </div>;
}