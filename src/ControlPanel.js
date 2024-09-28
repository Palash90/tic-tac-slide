import { Button, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { PeopleFill, Icon6CircleFill, Icon2CircleFill, Icon3CircleFill, Icon4CircleFill, Icon5CircleFill, ArrowClockwise } from 'react-bootstrap-icons';
import { AppContext } from './AppContext';
import { useContext } from 'react';


const ControlPanel = () => {
    const { colors, allColors, setColors, selectedColorName, selectedColor, setSelectedColor, setSelectedColorName, setWinner, setGrid, initializeGrid, size } = useContext(AppContext);

    const renderPlayers = () => {
        switch (colors.length) {
            case 2: return <Icon2CircleFill />;
            case 3: return <Icon3CircleFill />;
            case 4: return <Icon4CircleFill />;
            case 5: return <Icon5CircleFill />;
            case 6: return <Icon6CircleFill />;
        }
    };

    return <Row className="mb-3">
        <Col md={6}>
            <Row className="mb-1">
                <Col md={1}><PeopleFill size={24} values={colors.length} color='white' /></Col>
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
                        }}
                        placeholder="Number of players" />
                </Col>

                <Col md={1}>
                    {renderPlayers()}
                </Col>
            </Row>
        </Col>
        <Col md={4}>
            <DropdownButton
                id="dropdown-basic-button"
                title={`Selected Color: ${selectedColorName}`}
                className="w-100"
                style={{ color: { selectedColor } }}
                variant='secondary'
            >
                {colors.map((color) => (
                    <Dropdown.Item
                        key={color.val}
                        onClick={() => { setSelectedColor(color.val); setSelectedColorName(color.name); }}
                        style={{ backgroundColor: color.val, color: 'white', textAlign: 'center' }}
                    >
                        {color.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </Col>
        <Col md={2} className="text-end">
            <Button variant='light' onClick={() => {
                setWinner(null);
                setGrid(initializeGrid(size));
            }}>
                <ArrowClockwise />
            </Button>
        </Col>
    </Row>;
}

export default ControlPanel;