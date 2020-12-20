import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import './styles.css';
import axios from 'axios'
import {ParkingSessionModel} from "../../models/parking-session-model";

interface Props {
    addNewParkingSession: (parkingSession: ParkingSessionModel) => void;
    closeDialog: () => void;
}

export default function ParkSessionCreateDialog(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [parkingArea, setParkingArea] = React.useState(1);
    const [carNumber, setCarNumber] = React.useState('');


    useEffect(() => {
        setOpen(true);
    }, []);


    const handleClose = () => {
        props.closeDialog();
        setOpen(false);
    };

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setParkingArea(
            Number(event.target.value)
        );
    };

    const handleValueChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setCarNumber(
            String(event.target.value)
        )
    }

    const handleFormSubmit = () => {
        const requestBody = {govNum: carNumber, parkingAreaId: parkingArea}
        axios.post('http://localhost:8080/parking/enter', requestBody)
            .then(response => props.addNewParkingSession(response.data))
        setOpen(false);
    }

    return (
        <div className="main">
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Make a new parking session</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="govNumber"
                        label="Car's number"
                        fullWidth
                        required
                        onChange={handleValueChange}
                    />
                    <FormControl className="select">
                        <InputLabel htmlFor="age-native-simple">Parking Area</InputLabel>
                        <Select
                            value={parkingArea}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={1}>A1</MenuItem>
                            <MenuItem value={2}>A2</MenuItem>
                            <MenuItem value={3}>B1</MenuItem>
                            <MenuItem value={4}>B2</MenuItem>
                            <MenuItem value={5}>C1</MenuItem>
                        </Select>
                    </FormControl>
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
