import { Alert } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { useContext } from 'react';

export default function Winner() {
    const { winners, allColors } = useContext(AppContext);
    return winners.map((winner) => {
        return <Alert variant="success" className="text-center">
            {`${allColors.find(t => t.val === winner).name} is the winner!`}
        </Alert>
    });

}