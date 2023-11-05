import { Button, TextField } from "@mui/material"
import { useState } from "react"
import './style.scss'
import Cookies from "js-cookie";

async function login(user: string, pass: string) {
  try {
    const res = await fetch("https://localhost:3000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, pass })
    });
    if (res.status !== 200)
      return false;
    const data = await res.json();
    Cookies.set('token', data.token);
    location.reload();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default function Login() {
  const [user, setUser] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [fail, setFail] = useState<boolean>(false);

  return <div className="login">
    <form>
      <h1>Log in</h1>
      <TextField label="Username" value={user} onChange={(e) => { setUser(e.target.value as string) }} fullWidth />
      <TextField label="Password" value={pass} onChange={(e) => { setPass(e.target.value as string) }} type="password" fullWidth />
      <Button onClick={() => { if (!login(user, pass)) setFail(true) }} fullWidth>Proceed</Button>
      {fail && <p>Invalid credentials</p>}
    </form>
  </div>
}
