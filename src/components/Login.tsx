import { useState } from "react"
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password) {
            setMessage("Bitte Email und Passwort eingeben!")
            return
        }
        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()
        if (data.success) {
            localStorage.setItem("token", data.token)
            navigate("/dashboard")
        } else {
            setMessage(data.message)
        }
    }

    return (
        // Der Container zentriert alles, was darin liegt
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-zinc-950">
            <h1 className="font-black text-3xl mb-4 text-white">Login</h1>

            <input
                className="border p-2 w-64 bg-zinc-900 text-white border-zinc-700 rounded-xl"
                type="email"
                placeholder="Email"
                value={email} onChange={e => setEmail(e.target.value)}
            />

            <input
                className="border p-2 w-64 bg-zinc-900 text-white border-zinc-700 rounded-xl"
                type="password"
                placeholder="Passwort"
                value={password} onChange={e => setPassword(e.target.value)}

            />

            <button className="bg-blue-500 text-white py-2 px-4 w-64 rounded-xl hover:cursor-pointer hover:bg-blue-900 transition duration-200 ease-in-out" onClick={handleLogin}>
                Login
            </button>
            {message && <p className="text-white text-sm">{message}</p>}
            <a
            className="text-white hover:text-indigo-500 focus:text-indigo-500 transition duration-200 ease-in-out font-bold"
            href="/register"
            >Register</a>
        </div>
    )
}

export default Login