import React from 'react';
import { TextField, Button } from '@mui/material';

const EditOverlay = ({ editedTitle, editedRating, editedDescription, handleTitleChange, handleRatingChange, handleDescriptionChange, handleImageChange, handleUpdateCourse }) => {
    return (
        <div className="overlay">
            <div className="edit-fields-container">
                <TextField
                    className="edit-field"
                    label="Title"
                    value={editedTitle}
                    onChange={handleTitleChange}
                />
                <TextField
                    className="edit-field"
                    label="Rating"
                    value={editedRating}
                    onChange={handleRatingChange}
                />
                <TextField
                    className="edit-field"
                    label="Description"
                    value={editedDescription}
                    onChange={handleDescriptionChange}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="edit-field"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateCourse}
                >
                    Update
                </Button>
            </div>
        </div>
    );
};

export default EditOverlay;
