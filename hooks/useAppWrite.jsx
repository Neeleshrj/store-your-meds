import { useContext } from "react";

import { AppWriteContext } from "../contexts/AppWriteContext";

export default function useAppWrite() {
  return useContext(AppWriteContext);
}
