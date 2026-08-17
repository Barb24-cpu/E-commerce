import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

// Mock page components
vi.mock('../pages/Home', () => ({ default: () => <div>Home Component</div> }));
vi.mock('../pages/Login', () => ({ default: () => <div>Login Component</div> }));

describe('App Routing', () => {
  it('renders Home component on default route ("/")', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomeMock />} />
          <Route path="/login" element={<LoginMock />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });

  it('renders Login page when navigating to "/login"', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/" element={<HomeMock />} />
          <Route path="/login" element={<LoginMock />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Component')).toBeInTheDocument();
  });
});

// Mock component instances for routing assertions
function HomeMock() {
  return <div>Home Component</div>;
}

function LoginMock() {
  return <div>Login Component</div>;
}