import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Modal,
    Form,
    Button,
    Select,
    Input,
    Row,
    Col,
    Checkbox,
    Alert
} from 'antd';

import uuid from 'uuid';

import { getPropsObject } from './../../../helpers/hocHelpers';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class QuizModalForm extends Component {

    constructor(props) {
        super(props);

        this.editFooter = [
            <Button
                key="submit_edit"
                type="primary"
                icon="save"
                onClick={() => {
                    console.log('save question');
                }}
            >
                Save
            </Button>,
            <Button
                key="cancel_edit"
                type="danger"
                onClick={() => {
                    const {
                        closeModal
                    } = this.props;

                    closeModal();
                }}
            >
                Cancel
            </Button>
        ];
        this.createFooter = [
            <Button
                key="submit_create"
                type="primary"
                icon="check"
                onClick={() => {
                    console.log('submit creating');
                }}
            >
                Create
            </Button>,
            <Button
                key="cancel_create"
                type="danger"
                onClick={() => {
                    const {
                        closeModal
                    } = this.props;

                    closeModal();
                }}
            >
                Cancel
            </Button>
        ];
        this.viewFooter = [
            <Button
                key="cancel_view"
                type="primary"
                onClick={() => {
                    const {
                        closeModal
                    } = this.props;

                    closeModal();
                }}
            >
                Cancel
            </Button>
        ];

        this.defAnswer = {
            answer: '',
            isCorrect: false
        };
    }

    getTitleForModal = () => {
        const {
            modalStatus: {
                create,
                edit,
                view
            }
        } = this.props;

        switch (true) {
            case create:
                return 'Create question';
            case edit:
                return 'Edit question';
            case view:
                return 'View question';
            default:
                return '';
        }
    }

    getFooterForModal = () => {
        const {
            modalStatus: {
                create,
                edit,
                view
            }
        } = this.props;

        switch (true) {
            case create:
                return this.createFooter;
            case edit:
                return this.editFooter;
            case view:
                return this.viewFooter;
            default:
                return [];
        }
    }

    renderChains = chain => (
        <Option
            key={chain.chain_id}
            value={`${chain.chain_id}`}
        >
            {chain.name}
        </Option>
    );

    renderLevels = level => (
        <Option
            key={level}
            value={`${level}`}
        >
            {level}
        </Option>
    );

    handleAddAnswer = () => {
        const {
            onSetNewAnswerList,
            answers
        } = this.props;
        const newAnswer = {
            ...this.defAnswer,
            answer_id: uuid()
        };
        onSetNewAnswerList(
            answers.concat(newAnswer)
        );
    }

    handleDeleteAnswer = key => {
        const {
            onSetNewAnswerList,
            answers
        } = this.props;
        onSetNewAnswerList(
            answers.filter(answer => answer.answer_id !== key)
        );
    };

    handleChangeAnswerInput = (key, e) => {
        const {
            onSetNewAnswerList,
            answers
        } = this.props;
        const changedAnswer = {
            ...answers.find(answer => answer.answer_id === key),
            answer: e.target.value
        };
        const newAnswers = answers.map(answer => {
            if (answer.answer_id === key) {
                return changedAnswer;
            }
            return answer;
        });
        onSetNewAnswerList(newAnswers);
    };

    handleChangeAnswerCheckbox = (key) => {
        const {
            onSetNewAnswerList,
            answers
        } = this.props;
        let changedAnswer = answers.find(answer => answer.answer_id === key);
        changedAnswer = {
            ...changedAnswer,
            isCorrect: !changedAnswer.isCorrect
        };
        const newAnswers = answers.map(answer => {
            if (answer.answer_id === key) {
                return changedAnswer;
            }
            return answer;  
        });
        onSetNewAnswerList(newAnswers);
    };

    render () {
        const {
            form:{
                getFieldDecorator
            },
            modalStatus: {
                create: createState,
                view: viewState,
                edit: editState
            },
            questionChains,
            maxLevel,
            closeModal,
            answers
        } = this.props;

        const isModalVisible = createState || editState || viewState;
        const modalTitle = this.getTitleForModal();
        const modalFooter = this.getFooterForModal();

        const answersList = answers.map(answer => {
            const key = answer.answer_id ? answer.answer_id : uuid();
            return (
                <Row
                    span="11"
                    key={key}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}
                >
                    <Input
                        placeholder="Answer"
                        disabled={viewState}
                        style={{ width: '60%', marginRight: 8 }}
                        value={answer.answer}
                        onChange={(e) => this.handleChangeAnswerInput(key, e)}
                    />
                    <Checkbox
                        checked={answer.isCorrect}
                        disabled={viewState}
                        onChange={() => this.handleChangeAnswerCheckbox(key)}
                    >
                        Correct
                    </Checkbox>
                    <Button
                        type="danger"
                        icon="close-circle-o"
                        disabled={viewState}
                        onClick={() => this.handleDeleteAnswer(key)}
                    />
                </Row>
            );
        });

        return (
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                onClose={closeModal}
                footer={modalFooter}
                width={1000}
            >
                <Form>
                    <Row
                        span="12"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Col span="11">
                            <FormItem
                                label="Question"
                            >
                                {getFieldDecorator('question', {
                                    rules: [
                                        { 
                                            required: true, 
                                            message: 'Please input question.' 
                                        }
                                    ]
                                })(
                                    <Input
                                        disabled={viewState}
                                        placeholder="Question" 
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="Description"
                            >
                                {getFieldDecorator('description', {
                                    rules: [
                                        { 
                                            required: false, 
                                            message: 'Please input question description.' 
                                        }
                                    ]
                                })(
                                    <TextArea
                                        disabled={viewState}
                                        autosize={{ minRows: 6 }}
                                        maxLength="1000"
                                    />
                                )}
                            </FormItem>
                            {
                                answers.length > 0 &&
                                answersList
                            }
                            {
                                answers.length === 0 &&
                                <Alert
                                    type="warning"
                                    message={'There is no answers for current question now.'}
                                    style={{
                                        marginBottom: '20px'
                                    }}
                                />
                            }
                            <Button
                                type="dashed"
                                icon="plus"
                                onClick={this.handleAddAnswer}
                            >
                                Add answer
                            </Button>
                        </Col>
                        <Col span="11">
                            <FormItem
                                label="Chain"
                            >
                                {getFieldDecorator('chain', {
                                    rules: [
                                        { 
                                            required: true, 
                                            message: 'Please select question chains.' 
                                        }
                                    ]
                                })(
                                    <Select
                                        disabled={viewState}
                                        showSearch
                                        placeholder={'Select question chains'}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            questionChains.map(this.renderChains)
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="Level"
                            >
                                {getFieldDecorator('level', {
                                    rules: [
                                        { 
                                            required: true, 
                                            message: 'Please select question chains.' 
                                        }
                                    ]
                                })(
                                    <Select
                                        disabled={viewState}
                                        showSearch
                                        placeholder={'Select question level'}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            Array(maxLevel).fill('').map((el, ind) => ind + 1).map(this.renderLevels)
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="Sources"
                            >
                                {getFieldDecorator('sources', {
                                    rules: [
                                        { 
                                            required: true, 
                                            message: 'Please input your sources.' 
                                        }
                                    ]
                                })(
                                    <TextArea
                                        disabled={viewState}
                                        autosize={{ minRows: 6 }}
                                        maxLength="1000"
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

QuizModalForm.propTypes = {
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    maxLevel: PropTypes.number.isRequired,
    modalStatus: PropTypes.objectOf(PropTypes.bool).isRequired,
    questionChains: PropTypes.arrayOf(PropTypes.any).isRequired,
    answers: PropTypes.arrayOf(PropTypes.any).isRequired,

    closeModal: PropTypes.func.isRequired,
    onSetNewAnswerList: PropTypes.func.isRequired
    // questionData: PropTypes.objectOf(PropTypes.any).isRequired
};

const QuizModalFormHOC = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return getPropsObject(props.fields, [
          'question',
          'description',
          'chain',
          'level',
          'sources'
        ]);
    }
})(QuizModalForm);

QuizModalFormHOC.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default QuizModalFormHOC;

