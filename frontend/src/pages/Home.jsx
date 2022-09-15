import React, { useState } from "react";
import "./Home.scss";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import client from "../react-query-client";

const fetcher = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

const deletion = (url, body) =>
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

function Home() {
  const [lang, setLang] = useState("");
  const [getid, setGetid] = useState("");

  const mutation = useMutation(
    (body) => fetcher("http://127.0.0.1:8000/api/task-create/", body),
    {
      onSuccess(data) {
        console.log("Got response from backend", data);
        client.invalidateQueries("todos");
        setLang(" ");
      },
      onError(error) {
        console.log("Got error from backend", error);
      },
    }
  );

  const mutationD = useMutation(
    (body) => deletion(`http://127.0.0.1:8000/api/task-delete/${getid}`, body),
    {
      onSuccess(data) {
        console.log("Got response from backend", data);
        client.invalidateQueries("todos");
        setLang(" ");
      },
      onError(error) {
        console.log("Got error from backend", error);
      },
    }
  );

  const { data: tasks, isLoading, isError, } = useQuery(["todos"], () => {
    return fetch("http://127.0.0.1:8000/api/task-list/").then((t) => t.json());
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error with request</h1>;

  function callMutation() {
    mutation.mutate({ title: lang });
  }

  return (
    <div className="Home_container">
      <div className="Home_Add">
        <div className="Home_task-input">
          <input type="text" name="todo_title" value={lang} onChange={(e) => setLang(e.target.value)} placeholder="Add Todo..."/>
        </div>
        <div className="Home_task-post">      
          <button onClick={callMutation}>Submit</button>
        </div>
      </div>
      <div className="Home_List">
        {tasks.map((task) => {
          console.log(task);
          return (
            <div className="Home_list-tasks" key={task.id}>
              <div className="Home_list_tasks-title"> <p>{task.title}</p> </div>
              <div className="Home_list_tasks-button">
                <p className="Home_list_tasks-edit"> <BiEditAlt /> </p>
                <div>
                  <p className="Home_list_tasks-delete" onClick={() => setGetid(task.id, mutationD.mutate())} > <AiOutlineDelete /></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
