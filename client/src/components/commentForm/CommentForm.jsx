import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";


const CommentForm = ({addComment}) => {

    const initState={
        name:'',
        message:''
    }
    const [commentData, setCommentData] = useState(initState);
    const [nameError, setNameError] = useState(false);
    const [messageError, setMessageError] = useState(false);


    const handleCreateCommentClick = (e) => {
        e.preventDefault();
        setNameError(false)
        setMessageError(false)
        if (commentData.name === '') {
            setNameError(true)
        }
        if (commentData.message === '') {
            setMessageError(true)
        }
        if(commentData.name && commentData.message){
            addComment(commentData);
            setCommentData(initState);
        }

    }
    const handleChange = (e) => {
        setCommentData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <Box component='form' display='flex' flexDirection='column' padding='10px'
             gap={1}
             marginBottom={1}
             noValidate
             autoComplete="off">
            <Typography variant='h6' color='textSecondary' component="h2">
                Create New Comment
            </Typography>
            <TextField name='name'
                       id='name'
                       label="Your Name"
                       variant="outlined"
                       size='small'
                       value={commentData?.name}
                       onChange={handleChange}
                       required
                       error={nameError}
            />
            <TextField
                id="message"
                name='message'
                label="Message"
                multiline
                rows={10}
                value={commentData?.message}
                onChange={handleChange}
                required
                error={messageError}
            />
            <Button onClick={handleCreateCommentClick} variant="contained" sx={{maxWidth:'100px'}}>
                Submit
            </Button>
        </Box>

    );
};

export default CommentForm;
