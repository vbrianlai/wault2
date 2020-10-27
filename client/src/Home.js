import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    componentDidMount() {
        axios.get('/api/hello')
            .then(res => {
                console.log(res)
                const text = res.data;
                this.setState({text})
            })
    }

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        )
    }
}
