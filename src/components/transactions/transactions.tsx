import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './styles.css';
import {Operator} from "../../models/operator";
import axios from "axios";

interface Props {
    closeDialog: () => void;
}

export default function Transactions(props: Props) {
    const [open, setOpen] = React.useState(true);
    const [sessionId, setSessionId] = React.useState(1);
    const [amountOfMoney, setAmountOfMoney] = React.useState('');
    const [operator, setOperator] = React.useState<Operator>();

    const handleClose = () => {
        setOpen(false);
        props.closeDialog();
    };

    const handleSessionIdChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setSessionId(
            Number(event.target.value)
        );
    };

    const handleAmountOfMoneyChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setAmountOfMoney(
            String(event.target.value)
        )
    }

    const handleOperatorInfoChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        switch (event.target.name) {
            case ('operatorId'):
                setOperator({
                    operatorId: Number(event.target.name),
                    operatorDetail: operator?.operatorDetail,
                    name: operator?.name,
                });
                break;
            case ('operatorName'):
                setOperator({
                    operatorId: operator?.operatorId,
                    operatorDetail: operator?.operatorDetail,
                    name: String(event.target.value),
                });
                break;
            case ('operatorDetail'):
                setOperator({
                    operatorId: operator?.operatorId,
                    operatorDetail: String(event.target.value),
                    name: operator?.name,
                });
                break;
        }

    }

    const handleFormSubmit = () => {
         const requestBody = {parkingSessionId: sessionId, operator: operator, amount: amountOfMoney}
         axios.post('http://localhost:8080/transaction/pay', requestBody)
             .then(() => alert('Оплата прошла успешно!'))
             .catch(error => alert('Error!'))
         setOpen(false);
    }

    return (
        <div className="main">
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Pay for the session</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="money"
                        label="Pay amount"
                        fullWidth
                        required
                        onChange={handleAmountOfMoneyChange}
                    />
                    <TextField
                        margin="dense"
                        id="sessionId"
                        label="Session ID"
                        fullWidth
                        required
                        onChange={handleSessionIdChange}
                    />
                    <TextField
                        margin="dense"
                        id="operatorId"
                        label="Operator Id"
                        fullWidth
                        required
                        onChange={handleOperatorInfoChange}
                    />
                    <TextField
                        margin="dense"
                        id="operatorName"
                        label="Operator name"
                        fullWidth
                        required
                        onChange={handleOperatorInfoChange}
                    />
                    <TextField
                        margin="dense"
                        id="operatorDetail"
                        label="Operator detail"
                        fullWidth
                        required
                        onChange={handleOperatorInfoChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFormSubmit} color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
