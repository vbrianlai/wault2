import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { green, purple, blue } from '@material-ui/core/colors';
import clsx from 'clsx';
// import './App.css'
import { Button, Avatar, Drawer, Divider } from "@material-ui/core";
import axios from "axios";

const drawerWidth = '400px'
const styles = (theme) => ({
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
        backgroundColor: 'gray'
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
        justifyContent: 'flex-end'
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
			roomNameInput: ''
		}
		this.createRoom = this.createRoom.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
        if (this.props.rooms !== nextProps.rooms) {
			this.setState({rooms: nextProps.rooms})
        }
    }

	componentDidMount() {
		// ValidatorForm.addValidationRule('isRoomUnique', (value) => 
        //     //for every color saved, check if its name is equal to the text value
        //     this.props.colors.every(
        //         ({name}) => name.toLowerCase() !== value.toLowerCase()
        //     )
        // );
        // ValidatorForm.addValidationRule('isColorUnique', () => 
        //     //for every color saved, check if its color is equal to the color we're trying to add
        //     this.props.colors.every(
        //         ({color}) => color !== this.state.currColor
        //     )
        // );
	}

	createRoom() {
		const data = {
			rname: this.state.roomNameInput,
			rownerid: parseInt(this.props.user.id)
		}
		console.log(data)
		axios.post('/api/post/newRoom', data)
			.then(res => console.log(res))
            .catch(err => console.log(err))
	}

	getRooms() {
		
		const data = {
			rownerid: parseInt(this.props.user.id)
		}
		console.log(data)
		axios.get('/api/get/myRooms', {params: {rownerid: parseInt(this.props.user.id)}})
			.then(res => {
				console.log(res)
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
            <div>
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
							onChange={this.handleChange}
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
						<Button variant='contained' color='secondary' onClick={this.getRooms}>get my rooms</Button>
                    </div>
                </Drawer>
                <main className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                    <div>
                        <Button variant='contained' color='secondary' onClick={() => this.getNowPlaying()}>Check Now Playing</Button>
                        <Button variant='contained' color='primary' onClick={() => this.getMe()}>Get me</Button>
                    </div>
                </main>
                        
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard);