import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

import auth from "@utils/auth";
import apis from "@services/auth";
import constant from "@utils/constant";

import Forbidden from "@components/error/forbidden";

export default function AuthGuard({ permission, children }) {
  const [isLogin, setLoginStatus] = useState(null);
  const [isHasPermission, setPermission] = useState(null);
  const [isTokenExpired, setTokenExpired] = useState(null);

  const router = useRouter();

  const checkTokenExpiration = () => {
    const expiration = auth.getExpiration();
    if (!expiration) return [false, 0];

    const expiredAt = new Date(expiration);
    const currentTime = new Date();

    const expirationStatus = currentTime.getTime() > expiredAt.getTime();
    const lifetimeLeft = expiredAt.getTime() - currentTime.getTime();
    return [expirationStatus, lifetimeLeft];
  };

  const refreshTokens = async () => {
    const response = await apis.getNewTokens();
    const data = await response.json();
    if (response.status != 200) return console.log(data.message);
    auth.storeCredential(data.data);
  };

  const watchTokenExpiration = () => {
    const watchToken = () => {
      const [_, lifetimeLeft] = checkTokenExpiration();

      if (lifetimeLeft > 0 && lifetimeLeft < constant.REFRESH_TOKEN_INTERVAL) {
        refreshTokens();
      }
    };
    const intervalId = setInterval(
      watchToken,
      constant.REALTIME_WATCH_TOKEN_INTERVAL
    );
    return intervalId;
  };


  const useEffectCallback = () => {
    const loginStatus = auth.getAccessToken();

    let permissionStatus = true;
    if (permission) permissionStatus = auth.hasPermission(permission);

    const [expiredStatus, _] = checkTokenExpiration();

    setPermission(permissionStatus);
    setLoginStatus(loginStatus);
    setTokenExpired(expiredStatus);

    if (!expiredStatus) {
      const intervalId = watchTokenExpiration();
      return () => clearInterval(intervalId);
    }

  };

  useEffect(useEffectCallback, []);

  if (isHasPermission === null || isLogin === null || isTokenExpired == null) {
    return null;
  }

  if (!isLogin ) {
    router.push("/login");
    return null;
  }
  
  if ( isTokenExpired ) {
    router.push("/logout");
    return null;
  }

  if (!isHasPermission) {
    return <Forbidden message="You dont have any permission"></Forbidden>;
  }

  return <>{children}</>;
}
