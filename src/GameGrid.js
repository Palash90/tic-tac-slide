import { AppContext } from './AppContext';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { checkForWinner, handleColumnShift, handleRowShift } from './logic';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, LockFill, TrophyFill, Gem } from 'react-bootstrap-icons';
import PlayerAward from './PlayerAward';

export default function GameGrid() {
    const { selectedColor, winners, setWinner, grid, setGrid, size } = useContext(AppContext);
    const handleCellClick = (rowIndex, colIndex) => {
        const newGrid = [...grid];
        const cell = newGrid[rowIndex][colIndex];

        // Only allow color change if the cell is not locked and if the selected color is not winner
        if (!cell.locked && !winners.includes(selectedColor)) {
            cell.color = selectedColor;
            cell.locked = true; // Lock the cell after it gets a color
            setGrid(newGrid);
            checkForWinner(newGrid, setWinner, winners); // Check for a winner after setting a color
        }
    };

    const getCellStyle = (cellColor) => {
        var lockedBg = "linear-gradient(to top right, #333333, " + cellColor + ", #666666, " + cellColor + ", #999999, " + cellColor + ", #cccccc, " + cellColor + ", white)";
        var noColorBg = "transparent";
        var activeBg = "linear-gradient(to bottom right, " + cellColor + ", #666666)";
        var style = {};

        if (!cellColor) {
            style = { background: noColorBg }
        } else if (winners.includes(cellColor)) {
            style = { background: lockedBg, transform: "scale(1)" }
        } else {
            style = { background: activeBg }
        }

        return style
    }


    return <div className="grid shadow-lg p-3 rounded">
        {grid.map((row, rowIndex) => (
            <div className="grid-row d-flex align-items-center mb-2" key={rowIndex}>
                <Button
                    variant="outline-success"
                    className="rotate-button"
                    onClick={() => handleRowShift(rowIndex, 'left', grid, setWinner, setGrid, winners)}
                >
                    <ArrowLeft />
                </Button>
                {row.map((cell, colIndex) => (
                    <div
                        className="grid-cell border rounded mx-1 shadow-sm"
                        key={cell.id}
                        style={getCellStyle(cell.color)}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                        <PlayerAward player={cell.color} winners={winners} size={40} />
                    </div>
                ))}
                <Button
                    variant="outline-success"
                    className="rotate-button"
                    onClick={() => handleRowShift(rowIndex, 'right', grid, setWinner, setGrid, winners)}
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
                        onClick={() => handleColumnShift(colIndex, 'up', grid, setWinner, setGrid, winners)}
                    >
                        <ArrowUp />
                    </Button>
                    <Button
                        variant="outline-success"
                        className="rotate-button"
                        onClick={() => handleColumnShift(colIndex, 'down', grid, setWinner, setGrid, winners)}
                    >
                        <ArrowDown />
                    </Button>
                </div>
            ))}
        </div>
    </div>;
}