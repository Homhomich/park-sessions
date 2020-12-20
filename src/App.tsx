import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ParkingSessionCard from "./components/park-session/parking-session";
import {ParkingSessionModel} from "./models/parking-session-model";
import AllParkingSessions from "./components/all-parking-sessions/all-parking-sessions";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function App() {
    const classes = useStyles();

    const parkSession: ParkingSessionModel = {
        sessionId: 1,
        entryTime: 12.00,
        car: {id: 1, govNum: '3R6SGG5', hasFreeAccess: true, makeAndModel: "Pasha's production"},
        parkingArea: {id: 123, name: 'A1', amountOfPlaces: 35},
    }

    return (
        <div>
            <AllParkingSessions/>
        </div>
    );
}
