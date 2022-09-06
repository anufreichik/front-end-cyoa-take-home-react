import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Comment = ({comment}) => {
    let navigate = useNavigate();
    const handleRedirect=()=>{
        navigate(`/comment/${comment.id}`);
    }
    return (
        <Card sx={{ minWidth: '500px', margin:2 }}>
            <CardContent>
                <Typography variant="body2" sx={{marginBottom:1}}>
                    {comment.message}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {`${comment.name} on ${comment.created}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleRedirect}>Details</Button>
            </CardActions>
        </Card>
    );
};

export default Comment;
