import { useContext, useState } from "react";
import { ToDoDispatchContext } from "./ToDoContext";

type ButtonProps = {
    type: string,
    name?: string,
    id?: number,
}

function ButtonComponent({type, id, name}: ButtonProps) {
    const dispatch = useContext(ToDoDispatchContext);

    function handleDelete(id: number) {
        dispatch({type:'DELETE', payload: {id:id}})
      }
    
    function handleInProgress(id: number, name: string) {
        dispatch({type: 'INPROGRESS', payload: {id: id, name: name}})
      }
    
    function handleCompleted(id: number, name: string) {
        dispatch({type: 'COMPLETED', payload: {id: id, name: name}})
      }
    
    function Button({type, id, name}: ButtonProps) {
        if (type === 'Delete') {
            return (
                <button className='btn' onClick={() => handleDelete(id!)}>{type}</button>
            )
        }
        if (type === 'In Progress') {
            return (
                <button className='btn' onClick={() => handleInProgress(id!, name!)}>Move to In Progress</button>
            )
        }
        if (type === 'Complete') {
            return (
                <button className='btn' onClick={() => handleCompleted(id!, name!)}>{type}</button>
            )
        } 
        else {
            return null;
        }
    }
    return (
        <>
        <Button type={type} id={id} name={name}/>
        </>
    )
    
}
export default ButtonComponent;
