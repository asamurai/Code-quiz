import React, { Component } from 'react';

import {
    Tabs,
    Button,
    Alert
} from 'antd';

const TabPane = Tabs.TabPane;

class LevelQuestionForm extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { key: '1' },
            { key: '2' }
        ];
        this.state = {
            activeKey: panes[0].key,
            panes
        };
    }
      
    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newLevel${this.newTabIndex++}`;
        panes.push({ key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render() {
        return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button onClick={this.add}>ADD</Button>
            </div>
            {
                this.state.panes.length ===0 &&
                <Alert
                    message={'There is no levels in quiz, please add new one.'}
                    type="info"
                />
            }
            {
                this.state.panes.length > 0 &&
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {this.state.panes.map((pane, ind) => (
                        <TabPane tab={`Level ${ind + 1}`} key={pane.key}>
                            {`Content of level ${ind + 1}`}
                        </TabPane>
                    ))}
                </Tabs>
            }
        </div>
        );
    }
}

export default LevelQuestionForm;
