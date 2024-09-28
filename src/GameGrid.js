import { AppContext } from './AppContext';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { checkForWinner, handleColumnShift, handleRowShift } from './logic';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

export default function GameGrid() {
    const { selectedColor, setWinner, grid, setGrid, size } = useContext(AppContext);
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
    return <div className="grid shadow-lg p-3 rounded">
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
    </div>;
}