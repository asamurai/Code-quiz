import React, { Component } from 'react';

const mockTestData = {
    id: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45PBU2qyXzci5sfj0Dm4C_4V87mnpvVCqbjyZOHFQ_aROJwYl',
    title: 'React',
    content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
};

class QuizDetailedInfo extends Component {
    render () {
        return (
            <div
                style={{
                    maxWidth: '700px',
                    margin: '0 auto',
                    padding: '30px'
                }}
            >
                <h3>{mockTestData.title}</h3>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            maxWidth: '300px'
                        }}
                    >
                        {mockTestData.content}
                    </div>
                    <div>
                        <img
                            src={mockTestData.image}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default QuizDetailedInfo;
