import {createContext, useContext, useState} from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false)

    const toggleIsAuth = () => {
        setIsAuth(!isAuth)
    }

    return (
        <AuthContext.Provider value={{isAuth, toggleIsAuth}}>
            <div>Message: {children}</div>
        </AuthContext.Provider>
    )
}

const ConsumerComponent = () => {
    const {isAuth, toggleIsAuth} = useContext(AuthContext)

    return (
        <>
            <input type="button" onClick={toggleIsAuth}/>
            <span>{isAuth ? 'Welcome' : 'Please, log in'}</span>
        </>
    )
}

describe('Context', () => {
    it('should show default value', () => {
        const {getByText} = render(
            <AuthProvider>
                <ConsumerComponent/>
            </AuthProvider>
        )
        expect(getByText(/message/i)).toHaveTextContent('Message: Please, log in')
    });
    it('change is auth', () => {
        const {getByText, getByRole} = render(
            <AuthProvider>
                <ConsumerComponent/>
            </AuthProvider>
        )
        userEvent.click(getByRole('button'))
        expect(getByText(/message/i)).toHaveTextContent('Message: Welcome')
    });
})