import React, { useState, useEffect  } from "react";
import { TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts.js';


const Form = ( {currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({item: '',description:'',price:'',selectedFile:''});
    const classes = useStyles();
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({ item: '', description: '', price: '', selectedFile: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentId) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }



    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing ${post.item} Item` : 'Add Items'}</Typography>
                <TextField name={"item"} variant={"outlined"} label={"Item Name"} fullWidth value={postData.item} onChange={(e) => setPostData({ ...postData, item: e.target.value})}/>
                <TextField name={"description"} variant={"outlined"} label={"Description"} fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value})}/>
                <TextField name={"price"} variant={"outlined"} label={"Price"} fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value})}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" type="submit" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;