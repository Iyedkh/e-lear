// PasswordOverlay.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const PasswordOverlay = ({ open, onClose, onSubmit }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(password);
        setPassword(''); // Clear password input
    };

    const dialogStyle = {
        minWidth: '300px',
        textAlign: 'center',
    };

    const buttonStyle = {
        margin: '8px',
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={dialogStyle}>Enter Password</DialogTitle>
            <DialogContent style={dialogStyle}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                />
            </DialogContent>
            <DialogActions style={dialogStyle}>
                <Button onClick={onClose} variant="contained" color="secondary" style={buttonStyle}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" style={buttonStyle}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordOverlay;
