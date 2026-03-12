import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page heading', () => {
  render(<App />);
  expect(screen.getByText(/stop fake news/i)).toBeInTheDocument();
});
