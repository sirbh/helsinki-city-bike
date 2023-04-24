import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render Hello World', () => {
        const { container } = render(<App />);

        expect(container.querySelector('#app')).toHaveTextContent('Hello');
    });
});
