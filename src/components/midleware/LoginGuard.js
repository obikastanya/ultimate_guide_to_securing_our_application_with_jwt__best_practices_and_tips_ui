import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

import auth from "@utils/auth";


export default function LoginGuard({ children }) {
  const [isLogin, setLoginStatus] = useState(null);
  const router = useRouter();

  const useEffectCallback = () => {
    const loginStatus = auth.getAccessToken();
    setLoginStatus(loginStatus);
  };

  useEffect(useEffectCallback);

  if (isLogin) {
    router.push("/");
    return null;
  }
  return <>{children}</>;
}
