import {
    combineReducers
} from 'redux';


const coreConceptsMock = [
    `The quizzes teach the most important concepts first. We're not going to burden you with a huge quiz that addresses all the edge cases if you're not ready yet!`,
    `Each question is dependent on other questions, questions are "chained" and one question cannot be anwered unless a prior question is answered correctly.`,
    `Each question teaches a single concept. We hate when books teach two concepts at the same time - we only teach one concept per question.`,
    `Repetition, repetition, repetition. The quizzes are meant to be taken multiple times. You need to beat programming concepts in your head to make them stick.`,
    `Bottom up. We start with the basics and work up to more complicated topics. Throwing learners into the deep end leads to frusteration and hoplessness. Learing programming isn't that hard if you take it one step at a time.`,
    `Self sufficient developers. We want to make you a self-sufficient developer that can solve any problem. Too many courses and bootcamps are prematurely training developers complicated frameworks, so they can get a job quickly. We believe in a long term, sequential learning approach.`
];

const initialState = {
    coreConcepts: coreConceptsMock
};

const coreConcepts = (state = initialState.coreConcepts, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    coreConcepts
});
