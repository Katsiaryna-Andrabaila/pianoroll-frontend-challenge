import { createContext } from "react";
import { AppContextType } from "../types.ts";

const initialContext = { activeRoll: null };
export const AppContext = createContext<AppContextType>(initialContext);
