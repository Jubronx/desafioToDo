import { Task } from './Task'
import { v4 as uuidv4 } from 'uuid';

import { PlusCircle } from "phosphor-react"

import styles from './ContentTasks.module.css'
import clipBoard from '../assets/Clipboard.svg'
import { ChangeEvent, FormEvent, useState } from "react"

interface TaskProps{
    id: string;
    isComplete: boolean;
    content: string

}

export function ContentTasks(){
    const [tasks, setTasks] = useState<TaskProps[]>([]);

    const [newTaskText, setNewTaskText] = useState('');
    
    const newTask: TaskProps ={ 
        id: uuidv4(), 
        isComplete: false,
        content: newTaskText
    } 

    function handleCreateNewTask(event: FormEvent){
        event.preventDefault()
            
        setTasks([...tasks, newTask]);
        
        setNewTaskText('');
    }

    function handleNewsTaskChange(event: ChangeEvent<HTMLInputElement>){
        setNewTaskText(event.target.value);
    }

    function deleteTask(idTaskToDelete: string){
        const tasksWithoutDeleteOne = tasks.filter(task => {
            return task.id !== idTaskToDelete
        })
        setTasks(tasksWithoutDeleteOne)
    }
    function changeIsComplete(idTaskComplete: string){
        const newTasksCompleted = tasks.map(task=>{
            return (
                task.id === idTaskComplete?{
                    ...task, isComplete: !task.isComplete
                }: task
            )
            
        })
        setTasks(newTasksCompleted)
    }
    const alltasks = tasks.length
    const allTasksCompleted = tasks.filter(task=> {return task.isComplete==true }).length
    return(
        <>
            <form onSubmit={handleCreateNewTask}  className={styles.taskForm}>
                <input 
                    type="text" 
                    placeholder="Adicione uma nova tarefa"
                    value={newTaskText}
                    onChange={handleNewsTaskChange}
                    required={true}
                />
                <button type="submit">
                    Criar
                    <PlusCircle size={16} weight="bold" /> 
                </button>
            </form>
            <div className={styles.contentTasks}>
                <header>
                    <strong>Tarefas criadas <span>{alltasks}</span></strong>
                    <strong>Concluidas <span>{allTasksCompleted} de {alltasks}</span></strong>
                </header>
                <main className={styles.content}>
                {
                    tasks.length? tasks.map(task=>{
                        return(
                            <Task
                                key={task.id}
                                id={task.id}
                                isComplete={task.isComplete}
                                content={task.content}
                                onDeleteTask={deleteTask}
                                onChangeIsComplete={changeIsComplete}
                            />
                        )
                    }):<div className={styles.contentWithoutTasks}>
                            <img src={clipBoard} />
                            <strong>Você ainda não tem tarefas cadastradas</strong>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                }

                    
                </main>
            </div>
        </>
    )
}