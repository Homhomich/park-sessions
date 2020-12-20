import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
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
        axios.get('http://localhost:8080/all/' + carNumber)
            .then(response => props.handleSearchResult(response.data));
    }

    return (
        <Paper component="form" className="root">
            <InputBase
                className="input"
                placeholder="Search car by number"
                inputProps={{ 'aria-label': 'search car by number' }}
                onChange={handleSearchClick}
            />
            <IconButton onClick={handleSubmit} type="submit" className="iconButton" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
