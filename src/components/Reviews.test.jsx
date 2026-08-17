import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Reviews from './Reviews';

describe('Reviews Component', () => {
  const mockReviews = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Verified Buyer',
      comment: 'SokoPlus made sourcing items direct from sellers so simple.',
      rating: 5,
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Independent Merchant',
      comment: 'Listing my inventory here expanded my reach instantly.',
      rating: 5,
    },
  ];

  it('renders section headers correctly', () => {
    render(<Reviews reviews={mockReviews} />);
    
   expect(screen.getByText(/what our customers say/i)).toBeInTheDocument();
  });

  it('renders dynamic review cards passed via props', () => {
    render(<Reviews reviews={mockReviews} />);
    
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument();
    expect(screen.getByText('David Chen')).toBeInTheDocument();
    expect(screen.getByText(/sourcing items direct from sellers/i)).toBeInTheDocument();
  });
});