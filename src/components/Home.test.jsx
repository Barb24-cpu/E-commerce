import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock child pages to isolate route testing
vi.mock('../pages/Home', () => ({ default: () => <div>Home Component</div> }));
vi.mock('../pages/Login', () => ({ default: () => <div>Login Component</div> }));
vi.mock('../pages/Products', () => ({ default: () => <div>Products Component</div> })); // Add this line

describe('App Routing', () => {
  it('renders Home component on default route ("/")', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });

  it('renders Login page when navigating to "/login"', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Login Component')).toBeInTheDocument();
  });
});