import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import STYLES from './SearchPanel.scss'
import ApiService from '../../services/apiService';
import MapContext from '../../context/MapContext';

const c = className => STYLES[className] || 'UNKNOWN';

class SearchPanel extends React.Component {
  state = {
    count: this.props.defaultCount,
    latitude: this.props.defaultLatitude,
    longitude: this.props.defaultLongitude,
    radius: this.props.defaultRadius,
    busy: false,
  };

  componentDidMount() {
    this.handleSearch(this.mapContext);
  }

  handleSearch(mapContext) {
    const {
      count,
      latitude,
      longitude,
      radius,
      busy,
    } = this.state;
    if (busy) return;
    this.setState({
      busy: true,
    }, async () => {
      const parseCount = parseFloat(count);
      const parsedLatitude = parseFloat(latitude);
      const parsedLongitude = parseFloat(longitude);
      const parsedRadius = parseFloat(radius);
      const scooters = await ApiService.fetchScooters(
        parseCount,
        parsedLatitude,
        parsedLongitude,
        parsedRadius,
      );
      this.setState({
        busy: false,
        scooters,
      }, () => {
        mapContext.update({
          count: parseCount,
          latitude: parsedLatitude,
          longitude: parsedLongitude,
          radius: parsedRadius,
          scooters
        });
      });
    })
  }

  render() {
    const filterClassName = cx(c('FilterPanel'),
      c('FilterPanel--open')
    );
    const {
      displayName,
      count,
      latitude,
      longitude,
      radius,
      scooters,
      busy
    } = this.state;
    return (
      <MapContext.Consumer>
        {
          (mapContext) => {
            this.mapContext = mapContext;
            return (
              <div className={filterClassName}>
                <div className={c("FilterPanel__title")}>{displayName}</div>
                <div className={c("Filter__field")}>
                  <label className={c("Filter__field-label")}>Latitude</label>
                  <input placeholder="latitude" type="number" value={latitude} onChange={(e) => {
                    this.setState({
                      latitude: e.target.value
                    });
                  }} />
                </div>
                <div className={c("Filter__field")}>
                  <label className={c("Filter__field-label")}>Longitude</label>
                  <input placeholder="longitude" type="number" value={longitude} onChange={(e) => {
                    this.setState({
                      longitude: e.target.value
                    });
                  }} />
                </div>

                <div className={c("Filter__field")}>
                  <label className={c("Filter__field-label")}>Radius in meters</label>
                  <input placeholder="radius in meters" type="number" value={radius} onChange={(e) => {
                    this.setState({
                      radius: e.target.value
                    });
                  }} />
                </div>

                <div className={c("Filter__field")}>
                  <label className={c("Filter__field-label")}>Count</label>
                  <input placeholder="count" type="number" value={count} onChange={(e) => {
                    this.setState({
                      count: e.target.value
                    });
                  }} />
                </div>

                <div className={c("Filter__field")}>
                  <button onClick={() => this.handleSearch(mapContext)} disabled={busy}>Search</button>
                </div>
              </div>
            );
          }
        }
      </MapContext.Consumer>
    );
  };
}

SearchPanel.defaultProps = {
  displayName: 'Search'
};

SearchPanel.propTypes = {
  defaultLatitude: PropTypes.number.isRequired,
  defaultLongitude: PropTypes.number.isRequired,
  defaultCount: PropTypes.number.isRequired,
  defaultRadius: PropTypes.number.isRequired,
  displayName: PropTypes.string
};

export default SearchPanel;
