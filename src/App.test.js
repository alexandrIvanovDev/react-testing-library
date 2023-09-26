import {render, screen} from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders App component', () => {
        render(<App/>)

        // If you need to find an element - getBy
        expect(screen.getByText(/search for/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
        expect(screen.getByAltText('img')).toBeInTheDocument();
        expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });
    it('renders App component with queryBy', () => {
        render(<App/>)

        // If you need to show, that an element missing in the DOM - queryBy
        expect(screen.queryByText(/search for: react/i)).toBeNull();
    });
    it('renders App component with findBy', async () => {
        render(<App/>)
        expect(screen.queryByText(/Username/i)).toBeNull();

        // If the element appears when the asynchronous code is running
        expect(await screen.findByText(/Username alex/i)).toBeInTheDocument();
    });
    it('Input test', () => {
        render(<App/>);
        const input = screen.getByRole('textbox');

        expect(input).not.toBeRequired();
        expect(input).toBeEmptyDOMElement();
        expect(input).toHaveAttribute('id');
    });
})
