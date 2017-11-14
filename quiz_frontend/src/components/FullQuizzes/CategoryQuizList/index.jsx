import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import uuid from 'uuid';
import moment from 'moment';

import {
    Rater
} from './../../common/ui';

import {
    QUIZ_ROUTE_TRAINING_PATH
} from './../../../routes';

class CategoryQiozList extends Component {
    render () {
        const {
            tests
        } = this.props;
        return (
            <div
                style={{
                    marginTop: '30px'
                }}
            >
                <h2>Available tests: </h2>
                <div>
                    {
                        tests.map((test) => (
                            <div
                                key={uuid()}
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
                                    to={`${QUIZ_ROUTE_TRAINING_PATH}/${test.id}`}
                                >
                                    <div>
                                        {test.title}
                                    </div>
                                    <div>
                                        Author: {test.createdBy}
                                    </div>
                                </Link>
                                <div>
                                    <div>
                                        {moment(test.created).format('l')}
                                    </div>
                                    <div>
                                        <Rater
                                            value={+(test.rating / (test.ratedBy)).toFixed(1)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

CategoryQiozList.propTypes = {
    tests: PropTypes.array.isRequired
};

export default CategoryQiozList;
