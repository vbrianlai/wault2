import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';

const styles = {
    searchResults: {
        left: 0,
        right: 0,
        margin: 'auto',
        padding: 0,
        position: 'absolute',
        listStyle: 'none',
        display: 'inline-block',
        width: '420px',
        /* text-align: center, */
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.72)',
        
    },
    result: {
        display: 'block',
        padding: '15px 20px',
        backgroundoColor: '#F8F8F8',
        color: '#788585',
        marginTop: '3px',
        position: 'relative',
        transition: '0.3s',
        '&:hover': {
            backgroundColor: '#d8f2f1',
            cursor: 'pointer',
        }
    }
}


class TrackList extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(song) {
        console.log(song);
        this.props.updateLikes(song);
    }

    render() {
        let {classes, results} = this.props;
        return (
                <div>
                    <ul className={classes.searchResults}>
                        {results.map(result => {
                            return (
                                <li className={classes.result} key={result.id} onClick={() => this.handleClick(result)}>
                                    <p>{result.name} by {result.artists[0].name}</p>
                                </li>
                            )
                        })}
                    </ul>

                </div>
        )
    }
}

export default withStyles(styles)(TrackList);