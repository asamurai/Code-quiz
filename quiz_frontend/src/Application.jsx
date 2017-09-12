import React, { Component } from 'react';
import './../assets/style/index.sass';

import { Icon } from './components/ui';
import icons from './utils/icons.json';

class Application extends Component {
    constructor(props){
        super(props);
    }

    render () {
        return (
            <div>
                <div>Hello word</div>
                <Icon
                    icon={icons.git}
                />
            </div>
        );
    }
}

export default Application;

