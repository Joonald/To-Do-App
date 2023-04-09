import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useReducer, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

type toDo = {
  id?: number,
  name?: string,
}

type ACTIONTYPE = 
| {type: 'ADD', payload: toDo} 
| {type: 'DELETE', payload: toDo} 
| {type: 'INPROGRESS', payload: toDo};

type State = {
  counter: number,
  toDoList: toDo[],
  inProgress: toDo[]
}

const initialState: State = {
  counter: 0,
  toDoList: [],
  inProgress: []
}


function myReducer(state: State, action: ACTIONTYPE): State {
  switch (action.type) {
    case 'ADD': {
      const newCounter = state.counter ++;
      const newToDo = {
        id: newCounter,
        name: action.payload.name,
      }
      return {
        ...state,
        toDoList: [...state.toDoList, newToDo]
      }
    };
    case 'DELETE': {
      return {
        ...state,
        toDoList: [...state.toDoList.filter(task => task['id'] !== action.payload.id)],
        inProgress: [...state.inProgress.filter(task => task['id'] !== action.payload.id)],
      }
    };
    case 'INPROGRESS': {
      const newToDo = {
        id: action.payload.id,
        name: action.payload.name
      }
      return {
        ...state,
        inProgress: [...state.inProgress, newToDo],
        toDoList: [...state.toDoList.filter(task => task['id'] !== action.payload.id)]
      }
    }
    default:
      throw new Error('wrong action');
  }
}

export default function Home() {
  const [text, setText] = useState<string>('');
  const [state, dispatch] = useReducer(myReducer, initialState);
  
  function handleAdd(text: string) {
    dispatch({type: 'ADD', payload: {name: text}})
  }
  
  function handleDelete(id: number) {
    dispatch({type:'DELETE', payload: {id:id}})
  }

  function handleInProgress(id: number, name: string) {
    dispatch({type: 'INPROGRESS', payload: {id: id, name: name}})
  }

  console.log(state.inProgress)
  console.log(state.toDoList)
  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1>To Do App</h1>
            <section>
              <input 
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder='To Do'
              />
              <button onClick={ ()=> {handleAdd(text), setText('')}}>
                Submit
              </button>
            </section>
          <section>
            <h2>To Do List</h2>
            {state.toDoList.length > 0
            ?
              <ul>
              {state.toDoList.map((task: toDo)=> {
                return (
                  <> 
                      <li key={task.id}>{task.name}</li>
                      <button onClick={ () => 
                      handleDelete(task.id!)
                      }>
                      Delete
                      </button>
                      <button onClick={ () => 
                        handleInProgress(task.id!, task.name!)}>
                      Move To In Progress
                      </button>
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
                      <button onClick={ () => 
                      handleDelete(task.id!)
                      }>
                      Delete
                      </button>
                  </>
                )
              })}
              </ul>
            :
              <p>In Progress List is Empty</p>
          }
          </section>
        </div>
      </main>
    </>
  )
}
