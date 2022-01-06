import React from "react";
import BpkPanel from 'bpk-component-panel';
import STYLES from './Trip.scss';


const Trip = ( { date, length, price }) => {
    return (
        <>
    <BpkPanel className={STYLES.TripEntry} fullWidth>
            <div className={STYLES.TripEntry__wrapper}>
                <div className={STYLES.TripEntry__left}>
                    <div className={STYLES.TripEntry__date}>
                        { new Date(date).toDateString() }
                    </div>
                    <div className={STYLES.TripEntry__date}>
                        { `${length} KM` }
                    </div>
                    <div className={STYLES.TripEntry__date}>
                         { `$${price}` }
                    </div>
                </div>
            </div>
        </BpkPanel>
        </>
    )
}

export default Trip;
