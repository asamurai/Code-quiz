import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class QuizTraining extends Component {
    render () {
        console.log(this.props);
        const {
            match: {
                params: {
                    id
                }
            }
        } = this.props;
        return (
            <div>
                Quiz training {id}
            </div>
        );
    }
}



export default withRouter(QuizTraining);
