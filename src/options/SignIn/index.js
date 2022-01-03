import React, { useEffect, useState } from "react";
import { getApiInstance } from "../../providers/builder";
import AuthenticatedView from "../AuthenticatedView";
import SignInButtons from "./SignInButtons";

const SignIn = () => {
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    (async () => {
      const provider = await getApiInstance();
      const data = await provider?.getUserData();
      setUserData(data ?? null);
    })();
  }, [setUserData]);

  if (userData === undefined) {
    return "Loading";
  }

  if (userData === null) {
    return <SignInButtons />;
  }

  return <AuthenticatedView userData={userData} />;
};

export default SignIn;
