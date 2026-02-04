import './App.css'
import {useState, useEffect} from "react";

type TaskAttributes = {
    title: string;
    boardId: string;
    status: number;
    priority: number;
    addedAt: string;
    boardTitle?: string;
    description?: string;
}

type Task = {
    id: string;
    type: string;
    attributes: TaskAttributes;
}

export function App() {
    const [tasks, setTasks] = useState<Task[] | null>(null)
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const [selectedTask, setSelectedTask] = useState(null)

    // Загружаем список задач при монтировании компонента
    useEffect(() => {
        fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
            headers: { "api-key": "78f7ca66-3cbd-43c6-a249-919ac6aced25" },
        })
            .then((res) => res.json())
            .then((json) => {
                setTasks(json.data)
            })
    }, [])

    if (tasks === null) {
        return (
            <div>
                <h1>Task list:</h1>
                <p>Loading...</p>
            </div>
        )
    }
    if (tasks.length === 0) {
        return (
            <div>
                <h1>Task list:</h1>
                <div>No tasks</div>
            </div>
        )
    }

    const getTaskStyle = (priority: number) => {
        if (priority === 4) return {backgroundColor: "#ffe3e3", color: "black"};
        if (priority === 3) return {backgroundColor: '#fff9db', color: '#856404'};
        if (priority === 2) return {backgroundColor: '#e3faf3', color: '#0c8569'};
        if (priority === 1) return {backgroundColor: '#ffffff', color: '#2d4436'};
        return {backgroundColor: '#e4d333', color: "white"};
    }

    return (
        <div className="App">
            <div className="main-container">
                <div className="left-side">
                    <h1>Task list:</h1>
                    <button onClick={() => {
                        setSelectedTaskId(null)
                        setSelectedTask(null)
                    }}>Сбросить выделение
                    </button>
                    <ul>
                        {tasks.map((task) =>
                            <li className="task"
                                key={task.id}
                                style={{
                                    ...getTaskStyle(task.attributes.priority),
                                    border: task.id === selectedTaskId ? "3px solid black" : "1px solid transparent",
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    setSelectedTask(null)

                                    setSelectedTaskId(task.id)

                                    fetch(
                                        `https://trelly.it-incubator.app/api/1.0/boards/${task.attributes.boardId}/tasks/${task.id}`,
                                        {
                                            headers: { "api-key": "78f7ca66-3cbd-43c6-a249-919ac6aced25" },
                                        },
                                    )
                                        .then((res) => res.json())
                                        .then((json) => {
                                            setSelectedTask(json.data)
                                        })
                                }}
                            >
                                <div>
                                    <p>Заголовок:</p>
                                    <p style={{textDecorationLine: task.attributes.status === 2 ? "line-through" : "none"}}>
                                        {task.attributes.title}
                                    </p>
                                </div>
                                <div>
                                    <p>Статус:</p>
                                    <input type={"checkbox"} checked={task.attributes.status === 2}/>
                                </div>
                                <div>
                                    <span>Дата создания задачи:</span>
                                    <p>{new Date(task.attributes.addedAt).toLocaleDateString()}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="right-side">
                    <h2>Details:</h2>
                    {selectedTaskId === null ? (
                        "Task is not selected"
                    ) : selectedTask === null ? (
                        "Loading..."
                    ) : (
                        <div>
                            <h3>{selectedTask?.attributes?.title}</h3>
                            <p><strong>Board:</strong> {selectedTask?.attributes?.boardTitle ?? "Unknown board"}</p>
                            <h4>Description:</h4>
                            <p>{selectedTask?.attributes?.description ?? "no description"}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App