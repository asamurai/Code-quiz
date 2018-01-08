import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import uuid from 'uuid';

import RegisterFullQuizzesRow from './../RegisterFullQuizzesRow';

class FullQuizzesRegister extends Component {

    componentWillReceiveProps(nextProps) {
        const {
            categories,
            category: selectedCategory,
            getTopicsByCategoryId
        } = nextProps;

        if (selectedCategory.toLowerCase() !== this.props.category.toLowerCase()) {
            const categoryId = categories.find(category => category.name.toLowerCase() === selectedCategory.toLowerCase()).id;
            if (categoryId) {
                getTopicsByCategoryId({
                    categoryName: selectedCategory.toLowerCase(),
                    categoryId
                });
            }
        }
    }

    render () {
        const {
            registers,
            category
        } = this.props;
        const register = registers[category];
        return (
            <div style={{ background: '#ECECEC', padding: '10px' }}>
                {
                    _.chunk(register, 4).map((chunk) => (
                        <RegisterFullQuizzesRow
                            key={uuid()}
                            chunk={chunk}
                        />
                    ))
                }
            </div>
        );
    }
}

FullQuizzesRegister.propTypes = {
    category: PropTypes.string.isRequired,
    registers: PropTypes.objectOf(PropTypes.any).isRequired,
    categories: PropTypes.arrayOf(PropTypes.any).isRequired,
    getTopicsByCategoryId: PropTypes.func.isRequired
};

export default FullQuizzesRegister;
