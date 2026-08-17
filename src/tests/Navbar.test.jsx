import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../components/Navbar';

// Mock context hook from src/context/CartContext
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

    // Verifies rendering by checking for navigation role
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});