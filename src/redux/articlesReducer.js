const initialState = {
    articles: [],
    filter: '',
    sort: 'asc',
    currentPage: 1,
    articlesPerPage: 10
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARTICLES':
            return { ...state, articles: action.payload };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        case 'SET_SORT':
            return { ...state, sort: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

export default articlesReducer;
