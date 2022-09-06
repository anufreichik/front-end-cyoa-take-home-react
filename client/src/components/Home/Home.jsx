import React, {useEffect, useState} from 'react';
import {io} from "socket.io-client";
import CommentForm from "../commentForm/CommentForm";
import CommentsList from "../comments/CommentsList";
import './home.css';
import {Api} from "../../api";
import {
    Alert,
    Badge,
    Box, Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton, Snackbar, Tooltip
} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
    const [comments, setComments] = useState([]);
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [openNewCommentAlert, setOpenNewCommentAlert] = useState(false);
    const [loading,setLoading]=useState(true);

    //get all comments
    const fetchComments = async () => {
        setLoading(true);
        const res = await Api.get('/getComments');
        if (res) {
            res.sort((a, b) => b.id - a.id);//latest on top
            setComments(res);
        }
        setLoading(false);

    }

    const getCommentById = async (id) => {
        const res = await Api.post('/getComment', {id: id});
        return res;

    }

    //create comment
    const createComment = async (commentObj) => {
        const res = await Api.post('/createComment', commentObj);
        if (res?.id) {
            //this will send signal for server create emit event notification
            socket.emit("sendNotificationOnCreateComment", res);
            fetchComments();
            setNotifications([]);//since we are fetching comments we are fetching all comments(including others created)
        }
    }
    //delete all comments
    const deleteComments = async () => {
        const res = await Api.delete('/deleteComments');
        if (res) {
            fetchComments();
            setNotifications([]);
        }

    }

    const handleSubmitDelete = () => {
        deleteComments();
        setOpen(false);
    }
    const handleDeleteDialogClose = () => {
        setOpen(false);
    }

    const handleNewCommentAlertClose = () => {
        setOpenNewCommentAlert(false);
    }

    const handleNotificationsBadgeClick = async (e) => {
        e.preventDefault();
        if (notifications.length) {
            const newComments = [];
            for (let el of notifications) {
                let newCommentEntry = await getCommentById(el);
                newComments.push(newCommentEntry);
            }
            setComments([...newComments, ...comments]);
            setNotifications([]);
        }
    }

    useEffect(() => {
        let serverSocket = io("http://localhost:3001");
        setSocket(serverSocket);
        fetchComments();
        setNotifications([]);
    }, []);


    useEffect(() => {
        if (socket) {
            //listen to getNotification event from server and do action on trigger
            socket.on("getNotification", (data) => {
                setNotifications(prev => [...prev, data?.id]);
                setOpenNewCommentAlert(true);
            });
        }

    }, [socket]);


    return (
        <div className='container-home'>
            <Box display='flex' margin={1} justifyContent='flex-end' gap={2}>

                {/*delete comments button and dialog*/}
                {comments.length > 0 &&
                    (<Tooltip title="Delete All Comments">
                        <IconButton aria-label="delete all comments"
                                    color='primary'
                                    sx={{padding: 0}}
                                    onClick={() => setOpen(true)}
                        >
                            <DeleteOutlineIcon/>
                        </IconButton>
                    </Tooltip>)}
                <Dialog
                    open={open}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you really want to delete all comments?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Comments will be deleted completely and you won't be able to recover them.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose} autoFocus>Cancel</Button>
                        <Button onClick={handleSubmitDelete}>OK</Button>
                    </DialogActions>
                </Dialog>
                {/*end of delete comments button and dialog*/}

                {/*new comments badge button*/}
                <Tooltip title="Load New Comments">
                    <Badge color="secondary" badgeContent={notifications.length} showZero>
                        <IconButton aria-label="load new comments" onClick={handleNotificationsBadgeClick}
                                    color='primary'
                                    sx={{padding: 0}}
                        >
                            <ChatBubbleOutlineIcon color='primary'/>
                        </IconButton>
                    </Badge>
                </Tooltip>
            </Box>
            {loading ?  <Box display='flex' justifyContent='center' ><CircularProgress/></Box> :
                <Grid container spacing={2}>
                    <Grid item xs={12} md={comments.length > 0 ? 3 : 12}>
                        <CommentForm addComment={createComment}/>
                    </Grid>
                    <Grid item xs={12} md={comments.length > 0 ? 9 : 12}>
                        <CommentsList comments={comments}/>
                    </Grid>
                </Grid>
            }
            <Snackbar open={openNewCommentAlert} autoHideDuration={5000} onClose={handleNewCommentAlertClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleNewCommentAlertClose} severity="success" sx={{width: '100%'}}>
                    New Comment Posted!
                </Alert>
            </Snackbar>

        </div>
    );
};

export default Home;
