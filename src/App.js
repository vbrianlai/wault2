import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import {withStyles} from '@material-ui/core/styles/withStyles';

import './App.css'
import { Button, Avatar } from "@material-ui/core";
import NavBar from "./components/NavBar";
import SearchBar from './components/SearchBar';

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
        }
        this.updateLikes = this.updateLikes.bind(this);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.playSong = this.playSong.bind(this);
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
        return (
            <div className="App">
                <NavBar user={this.state.user}/>
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
                        <button onClick={() => this.getNowPlaying()}>
                            Check Now Playing
                        </button>
                        <Button variant='contained' color='primary' onClick={() => this.getMe()}>Get me</Button>
                    </div>
                }
            </div>
        );
    }
}
export default App;