import { useState, useEffect } from "react";
import utilityFunctions from "../services/HelperFunctionV0_2";

export function useUser() {
  let [user, setUser] = useState(null);

  useEffect(() => {
    utilityFunctions.admin.isSignedIn()
      ? setUser(utilityFunctions.accessProtected.currentUserLocal())
      : setUser(null);
  }, []);

  return { ...user };
}
