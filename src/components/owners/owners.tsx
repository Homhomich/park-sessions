import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Owner} from "../../models/owner";
import axios from "axios";
import PersonIcon from '@material-ui/icons/Person';
import {Avatar, ListItemAvatar} from "@material-ui/core";

interface Props {
    closeDialog: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function OwnersList(props: Props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [owners, setOwners] = React.useState<Owner[]>([]);

    const handleClose = () => {
        setOpen(false);
        props.closeDialog();
    };

    useEffect(() => {
        const list: Owner[] = [
            {
                id: 1,
                name: 'Lili Stale'
            },
            {
                id: 1,
                name: 'Steeve Gross'
            },
            {
                id: 1,
                name: 'Cory Lastern'
            },
            {
                id: 1,
                name: 'Cris Hamsvord'
            },
            {
                id: 1,
                name: 'Poll Vildand'
            }
        ]
        axios.get<Owner[]>('http://localhost:8080/parking/owners/top')
            .then(response => setOwners(response.data));

    }, []);

    return (
        <div className="main">
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Top Owners</DialogTitle>
                <DialogContent>
                    <List className={classes.root}>
                        {owners.map(owner =>
                            <ListItem key={owner.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={owner.name}/>
                            </ListItem>)
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}