import React, { Component } from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.getUser = this.getUser.bind(this);
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user) {
            console.log(this.props.user)
            console.log(nextProps.user)
            const data = {
                // uid: parseInt(this.props.user.id),
                // display_name: this.props.user.display_name,
                // email: this.props.user.email,
                uid: parseInt(nextProps.user.id),
                display_name: nextProps.user.display_name,
                email: nextProps.user.email,
            }

            console.log(data)
    
            await axios.post('/api/post/newUser', data)
                .then(response => console.log(response))
                .catch(err => console.log(err))

        }
        
    }

    getUser() {
        axios.get('/api/get/allUsers')
            .then(res => {
                console.log(res)
                const users = res.data;
                this.setState({users})
            })

    }

    render() {
        console.log(this.props)
        const {users} = this.state;
        return (
            <div>
                <Button onClick={this.getUser}>Hello</Button>
                {users.map(user => {
                    return <p>{user.display_name}</p>
                })}
            </div>
        )
    }
}
