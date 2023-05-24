import { Header } from './components/Header';
import { ContentTasks } from './components/ContentTasks';

import './global.css'
import styles from './App.module.css';

export function App() {

  return (
    <>
      <Header/>
      <div className={styles.wrapper}>
        <ContentTasks/>
      </div>
    </>
  )
}

