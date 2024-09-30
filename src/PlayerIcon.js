import { PersonCircle, PersonFill } from "react-bootstrap-icons"
import PlayerAward from "./PlayerAward"
import { Col } from "react-bootstrap"

export default function PlayerIcon({ winners, color, active }) {
    if (active) {
        return <Col key={color} className="d-flex align-items-center">
            <PersonCircle
                key={color}
                color={color}
                size={45}
            />
            <sup>
                <PlayerAward winners={winners} player={color} size={15} />
            </sup>
        </Col>
    } else {
        return <Col key={color} className="d-flex align-items-center">
            <PersonFill
                key={color}
                color={color}
                size={45}
            />
            <sup>
                <PlayerAward winners={winners} player={color} size={15} />
            </sup>
        </Col>
    }

}
