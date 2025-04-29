import { useState } from 'react';
import { Link } from 'react-router';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Modal } from 'antd';
import styles from './forgot.module.css'

const ForgotPage = () => {
  const [modal, contextHolder] = Modal.useModal(); // правилен ред!
  const [searchEmail, setSearchEmail] = useState('')

  const info = () => {
    modal.info({
      title: '',
      content: 'If an account with this email exists, a reset link has been sent.',
    });
  };

  const checkForPassword = async (e) => {
    e.preventDefault()
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, searchEmail, { url: import.meta.env.VITE_URL });
      info()
      setSearchEmail('')
    } catch (error) {
      console.log(error.message);
      modal.info({
        title: '',
        content: 'Invalid email.',
      });
    }
  }

  return (
    <main className={styles.page_container}>
      {contextHolder}

      <form onSubmit={checkForPassword}>
        <label htmlFor="email">Enter email:</label>
        <input
          type="email"
          placeholder='email'
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          required
        />
        <button>Send</button>
      </form>

      <section className={styles.links}>
        <Link to='/login'>Login</Link>
        <Link to='/registration'>Registration</Link>
      </section>
    </main>
  );
}

export default ForgotPage;

