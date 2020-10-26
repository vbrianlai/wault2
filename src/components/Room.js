import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import {withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
// import './App.css'
import { Button, Avatar, Drawer, Divider } from "@material-ui/core";

const drawerWidth = '400px'
const styles = (theme) => ({
      title: {
        flexGrow: 1,
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'gray'
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        display: 'flex',
        justifyContent: 'flex-end'
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
});

class Room extends Component {
    render() {
        const {classes, open} = this.props;
        return (
            <div>
                <div className={classes.drawerHeader}/>
                    <main className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}>
                        <div>
                            <Button variant='contained' color='secondary' onClick={() => this.getNowPlaying()}>Check Now Playing</Button>
                            <Button variant='contained' color='primary' onClick={() => this.getMe()}>Get me</Button>
                        </div>
                    </main>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="right"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >

                        <Divider />
                    </Drawer>
                        
            </div>
        )
    }
}

export default withStyles(styles)(Room);