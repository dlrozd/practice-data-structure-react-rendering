import './App.css'

// const tasks = null;

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

    const getTaskStyle = (priority) => {
        if (priority === 4) {
            return {
                backgroundColor: "#ffe3e3",
                color: "black",
                borderColor: '#ffc1c1',
            }
        } else if (priority === 3) {
            return {
                backgroundColor: '#fff9db', // Пастельный желтый
                color: '#856404',           // Темно-охристый для текста
                borderColor: '#ffe066'
            }
        } else if (priority === 2){
            return {
                backgroundColor: '#e3faf3', // Мятный / Светло-зеленый
                color: '#0c8569',           // Изумрудный для текста
                borderColor: '#b2f2bb'
            }
        } else if (priority === 1){
            return {
                backgroundColor: '#ffffff',
                color: '#2d3436',
                borderColor: '#eee'
            }
        } else {
            return {
                backgroundColor: "black",
                color: "white"

            }
        }
    }

    return (
        <>
            <h1>Task list:</h1>
            <ul>
                {
                    tasks.map((task) =>
                        <li key={task.id} style={getTaskStyle(task.priority)}>
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
        </>
    )
}


export default App
