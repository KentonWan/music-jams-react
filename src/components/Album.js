import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';

class Album extends Component {
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {album: album,
                  currentSong: album.songs[0],
                  isPlaying: false,
                  isHovered: false,
                  currentTime: 0,
                  duration: album.songs[0].duration,
                  currentVolume: 0,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount(){
    this.eventListeners ={
      timeupdate: e => {
        this.setState({currentTime: this.audioElement.currentTime});
      },
      durationchange: e => {
        this.setState({duration: this.audioElement.duration});
      },
      volumechange: e => {
        this.setState({currentVolume: this.audioElement.currentVolume})
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
}

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);

  }

  play () {
    this.audioElement.play();
    this.setState({isPlaying: true});
  }

  pause () {
    this.audioElement.pause();
    this.setState({isPlaying: false});
  }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  }

  handleSongClick(song){
    const isSameSong = this.state.currentSong === song;
    if (isSameSong && this.state.isPlaying ){
      this.pause();
    }
    else {
      if(!isSameSong) {this.setSong(song);}
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0,currentIndex-1);
    const newSong= this.state.album.songs[newIndex];
    if(currentIndex===newIndex){
    }
    else {
    this.setSong(newSong);
    this.play();
    }
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const numberTracks = this.state.album.songs.length-1;
    const newIndex = Math.min(numberTracks,currentIndex+1);
    const newSong= this.state.album.songs[newIndex];
    if(currentIndex===newIndex) {
    }
    else {
    this.setSong(newSong);
    this.play();
    }
  }

  handleTimeChange(e){
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({currentTime: newTime})

  }

  handleVolumeChange(e){
    const newVolume = e.target.value;
    this.audioElement.currentVolume = newVolume;
    this.setState({currentVolume: newVolume});
    this.audioElement.volume = newVolume;

  }

  formatTime(time) {
    const minutes = parseInt(time/60);
    const seconds = parseInt(time - (minutes*60));
    if (isNaN(time)) {
      return "-:--"
    }
    else {
    return minutes + ":" + (seconds < 10 ? "0"+seconds : seconds);
  }
}


  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id ="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <section className="song-list-player-bar">
        <table id="song-list">
          <colgroup>
            <col id='song-number-column' />
            <col id='song-title-column' />
            <col id='song-duration-column' />
          </colgroup>
          <tr>
            <th id="table-header">Song #</th>
            <th id="table-header">Song Title</th>
            <th id="table-header">Duration</th>
          </tr>
          <tbody>
          {
            this.state.album.songs.map((song,index) =>
              <tr className="song" key={index}
              onClick={()=>this.handleSongClick(song)}
              onMouseEnter = {()=>this.setState({isHovered: index+1})}
              onMouseLeave= {()=> this.setState({isHovered: false})}>
                <td className="songActions">
                  <button className="songNumber">
                    {
                      (this.state.currentSong === song && this.state.isPlaying) ?
                      <span className={this.state.isPlaying ? "ion-md-pause" : "ion-md-play"}></span>
                      :
                      (this.state.isHovered === index + 1) ?
                        <span className="ion-md-play"></span> : <span className="songNumber">{index + 1}</span>
                    }
                    </button>
                </td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">{this.formatTime(song.duration)}</td>
              </tr>
              )
          }
          </tbody>
        </table>
        <PlayerBar isPlaying={this.state.isPlaying}
                  currentSong={this.state.currentSong}
                  currentTime={this.audioElement.currentTime}
                  formatTime={(t)=>this.formatTime(t)}
                  duration={this.audioElement.duration}
                  currentVolume={this.audioElement.currentVolume}
                  handleSongClick={()=>this.handleSongClick(this.state.currentSong)}
                  handlePrevClick={()=>this.handlePrevClick()}
                  handleNextClick={()=>this.handleNextClick()}
                  handleTimeChange={(e)=>this.handleTimeChange(e)}
                  handleVolumeChange={(e) =>this.handleVolumeChange(e)}/>
        </section>
      </section>
    );
  }
}


export default Album;
