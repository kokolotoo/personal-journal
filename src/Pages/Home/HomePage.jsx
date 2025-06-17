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
          <h2>Welcomme to your personal Journal</h2>
          <p>In this application, you can record your notes, thoughts, and reflections.</p>
          <p>You can create a to-do list.</p>
          <p>You can edit, delete, and add new.</p>
          <p>This application serves as your personal diary.</p>
          <p className='text-center text-2xl font-bold text-red-500'>
            To get started, please log in or register.
          </p>
          <p>Enjoy your journaling experience!</p>
        </article>
      }


    </div>
  );
}

export default HomePage;
