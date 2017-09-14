import React, { Component } from 'react';
import './../assets/style/index.sass';

import { Button } from './components/ui';
import icons from './utils/icons.json';

class Application extends Component {
    constructor(props){
        super(props);
    }

    render () {
        return (
            <div>
                <div>Hello word</div>
                <Button 
                    icon={icons.git}
                    iconRight
                    iconLeft={false}
                />
            </div>
        );
    }
}

export default Application;

