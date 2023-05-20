import { useState } from "react";
import { useRouter } from "next/router";

import apis from "@services/auth";
import auth from "@utils/auth";

import styles from "@styles/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const loginResponse = await apis.login(username, password);
    setLoading(false);

    const data = await loginResponse.json();
    if (loginResponse.status != 200) return alert(data.message);

    auth.storeCredential(data);

    let permissionResponse = await apis.getPermissions();
    let permission = await permissionResponse.json();

    if (permissionResponse.status != 200) {
      console.log(permission.message);
      return;
    }

    auth.storePermissions(permission.data.permissions);
    router.push("/");
  };

  return (
    <main className={styles.container}>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Username</label>
          <input
            className={styles.input}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className={styles.button}>
            {loading ? "Loading..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}
