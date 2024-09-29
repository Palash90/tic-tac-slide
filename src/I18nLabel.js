import { FormLabel } from "react-bootstrap";
import allMessages from "./messages";

export default function I18nLabel({msg}) {
    return <FormLabel>{allMessages[msg]}</FormLabel>
}