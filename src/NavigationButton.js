import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Button } from "react-bootstrap";

export default function NavigationButton({ children, action }) {
    const { isGameOver, moveActivated, cellClicked, changePlayer, selectedColor, winners } = useContext(AppContext);

    const ColorInactive = () => {
        return <Button
            variant="outline"
            onClick={() => { }}
            disabled
        >
            {children}
        </Button>;
    }

    if (!moveActivated) {
        return <Button
            variant="outline-secondary"
            onClick={() => { }}
            disabled
        >
            {children}
        </Button>
    }

    if (moveActivated && cellClicked && !winners.includes(selectedColor)) {
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
    }

    if (moveActivated && cellClicked && winners.includes(selectedColor)) {
        changePlayer();
    }

    return <ColorInactive>{children}</ColorInactive>;
}