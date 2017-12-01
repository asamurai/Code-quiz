import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FaqList from './../../components/Faq/FaqList';

class Faq extends Component {
    render () {
        const {
            faq: {
                faqList: questions
            }
        } = this.props;

        return (
            <div>
                <h3 style={{ fontSize: '18px' }}>Frequently asked questions:</h3>
                <FaqList
                    questions={questions}
                />
            </div>
        );
    }
}

Faq.propTypes = {
    faq: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = (state) => ({
    faq: state.faq
});
  
export default connect(mapStateToProps, {})(Faq);
