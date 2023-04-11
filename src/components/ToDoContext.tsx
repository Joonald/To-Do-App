import { Dispatch, createContext } from "react";
import type { ACTIONTYPE, State } from "@/pages";

export const ToDoContext = createContext<State>(
    {
        counter: 0,
        toDoList: [],
        inProgress: [],
        completed:[]
    }
);

export const ToDoDispatchContext = createContext<Dispatch<ACTIONTYPE>>(
    () => {}
);