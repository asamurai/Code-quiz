import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuizEdit extends Component {
    render () {
        const {
            id
        } = this.props;
        return (
            <div>
                Quiz editing {id}
            </div>
        );
    }
}

QuizEdit.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired
};

export default QuizEdit;
