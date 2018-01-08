import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
    Rater
} from './../../common/ui';

import {
    QUIZ_TRAINING_PATH
} from './../../../routes';

class CategoryQuizElement extends Component {
    render () {
        const {
            test
        } = this.props;
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid #c9c9c9',
                    margin: '3px 0px'
                }}
            >
                <Link
                    to={`${QUIZ_TRAINING_PATH}/${test.id}`}
                >
                    <div>
                        {test.title}
                    </div>
                    <div>
                        Author: {test.user}
                    </div>
                </Link>
                <div>
                    <div>
                        <b>Date created</b>: {`     ${moment(test.created).format('l')}`}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <b>Сomplexity rating</b>:
                        <Rater
                            value={+(test.rating / (test.ratedBy)).toFixed(1)}
                            disabled
                        />
                    </div>
                </div>
            </div>
        );
    }
}

CategoryQuizElement.propTypes = {
    test: PropTypes.objectOf(PropTypes.any).isRequired
};

export default CategoryQuizElement;
