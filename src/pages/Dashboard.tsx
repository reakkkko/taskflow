import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Todo = {
    id: number
    text: string
    done: boolean
}

function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch('http://localhost:3001/todos', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(data => {
                if (data.success) setTodos(data.todos)
            })
    }, [])

    const addTodo = async () => {
        if (!input.trim()) return
        const response = await fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ text: input })
        })
        const data = await response.json()
        if (data.success) {
            setTodos([...todos, data.todo])
            setInput('')
        }
    }

    const toggleTodo = async (id: number) => {
        const response = await fetch(`http://localhost:3001/todos/${id}`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        if (data.success) {
            setTodos(todos.map(t => t.id === id ? data.todo : t))
        }
    }

    const deleteTodo = async (id: number) => {
        const response = await fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        if (data.success) {
            setTodos(todos.filter(t => t.id !== id))
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const prozent = todos.length === 0 ? 0 :
        Math.round(todos.filter(t => t.done).length / todos.length * 100)

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex justify-center px-5 py-12">
            <div className="w-full max-w-lg">

                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-5xl font-black tracking-tight">
                        Meine <span className="text-lime-400">Tasks</span>
                    </h1>
                    <button
                        onClick={logout}
                        className="text-zinc-500 hover:text-red-400 transition text-sm border border-zinc-800 px-4 py-2 rounded-xl"
                    >
                        Logout
                    </button>
                </div>

                <div className="h-2 bg-zinc-800 rounded-full mb-2">
                    <div
                        className="h-full bg-lime-400 rounded-full transition-all duration-700"
                        style={{ width: prozent + '%' }}
                    />
                </div>
                <p className="text-zinc-500 text-xs mb-8 text-center">{prozent}% erledigt</p>

                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        placeholder="Neue Aufgabe..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addTodo()}
                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-lime-400 rounded-xl px-5 py-3 text-sm outline-none transition placeholder-zinc-600"
                    />
                    <button
                        onClick={addTodo}
                        className="bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold px-5 py-3 rounded-xl text-sm transition"
                    >
                        + Hinzufügen
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    {todos.map(todo => (
                        <div
                            key={todo.id}
                            className="group flex items-center gap-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl px-5 py-4 transition"
                        >
                            <div
                                onClick={() => toggleTodo(todo.id)}
                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition flex-shrink-0 ${
                                    todo.done
                                        ? 'bg-lime-400 border-lime-400 text-zinc-950 text-xs font-black'
                                        : 'border-zinc-700 hover:border-lime-400'
                                }`}
                            >
                                {todo.done && '✓'}
                            </div>
                            <span className={`flex-1 text-sm ${todo.done ? 'line-through text-zinc-500' : ''}`}>
                {todo.text}
              </span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-zinc-700 hover:text-red-400 transition opacity-0 group-hover:opacity-100 text-lg"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Dashboard