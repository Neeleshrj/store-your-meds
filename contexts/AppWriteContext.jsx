import { createContext } from "react";
import { Client } from "appwrite";

//hooks
import useEnv from "../hooks/useEnv";

export const AppWriteContext = createContext();

export default function AppWriteProvider({children}){
    const { baseURL, dbId } = useEnv();
    const client = new Client();

    client
    .setEndpoint(baseURL) // Your API Endpoint
    .setProject('store-your-meds'); // Your project ID

    return (
        <AppWriteContext.Provider value={{client: client, dbId: dbId}}>
            {children}
        </AppWriteContext.Provider>
    )

}