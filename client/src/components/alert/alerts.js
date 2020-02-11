import React from "react";
import {connect} from 'react-redux';

const alerts = ({ alert:{alerts} }) => {
  return (alerts.length > 0 && alerts.map(eachAlert=>(
      <div key={eachAlert.id} className={`alert`}>
         {eachAlert.msg}
      </div>)
  ));
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(alerts);
