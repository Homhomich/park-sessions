import React, {useEffect, useState} from 'react';
import {ParkingSessionModel} from "../../models/parking-session-model";
import ParkingSessionCard from "../park-session/parking-session";
import './styles.css';
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ParkSessionCreateDialog from "../parking-session-create-form/parking-session-create-form";
import Transactions from "../transactions/transactions";
import Search from "../search/search";
import SelectParkingArea from "../select-parking-area/select-parking-area";
import axios from "axios";

export default function AllParkingSessions() {
    const [parkingSessions, setParkingSessions] = useState<ParkingSessionModel[]>([]);
    const [chosenMenuItem, setChosenMenuItem] = React.useState('activeSessions');
    const [addDialog, setAddDialog] = React.useState(false);
    const [payDialog, setPayDialog] = React.useState(false);


    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setChosenMenuItem(newValue);
        switch (newValue) {
            case ('activeSessions'):
                break;
            case ('addSession'):
                setAddDialog(true);
                break;
            case ('pay'):
                setPayDialog(true);
        }
    };

    const handleSearchResult = (parkingSessions: ParkingSessionModel[]) => {
        setParkingSessions(parkingSessions);
    }

    const handleSelectResult = (parkingSessions: ParkingSessionModel[]) => {
        setParkingSessions(parkingSessions);
    }

    const addNewParkingSession = (parkingSession: ParkingSessionModel) => {
        setParkingSessions(Object.assign([], [...parkingSessions], parkingSession));
    }

    const closeDialog = () => {
        setChosenMenuItem('activeSessions');
        setAddDialog(false);
        setPayDialog(false);
    }

    useEffect(() => {
        axios.get<ParkingSessionModel[]>('http://localhost:8080/parking/active')
            .then(response => setParkingSessions(response.data));
    }, []);

    return (
        <div className="all-cards">
            <BottomNavigation value={chosenMenuItem} onChange={handleChange} className="menu">
                <BottomNavigationAction label="Active sessions" value="activeSessions" icon={<DriveEtaIcon/>}/>
                <BottomNavigationAction label="Add session" value="addSession" icon={<AddCircleOutlineOutlinedIcon/>}/>
                <BottomNavigationAction label="Pay" value="pay" icon={<AccountBalanceWalletOutlinedIcon/>}/>
            </BottomNavigation>
            <div className="tools">
                <Search handleSearchResult={handleSearchResult}/>
                <SelectParkingArea handleSelectResult={handleSelectResult}/>
            </div>
            <div className="parkingSessions">
                {parkingSessions.map(session =>
                    <div>
                        <ParkingSessionCard key={session.sessionId} parkingSession={session}/>
                    </div>
                )}
            </div>
            {addDialog ?
                <ParkSessionCreateDialog closeDialog={closeDialog} addNewParkingSession={addNewParkingSession}/> :
                <br/>}
            {payDialog ? <Transactions closeDialog={closeDialog}/> : <br/>}

        </div>
    );
}
