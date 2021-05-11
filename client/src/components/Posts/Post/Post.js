import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography  } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import { useDispatch } from 'react-redux';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
    loadCurrentItem,
    addToCart,
} from "../../../actions/shopping-actions";


import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';


const Post = ({ post, setCurrentId}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.like.length > 0) {
            return post.like.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><FavoriteIcon fontSize="small" />&nbsp;{post.like.length > 2 ? `You and ${post.like.length - 1} others` : `${post.like.length} Favorite${post.like.length > 1 ? 's' : ''}` }</>
                ) : (
                    <><FavoriteBorderOutlinedIcon fontSize="small" />&nbsp;{post.like.length} {post.like.length === 1 ? 'Favorite' : 'Favorites'}</>
                );
        }

        return <><FavoriteBorderOutlinedIcon fontSize="small" />&nbsp;Favorite</>;
    };


    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.item}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            )}
            <CardActions className={classes.cardActions}>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.item}</Typography>
                <Button variant="outlined" style={{marginTop:"5px"}} size="small" onClick={() => dispatch(addToCart(post))}>Add To Cart</Button>
            </CardActions>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">Rs. {post.price}</Typography>
            </div>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component={"p"}>{post.description}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}
            </CardActions>
        </Card>

    );
}

export default Post;