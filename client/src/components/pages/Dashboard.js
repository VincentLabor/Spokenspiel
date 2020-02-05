import React from 'react';
import Navbar from '../layout/Navbar';
import {connect} from "react-redux";

const Dashboard = ({}) => {
    return (
        <div>
            <Navbar/>

        </div>
    )
}

const mapStateToProps = state =>({
auth: state.auth
});

export default connect(mapStateToProps,{})(Dashboard);
