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
        // axios.get('/api/hello')
        //     .then(res => {
        //         console.log(res)
        //         const text = res.data;
        //         this.setState({text})
        //     })
        console.log(this.props)
        const data = {
            // uid: parseInt(this.props.user.id),
            // display_name: this.props.user.display_name,
            // email: this.props.user.email,
            uid: 123,
            display_name: 'test',
            email: 'test@gmail.com',
        }

        axios.post('/api/post/newUser', data)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        )
    }
}
