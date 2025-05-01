import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_KEY = '8ef782a369be4a14bb08cde231f979a1';

const fetchNews = async ({ queryKey }) => {
  const [_key, { query, category, country, language }] = queryKey;
  const { data } = await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      apiKey: API_KEY,
      q: query,
      category,
      country,
      language,
      pageSize: 10,
    },
  });
  return data.articles;
};

const News = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [country, setCountry] = useState('us');
  const [language, setLanguage] = useState('en');

  const {
    data: articles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['news', { query, category, country, language }],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
    keepPreviousData: true, // smooth UI on change
  });

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-primary">📰 Latest News</h2>

      {isLoading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {isError && (
        <div className="alert alert-danger text-center">
          😿 Failed to load news: {error.message || 'Unknown error'}
        </div>
      )}

      {!isLoading && articles.length === 0 && (
        <div className="alert alert-warning text-center">
          No articles found for the selected filters.
        </div>
      )}

      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-control" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="us">United States</option>
            <option value="in">India</option>
            <option value="gb">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            placeholder="Search keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {articles.map((article) => (
          <div key={article.url} className="col">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={article.urlToImage || 'https://via.placeholder.com/500'}
                className="card-img-top"
                alt={article.title}
                style={{ objectFit: 'cover', height: '250px' }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '1.2rem' }}>
                  {article.title.length > 50 ? article.title.slice(0, 50) + '...' : article.title}
                </h5>
                <p className="card-text" style={{ fontSize: '0.9rem' }}>
                  {article.description
                    ? article.description.length > 100
                      ? article.description.slice(0, 100) + '...'
                      : article.description
                    : 'No description available.'}
                </p>
              </div>
              <div className="card-footer text-center">
                <a href={article.url} className="btn btn-sm btn-outline-primary" target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
