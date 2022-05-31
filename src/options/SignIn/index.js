import React, { useEffect, useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import AuthenticatedView from "./AuthenticatedView";
import SignInButtons from "./SignInButtons";
import { getApiInstance } from "../../providers/builder";

const SignIn = () => {
  const [userData, setUserData] = useState(undefined);

  function resetUserData() {
    setUserData(null);
  }

  useEffect(() => {
    (async () => {
      try {
        const provider = await getApiInstance();
        const data = await provider?.getUserData();
        setUserData(data ?? null);
      } catch {
        setUserData(null);
      }
    })();
  }, [setUserData]);

  if (userData === undefined) {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  }

  if (userData === null) {
    return <SignInButtons />;
  }

  return <AuthenticatedView userData={userData} reset={resetUserData} />;
};

export default SignIn;
