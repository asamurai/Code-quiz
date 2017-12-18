import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Tabs,
    Button,
    Alert
} from 'antd';

import QuestionForm from './../QuestionForm';

const TabPane = Tabs.TabPane;

class LevelQuestionForm extends Component {
    constructor(props) {
        super(props);
    }

    renderLevelTabs = (level, ind) => (
        <TabPane tab={`Level ${ind + 1}`} key={level.key}>
            <QuestionForm
                key={level.key}
                levelKey={level.key}
                questions={level.questions}
            />
        </TabPane>
    );

    render() {
        const {
            levels,
            activeLevelKey,

            onChangeActiveLevelKey,
            onAddNewLevel,
            onEditLevel
        } = this.props;

        return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon="plus"
                    onClick={onAddNewLevel}
                >
                    Add new level
                </Button>
            </div>
            {
                levels.length ===0 &&
                <Alert
                    message={'There is no levels in quiz, please add new one.'}
                    type="info"
                />
            }
            {
                levels.length > 0 &&
                <Tabs
                    hideAdd
                    onChange={onChangeActiveLevelKey}
                    activeKey={activeLevelKey}
                    type="editable-card"
                    onEdit={onEditLevel}
                >
                    {
                        levels.map((level, ind) => 
                            this.renderLevelTabs(level, ind)
                        )
                    }
                </Tabs>
            }
        </div>
        );
    }
}

LevelQuestionForm.defaultProps = {
    activeLevelKey: null
};

LevelQuestionForm.propTypes = {
    activeLevelKey: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    levels: PropTypes.arrayOf(PropTypes.any).isRequired,

    onAddNewLevel: PropTypes.func.isRequired,
    onChangeActiveLevelKey: PropTypes.func.isRequired,
    onEditLevel: PropTypes.func.isRequired
}; 

export default LevelQuestionForm;
