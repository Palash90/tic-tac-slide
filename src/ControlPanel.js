import { Button, Row, Col, Form } from 'react-bootstrap';
import { PeopleFill, Icon6CircleFill, Icon2CircleFill, Icon3CircleFill, Icon4CircleFill, Icon5CircleFill, ArrowClockwise, PersonFill, PersonCircle, SkipForwardBtnFill, ArrowsMove } from 'react-bootstrap-icons';
import { AppContext } from './AppContext';
import { useContext } from 'react';
import PlayerAward from './PlayerAward';


const ControlPanel = () => {
    const { colors, allColors, setColors, winners, moveActivated, setMoveActivated, selectedColor, setSelectedColor, getNextColor, clearWinners, setGrid, initializeGrid, size, cellClicked, setCellClicked, setTurnComplete, changePlayer, isGameOver } = useContext(AppContext);

    const renderPlayers = () => {
        switch (colors.length) {
            case 2: return <Icon2CircleFill />;
            case 3: return <Icon3CircleFill />;
            case 4: return <Icon4CircleFill />;
            case 5: return <Icon5CircleFill />;
            case 6: return <Icon6CircleFill />;
            default: return <></>;
        }
    };

    const resetGrid = () => {
        setSelectedColor(colors[0].val);
        setCellClicked(false);
        clearWinners();
        setGrid(initializeGrid(size));
        setTurnComplete(true);
    }

    const renderPlayerIcons = () => {
        return colors.map((color) => {
            const active = color.val === selectedColor

            if (active) {
                return <Col key={color.name}>
                    <Row>
                        <Col></Col>
                        <Col>
                            <PlayerAward winners={winners} player={color.val} size={15} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PersonCircle
                                key={color.val}
                                color={color.val}
                                size={45}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                </Col>
            } else {
                return <Col key={color.name}>
                    <Row>
                        <Col></Col>
                        <Col>
                            <PlayerAward winners={winners} player={color.val} size={15} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PersonFill
                                key={color.val}
                                color={color.val}
                                size={30}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                </Col>
            }
        });
    }

    return <Row className="mb-9">
        <Col md={1}><PeopleFill size={30} values={colors.length} color='white' /></Col>
        <Col md={2}>
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
        <Col md={2}>
            <Form.Check checked={moveActivated} onChange={() => {
                setMoveActivated(!moveActivated);
                resetGrid();
            }
            } />
            <ArrowsMove size={30} />
        </Col>
        <Col md={2}>
            <Row>{renderPlayerIcons()}</Row>
        </Col>
        <Col md={2}>
            {moveActivated && cellClicked && !isGameOver() ? <SkipForwardBtnFill size={60} color={getNextColor()} onClick={() => changePlayer()} /> : <></>}
        </Col>
        <Col md={1} className="text-end">
            <Button variant='light' onClick={() => resetGrid()}>
                <ArrowClockwise />
            </Button>
        </Col>
    </Row>;
}

export default ControlPanel;