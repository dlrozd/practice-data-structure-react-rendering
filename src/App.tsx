import './App.css'
import {useEffect, useState} from "react";

const tasks = [
    {
        id: 1,
        title: "Купить продукты на неделю",
        isDone: false,
        addedAt: "1 сентября",
        priority: 2,
    },
    {
        id: 2,
        title: "Полить цветы",
        isDone: true,
        addedAt: "2 сентября",
        priority: 0,
    },
    {
        id: 3,
        title: "Сходить на тренировку",
        isDone: false,
        addedAt: "3 сентября",
        priority: 1,
    },
    {
        id: 4,
        title: "Срочно отправить рабочий отчет",
        isDone: false,
        addedAt: "4 сентября",
        priority: 4,
    },
    {
        id: 5,
        title: "Заплатить за коммунальные услуги",
        isDone: false,
        addedAt: "3 сентября",
        priority: 3,
    },
]

export function App() {

    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

    const [selectedTask, setSelectedTask] = useState(null)

    const [boardId, setBoardId] = useState("");

    useEffect(() => {
        fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
            headers: {"api-key": "7fddcc08-7109-4369-88ea-5037c0b497e3"}
        })
            .then(res => res.json())
            .then(json => {
                // Если доски есть, берем ID первой доски
                if (json.data && json.data.length > 0) {
                    setBoardId(json.data[0].id);
                }
            });
    }, []);

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
                    }}>Сбросить выделение
                    </button>
                    <ul>
                        {tasks.map((task) =>
                            <li className="task"
                                key={task.id}
                                style={{
                                    ...getTaskStyle(task.priority),
                                    border: task.id === selectedTaskId ? "3px solid black" : "none",
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    setSelectedTaskId(task.id)

                                    // Если boardId еще не загрузился, запрос не пойдет
                                    if (!boardId) return;

                                    fetch(`https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${task.id}`, {
                                        headers: {"api-key": "7fddcc08-7109-4369-88ea-5037c0b497e3"},
                                    })
                                        .then((res) => res.json())
                                        .then((json) => {
                                            // Защита от белого экрана: проверяем, что данные пришли
                                            if (json.data) {
                                                setSelectedTask(json.data)
                                            }
                                        })
                                        .catch(err => console.error("Ошибка:", err))
                                }}
                            >
                                <div>
                                    <p>Заголовок:</p>
                                    <p style={{textDecorationLine: task.isDone ? "line-through" : "none"}}>
                                        {task.title}
                                    </p>
                                </div>
                                <div>
                                    <p>Статус:</p>
                                    <input type={"checkbox"} checked={task.isDone}/>
                                </div>
                                <div>
                                    <span>Дата создания задачи:</span>
                                    <p>{task.addedAt}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="right-side">
                    <h2>More:</h2>
                    {selectedTask === null ? (
                        "Task is not selected"
                    ) : (
                        <div>
                            <h3>{selectedTask.attributes.title}</h3>
                            <h4>{selectedTask.attributes.boardTitle}</h4>
                            <h5>{selectedTask.description ?? "no tasks"}</h5>
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}

export default App