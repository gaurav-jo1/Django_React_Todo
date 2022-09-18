import React, {useState} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {GiTireIronCross} from "react-icons/gi"
import { useMutation, useQuery } from "@tanstack/react-query";
import "./Tasks.scss";

import client from "../react-query-client";

const deletion = (url, body) =>
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

const Tasks = ({ postID, backButton }) => {
  const [todoTitle, setTodoTitle] = useState("")
  const {
    data: task_detail,
    isLoading,
    isError,
  } = useQuery(["todo"], () => {
    return fetch(`http://127.0.0.1:8000/api/task-detail/${postID}`).then((t) =>
      t.json()
    );
  });

  const mutationD = useMutation(
    (body) => deletion(`http://127.0.0.1:8000/api/task-delete/${postID}`, body),
    {
      onSuccess(data) {
        console.log("Got response from backend", data);
        client.invalidateQueries("todos");
      },
      onError(error) {
        console.log("Got error from backend", error);
      },
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error with request</h1>;

  function deleting_task() {
    mutationD.mutate();
    backButton();
  }


  return (
    <div className="Task_Container">
      <div className="Task_div">
        <div onClick={backButton} className="Task_cross">
          <span> <GiTireIronCross /> </span>
        </div>
        <div className="Task_heading">
          <textarea type="text" name="todo_title_id" value={task_detail.title} onChange={(e) => setTodoTitle(e.target.value)} />
        </div>
        <div className="Task_controls">
          <p onClick={() => deleting_task()} className="delete_container">
            <AiOutlineDelete />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
