import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Collapse
} from 'antd';

import uuid from 'uuid';

const Panel = Collapse.Panel;

class FaqList extends Component {
    renderElements = (el) => (
        <Panel
            key={uuid()}
            header={el.question}
        >
            <p>
                {el.answer}
            </p>
        </Panel>
    );

    render () {
        const {
            questions
        } = this.props;

        return (
            <Collapse>
                {
                    questions.map(this.renderElements)
                }
            </Collapse>
        );
    }
}

FaqList.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default FaqList;
