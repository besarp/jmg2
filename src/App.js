import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setArticles, setFilter, setSort, setCurrentPage } from './redux/actions';
import './App.css';

const fetchArticles = async () => {
  const response = await fetch('https://gutendex.com/books/');
  return response.json();
};

const App = () => {
  const dispatch = useDispatch();
  const { articles, filter, sort, currentPage, articlesPerPage } = useSelector(state => state.articles);

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles();
      dispatch(setArticles(data.results)); // Adjust to access the actual article list
    };
    loadArticles();
  }, [dispatch]);

  const filteredArticles = articles.filter(article => article.title.toLowerCase().includes(filter.toLowerCase()));
  const sortedArticles = filteredArticles.sort((a, b) => {
    if (sort === 'asc') return a.title.localeCompare(b.title);
    return b.title.localeCompare(a.title);
  });

  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <div className="App">
      <h1>Articles</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Filter by title"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
        <select onChange={(e) => dispatch(setSort(e.target.value))}>
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>
      </div>
      <div className="article-list">
        {paginatedArticles.map(article => (
          <div key={article.id} className="article-item">
            <img src={article.formats['image/jpeg']} alt={article.title} className="article-image" />
            <div className="article-details">
              <h2 className="article-title">{article.title}</h2>
              <p><strong>Author:</strong> {article.authors.map(author => author.name).join(', ')}</p>
              <p><strong>Subjects:</strong> {article.subjects.join(', ')}</p>
              <p><strong>Downloads:</strong> {article.download_count.toLocaleString()}</p>
              <a href={article.formats['text/html']} className="article-link">Read More</a>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={paginatedArticles.length < articlesPerPage}>Next</button>
      </div>
    </div>
  );
};

export default App;
