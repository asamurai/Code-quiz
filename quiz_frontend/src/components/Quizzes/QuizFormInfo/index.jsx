import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Form,
    // Row,
    Col,
    Input,
    Select,
    Icon
} from 'antd';

import { getPropsObject } from './../../../helpers/hocHelpers';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class QuizFormInfo extends Component {

    renderCategories = (category) => (
        <Option
            key={category.id}
            value={`${category.id}`}
        >
            {category.name}
        </Option>
    );

    renderTopics = (topic) => (
        <Option
            key={topic.id}
            value={`${topic.id}`}
        >
            {topic.name}
        </Option>
    );

    render () {
        const {
            fields,
            form:{
                getFieldDecorator
            },
            state,
            quizCategories,
            quizTopics,
            loading
        } = this.props;

        const selectedCategory = +fields.category.value;
        const topics = selectedCategory ? quizTopics.filter(topic => topic.category === selectedCategory) : quizTopics;

        if (loading) {
            return (
                <Icon type={'loading'}/>
            );
        }

        return (
            <Form>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Col span="11">
                        <FormItem
                            label="Title"
                        >
                            {getFieldDecorator('title', {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Please input quizzes title.' 
                                    }
                                ]
                            })(
                                <Input
                                    disabled={state.view}
                                    placeholder="Title" 
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="Category"
                        >
                            {getFieldDecorator('category', {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Select quiz category.' 
                                    }
                                ]
                            })(
                                <Select
                                    disabled={state.view}
                                    showSearch
                                    placeholder={'Select quiz category'}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        quizCategories.map(this.renderCategories)
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="Topic"
                        >
                            {getFieldDecorator('topic', {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Select quiz topic.' 
                                    }
                                ]
                            })(
                                <Select
                                    disabled={state.view}
                                    showSearch
                                    placeholder={'Select quiz topic'}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        topics.map(this.renderTopics)
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem
                            label="Description"
                        >
                            {getFieldDecorator('description', {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Write description about your quiz.' 
                                    }
                                ]
                            })(
                                <TextArea
                                    disabled={state.view}
                                    autosize={{ minRows: 6 }}
                                    maxLength="1000"
                                />
                            )}
                        </FormItem>
                    </Col>
                </div>
            </Form>
        );
    }
}

const QuizFormInfoHOC = Form.create({
    onFieldsChange(props, changedFields) {
      props.onChange(changedFields);
    },
    mapPropsToFields(props) {
      return getPropsObject(props.fields, [
        'description',
        'category',
        'topic',
        'title',
        'imageId'
      ]);
    }
  })(QuizFormInfo);
  
  QuizFormInfo.propTypes = {
    state: PropTypes.objectOf(PropTypes.any).isRequired,
    quizCategories: PropTypes.arrayOf(PropTypes.any).isRequired,
    quizTopics: PropTypes.arrayOf(PropTypes.any).isRequired,
    loading: PropTypes.bool.isRequired
  };
  
  export default QuizFormInfoHOC;
