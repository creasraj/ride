import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/Header/Header";
import TripsListPagination from "./components/TripsListPagination/TripsListPagination";

const Main = () => {
    return (
        <div>
        <Router>
            <Header/>
            <Route exact path="/" component={App} />
            <Route path="/trips" component={TripsListPagination} />
        </Router>
        </div>
    )
}

export default Main;
