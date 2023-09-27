import {configureStore} from '@reduxjs/toolkit';
import counterReducer, {decrement, increment} from './reducer';
import {render} from '@testing-library/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import userEvent from '@testing-library/user-event';

export const ReduxTest = () => {
    const value = useSelector(state => state.value)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>{value}</h1>
            <button onClick={() => dispatch(increment())}>inc</button>
            <button onClick={() => dispatch(decrement())}>decr</button>
        </div>
    )
}

const renderWithRedux = (
    component,
    { store = configureStore({ reducer: counterReducer }) } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store
    }
}

describe('Redux test', () => {
    it('check initial state', () => {
        const {getByRole, getByText} = renderWithRedux(<ReduxTest/>)
        expect(getByRole('heading')).toHaveTextContent('0')
    });
    it('inc state', () => {
        const {getByRole, getByText} = renderWithRedux(<ReduxTest/>)
        userEvent.click(getByText('inc'))
        expect(getByRole('heading')).toHaveTextContent('1')
    });
    it('decr state', () => {
        const {getByRole, getByText} = renderWithRedux(<ReduxTest/>)
        userEvent.click(getByText('decr'))
        expect(getByRole('heading')).toHaveTextContent('-1')
    });
})