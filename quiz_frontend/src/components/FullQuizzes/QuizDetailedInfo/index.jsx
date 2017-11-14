import React, { Component } from 'react';

import CategoryQuizList from './../CategoryQuizList';

const mockTestData = {
    id: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45PBU2qyXzci5sfj0Dm4C_4V87mnpvVCqbjyZOHFQ_aROJwYl',
    title: 'React',
    content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
};

const mockTestList = [
    {
        id: 1,
        title: 'React test for begginers 1',
        questions: [
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            },
            {
                id: 4
            },
            {
                id: 5
            },
            {
                id: 6
            }
        ],
        createdBy: 'Dan Abramov',
        created: 'Mon Nov 13 2017 22:03:10 GMT+0200 (EET)',
        rating: 140,
        ratedBy: 30
    },
    {
        id: 2,
        title: 'React test for begginers 2',
        questions: [
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            },
            {
                id: 4
            },
            {
                id: 5
            },
            {
                id: 6
            }
        ],
        createdBy: 'Dan Abramov',
        created: 'Mon Nov 13 2017 22:03:10 GMT+0200 (EET)',
        rating: 135,
        ratedBy: 30
    }
];

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
                <div>
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
                <CategoryQuizList
                    tests={mockTestList}
                />
            </div>
        );
    }
}

export default QuizDetailedInfo;
