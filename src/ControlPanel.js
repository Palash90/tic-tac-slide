import { Button, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { PeopleFill, Icon6CircleFill, Icon2CircleFill, Icon3CircleFill, Icon4CircleFill, Icon5CircleFill, ArrowClockwise, Person, PersonFill, Border, PersonCircle, Trophy } from 'react-bootstrap-icons';
import { AppContext } from './AppContext';
import { useContext } from 'react';


const ControlPanel = () => {
    const { colors, allColors, setColors, winner, selectedColor, setSelectedColor, setSelectedColorName, clearWinners, setGrid, initializeGrid, size } = useContext(AppContext);

    const renderPlayers = () => {
        switch (colors.length) {
            case 2: return <Icon2CircleFill />;
            case 3: return <Icon3CircleFill />;
            case 4: return <Icon4CircleFill />;
            case 5: return <Icon5CircleFill />;
            case 6: return <Icon6CircleFill />;
        }
    };

    const resetGrid = () => {
        clearWinners();
        setGrid(initializeGrid(size));
    }

    const renderPlayerIcons = () => {
        return colors.map((color) => {
            const active = color.val === selectedColor
            const winningUser = color.val === winner
            if (active) {
                return <PersonCircle
                    key={color.val}
                    color={color.val}
                    size={45}
                    onClick={() => {
                        setSelectedColor(color.val);
                        setSelectedColorName(color.name);
                    }} />
            } else if (winningUser) {
                return <><PersonFill
                    key={color.val}
                    color={"Gray"}
                    size={30}
                    onClick={() => {
                        setSelectedColor(color.val);
                        setSelectedColorName(color.name);
                    }} /><Trophy size={10} /></>
            } else {
                return <PersonFill
                    key={color.val}
                    color={color.val}
                    size={30}
                    onClick={() => {
                        setSelectedColor(color.val);
                        setSelectedColorName(color.name);
                    }} />
            }
        });
    }

    return <Row className="mb-3">
        <Col md={1}><PeopleFill size={30} values={colors.length} color='white' /></Col>
        <Col md={3}>
            <input
                type="range"
                className="form-control"
                value={colors.length}
                max={6}
                min={2}
                step={1}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    var playerColors = allColors.slice(0, value);
                    setColors(playerColors);
                    resetGrid();
                }}
                placeholder="Number of players" />
        </Col>

        <Col md={1}>
            {renderPlayers()}
        </Col>
        <Col md={3}>
            {renderPlayerIcons()}
        </Col>
        <Col md={1} className="text-end">
            <Button variant='light' onClick={() => resetGrid()}>
                <ArrowClockwise />
            </Button>
        </Col>
    </Row>;
}

export default ControlPanel;