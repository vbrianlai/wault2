import React, { Component } from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';
import PlaybackCard from './PlaybackCard';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user) {


            //Logs in user based on spotify account
            const data = {
                uid: parseInt(nextProps.user.id),
                display_name: nextProps.user.display_name,
                email: nextProps.user.email,
            }

            await axios.post('/api/post/newUser', data)
                .then(response => console.log(response))
                .catch(err => console.log(err))
        }
    }


    render() {
        // console.log(this.props.playbackState)
        return (
            <div>
                <PlaybackCard 
                    playbackState={this.props.playbackState}
                    playSong={this.props.playSong} 
                    pauseSong={this.props.pauseSong}
                />
            </div>
        )
    }
}
