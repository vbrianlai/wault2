import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import {withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import './App.css'
import { Button, Avatar, Drawer, Divider } from "@material-ui/core";
import NavBar from "./components/NavBar";
import SearchBar from './components/SearchBar';
import Room from "./components/Room";
import Home from "./Home";

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
            currentSong: {},
            likedSongs: [],
            open: false
        }
        this.updateLikes = this.updateLikes.bind(this);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.playSong = this.playSong.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }

    async componentWillMount() {

        //Get User 
        // spotifyWebApi.getMe()
        // .then((response) => {
        //     this.setState({
        //     user: response,
        //     userImage: response.images[0].url
        //     })
        //     console.log(response);
        // })
        this.getMe()
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
        // const {classes} = this.props;
        return (
            <div className="App">
                <NavBar user={this.state.user} openMenu={this.openMenu}/>
                
                <SearchBar token={spotifyWebApi.getAccessToken()} updateLikes={this.updateLikes}/>
                <div>
                    <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt=''/>
                </div>
                
                {this.state.loggedIn &&
                <div>
                    <Home loggedIn={this.state.loggedIn} user={this.state.user}/>
                    <Room open={this.state.open} user={this.state.user}/>
                </div>
                    
                }
            </div>
        );
    }
}
export default App;