import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactNotify from 'react-notify';

import { stringHelper } from './../../helpers';

const {
  capitalize
} = stringHelper;

import {
    closeMessage,
    showErrorMessage,
    showInfoMessage,
    showSuccessMessage
} from './../../actions/notifications';

import './index.css';

class NotificationContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {
      closeMessage,
      isSuccessMessage,
      isErrorMessage,
      isInfoMessage
    } = this.props;

    const {
      isSuccessMessage: nextIsSuccessMessage,
      isErrorMessage: nextIsErrorMessage,
      isInfoMessage: nextIsInfoMessage,
      message
    } = nextProps;

    const timeToHide = 10000; //10 seconds
    /**
     * [Title]
     * [Message]
     * [Time to hide]
     */
    if (isSuccessMessage !== true && nextIsSuccessMessage) {
      this.notificator.success(capitalize(message), '', timeToHide);
      setTimeout(() => { closeMessage(); }, timeToHide);
    }

    if (isErrorMessage !== true && nextIsErrorMessage) {
      this.notificator.error(capitalize(message), '', timeToHide);
      setTimeout(() => { closeMessage(); }, timeToHide);
    }

    if (isInfoMessage !== true && nextIsInfoMessage) {
      this.notificator.info(capitalize(message), '', timeToHide);
      setTimeout(() => { closeMessage(); }, timeToHide);
    }
  }

  render() {
    return <ReactNotify ref={(el) => { this.notificator = el; }} />;
  }
}

const mapStateToProps = (state) => ({
  isSuccessMessage: state.notifications.isSuccessMessage,
  isErrorMessage: state.notifications.isErrorMessage,
  isInfoMessage: state.notifications.isInfoMessage,
  message: state.notifications.message
});

NotificationContainer.propTypes = {
  isSuccessMessage: PropTypes.bool.isRequired,
  isErrorMessage: PropTypes.bool.isRequired,
  isInfoMessage: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  closeMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        showErrorMessage: bindActionCreators(showErrorMessage, dispatch),
        showSuccessMessage: bindActionCreators(showSuccessMessage, dispatch),
        showInfoMessage: bindActionCreators(showInfoMessage, dispatch),
        closeMessage: bindActionCreators(closeMessage, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
