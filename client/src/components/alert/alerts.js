import React from "react";
import {connect} from 'react-redux';

const alerts = ({ alert:{alerts} }) => {
  return (alerts.length > 0 && alerts.map(alert=>(
      <div key={alert.id} className={`alert alert-${alert.type}`}>
         {alert.msg}
      </div>)
  ));
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(alerts);
