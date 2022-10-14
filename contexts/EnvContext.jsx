import { createContext } from "react";
import Constants from "expo-constants";

export const EnvContext = createContext();

export default function EnvProvider({ children }) {
  const baseURL = Constants.manifest.extra.baseURL;
  const dbId = Constants.manifest.extra.dbId;

  return(
    <EnvContext.Provider value={{baseURL: baseURL, dbId: dbId}}>{children}</EnvContext.Provider>
  )
}
