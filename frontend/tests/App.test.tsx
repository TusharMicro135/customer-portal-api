import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('renders the customer account and billing heading', () => {
    const markup = renderToStaticMarkup(<App />);
    expect(markup).toContain('Customer Account and Billing Portal');
  });

  it('renders the customer payment dashboard', () => {
    const markup = renderToStaticMarkup(<App />);
    expect(markup).toContain('Customer payment status');
  });
});
