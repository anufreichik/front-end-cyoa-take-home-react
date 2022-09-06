import React, {useState} from 'react';
import Comment from "../comment/Comment";
import './comments.css'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CommentsList = ({comments}) => {
    return (
        <div className='container-comments-list'>
            {comments?.length > 0 && (
                <>
                    {comments.map(el => <Comment key={el.id} comment={el}/>)}
                </>
            )}
            {comments?.length === 0 && (

                <Box display='flex' margin={1} justifyContent='center'>
                    <Typography variant="h5" component="div">
                        No Comments to Display!
                    </Typography>
                </Box>


            )}

        </div>
    );
};

export default CommentsList;
