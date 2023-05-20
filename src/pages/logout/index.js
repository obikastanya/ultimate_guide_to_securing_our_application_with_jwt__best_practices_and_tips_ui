import { useEffect } from "react";
import { useRouter } from "next/router";

import auth from "@utils/auth";
import apis from "@services/auth";

export default function Logout() {
  const router = useRouter();

  const logout = async () => {
    const response = await apis.logout();
    const data = await response.json();
    if (response.status != 200) {
      alert(data.message);
      router.push("/");
      return;
    }
    auth.removeCredential();
    auth.removePermissions();
    router.push("/login");
  };

  const useEffectCallback = () => {
    const isLogin = auth.getAccessToken();
    
    if (!isLogin) {
      router.push("/login");
    } else {
      logout();
    }

  };
  useEffect(useEffectCallback, []);
  return null;
}
