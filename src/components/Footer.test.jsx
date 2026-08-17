import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders footer component without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays copyright or brand text', () => {
    render(<Footer />);
    
    // Checks for copyright text or brand name safely
    expect(screen.getByText(/rights reserved/i)).toBeInTheDocument();
  });
});