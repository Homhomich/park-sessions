import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css';
import axios from 'axios';
import {ParkingSessionModel} from "../../models/parking-session-model";

interface Props {
    parkingSession: ParkingSessionModel,
}

export default function ParkingSessionCard(props: Props) {
    const {parkingSession} = props;

    const handleSessionClose = () => {
        axios.put('http://localhost:8080/parking/leave', {parkingSessionId: parkingSession.sessionId})
            .then(response => console.log(response))
            .catch(error => alert('Вы не оплатили парковку!'));
    }

    return (
        <Card className="root">
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Parking session № {parkingSession.sessionId}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Car: {parkingSession.car.govNum}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Time of entry: {parkingSession.entryTime}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Parking area: {parkingSession.parkingArea.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleSessionClose}>
                    Close session
                </Button>
            </CardActions>
        </Card>
    );


}
