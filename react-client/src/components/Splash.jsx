import React from 'react';
import styles from '../styles/splash.css'


const Splash = ({position, getHikes, humanReadablePosition})=>(
  <div className={styles.overall}>
    <div className = {styles.head}>
      hike roulette
    </div>
    <div className = {styles.location}>
      <div style={{'opacity': 1}}>
      {humanReadablePosition ? humanReadablePosition.formatted_address : 'unknown position'}
      </div>
    </div>
    <button className={styles.roulette} disabled={!position} onClick={getHikes}>let's hike</button>
  </div>
)

export default Splash