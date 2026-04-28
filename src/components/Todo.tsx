import { useState } from 'react'

type Todo = {
    id: number
    text: string
    done: boolean
}

function Todo() {
    const [input, setInput] = useState('')
    const [todos, setTodos] = useState<Todo[]>([])

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ))
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const prozent = todos.length === 0 ? 0 :
        Math.round(todos.filter(t => t.done).length / todos.length * 100)

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex justify-center px-5 py-12">
            <div className="w-full max-w-lg">

                <h1 className="text-5xl font-black tracking-tight mb-8">
                    Meine <span className="text-lime-400">Tasks</span>
                </h1>
                <div className="h-2 bg-zinc-800 rounded-full mb-8">
                    <div
                        className="h-full bg-lime-400 rounded-full transition-all duration-700"
                        style={{ width: prozent + '%' }}
                    />
                    <p className="flex justify-center">
                        Progress
                        </p>
                </div>

                {/* Input */}
                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        placeholder="Neue Aufgabe..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && setTodos([...todos, { id: Date.now(), text: input, done: false }]) && setInput('')}
                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-lime-400 rounded-xl px-5 py-3 text-sm outline-none transition placeholder-zinc-600"
                    />
                    <button
                        onClick={() => {
                            setTodos([...todos, { id: Date.now(), text: input, done: false }])
                            setInput('')
                        }}
                        className="bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold px-5 py-3 rounded-xl text-sm transition"
                    >
                        + Hinzufügen
                    </button>
                </div>

                {/* Liste */}
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

export default Todo