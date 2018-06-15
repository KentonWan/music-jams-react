import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import albumData from './../data/albums';
import './Library.css';

class Library extends Component {
  constructor(props){
    super(props);
    this.state = {albums: albumData}
  }
  render () {
    return (
      <section className="library">
      {
        this.state.albums.map((album,index) =>
          <Link to={`/album/${album.slug}`} key={index} className="album-link">
            <img className="album-cover" src={album.albumCover} alt={album.title} />
            <div className="album-info" id="album-cover">{album.title}</div>
            <div className="album-info">{album.artist}</div>
            <div className="album-info" id="album-songs">{album.songs.length} songs</div>
          </Link>
          )
      }
      </section>
    );
  }
}

export default Library;
