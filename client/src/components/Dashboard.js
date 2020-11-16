import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { green, purple, blue } from '@material-ui/core/colors';
import clsx from 'clsx';
import { Button, Avatar, Drawer, Divider } from "@material-ui/core";
import axios from "axios";
import Home from './Home'
import background from '../media/Endless-Constellation.svg';

const drawerWidth = '400px'
const styles = (theme) => ({
	root: {
		backgroundImage: `url(${background})`,
		height: '100vh'
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
        backgroundColor: 'white'
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
        display: 'flex',
        justifyContent: 'flex-start'
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
});

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state={
			roomNameInput: '',
			rooms: []
		}
		this.createRoom = this.createRoom.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.handleChange = this.handleChange.bind(this);
		// this.playSong = this.playSong.bind(this);
	}

	async componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user) {
			await axios.get('/api/get/myRooms', {params: {rownerid: parseInt(nextProps.user.id)}})
				.then(res => {
					this.setState({rooms: res.data})
				})
				.catch(err => console.log(err))
        }
    }

	componentDidMount() {
		ValidatorForm.addValidationRule('isRoomUnique', (value) => 
            //for every color saved, check if its name is equal to the text value
            this.state.rooms.every(
                ({rname}) => {
					return rname.toLowerCase() !== value.toLowerCase()
				}
            )
        );
	}

	createRoom() {
		const data = {
			rname: this.state.roomNameInput,
			rownerid: parseInt(this.props.user.id)
		}
		console.log(data)
		axios.post('/api/post/newRoom', data)
			.then(res => {
				console.log(res)
				this.getRooms();
			})
			.catch(err => console.log(err))
	}

	getRooms() {
		axios.get('/api/get/myRooms', {params: {rownerid: parseInt(this.props.user.id)}})
			.then(res => {
				this.setState({rooms: res.data});
			})
			.catch(err => console.log(err))
	}

	handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {classes, open, user} = this.props;
        return (
            <div className={classes.root}>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
            	>
					<div className={classes.drawerHeader}>
						<div>You are signed in as {user.display_name}. </div>
						<Button variant='contained' href='http://localhost:8888/login'>Sign Out</Button>
					</div>

					<Divider />

					<ValidatorForm onSubmit={this.createRoom}>
						<TextValidator
							placeholder='Enter Room Name'
							name='roomNameInput'
							value={this.state.roomNameInput}
							onChange={this.handleChange}
							validators={['required', 'isRoomUnique']}
							errorMessages={['This field is required', 'Room name is already taken']}
						/>
						<Button
							variant='contained' 
							color='primary'
							type='submit'
						>
							Create Room
						</Button>
					</ValidatorForm>

					<div>
						{this.state.rooms.map(room => <div>{room.rname}</div>)}
					</div>
                </Drawer>
				
                <main className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                    <div>
                        {/* stuff outside drawer */}
						<Home 
							user={this.props.user} 
							playbackState={this.props.playbackState} 
							playSong={this.props.playSong} 
                        	pauseSong={this.props.pauseSong}
						/>
                    </div>
                </main>
                        
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard);