import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { AppContext } from "./AppContext";
import I18nLabel from "./I18nLabel";
import Markdown from "react-markdown";
import rules from "./game_rules.js";

export default function (props) {
    const { showRules, handleCloseRule } = useContext(AppContext);

    return <Modal size="lg" style={{ color: "black" }} show={showRules} onHide={handleCloseRule} backdrop="static" keyboard={false}>
        <Modal.Header closeButton />
        <Modal.Body><Markdown>{rules()}</Markdown></Modal.Body>
        <Modal.Footer><I18nLabel msg="REOPEN_RULES_INSTRUCTION" /></Modal.Footer>
    </Modal>
}