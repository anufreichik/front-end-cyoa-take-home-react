import React, {useState, useEffect} from 'react';
import {Api} from "../../api";
import {useParams} from "react-router-dom";
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';

const CommentDetails = () => {
    let params = useParams();
    const [commentDetails, setCommentDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const getCommentById = async () => {
        setLoading(true)
        const res = await Api.post('/getComment', {id: params?.id});
        setLoading(false)
        if (res) setCommentDetails(res);
    }
    useEffect(() => {
        getCommentById();
    }, []);


    return (
        <Box display='flex' margin={1} justifyContent='center'>
            {loading ? <CircularProgress/> :
                (
                    <Card sx={{maxWidth: 700, minWidth: 500}}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor:'#abcbfc'}}>{commentDetails ? commentDetails?.name[0]?.toUpperCase() : 'N/A'}</Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={commentDetails?.name}
                            subheader={commentDetails?.created}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {commentDetails?.message}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon/>
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                )

            }

        </Box>
    );
};

export default CommentDetails;
