import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {album: album,
                  currentSong: album.songs[0],
                  isPlaying: false,
                  isHovered: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
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


  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <span  className="ion-play"></span>
            <div id ="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id='song-number-column' />
            <col id='song-title-column' />
            <col id='song-duration-column' />
          </colgroup>
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
                <td>{song.title}</td>
                <td>{song.duration} seconds</td>
              </tr>
              )
          }
          </tbody>
        </table>
        <PlayerBar isPlaying={this.state.isPlaying}
                  currentSong={this.state.currentSong}
                  handleSongClick={()=>this.handleSongClick(this.state.currentSong)}
                  handlePrevClick={()=>this.handlePrevClick()}
                  handleNextClick={()=>this.handleNextClick()}/>
      </section>
    );
  }
}


export default Album;

                    /*  ```{ (this.state.currentSong.title === song.title) ?
                        <span className={this.state.isPlaying ? "ion-pause" : "ion-play"}></span>
                        :
                        (this.state.isHovered === index+1) ?
                        <span className="ion-play"></span>
                        :
                        <span className="song-number">{index+1}</span>
                      }```*/
