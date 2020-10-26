import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js';
import TrackList from './TrackList';
// import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';

const spotifyWebApi = new Spotify();

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: '',
            searchResults: [],
            showResults: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.value.length > 0) {
            this.spotifySearch(e.target.value);
        }
        this.setState({searchParams: e.target.value});
    }

    spotifySearch(str) {
        spotifyWebApi.searchTracks(str, {limit: 5})
          .then((data) => {
            let results = [];
            data.tracks.items.forEach(item => {
                results.push(item);
            });
            this.setState({searchResults: results});
          }, (err) => {
            console.log(err);
          })
    }

    render() {
        return (
            <div >
                <TextField 
                    id="standard-search" 
                    label="Search for songs on Spotify" 
                    type="search" onChange={this.handleChange} 
                    value={this.state.searchParams}
                    fullWidth
                />
                {this.state.searchParams.length > 0 && 
                    <TrackList 
                        results={this.state.searchResults} 
                        updateLikes={this.props.updateLikes}
                     />}
            </div>
        )
    }
}
