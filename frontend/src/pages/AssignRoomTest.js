// Remove unused user variable
// const user = useAuth();

import React from 'react';
import { render, screen } from '@testing-library/react';
import AssignRoom from './AssignRoom';

test('renders AssignRoom component', () => {
  render(<AssignRoom />);
  const linkElement = screen.getByText(/assign room/i);
  expect(linkElement).toBeInTheDocument();
});