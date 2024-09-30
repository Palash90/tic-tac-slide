import { Button, Row, Col, Form } from 'react-bootstrap';
import { PeopleFill, Icon6CircleFill, Icon2CircleFill, Icon3CircleFill, Icon4CircleFill, Icon5CircleFill, ArrowClockwise, PersonFill, PersonCircle, SkipForwardBtnFill, ArrowsMove } from 'react-bootstrap-icons';
import { AppContext } from './AppContext';
import { useContext } from 'react';
import PlayerAward from './PlayerAward';
import PlayerIcon from './PlayerIcon';
import PlayersControl from './PlayersControl';
import PlaceHolder from './PlaceHolder';

const ControlPanel = () => {
    const { colors, winners, moveActivated, setMoveActivated, selectedColor, setSelectedColor, getNextColor, clearWinners, setGrid, initializeGrid, size, cellClicked, setCellClicked, setTurnComplete, changePlayer, isGameOver } = useContext(AppContext);

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
            return <PlayerIcon active={active} color={color.val} winners={winners} />
        });
    }

    const NavigationControl = () => {
        return <Row className="align-items-center">
            <Col xs={2}>
                <Form.Check checked={moveActivated} onChange={() => {
                    setMoveActivated(!moveActivated);
                    resetGrid();
                }} />
            </Col>
            <Col xs={4}>
                <ArrowsMove size={30} />
            </Col>
        </Row>;
    }

    return <Row className="d-flex align-items-center">
        <Col md={3}>
            <PlayersControl resetGrid={resetGrid} />
        </Col>

        <Col md={1}>
            {NavigationControl()}
        </Col>

        <Col md={6}>
            <Row>{renderPlayerIcons()}</Row>
        </Col>

        <Col md={1}>
            {moveActivated && cellClicked && !isGameOver() ?
                <SkipForwardBtnFill size={45} color={getNextColor()} onClick={() => changePlayer()} /> :
                <PlaceHolder />}
        </Col>

        <Col md={1} className="text-end">
            <Button variant='light' onClick={() => resetGrid()}>
                <ArrowClockwise />
            </Button>
        </Col>
    </Row>;
}

export default ControlPanel;