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
          <p>This is a simple journal application.</p>
          <p>Here you can write your thoughts, feelings, and experiences.</p>
          <p>Feel free to express yourself and keep track of your daily life.</p>
          <p>To get started, please log in or register.</p>
          <p>Enjoy your journaling experience!</p>
        </article>
      }


    </div>
  );
}

export default HomePage;
