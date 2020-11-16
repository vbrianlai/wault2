import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});



class MediaControlCard extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            isPlaying: false,
            progress: 0
        }
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleUserClick = this.handleUserClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.playbackState !== nextProps.playbackState) {
            this.setState({playbackState: nextProps.playbackState})
        }
    }

    handlePlay() {
        // console.log
        this.props.playSong(this.state.playbackState.item);
        this.setState({isPlaying: true});
    }

    handlePause() {
        if (!this.state.isPlaying) {
            return;
        } else {
            this.setState({isPlaying: false})
            this.props.pauseSong();
        }
    }

    handleUserClick() {
        this.state.isPlaying ? this.handlePause() : this.handlePlay()
    }

    render() {
        const { classes, theme } = this.props;
        const {playbackState} = this.state;
      return (
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {playbackState && playbackState.item.name}
                {/* {this.props.playbackState && this.props.playbackState.item.name} */}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {playbackState && playbackState.item.artists[0].name}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="Previous">
                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
              </IconButton>
              <IconButton aria-label="Play/pause" onClick={this.handleUserClick}>
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
              <IconButton aria-label="Next">
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
              </IconButton>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={playbackState && playbackState.item.album.images[0].url}
            title={`${playbackState && playbackState.item.album.name} cover`}
          />
        </Card>
      );
    }
}
  

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);