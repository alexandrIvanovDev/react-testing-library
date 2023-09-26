import {render, screen} from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

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

    it('User event test', async () => {
        render(<App/>);
        const input = screen.getByRole('textbox');

        expect(await screen.findByText(/Username alex/i)).toBeInTheDocument();

        expect(screen.queryByText(/search for: hello/i)).toBeNull()
        userEvent.type(input, 'hello');
        expect(screen.getByText(/search for: hello/i)).toBeInTheDocument()
    });

    it('Checkbox', () => {
        const handleChange = jest.fn()
        const {container} = render(<input type="checkbox" onChange={handleChange}/>)

        const checkbox = container.firstChild
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).not.toBeChecked()
        userEvent.click(checkbox)
        expect(checkbox).toBeChecked()
        expect(handleChange).toHaveBeenCalledTimes(1)
    });

    it('Input', () => {
        const {getByTestId} = render(<input type="text" data-testid="input-test"/>)
        const input = getByTestId('input-test')
        expect(input).toBeInTheDocument()
        expect(input).not.toHaveFocus()
        input.focus()
        expect(input).toHaveFocus()
    });

    it('Checkbox double click', () => {
        const handleChange = jest.fn()
        const {getByTestId} = render(<input type="checkbox" onChange={handleChange} data-testid="id"/>)

        const checkbox = getByTestId('id')
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).not.toBeChecked()
        userEvent.dblClick(checkbox)
        expect(handleChange).toHaveBeenCalledTimes(2)
    });

    it('foucs with tab', () => {
        const {getAllByTestId} = (render(
            <div>
                <input type="checkbox" data-testid="el"/>
                <input type="radio" data-testid="el"/>
                <input type="number" data-testid="el"/>
            </div>))
        const [checkbox, radio, number] = getAllByTestId('el')

        userEvent.tab()
        expect(checkbox).toHaveFocus();
        userEvent.tab()
        expect(radio).toHaveFocus();
    });

    it('select', () => {
        const {getByRole, getByText} = (render(
            <select>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
            </select>))

        const select = getByRole('combobox')

        userEvent.selectOptions(select, '1')
        expect(getByText('A').selected).toBeTruthy()
        userEvent.selectOptions(select, '2')
        expect(getByText('B').selected).toBeTruthy()
    });
})

jest.mock('axios')

const data = [
    {id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'},
    {id: 2, title: 'qui est esse'}
]

describe('mock axios', () => {
    it('posts should be displayed', async () => {
        render(<App/>);
        const button = screen.getByRole('button');

        axios.get.mockImplementation(() => Promise.resolve({data}));
        userEvent.click(button);
        const items = await screen.findAllByRole('listitem');
        expect(items.length).toBe(2)
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts')
    });
    it('error should be displayed', async () => {
        render(<App/>);
        const button = screen.getByRole('button');

        axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
        userEvent.click(button);
        const error = await screen.findByText(/something went wrong/i);
        expect(error).toBeInTheDocument()
    });
})