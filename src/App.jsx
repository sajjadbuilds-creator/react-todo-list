import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    'Learn React state management',
    'Practice event handling',
  ])
  const [text, setText] = useState('')

  function addTask(event) {
    event.preventDefault()
    const nextTask = text.trim()
    if (!nextTask) return
    setTasks((currentTasks) => [...currentTasks, nextTask])
    setText('')
  }

  function toggleTask(index) {
    setTasks((currentTasks) =>
      currentTasks.map((task, taskIndex) =>
        taskIndex === index
          ? typeof task === 'string'
            ? { text: task, completed: true }
            : { ...task, completed: !task.completed }
          : task,
      ),
    )
  }

  function deleteTask(index) {
    setTasks((currentTasks) =>
      currentTasks.filter((_, taskIndex) => taskIndex !== index),
    )
  }

  return (
    <main className="todo-app">
      <header>
        <h1>Todo List</h1>
      </header>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter a task..."
          aria-label="New task"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list" aria-label="Tasks">
        {tasks.map((task, index) => {
          const taskText = typeof task === 'string' ? task : task.text
          const completed =
            typeof task === 'string' ? false : Boolean(task.completed)

          return (
            <li className={completed ? 'task completed' : 'task'} key={index}>
              <span>{taskText}</span>
              <div className="actions">
                <button
                  type="button"
                  className="complete-button"
                  onClick={() => toggleTask(index)}
                  aria-label={
                    completed
                      ? `Mark ${taskText} as incomplete`
                      : `Mark ${taskText} as completed`
                  }
                >
                  {completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                  aria-label={`Delete ${taskText}`}
                >
                  Delete
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default App
