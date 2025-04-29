import styles from './homePage.module.css'
import DataContext from '@/Context/DataContext';
import { useContext } from 'react';
import HomeWithLogin from './HomeWithLogin';

const HomePage = () => {

  const { login } = useContext(DataContext)

  return (
    <div className={styles.container}>

      {login ? <HomeWithLogin />
        :
        <article>
          <h2>Welcomme to Journal</h2>
          <p>In this application, you can record your notes, thoughts, and reflections.</p>
          <p>You can create a to-do list.</p>
          <p>You can edit, delete, and add new.</p>
          <p>This application serves as your personal diary.</p>
        </article>
      }


    </div>
  );
}

export default HomePage;
