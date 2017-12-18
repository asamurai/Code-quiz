import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './answerStyles.sass';

class QuestionAnswerItem extends Component {
    render () {
        const {
            answer: {
                name,
                isCorrect
            }
        } = this.props;

        return (
            <div
                className={isCorrect ? styles['answer-correct'] : styles['answer-incorrect']}
            >
                {name}
            </div>
        );
    }
}

QuestionAnswerItem.propTypes = {
    answer: PropTypes.objectOf(PropTypes.any).isRequired
};

export default QuestionAnswerItem;
