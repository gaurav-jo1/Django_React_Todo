import React from "react";
import './Home.scss'
// import { useQuery } from "@tanstack/react-query";

// const fetcher = () => {
//   return fetch(`http://127.0.0.1:8000/api/task-list/`).then((res) => res.json());
// };

function Home() {
  //   const { data, isLoading } = useQuery(["todo-list"], () => fetcher());

  //   if (isLoading) return <h2>Loading....</h2>;

  // const [todo, setTodo] = useState('')

  return (
    <div className="Home_container">
        <div className="Home_Add">
            <div className="Home_task-input">
                <input type="text" name="todo" placeholder="Add Todo..."/>
            </div>
            <div className="Home_task-post">
                <input type="submit" />
            </div>
        </div>
        <div className="Home_List">
            <h1>Hello Priya</h1>
        </div>
    </div>
  );
}

export default Home;
