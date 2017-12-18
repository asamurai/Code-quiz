import {
    combineReducers
} from 'redux';

import * as quizzesTypes from './../../constants/container_constants/quizzes';

const types = {
    ...quizzesTypes
};

const mockQuizzesList = [
    {
        testId: 1,
        test: {
            name: 'Python basics',
            categoryId: 1,
            category: {
                name: 'Python'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd',
            description: 'Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn; is Open.',
            created: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 2,
        test: {
            name: 'Javascript basics',
            categoryId: 1,
            category: {
                name: 'Javascript'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFaF2ofRdW6mNISv6H0rt2JjU7XisKBq5a_ks8fvzhpdmR9cvGUA',
            description: 'JavaScript (JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.',
            created: 'Mon Nov 22 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 3,
        test: {
            name: 'Python basics',
            categoryId: 1,
            category: {
                name: 'Python'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd',
            description: 'Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn; is Open.',
            created: 'Mon Nov 25 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 4,
        test: {
            name: 'Javascript basics',
            categoryId: 1,
            category: {
                name: 'Javascript'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFaF2ofRdW6mNISv6H0rt2JjU7XisKBq5a_ks8fvzhpdmR9cvGUA',
            description: 'JavaScript (JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.',
            created: 'Mon Nov 21 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 5,
        test: {
            name: 'Python basics',
            categoryId: 1,
            category: {
                name: 'Python'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd',
            description: 'Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn; is Open.',
            created: 'Mon Nov 25 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 6,
        test: {
            name: 'Javascript basics',
            categoryId: 1,
            category: {
                name: 'Javascript'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFaF2ofRdW6mNISv6H0rt2JjU7XisKBq5a_ks8fvzhpdmR9cvGUA',
            description: 'JavaScript (JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.',
            created: 'Mon Nov 21 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 7,
        test: {
            name: 'Python basics',
            categoryId: 1,
            category: {
                name: 'Python'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd',
            description: 'Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn; is Open.',
            created: 'Mon Nov 25 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 8,
        test: {
            name: 'Javascript basics',
            categoryId: 1,
            category: {
                name: 'Javascript'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFaF2ofRdW6mNISv6H0rt2JjU7XisKBq5a_ks8fvzhpdmR9cvGUA',
            description: 'JavaScript (JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.',
            created: 'Mon Nov 21 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 9,
        test: {
            name: 'Python basics',
            categoryId: 1,
            category: {
                name: 'Python'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd',
            description: 'Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn; is Open.',
            created: 'Mon Nov 25 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 10,
        test: {
            name: 'Javascript basics',
            categoryId: 1,
            category: {
                name: 'Javascript'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFaF2ofRdW6mNISv6H0rt2JjU7XisKBq5a_ks8fvzhpdmR9cvGUA',
            description: 'JavaScript (JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.',
            created: 'Mon Nov 21 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 11,
        test: {
            name: 'Python basics',
            categoryId: 1,
            category: {
                name: 'Python'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd',
            description: 'Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn; is Open.',
            created: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 12,
        test: {
            name: 'Javascript basics',
            categoryId: 1,
            category: {
                name: 'Javascript'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFaF2ofRdW6mNISv6H0rt2JjU7XisKBq5a_ks8fvzhpdmR9cvGUA',
            description: 'JavaScript (JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.',
            created: 'Mon Nov 22 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 13,
        test: {
            name: 'Python basics',
            categoryId: 1,
            category: {
                name: 'Python'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd',
            description: 'Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn; is Open.',
            created: 'Mon Nov 25 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 14,
        test: {
            name: 'Javascript basics',
            categoryId: 1,
            category: {
                name: 'Javascript'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFaF2ofRdW6mNISv6H0rt2JjU7XisKBq5a_ks8fvzhpdmR9cvGUA',
            description: 'JavaScript (JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.',
            created: 'Mon Nov 21 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    },
    {
        testId: 15,
        test: {
            name: 'Python basics',
            categoryId: 1,
            category: {
                name: 'Python'
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd',
            description: 'Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn; is Open.',
            created: 'Mon Nov 25 2017 23:51:55 GMT+0200 (EET)',
            modified: 'Mon Nov 27 2017 23:51:55 GMT+0200 (EET)'
        }
    }
];

console.log(!!mockQuizzesList);

const initialState = {
    quizList: {
        pages: {
            currentPage: 1,
            totalFinded: 0
            // totalFinded: mockQuizzesList.length
        },
        requestBody: {
            limit: 10
        },
        register: []
        // register: mockQuizzesList
    },
    modalStatus: {
        deleteQuiz: false,
        createQuiz: false,
        createQuestion: false
    },
    formCreation: {
        selectedQuizId: null,
        data: null,
        state: {
            create: false,
            edit: false,
            view: false
        }
    },
    formTraining: {
        quizSessionId: null,
        data: null,
        results: null,
        isFinished: false
    },
    loading: false,
    error: null
};

const quizList = (state = initialState.quizList, action) => {
    switch (action.type) {
        case types.RESET_QUIZ_LIST:
            return initialState.quizList;
        case types.SET_QUIZZES_REQUEST_BODY:
            return {
                ...state,
                requestBody: {
                    ...state.requestBody,
                    ...action.requestBody
                }
            };
        case types.SET_QUIZZES_PAGES:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    ...action.pages
                }
            };
        case types.GET_QUIZZES_BY_USER_ID.SUCCESS:
            return {
                ...state,
                register: action.data.content,
                pages: {
                    ...state.pages,
                    currentPage: action.data.currentPage,
                    totalFinded: action.data.totalFinded
                }
            };
        case types.GET_QUIZZES_BY_USER_ID.FAILURE:
        default:
            return state;
    }
};

const formCreation = (state = initialState.formCreation, action) => {
    switch (action.type) {
        case types.RESET_QUIZ_CREATE_FORM:
            return initialState.formCreation;
        case types.CHANGE_QUIZZES_CREATE_FORM_STATE:
            return {
                ...state,
                state: {
                    ...initialState.formCreation.state,
                    ...action.state,
                }
            };
        case types.GET_QUIZ_BY_ID.SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case types.GET_QUIZ_BY_ID.FAILURE:
        default:
            return state;
    }
};

const formTraining = (state = initialState.formTraining, action) => {
    switch (action.type) {
        case types.RESET_QUIZ_TRAINING:
        case types.DELETE_QUIZ_SESSION.SUCCESS:
            return initialState.formTraining;
        case types.CREATE_QUIZ_SESSION.SUCCESS:
            return {
                ...state,
                quizSessionId: action.data.quizSessionId
            };
        case types.GET_QUIZ_LEVEL.SUCCESS:
            return {
                ...state,
                data: action.data.content,
                isFinished: action.data.isFinished
            };
        case types.GET_QUIZ_RESULTS.SUCCESS:
            return {
                ...state,
                data: null,
                isFinished: true,
                results: action.data
            };
        case types.CREATE_QUIZ_SESSION.FAILURE:
        case types.GET_QUIZ_LEVEL.FAILURE:
        case types.GET_QUIZ_RESULTS.FAILURE:
        case types.DELETE_QUIZ_SESSION.FAILURE:
        default:
            return state;
    }
};

const modalStatus = (state = initialState.modalStatus, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.RESET_QUIZZES_ERRORS:
            return null;
        case types.GET_QUIZ_BY_ID.FAILURE:
        case types.GET_QUIZZES_BY_USER_ID.FAILURE:
        case types.GET_QUIZ_RESULTS.FAILURE:
        case types.CREATE_QUIZ_SESSION.FAILURE:
        case types.GET_QUIZ_LEVEL.FAILURE:
        case types.DELETE_QUIZ_SESSION.FAILURE:
            return action.error;
        default:
            return state;
    }
};

const loading = (state = initialState.loading, action) => {
    switch (action.type) {
        case types.GET_QUIZ_BY_ID.REQUEST:
        case types.CREATE_QUIZ_SESSION.REQUEST:
        case types.GET_QUIZ_LEVEL.REQUEST:
        case types.GET_QUIZ_RESULTS.REQUEST:
        case types.DELETE_QUIZ_SESSION.REQUEST:
        case types.GET_QUIZZES_BY_USER_ID.REQUEST:
            return true;
        case types.GET_QUIZZES_BY_USER_ID.SUCCESS:
        case types.DELETE_QUIZ_SESSION.SUCCESS:
        case types.GET_QUIZ_RESULTS.SUCCESS:
        case types.CREATE_QUIZ_SESSION.SUCCESS:
        case types.GET_QUIZ_LEVEL.SUCCESS:
        case types.GET_QUIZ_BY_ID.SUCCESS:
        case types.GET_QUIZ_RESULTS.FAILURE:
        case types.CREATE_QUIZ_SESSION.FAILURE:
        case types.GET_QUIZ_LEVEL.FAILURE:
        case types.DELETE_QUIZ_SESSION.FAILURE:
        case types.GET_QUIZ_BY_ID.FAILURE:
            return false;
        default:
            return state;
    }
};

export default combineReducers({
    quizList,
    formCreation,
    formTraining,
    loading,
    error,
    modalStatus
});
