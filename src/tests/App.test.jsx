import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock all page components so broken/unimplemented pages won't crash this test
vi.mock('../pages/Home', () => ({ default: () => <div>Home Page</div> }));
vi.mock('../pages/Products', () => ({ default: () => <div>Products Page</div> }));
vi.mock('../pages/ProductDetails', () => ({ default: () => <div>Product Details Page</div> }));
vi.mock('../pages/Cart', () => ({ default: () => <div>Cart Page</div> }));
vi.mock('../pages/Checkout', () => ({ default: () => <div>Checkout Page</div> }));
vi.mock('../pages/Orders', () => ({ default: () => <div>Orders Page</div> }));
vi.mock('../pages/Login', () => ({ default: () => <div>Login Page</div> }));
vi.mock('../pages/Register', () => ({ default: () => <div>Register Page</div> }));

describe('App Routing', () => {
  it('renders Home page on default path ("/")', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders Products page on "/products"', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Products Page')).toBeInTheDocument();
  });

  it('renders ProductDetails page on dynamic route ("/products/1")', () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Product Details Page')).toBeInTheDocument();
  });

  it('renders Cart page on "/cart"', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Cart Page')).toBeInTheDocument();
  });

  it('renders Login page on "/login"', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});