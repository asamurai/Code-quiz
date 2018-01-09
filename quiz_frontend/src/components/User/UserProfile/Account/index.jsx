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

    handleEditCancel = () => {
        const {
            onEditCancel,
            setUserFormViewState
        } = this.props;

        onEditCancel();
        setUserFormViewState(true);
    }

    handlePictureUpload = () => {
        const { onPictureUpload } = this.props;
        const { imageFileToUpload } = this.state;
        onPictureUpload(imageFileToUpload);
    }

    readPreviewFile = (e) => {
        const {
            onChangeModalState
        } = this.props;
        const input = e.target.files;
        if (input && input[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                onChangeModalState('imageUpload', true);
                this.setState({
                    imageToUpload: reader.result,
                    imageFileToUpload: input[0]
                });
            };
            reader.readAsDataURL(input[0]);
        }
    }

    handleCancelUploadImageDialog = () => {
        const {
            onChangeModalState
        } = this.props;
        this.setState({
            imageToUpload: null
        });
        onChangeModalState('imageUpload', false);
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
            modals: {
                imageUpload: imageUploadModalState
            },
            setUserFormEditState
        } = this.props;

        return (
            <div>
                <Modal
                    title="Upload new profile image"
                    visible={imageUploadModalState && editState}
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
                                label="First name"
                            >
                                {getFieldDecorator('first_name', {
                                    rules: [
                                        {
                                            required: !viewState,
                                            message: 'Please input your first name.'
                                        }
                                    ]
                                })(
                                    <Input
                                        disabled={viewState}
                                        placeholder="First name"
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="Last name"
                            >
                                {getFieldDecorator('last_name', {
                                    rules: [
                                        {
                                            required: !viewState,
                                            message: 'Please input your last name.'
                                        }
                                    ]
                                })(
                                    <Input
                                        disabled={viewState}
                                        placeholder="Last name"
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="Username"
                            >
                                {getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: !viewState,
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
                            <FormItem label="Biography" hasFeedback >
                                {getFieldDecorator('bio', {
                                    rules: [
                                        {
                                            required: !viewState,
                                            message: 'Please input few words about your biography.'
                                        }
                                    ]
                                })(
                                    <TextArea
                                        disabled={viewState}
                                        autosize={{ minRows: 6 }}
                                        maxLength="3000"
                                    />
                                )}
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
                                onClick={this.handleEditCancel}
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
      'first_name',
      'last_name',
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
    modals: PropTypes.objectOf(PropTypes.any).isRequired,
    setUserFormViewState: PropTypes.func.isRequired,
    setUserFormEditState: PropTypes.func.isRequired,
    onAccountSave: PropTypes.func.isRequired,
    onPictureUpload: PropTypes.func.isRequired,
    onChangeModalState: PropTypes.func.isRequired,
    onEditCancel: PropTypes.func.isRequired
};

export default AccountHOC;
