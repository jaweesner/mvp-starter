import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import Splash from './components/Splash.jsx';
import HikeResult from './components/HikeResult.jsx';
import LoginModal from './components/LoginModal.jsx';
import { GOOGLE_API_KEY, TRAIL_API_KEY } from './../../.config.js';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      view: 'splash',
      loginModal:'false',
      position: null,
      humanReadablePosition: null,
      hikeOptions:[]
    }

    this.savePosition = this.savePosition.bind(this);
    this.getPositionError = this.getPositionError.bind(this);
    this.getHikes =this.getHikes.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.savePosition, this.getPositionError)
  }

  renderView(view){
    if (view === 'splash'){
      return <Splash 
        position={this.state.position} 
        humanReadablePosition={this.state.humanReadablePosition} 
        getHikes={this.getHikes} />
    } else if (view === 'hikeResult'){
      return < HikeResult hikeOptions = {this.state.hikeOptions} position = {this.state.position}/>
    }
  }

  getPositionError(error){
    if (error){
      console.log(error)
      this.setState({position:null})
      return 'could not access your location'
    }
  }
  savePosition(position){
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_API_KEY}`)
        .then(resolve => 
            this.setState({
            position: position,
            humanReadablePosition: resolve.data.results[0]
          })
        )
        .catch(err => {
          console.error(err)
          this.setState({position: position});
      })
  }

  getHikes(){
    axios.get('https://trailapi-trailapi.p.mashape.com/', {
      headers : {'X-Mashape-Key': TRAIL_API_KEY},
      params: {
        'q[activities_activity_type_name_eq]' : 'hiking',
        lat: this.state.position.coords.latitude,
        lon: this.state.position.coords.longitude,
        radius: 25,
      }
    })
    .then(resolve =>
      this.setState({
        view:'hikeResult',
        hikeOptions: resolve.data.places
      })
    )
    .catch( err => console.error(err))
  }

  toggleLogin(){
    this.setState({loginModal: !this.state.loginModal})
  }

  render() {
    return (
      <div>
        <div className='nav'>
          <button className='login' onClick={this.toggleLogin}>login</button>
        </div>
        <div className = 'body'>
        {this.renderView(this.state.view)}
        </div>
      <LoginModal show={this.props.loginModal} />
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));