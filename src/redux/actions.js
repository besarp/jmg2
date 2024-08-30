export const setArticles = (articles) => ({
    type: 'SET_ARTICLES',
    payload: articles
});

export const setFilter = (filter) => ({
    type: 'SET_FILTER',
    payload: filter
});

export const setSort = (sort) => ({
    type: 'SET_SORT',
    payload: sort
});

export const setCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page
});
