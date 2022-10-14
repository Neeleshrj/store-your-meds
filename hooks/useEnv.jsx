import { useContext } from "react";

import { EnvContext } from "../contexts/EnvContext";

export default function useEnv() {
  return useContext(EnvContext);
}
