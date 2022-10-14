import Auth from "./screens/Auth";

//router
import Router from "./router/router";

//hooks
import EnvProvider from "./contexts/EnvContext";
import AppWriteProvider from "./contexts/AppWriteContext";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
  return (
    <EnvProvider>
      <AppWriteProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </AppWriteProvider>
    </EnvProvider>
  );
}
