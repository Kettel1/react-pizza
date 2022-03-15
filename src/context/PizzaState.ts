import {createContext} from "react";
import {IPizzaStateContext} from "../types/PizzaTypes";

export const PizzaState = createContext<IPizzaStateContext | null>(null)
