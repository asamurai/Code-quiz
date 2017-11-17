import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';

import CategoryQiozElement from './../CategoryQuizElement';

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
                            <CategoryQiozElement
                                key={uuid()}
                                test={test}
                            />
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
