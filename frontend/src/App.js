import React from "react";
import { useQuery } from "@tanstack/react-query";
import './App.scss';

const fetcher = (repo) => {
  return fetch(`http://127.0.0.1:8000/api/task-list/`).then(res => res.json())
}

function App() {
  // const [todo, setTodo] = useState('')

  const {data, isLoading} = useQuery(['todo-list' ], () => fetcher())

  if(isLoading) return <h2>Loading....</h2>

  return (
    <div>
      <h1>Hello World</h1>
      {console.log(data)}
    </div>
  );
}

export default App;
