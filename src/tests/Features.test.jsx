import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Features from '../components/Features';

describe('Features Component', () => {
  it('renders the section title and heading', () => {
    render(<Features />);

    // Check if header text is in the document
    expect(screen.getByText('Why Choose SokoPlus?')).toBeInTheDocument();
    expect(screen.getByText('Independent Sellers')).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<Features />);

    // Verify specific feature numbers exist
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });
});