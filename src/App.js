import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import {withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import './App.css'
import { Button, Avatar, Drawer, Divider } from "@material-ui/core";
import NavBar from "./components/NavBar";
import SearchBar from './components/SearchBar';

const spotifyWebApi = new SpotifyWebApi();

const drawerWidth = '400px'
const styles = (theme) => ({
    root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth})`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
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
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
});


class App extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
        spotifyWebApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            user: {},
            userImage: '',
            nowPlaying: { name: 'Not Checked', albumArt: '' },
            currentSong: {},
            likedSongs: [],
            open: false
        }
        this.updateLikes = this.updateLikes.bind(this);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.playSong = this.playSong.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }

    componentDidMount() {

        //Get User 
        spotifyWebApi.getMe()
        .then((response) => {
            this.setState({
            user: response,
            userImage: response.images[0].url
            })
            console.log(response);
        })
        // this.getMe();
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
        }
        return hashParams;
    }

    getMe() {
        spotifyWebApi.getMe()
        .then((response) => {
            this.setState({
            user: response,
            userImage: response.images[0].url
            })
            console.log(response);
        })
    }

    getNowPlaying(){
        spotifyWebApi.getMyCurrentPlaybackState()
        .then((response) => {
            if (response) {
            this.setState({
                nowPlaying: { 
                    name: response.item.name, 
                    albumArt: response.item.album.images[0].url
                }
            });
            }
        })
    }

    openMenu(drawerStatus) {
        this.setState({open: drawerStatus})
    }


    /**
   * Handles adding selected song to likedSongs
   * @param {*} likedSong - song to add
   */
    updateLikes(likedSong) {
        let likedSongs = this.state.likedSongs;
        if (likedSongs.length === 3) {
            likedSongs.shift();
            likedSongs.push(likedSong)
        } else {
            likedSongs.push(likedSong);
        }
            this.setState({
            likedSongs: [...likedSongs]
        });
    }

    /**
     * Handles playing a selected song. If no song is selected, then Spotify will play the current song in queue
     * @param {*} song - song to play
     */
    playSong(song) {
        console.log(song || 'Resume');
        if (!song){
            spotifyWebApi.play()
        } else {
            let songs = {
                'uris': [`${song.uri}`]
            };
            spotifyWebApi.play(songs);
        }
    }

    updateCurrent(song) {
        console.log(song);
        this.setState({currentSong: song});
    }


    render() {
        const {userImage} = this.state;
        const {classes} = this.props;
        return (
            <div className="App">
                <NavBar user={this.state.user} openMenu={this.openMenu}/>
                <a href='http://localhost:8888/login'>Login to Spotify </a>
                <div>
                    User: {this.state.user.display_name}
                    <Avatar src={userImage}/>
                    Now Playing: { this.state.nowPlaying.name }
                </div>
                <SearchBar token={spotifyWebApi.getAccessToken()} updateLikes={this.updateLikes}/>
                <div>
                    <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt=''/>
                </div>
                {this.state.loggedIn &&
                    
                    <div>
                        <div className={classes.drawerHeader}/>
                        <main>
                            <button onClick={() => this.getNowPlaying()}>
                                Check Now Playing
                            </button>
                            <Button variant='contained' color='primary' onClick={() => this.getMe()}>Get me</Button>

                        </main>
                        <Drawer
                            className={classes.drawer}
                            variant="persistent"
                            anchor="right"
                            open={this.state.open}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <Divider />
                            
                        </Drawer>
                        
                    </div>
                }
            </div>
        );
    }
}
export default withStyles(styles)(App);