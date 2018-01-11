import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import uuid from 'uuid';

import {
    Icon
} from 'antd';

import RegisterFullQuizzesRow from './../RegisterFullQuizzesRow';

class FullQuizzesRegister extends Component {

    componentDidMount() {
        const {
            categories,
            category: selectedCategory,
            getTopicsByCategoryId
        } = this.props;

        const categoryObj = categories.find(category => category.name.toLowerCase() === selectedCategory.toLowerCase());
        if (categoryObj) {
            getTopicsByCategoryId({
                categoryName: selectedCategory.toLowerCase(),
                categoryId: categoryObj.id
            });
        }      
    }

    componentWillReceiveProps(nextProps) {
        const {
            categories,
            category: selectedCategory,
            getTopicsByCategoryId
        } = nextProps;

        if (selectedCategory.toLowerCase() !== this.props.category.toLowerCase()) {
            const categoryObj = categories.find(category => category.name.toLowerCase() === selectedCategory.toLowerCase());
            if (categoryObj) {
                getTopicsByCategoryId({
                    categoryName: selectedCategory.toLowerCase(),
                    categoryId: categoryObj.id
                });
            }
        }
    }

    render () {
        const {
            registers,
            category,
            loading
        } = this.props;
        const register = registers[category];
        if (loading) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#ECECEC',
                        padding: '10px'
                    }}
                >
                    <Icon type="loading" />
                </div>
            );
        }

        if (register.length === 0 ) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#ECECEC',
                        padding: '10px'
                    }}
                >
                    <h2>{'There are no topics for this category'}</h2>
                </div>
            );
        }

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

FullQuizzesRegister.defaultProps = {
    category: 'language'
};

FullQuizzesRegister.propTypes = {
    category: PropTypes.string,
    registers: PropTypes.objectOf(PropTypes.any).isRequired,
    categories: PropTypes.arrayOf(PropTypes.any).isRequired,
    getTopicsByCategoryId: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default FullQuizzesRegister;
