import React from 'react'

const Tasks = () => {
  return (
    <div className="Home_List">
    {tasks.map((task) => {
      return (
        <div className="Home_list-tasks" key={task.id}>
          <div className="Home_list_tasks-title">
            <p>{task.title}</p>{" "}
          </div>
          <div className="Home_list_tasks-button">
            <p className="Home_list_tasks-edit">
              <BiEditAlt />{" "}
            </p>
            <div>
              <p className="Home_list_tasks-delete">
                <AiOutlineDelete onClick={() => setGetid(task.id,deleting_function())}/>
              </p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
  )
}

export default Tasks