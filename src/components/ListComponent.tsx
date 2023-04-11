import { useContext } from "react"
import { ToDoContext, ToDoDispatchContext } from "./ToDoContext"
import type { toDo } from "@/pages";
import ButtonComponent from "./ButtonComponent";

function ListComponent() {
    const state = useContext(ToDoContext);

    return (
        <section className='todo-list-screen'>
              <section>
                <h2>To Do List</h2>
                {state.toDoList.length > 0
                ?
                  <ul>
                  {state.toDoList.map((task: toDo)=> {
                    return (
                      <> 
                          <li key={task.id}>{task.name}</li>
                          <ButtonComponent id={task.id} name={task.name} type='Delete'/>
                          <ButtonComponent id={task.id} name={task.name} type='In Progress'/>
                      </>
                    )
                  })}
                  </ul>
                :
                  <p>To Do List is Empty</p>
              }
              </section>
              <section>
                <h2>In Progress List</h2>
                {state.inProgress.length > 0
                ?
                  <ul>
                  {state.inProgress.map((task: toDo)=> {
                    return (
                      <> 
                          <li key={task.id}>{task.name}</li>
                          <ButtonComponent id={task.id} name={task.name} type='Delete'/>
                          <ButtonComponent id={task.id} name={task.name} type='Complete'/>
                      </>
                    )
                  })}
                  </ul>
                :
                  <p>In Progress List is Empty</p>
              }
              </section>
              <section>
                <h2>Completed</h2>
                {state.completed.length > 0
                ?
                  <ul>
                  {state.completed.map((task: toDo)=> {
                    return (
                      <> 
                          <li key={task.id}>{task.name}</li>
                          <ButtonComponent id={task.id} name={task.name} type='Delete'/>
                      </>
                    )
                  })}
                  </ul>
                :
                  <p>Completed List is Empty</p>
              }
              </section>
            </section>
    )
}

export default ListComponent