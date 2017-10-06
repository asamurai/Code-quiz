import React, { Component } from 'react';

import { TextField } from'./../../components/ui';

class HomeContainer extends Component {
    render () {
        return (
            <div>
                <TextField
                    label="text"
                    error={false}
                    regex={/\.com/g}
                    errorMessage="Should contain '.com'"
                />
            </div>
        );
    }
}

export default HomeContainer;
