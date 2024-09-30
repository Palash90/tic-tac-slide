import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Button } from "react-bootstrap";

export default function NavigationButton({ children, action }) {
    const { selectedColor, winners, setWinner, grid, getNextColor, isGameOver, moveActivated, setGrid, size, cellClicked, setCellClicked, turnComplete, setTurnComplete, changePlayer } = useContext(AppContext);
    if (!moveActivated) {
        return <Button
            variant="outline-secondary"
            onClick={() => { }}
            disabled
        >
            {children}
        </Button>
    }
    
    if (moveActivated && cellClicked) {
        return <Button
            variant="success"
            className="rotate-button"
            onClick={() => {
                if (!isGameOver()) {
                    action();
                    changePlayer();
                }
            }}
        >
            {children}
        </Button>
    } else {
        return <Button
            variant="outline"
            onClick={() => { }}
            disabled
        >
            {children}
        </Button>
    }
}