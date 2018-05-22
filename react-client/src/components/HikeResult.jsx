import React from 'react';
import MapWithMarker from './MapWithMarker.jsx'
import styles from '../styles/hikeResult.css'


class HikeResult extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selectedHike: props.hikeOptions[Math.floor(Math.random()*props.hikeOptions.length)]
    }
    this.getRandomHike = this.getRandomHike.bind(this)
  }

  getRandomHike(){
    this.setState({
      selectedHike: this.props.hikeOptions[Math.floor(Math.random()*this.props.hikeOptions.length)]
    })
  }

  render(){
   return ( 
   <div className={styles.overall}>
      <div className={styles.head}>{this.state.selectedHike.name}</div>
      <div className={styles.paragraph} style={this.state.selectedHike.description ? {} : {'display':'none'}}>
        {this.state.selectedHike.description}
      </div>
        <MapWithMarker 
        className={styles.map}  
        containerElement={<div style={{ height: `400px`, width:'600px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
        destination = {this.state.selectedHike}/>
      <button className={styles.roulette} onClick={this.getRandomHike}>roll again</button>
    </div>
   )
  }
}

export default HikeResult