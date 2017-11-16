import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuizTraining extends Component {
    render () {
        const {
            id
        } = this.props;
        return (
            <div>
                Quiz training {id}
            </div>
        );
    }
}

QuizTraining.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired
};

export default QuizTraining;
