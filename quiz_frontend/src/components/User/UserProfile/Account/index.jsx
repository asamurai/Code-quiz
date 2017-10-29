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

import { getPropsObject } from './../../../../helpers/hocHelpers';

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
            imageToUpload: null,
            imageFileToUpload: null
        };
    }

    componentWillUnmount () {
        const {
            setUserFormViewState
        } = this.props;
        setUserFormViewState(true);
    }

    handleSaveAccount = () => {
        const {
            onAccountSave
        } = this.props;
        onAccountSave();
    }

    handlePictureUpload = () => {
        const { onPictureUpload } = this.props;
        const { imageFileToUpload } = this.state;
        onPictureUpload(imageFileToUpload);
    }

    readPreviewFile = (e) => {
        const input = e.target.files;
        if (input && input[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                this.setState({
                    imageToUpload: reader.result,
                    imageFileToUpload: input[0]
                });
            };
            reader.readAsDataURL(input[0]);
        }
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
            },
            formState: {
                edit: editState,
                view: viewState
            },
            setUserFormViewState,
            setUserFormEditState
        } = this.props;

        return (
            <div>
                <Modal
                    title="Upload new profile image"
                    visible={!!imageToUpload && editState}
                    onOk={this.handlePictureUpload}
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
                            <FormItem
                                label="Name"
                            >
                                {getFieldDecorator('name', {
                                    rules: [
                                        { 
                                            required: false, 
                                            message: 'Please input your name.' 
                                        }
                                    ]
                                })(
                                    <Input
                                        disabled={viewState}
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
                                            required: false, 
                                            message: 'Please input your surname.' 
                                        }
                                    ]
                                })(
                                    <Input 
                                        disabled={viewState}
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
                                        disabled={viewState}
                                        placeholder="Username" 
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <input id="profilePhoto" style={{ display: 'none' }} type="file" onChange={this.readPreviewFile} accept="image/*"/>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <ProfileImage
                                    url={image}
                                    mode={'full'}
                                />
                                <Button
                                    icon="upload"
                                    type="primary"
                                    disabled={viewState}
                                    style={{
                                        width: '200px',
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        visibility:  `${viewState ? 'hidden' : 'visible'}`
                                    }}
                                >
                                    <label htmlFor="profilePhoto" style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
                                        {`   Upload profile Photo`}
                                    </label>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row span="12">
                        <Col span="24">
                            <FormItem label="Biograpgy" hasFeedback >
                                {getFieldDecorator('bio', {
                                rules: [{ required: false }]
                                })(
                                <TextArea
                                    disabled={viewState}
                                    autosize={{ minRows: 6 }}
                                    maxLength="3000"
                                />)}
                            </FormItem>
                        </Col>
                    </Row>
                    {
                        editState &&
                        <Row span="12" style={{padding: '10px'}}> 
                            <Button
                                type="primary"
                                style={{marginRight: '10px'}}
                                onClick={this.handleSaveAccount}
                            >
                                Save
                            </Button>
                            <Button
                                type="danger"
                                onClick={() => setUserFormViewState(true)}
                            >
                                Cancel
                            </Button>
                        </Row>
                    }
                    {
                        viewState &&
                        <Row span="12" style={{padding: '10px'}}> 
                            <Button
                                type="primary"
                                style={{marginRight: '10px'}}
                                onClick={() => setUserFormEditState(true)}
                            >
                                Edit
                            </Button>
                        </Row>
                    }
                </Form>
            </div>
        );
    }
}

const AccountHOC = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return getPropsObject(props.fields, [
      'name',
      'surname',
      'username',
      'bio'
    ]);
  }
})(Account);

Account.propTypes = {
    image: PropTypes.string.isRequired,
    formState: PropTypes.shape({
        edit: PropTypes.bool,
        view: PropTypes.bool
    }).isRequired,
    setUserFormViewState: PropTypes.func.isRequired,
    setUserFormEditState: PropTypes.func.isRequired,
    onAccountSave: PropTypes.func.isRequired,
    onPictureUpload: PropTypes.func.isRequired
};

export default AccountHOC;
