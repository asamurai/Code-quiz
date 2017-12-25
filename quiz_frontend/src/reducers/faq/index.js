import {
    combineReducers
} from 'redux';

const mockFaqList = [
    {
        question: `I have registered, but i can't login. What's a problem?`,
        answer: `May be you didn't activate your account. Activation link was sent to your email, check it and give response if it's not.`
    },
    {
        question: `How can i create new quiz?`,
        answer: `You must complete quiz of same category with 90% winrate.`
    },
    {
        question: `Can i pass quiz, before i sign up?`,
        answer: `Unfortunately, you can't now, but in future, you will.`
    },
    {
        question: 'Can i see my statistics?',
        answer: 'Yes, it is in your account profile -> statistics.'
    }
];

const initialState = {
    faqList: mockFaqList,
    // faqList: [],
    loading: false,
    error: null
};

const loading = (state = initialState.loading, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const faqList = (state = initialState.faqList, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    loading,
    error,
    faqList
});
