import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import {withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import './App.css'
import { Button, Avatar, Drawer, Divider } from "@material-ui/core";
import NavBar from "./components/NavBar";
import SearchBar from './components/SearchBar';
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

const spotifyWebApi = new SpotifyWebApi();



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
            playbackState: {},
            likedSongs: [],
            open: false
        }
        this.updateLikes = this.updateLikes.bind(this);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.playSong = this.playSong.bind(this);
        this.pauseSong = this.pauseSong.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.getMyCurrentPlaybackState = this.getMyCurrentPlaybackState.bind(this)
    }

    componentDidMount() {
        this.getMe();
        this.getMyCurrentPlaybackState();
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
            console.log(this.state.user);
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

    getMyCurrentPlaybackState() {
        console.log('hi')
        spotifyWebApi.getMyCurrentPlaybackState()
            .then(response => {
                console.log(response);
                this.setState({playbackState: response})
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
            // console.log('play')
            spotifyWebApi.play()
        } else {
            console.log(this.state.playbackState.progress_ms)
            let songs = {
                'uris': [`${song.uri}`],
                'position_ms': this.state.playbackState.progress_ms
            };
            spotifyWebApi.play(songs);
        }
    }

    pauseSong() {
        //updates playback state for position in song
        this.getMyCurrentPlaybackState();
        spotifyWebApi.pause();
    }

    updateCurrent(song) {
        console.log(song);
        this.setState({currentSong: song});
    }


    render() {
        const {userImage} = this.state;
        // const {classes} = this.props;
        return (
            <div className="App">
                <NavBar user={this.state.user} openMenu={this.openMenu}/>
                
                {/* <SearchBar token={spotifyWebApi.getAccessToken()} updateLikes={this.updateLikes}/> */}

                {/* <Button onClick={this.playSong}> play</Button>                 */}
                {this.state.loggedIn &&
                <div>
                    {/* <Home loggedIn={this.state.loggedIn} user={this.state.user} getMyCurrentPlaybackState={this.getMyCurrentPlaybackState}/> */}
                    <Dashboard 
                        open={this.state.open} 
                        user={this.state.user} 
                        playbackState={this.state.playbackState}
                        playSong={this.playSong} 
                        pauseSong={this.pauseSong}
                    />
                </div>
                    
                }
            </div>
        );
    }
}
export default App;