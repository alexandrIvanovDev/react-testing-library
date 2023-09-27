import './App.css';
import {useEffect, useState} from 'react';
import {Posts} from './components/posts/Posts';

const getUser = () => Promise.resolve({id: 1, name: 'Alex'})

function App() {
    const [value, setValue] = useState('');
    const [user, setUser] = useState()

    useEffect(() => {
        const loadUser = async () => {
            const user = await getUser()
            setUser(user)
        }
        loadUser()
    }, []);

    const onChangeValue = (e) => {
        setValue(e.target.value)
    }
    return (
        <div className="App">
            {user && <h2>Username {user.name}</h2>}
            <Search value={value} onChange={onChangeValue}>Search:</Search>
            <span>Search for: {value ? value : '...'}</span>
            <Posts/>
        </div>
    );
}

export const Search = ({children, value, onChange}) => {
    return (
        <div>
            <label htmlFor="search">{children}</label>
            <input
                placeholder='Search...'
                type="text"
                id="search"
                value={value}
                onChange={onChange}
                // required
            />
            <img src="" alt="img"/>
        </div>
    )
}

export default App;
