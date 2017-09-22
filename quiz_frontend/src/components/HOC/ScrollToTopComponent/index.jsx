import { Component } from 'react';
import { withRouter } from 'react-router-dom';

/**
 * Its required HOC for scrolling back to top of the window
 * when route changes
 * Using react-router-v4 this feature is reaches using withRouter HOC
 * 
 * @class ScrollToTop
 * @extends {Component}
 */
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }
  
    render() {
        return this.props.children;
    }
}
  
export default withRouter(ScrollToTop);
