import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './styles.css';
import axios from "axios";

interface Props {
    closeDialog: () => void;
}

export default function Transactions(props: Props) {
    const [open, setOpen] = React.useState(true);
    const [sessionId, setSessionId] = React.useState(1);
    const [amountOfMoney, setAmountOfMoney] = React.useState('');

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


    const handleFormSubmit = () => {
        const requestBody = {
            parkingSessionId: sessionId,
            operator: {operatorId: 1, name: 'react_app', operatorDetail: 'main client'},
            amount: amountOfMoney
        }
        axios.post('http://localhost:8080/transaction/pay', requestBody)
            .then(() => alert('Оплата прошла успешно!'))
            .catch(error => alert('Error!'))
        setOpen(false);
        props.closeDialog();
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
