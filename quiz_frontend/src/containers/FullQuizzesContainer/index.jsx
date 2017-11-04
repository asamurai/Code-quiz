import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { 
//     Route,
//     Redirect
// } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    Row
} from 'antd';

class UserAccountContainer extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Row span="12">
                Full quizzes
            </Row>
        );
    }
}

UserAccountContainer.propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapDispatchToProps = () => {
    return {
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(UserAccountContainer);


