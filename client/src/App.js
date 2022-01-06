import React from 'react';
import STYLES from './App.scss';
import SimpleMap from "./components/Map/SimpleMap";
import SearchPanel from "./components/SearchControls/SearchPanel";
import MapContext from './context/MapContext';

const c = className => STYLES[className] || 'UNKNOWN';


const scooterData = { scooters: [] };
scooterData.updateScooters = scooters => {
  scooterData.scooters = scooters;
}

const defaultLatitude=1.350;
const defaultLongitude=103.95;
const defaultRadius=1800;
const defaultCount=10;

class App extends React.Component {
  state = {
    scooters: [],
    count: defaultCount,
    latitude: defaultLatitude,
    longitude: defaultLongitude,
    radius: defaultRadius,
  };

  updateMapContext = ({
                      count,
                      latitude,
                      longitude,
                      radius,
                      scooters
                    }) => {
    this.setState({
      count,
      latitude,
      longitude,
      radius,
      scooters,
    });
  }

  render() {
    const {
      latitude,
      longitude,
      radius,
      scooters
    } = this.state;
    return (
          <MapContext.Provider value={{ scooters, update: this.updateMapContext.bind(this) }}>
            <div className={c('App')}>
              <div className={c('Container')}>
                <div className={c('Search')}>
                  <SearchPanel
                    defaultLatitude={defaultLatitude}
                    defaultLongitude={defaultLongitude}
                    defaultRadius={defaultRadius}
                    defaultCount={defaultCount}
                  />
                </div>
                <div className={c('Map')}>
                  <SimpleMap
                    scooters={scooters}
                    latitude={latitude}
                    longitude={longitude}
                    radius={radius}
                  />
                </div>
              </div>
            </div>
          </MapContext.Provider>
    );
  }
}

export default App;
