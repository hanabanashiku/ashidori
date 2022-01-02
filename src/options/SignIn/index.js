import React, { useEffect, useState } from "react";
import { getApiInstance } from "../../providers/builder";
import SignInButtons from "./SignInButtons";

const SignIn = () => {
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    (async () => {
      const provider = await getApiInstance();
      setUserData((await provider?.getUserData()) ?? null);
    })();
  }, [setUserData]);

  if (userData === undefined) {
    return "Loading";
  }

  if (userData === null) {
    return <SignInButtons />;
  }
};

export default SignIn;
