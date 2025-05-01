import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCatFact = async () => {
  const res = await axios.get('https://catfact.ninja/fact');
  return res.data.fact;
};

const CatFactsPage = () => {
  const { data: catFact, isLoading, error } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4 text-success">🐾 Cat Fact Generator</h2>

      <button
        className="btn btn-outline-success mb-4"
        onClick={() => window.location.reload()}
        disabled={isLoading}
      >
        {isLoading ? 'Fetching...' : '😺 Get a New Cat Fact'}
      </button>

      {error && (
        <div className="alert alert-danger">
          😿 Failed to load cat fact. Try again!
        </div>
      )}

      {isLoading && <div className="spinner-border text-success mb-3" role="status" />}

      {catFact && (
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <p className="card-text fs-5">{catFact}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatFactsPage;
