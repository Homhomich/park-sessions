import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import './styles.css';
import axios from 'axios'
import {ParkingSessionModel} from "../../models/parking-session-model";

interface Props {
    handleSelectResult: (parkingSessions: ParkingSessionModel[]) => void;
}

export default function SelectParkingArea(props: Props) {
    const [parkingArea, setParkingArea] = React.useState(0);

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setParkingArea(() =>
            Number(event.target.value)
        );
        axios.get('http://localhost:8080/parking/all/areas/' + event.target.value)
            .then(response => props.handleSelectResult(response.data))
            .catch( error => alert('Таких зон нет!'))
    };

    return (
        <div className="main">
            <FormControl className="select">
                <InputLabel htmlFor="age-native-simple">Parking Area</InputLabel>
                <Select
                    value={parkingArea}
                    onChange={handleSelectChange}
                    variant={'outlined'}
                >
                    <MenuItem value={0}>Не выбрано</MenuItem>
                    <MenuItem value={1}>A1</MenuItem>
                    <MenuItem value={2}>A2</MenuItem>
                    <MenuItem value={3}>B1</MenuItem>
                    <MenuItem value={4}>B2</MenuItem>
                    <MenuItem value={5}>C1</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
