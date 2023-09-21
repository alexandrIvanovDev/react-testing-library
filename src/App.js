import './App.css';
import {useState} from 'react';

function App() {
    const [value, setValue] = useState('');
    const onChangeValue = (e) => {
        setValue(e.target.value)
    }
    return (
        <div className="App">
            <Search value={value} onChange={onChangeValue}>Search:</Search>
            <span>Search for: {value ? value : '...'}</span>
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
            />
            <img src="" alt="img"/>
        </div>
    )
}

export default App;
