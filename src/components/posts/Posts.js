import {useState} from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts'

export const Posts = () => {
    const [post, setPost] = useState([])
    const [error, setError] = useState('')

    const fetchPosts = async () => {
        try {
            const res = await axios.get(URL)
            setPost(res.data)
        } catch (e) {
            setError(e)
        }
    }

    return (
        <div>
            <button onClick={fetchPosts}>Fetch posts</button>

            {error && <span>Something went wrong...</span>}

            <ul>
                {post.map(p => <li key={p.id}>{p.title}</li>)}
            </ul>
        </div>
    )
}