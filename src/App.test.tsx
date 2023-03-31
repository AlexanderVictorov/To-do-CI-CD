import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

test('renders the heading "My To-do List"', () => {
  render(<App />);
  const heading = screen.queryByText(/My To-do List/i);
  expect(heading).toBeInTheDocument();
});
