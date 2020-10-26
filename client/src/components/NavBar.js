import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar/Avatar';
import clsx from 'clsx';

const drawerWidth = '400px'
const styles = theme => ({
    navbar: {
        // flexGrow: 1,
        backgroundColor: '#2d3030',
        display: 'flex',
        justifyContent: 'space-between',
    },
    logo: {
        marginRight: '15px',
        // padding: '0 13px',
        fontSize: '22px',
        // backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'white',
        }
    },
    rightNav: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth})`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
});

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleDrawerToggle = () => {
        this.setState({ open: !this.state.open }, () => this.props.openMenu(this.state.open));
    };
    


    render() {
        const {classes, user} = this.props;
        return (
            <div >
                <AppBar
                    position="static"
                    className={clsx( {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar className={classes.navbar}>
                        <div className={classes.logo}>
                            <Link to='/'>wault</Link>
                        </div>
                        <div className={classes.rightNav}>
                            {user.display_name ?
                                <IconButton onClick={this.handleDrawerToggle}>
                                    <Avatar src={user.images[0].url} />
                                </IconButton>
                                : 
                                <Button href='http://localhost:8888/login' color="inherit">
                                    Login with Spotify
                                </Button>
                            }
                            
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            );
    }
}

export default withStyles(styles)(NavBar);
