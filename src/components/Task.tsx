import { useState } from 'react'
import styles from './Task.module.css'
import { Circle, Trash, CheckCircle } from 'phosphor-react'
interface TaskProps{
    id: string;
    isComplete: boolean;
    content: string;
    onDeleteTask: (task:string)=> void;
    onChangeIsComplete: (id: string)=>void;
}

export function Task({id, isComplete, content, onDeleteTask, onChangeIsComplete}: TaskProps){
    
    const [isHovered, setIsHovered] = useState(false)

   
    function handleMouseEnter(){
        setIsHovered(true);
    }

    function handleMouseLeave(){
        setIsHovered(false);
    }

    function handleDeleteTask(){
        onDeleteTask(id)
    }
    function handleChangeisComplete(){
        onChangeIsComplete(id)
    }
    return(
        <>
            <div className={styles.task}>
                <button onClick={handleChangeisComplete} className={styles.check}>
                    {isComplete?
                      <CheckCircle
                      weight="fill"
                      size={24}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      />
                        :<Circle 
                        weight={isHovered?'duotone' :'thin'} 
                        size={24}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />                    
                  }
                </button>
                <div className={styles.text}>
                    <span className={isComplete?styles.lineThought:styles.lineWithoutThough}>
                        {content}
                    </span>
                 
                </div>
                <button onClick={handleDeleteTask} className={styles.trash} title="Deletar comentário">
                    <Trash size={24}/>
                </button>
            </div>
        </>
    )
}