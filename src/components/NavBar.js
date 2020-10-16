import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh',
        backgroundColor: '#eceff1',
        // width: '100%'
    },
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        // backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black',
        }
    }
}

class NavBar extends Component {
    render() {
        const {classes} = this.props;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>wault</Link>
                </div>
            </header>
        )
    }
}

export default withStyles(styles)(NavBar);
