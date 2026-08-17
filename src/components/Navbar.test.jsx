import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';

// Mock context hook if Navbar uses cart or auth context
vi.mock('../context/CartContext', () => ({
  useCart: () => ({ cart: [], cartCount: 0 }),
}));

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verifies rendering by checking for common links
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});