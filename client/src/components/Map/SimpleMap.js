import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRtlSupport } from 'bpk-component-icon';
import CarIconSm from 'bpk-component-icon/sm/cars';
const { Circle } = require('react-google-maps');
import BpkMap, {
    withGoogleMapsScript,
    BpkIconMarker, BpkOverlayView,
} from 'bpk-component-map';
import Tooltip from "../Tooltip/Tooltip";

const MAP_URL =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyBHzyJ5NFxPjNtj6YUJshB11mEXI-XCzTE'
const BpkMapWithScript = withGoogleMapsScript(BpkMap);


class SimpleMap extends Component {
  mapWrapperRef = React.createRef();

  constructor(props) {
      super(props);
      this.state = {
          isOpen: false,
      };
  }

  render() {
    const { latitude, longitude, radius, scooters } = this.props
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <BpkMapWithScript
          googleMapURL={MAP_URL}
          zoom={14}
          center={{
            latitude,
            longitude,
          }}
          showControls
          panEnabled
        >
          <>
            {
              <Circle
                onClick={() => null}
                center={{ lat: latitude, lng: longitude }}
                radius={radius}
              />
            }
            {
              scooters.map((scooter) => {
                return (
                  <BpkIconMarker
                    key={`scooter-${scooter.GeoId}`}
                    icon={<Tooltip scooter={scooter} /> }
                    position={{ latitude: scooter.Latitude, longitude: scooter.Longitude }}
                  />
                )
              })
            }
          </>
        </BpkMapWithScript>
      </div>
    );
  }
}

SimpleMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  scooters: PropTypes.array.isRequired,
}

export default SimpleMap;
