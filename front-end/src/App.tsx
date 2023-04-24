import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [info, setInfo] = useState();
    useEffect(() => {
        axios.get('/api/info').then((resp) => {
            setInfo(resp.data);
        });
    }, []);
    return (
        <div id="app">
            <h1>Hello</h1>
            <h1>{info}</h1>
        </div>
    );
}

export default App;
