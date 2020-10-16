import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import {withStyles} from '@material-ui/core/styles/withStyles';

import './App.css'
import { Button, Avatar } from "@material-ui/core";
import NavBar from "./components/NavBar";

const spotifyApi = new SpotifyWebApi();
class App extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
        spotifyApi.setAccessToken(token);
        }
        this.state = {
        loggedIn: token ? true : false,
        user: {}, 
        nowPlaying: { name: 'Not Checked', albumArt: '' }
        }
    }

    componentWillMount() {
        this.getMe();
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
        spotifyApi.getMe()
        .then((response) => {
            this.setState({
            user: response
            })
            console.log(response);
        })
    }

    getNowPlaying(){
        spotifyApi.getMyCurrentPlaybackState()
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


    render() {
        const image = this.state.user.images[0].url || '';

        return (
            <div className="App">
                <NavBar user={this.state.user}/>
                <a href='http://localhost:8888'> Login to Spotify </a>
                <div>
                    User: {this.state.user.display_name}
                    <Avatar src={image}/>
                    Now Playing: { this.state.nowPlaying.name }
                </div>
                <div>
                    <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
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