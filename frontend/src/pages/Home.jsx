import React, { useState } from "react";
import "./Home.scss";
import { useQuery, useMutation } from "@tanstack/react-query";

import client from "../react-query-client";
import Tasks from "./Tasks";
import Completed from "./Completed";

const fetcher = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

function Home() {
  const [lang, setLang] = useState("");
  const [postID, setPostID] = useState(null);
  const [postTitle, setPostTitle] = useState(null)
  

  const { data: tasks, isLoading, isError } = useQuery(["todos"], () => {
    return fetch("http://127.0.0.1:8000/api/task-list/").then((t) => t.json());
  });

  const mutation = useMutation(
    (body) => fetcher("http://127.0.0.1:8000/api/task-create/", body),
    { onSuccess(data) {
        console.log("Got response from backend", data);
        client.invalidateQueries("todos");
        setLang(" ");
      },
      onError(error) {
        console.log("Got error from backend", error);
      },
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error with request</h1>;

  function callMutation() {
    mutation.mutate({ title: lang });
  }

  if (postID !== null) {
    return (
      <Tasks postID={postID} backButton={backButton} postTitle={postTitle} />
    );
  }

  function backButton(){
    return setPostID(null)
  }

  function settingPost(task){
    setPostID(task.id)
    setPostTitle(task.title)
  }


  


  return (
    <div className="Home_container">
      <div className="Home_Add">
        <div className="Home_task-input">
          <input type="text" name="todo_title" value={lang} onChange={(e) => setLang(e.target.value)} placeholder="Add Todo..." />
        </div>
        <div className="Home_task-post">
          <button onClick={callMutation}>Submit</button>
        </div>
      </div>
        {console.log(tasks)}
      <div className="Home_List">
        {tasks.map((task) => {
          return (
            <div className="Home_list-tasks" key={task.id}>
              <div className="Home_list_tasks-title">
                <a onClick={() => settingPost(task)} href="#0"> {task.completed ? <strike>{task.title}</strike> : <p>{task.title}</p>} </a>
              </div>
              <div>
                <Completed complete={task.completed} taskId={task.id} taskTitle={task.title} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;