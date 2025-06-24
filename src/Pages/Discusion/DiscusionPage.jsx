import style from './DiscusionPage.module.css';
import { useState, useEffect, useContext } from 'react';
import DataContext from '@/Context/DataContext';

const DiscusionPage = () => {
    const { user } = useContext(DataContext);
    const [thems, setThems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTopic, setNewTopic] = useState({
        title: '',
        text: '',
        author: user ? user.name : 'Anonymous',
        createdAt: new Date().toISOString(),
        creator: user ? user.id : null,
        locked: false,
        comments: []
    });

    useEffect(() => {
        //console.log('user', user);


    }, []);

    const createNewTopic = async (e) => {
        e.preventDefault();

    }

    return (
        <div className={style.container}>

            <form className={style.form} onSubmit={createNewTopic}>
                <fieldset className={style.newTopic}>
                    <legend className={style.legend}>New topic</legend>
                    <input type="text" placeholder='Title'
                        value={newTopic.title}
                        onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                    />
                    <textarea name="new topic" placeholder='Text' rows='3'
                        value={newTopic.text}
                        onChange={(e) => setNewTopic({ ...newTopic, text: e.target.value })}
                    ></textarea>
                    <button type='submit' className={style.submitBtn}>Create</button>
                </fieldset>
            </form>

        </div>
    )
}


export default DiscusionPage