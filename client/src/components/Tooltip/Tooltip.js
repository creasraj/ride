import React, { useState } from "react";
import BpkPopover from "bpk-component-popover";
import {withRtlSupport} from "bpk-component-icon";
import BpkProgress from 'bpk-component-progress';
import CarIconSm from "bpk-component-icon/sm/cars";

import STYLES from './Tooltip.scss';
import {getDistanceFromLatLonInKm} from "../../utilities/calculateDistance";

const c = className => STYLES[className] || 'UNKNOWN';
const AlignedCarIconSm = withRtlSupport(CarIconSm);

const Tooltip = ({scooter}) => {
    const [isVisible, setIsVisible] = useState(false)
    return (
            <div id ={`scooter-${scooter.GeoId}`}>
                <BpkPopover
                    id ={`scooter-${scooter.GeoId}`}
                    label={''}
                    target={
                        <div style={{ cursor: 'pointer' }} onClick={()=>setIsVisible(true)}>
                            <BpkProgress
                                min={0}
                                max={100}
                                value={scooter.BatteryLevel}
                            />
                            <AlignedCarIconSm />
                        </div>
                    }
                    onClose={()=>setIsVisible(false)}
                    isOpen={isVisible}
                    closeButtonText="Close"
                    renderTarget={() =>
                        document.getElementById(`scooter-${scooter.GeoId}`)
                    }
                >
                    <div className={c('popover')}>
                        <div><b>Serial Number</b> : { scooter.SerialNumber }</div>
                        <div><b>Battery Level</b> : { scooter.BatteryLevel }</div>
                        <div><b>Distance</b> : { getDistanceFromLatLonInKm(scooter.Latitude, scooter.Longitude,1.35,103.95) } </div>
                    </div>
               </BpkPopover>
            </div>
    )
}

export default Tooltip;
