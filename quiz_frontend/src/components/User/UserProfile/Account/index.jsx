import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
    Form,
    Row,
    Col,
    Modal,
    Button,
    Input
} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

import ProfileImage from './ProfileImage';

// import styles from './index.sass';

/**
 * Profile account component
 * 
 * existing fields: 
 * image+
 * name+
 * surname+
 * username+
 * bio+
 * 
 * @class Account
 * @extends {Component}
 */

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageToUpload: null
        };
    }

    readPreviewFile = (e) => {
        const input = e.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                this.setState({
                    imageToUpload: reader.result
                });
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    handleUploadNewImage = () => {
        console.log('handle upload image');
    }

    handleCancelUploadImageDialog = () => {
        this.setState({
            imageToUpload: null
        });
    }

    render () {
        const {
            imageToUpload
        } = this.state;

        const {
            image,
            form:{
                getFieldDecorator
            }
        } = this.props;

        return (
            <div>
                <Modal
                    title="Upload new profile image"
                    visible={!!imageToUpload}
                    onOk={this.handleUploadNewImage}
                    okText={'Upload'}
                    onCancel={this.handleCancelUploadImageDialog}
                    cancelText={'Cancel'}
                >
                    <div 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ProfileImage
                            url={imageToUpload}
                            mode="preview"
                        />
                    </div>
                </Modal>
                <Form>  
                    <Row span="12">
                        <Col span="12">
                            <input id="profilePhoto" style={{ display: 'none' }} type="file" onChange={this.readPreviewFile} accept="image/*"/>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <ProfileImage
                                    url={image}
                                    mode={'full'}
                                />
                                <Button
                                    icon="upload"
                                    type="primary"
                                    style={{
                                        margin: '10px auto'
                                    }}
                                >
                                    <label htmlFor="profilePhoto" style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
                                        {`   Upload profile Photo`}
                                    </label>
                                </Button>
                            </div>
                        </Col>
                        <Col span="12">
                            <FormItem
                                label="Name"
                            >
                                {getFieldDecorator('name', {
                                    rules: [
                                        { 
                                            required: true, 
                                            message: 'Please input your name.' 
                                        }
                                    ]
                                })(
                                    <Input
                                        placeholder="Name" 
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="Surname"
                            >
                                {getFieldDecorator('surname', {
                                    rules: [
                                        { 
                                            required: true, 
                                            message: 'Please input your surname.' 
                                        }
                                    ]
                                })(
                                    <Input 
                                        placeholder="Surname" 
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="Username"
                            >
                                {getFieldDecorator('username', {
                                    rules: [
                                        { 
                                            required: true, 
                                            message: 'Please input your username.' 
                                        }
                                    ]
                                })(
                                    <Input 
                                        placeholder="Username" 
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row span="12">
                        <Col span="20">
                            <FormItem label="Biograpgy" hasFeedback >
                                {getFieldDecorator('bio', {
                                rules: [{ required: false }]
                                })(
                                <TextArea
                                    autosize={{ minRows: 6 }}
                                    maxLength="3000"
                                />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row span="12" style={{padding: '10px'}}> 
                        <Button
                            type="primary"
                            style={{marginRight: '10px'}}
                        >
                            Save
                        </Button>
                        <Button>
                            Reset
                        </Button>
                    </Row>
                </Form>
            </div>
        );
    }
}

Account.propTypes = {
    image: PropTypes.string.isRequired
};

export default Form.create()(Account);
