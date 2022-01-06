import React, {useEffect, useState} from 'react';
import BpkPagination from 'bpk-component-pagination';

import ApiService from '../../services/apiService';
import STYLES from './TripsListPagination.scss';
import Trip from "../Trip/Trip";

const TripsListPagination = () => {
    const [entries, setEntries] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [pageSliceStart, setPageSliceStart] = useState(0);
    const [pageSliceEnd, setPageSliceEnd] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [currentPage, setCurrentPage] = useState(0);

    const handleOnPageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    }

    useEffect( () => {
        const fetchData= async () => {
            const result = await ApiService.fetchTrips(50, 1);
            setEntries(result);
            setPageCount(Math.ceil(result.length / pageSize));
            setPageSliceStart (currentPage * pageSize);
            setPageSliceEnd(pageSliceStart + pageSize);
        }
        fetchData();
    }, [])

    return (
        <div>
            <h1 textStyle="base" className={STYLES.Trips}>Trips Booking</h1>

            {entries.length !== 0 &&
            <>
                {
                    <div className={STYLES.Header}>
                        <div className={STYLES.Date}><h2>Ride Taken on</h2></div>
                        <div className={STYLES.Length}><h2>Length</h2></div>
                        <div><h2>Price</h2></div>
                    </div>
                }
                {entries.slice(pageSliceStart, pageSliceEnd).map(entry => (
                    <Trip
                        key={entry.id}
                        length={entry.Length}
                        date={entry.Taken}
                        price={entry.Cost}
                    />
                ))}
                <div className={STYLES.TripPagination}>
                    <BpkPagination
                        pageCount={isNaN(pageCount) ? 0 : pageCount}
                        selectedPageIndex={currentPage}
                        onPageChange={handleOnPageChange}
                        previousLabel="previous"
                        nextLabel="next"
                        visibleRange={3}
                        pageLabel={page => `page ${page}`}
                        paginationLabel="default"
                    />
                </div>
            </>
            }
        </div>
    );
};

export default TripsListPagination;
