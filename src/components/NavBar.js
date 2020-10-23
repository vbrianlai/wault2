import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar/Avatar'

const styles = {
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
    }
}

class NavBar extends Component {
    render() {
        const {classes, user} = this.props;
        // const MyLink = <Link to="/" {...this.props} />;
        // return (
        //     <header className={classes.Navbar}>
        //         <div className={classes.logo}>
        //             <Link to='/'>wault</Link>
        //         </div>
        //         <div className={classes.rightNav}>
        //             <a href='http://localhost:8888/login'>Login to Spotify </a>
        //         </div>
        //     </header>
        // );
        return (
            <div >
                <AppBar position="static">
                    <Toolbar className={classes.navbar}>
                        {/* <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                        </IconButton> */}
                        <div className={classes.logo}>
                            <Link to='/'>wault</Link>
                        </div>
                        <div className={classes.rightNav}>
                            {user.display_name ?  
                                <Avatar src={user.images[0].url}/>
                                : 
                                <Button href='http://localhost:8888/login' color="inherit">
                                    Login
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
