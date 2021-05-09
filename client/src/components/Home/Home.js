import React, {useEffect, useState} from "react";
import Grow from "@material-ui/core/Grow";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "../../styles";
import {useDispatch} from "react-redux";
import {getPosts} from "../../actions/posts";

const Home = () => {

    const [currentId , setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();


    return(
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form />

                    </Grid>

                </Grid>
            </Container>

        </Grow>
    )
}

export default Home;