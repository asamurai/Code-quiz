import React, { Component } from 'react';
import './../assets/style/index.sass';

import { Button } from './components/ui';

class Application extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        console.log('click');
    }

    render () {
        return (
            <div>
                <div>Hello word</div>
                <Button
                    onMouseEnter={this.onClick}
                />
            </div>
        );
    }
}

export default Application;

