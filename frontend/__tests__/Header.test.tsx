import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '../components/Header';

describe('Header', () => {
  it('renders the dashboard title', () => {
    render(<Header />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<Header />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});
