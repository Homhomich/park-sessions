import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import {ParkingSessionModel} from "../../models/parking-session-model";

interface Props{
    handleSearchResult: (parkingSessions: ParkingSessionModel[]) => void;
}

export default function CustomizedInputBase(props: Props) {
    const [carNumber, setCarNumber] = React.useState('');

    const handleSearchClick = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setCarNumber(
            String(event.target.value)
        )
    }

    const handleSubmit = () => {
        console.log('HIIII');
        axios.get('http://localhost:8080/parking/all/search/' + carNumber)
            .then(response => {
                props.handleSearchResult(response.data);
                console.log(response);
            })
            .catch(error => console.log(error));
    }

    return (
        <Paper component="form" className="root">
            <InputBase
                className="input"
                placeholder="Search car by number"
                inputProps={{ 'aria-label': 'search car by number' }}
                onChange={handleSearchClick}
            />
            <IconButton onClick={handleSubmit} className="iconButton" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
