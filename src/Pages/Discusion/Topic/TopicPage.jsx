import React, { useEffect, useState } from 'react';
import useTopicsFunction from '@/hooks/useTopicsFunction';
import { useParams } from "react-router-dom";
import styles from './topic.module.css';
import { useNavigate } from 'react-router-dom';
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { TiLockOpenOutline } from "react-icons/ti";
import { doc, setDoc, getDocs, collection, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '@/hooks/firebase_config';

const TopicPage = () => {
    const { topicId } = useParams();
    const { allTopics, fetchTopics, user } = useTopicsFunction();
    const [currentTopic, setCurrentTopic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTopics();
    }, []);

    useEffect(() => {

        if (allTopics.length > 0) {
            const topic = allTopics.find(topic => topic.id === topicId);
            setCurrentTopic(topic);
            //console.log(topic);
        }
    }, [allTopics, topicId]);

    const handleDeleteTopic = async () => {
        if (confirm('Are you sure you want to delete this topic?')) {

            try {
                const topicRef = doc(db, 'Topics', currentTopic.id);
                await deleteDoc(topicRef);
                console.log('Topic deleted successfully');
                navigate('/topic');
                fetchTopics();
            } catch (error) {
                console.error("Error deleting topic: ", error);
            }
        }
    }

    const lockUnlockTopic = async (topicId, lock) => {
        if (confirm(`Are you sure you want to ${lock ? 'lock' : 'unlock'} this topic?`)) {
            try {
                const topicRef = doc(db, 'Topics', topicId);
                await setDoc(topicRef, { locked: lock }, { merge: true });
                console.log(`Topic ${lock ? 'unlocked' : 'locked'} successfully`);
                fetchTopics();
            } catch (error) {
                console.error("Error updating topic lock status: ", error);
            }
        }
    }

    const likeUnlikeTopic = async (topicId, action) => {

        const topicRef = doc(db, 'Topics', topicId);

        const checkforLike = (row) => {
            const action = row === 'like' ? 'likes' : 'dislikes';
            if (currentTopic[action].includes(user.id)) {
                return currentTopic[action].filter(current => current !== user.id);
            } else {
                return [...new Set([...currentTopic[action], user.id])];
            }
        };

        const likesArray = Array.isArray(currentTopic.likes) ? currentTopic.likes : [];
        const dislikesArray = Array.isArray(currentTopic.dislikes) ? currentTopic.dislikes : [];

        const updatedLikes = action === 'like'
            ? [...new Set(checkforLike('like'))]
            : likesArray.filter(id => id !== user.id);

        const updatedDislikes = action === 'dislike'
            ? checkforLike('dislike')
            : dislikesArray.filter(id => id !== user.id);

        try {
            await updateDoc(topicRef, {
                likes: updatedLikes,
                dislikes: updatedDislikes,
            }, { merge: true });

            fetchTopics();
        } catch (error) {
            console.error("Error updating topic likes/dislikes: ", error);
        }
    }

    return (
        <div className={styles.container}>
            {currentTopic ? (
                <section className={styles.topicSection}>
                    <button className={styles.backBtn}
                        onClick={() => navigate(-1)}
                    >Back</button>

                    <header className={styles.header}>
                        <p>from: <b>{currentTopic.author}</b></p>
                        <p>{new Date(currentTopic.createdAt).toLocaleString()}</p>
                    </header>

                    <main className={styles.main}>
                        <h4>{currentTopic.text}</h4>

                        <span className={styles.textComments}>Comments: {currentTopic.comments.length}</span>

                    </main>

                    <footer className={styles.footer}>

                        <button
                            className={styles.likeBtn}
                            onClick={() => likeUnlikeTopic(currentTopic.id, 'like')}
                        ><SlLike /> {currentTopic.likes.length}</button>

                        <button
                            className={styles.likeBtn}
                            onClick={() => likeUnlikeTopic(currentTopic.id, 'dislike')}
                        ><SlDislike />  {currentTopic.dislikes.length}</button>

                        {currentTopic.locked ?
                            <span className={styles.locked}>Locked</span>
                            :
                            <button className={styles.commentBtn}>Comment</button>
                        }

                        {currentTopic.authorId === user.id &&
                            <div className={styles.buttons}>

                                <button
                                    className={styles.deleteBtn}
                                    title='Delete Topic'
                                    onClick={handleDeleteTopic}
                                >
                                    <MdDeleteOutline />
                                </button>

                                {
                                    currentTopic.locked ?
                                        <MdOutlineLock
                                            className={styles.lockBtn}
                                            title='Unlock Topic'
                                            onClick={() => lockUnlockTopic(currentTopic.id, false)}
                                        />
                                        :
                                        <TiLockOpenOutline
                                            className={styles.lockBtn}
                                            title='Lock Topic'
                                            onClick={() => lockUnlockTopic(currentTopic.id, true)}
                                        />
                                }

                            </div>
                        }

                    </footer>

                </section>
            ) : (
                <p>Loading topic...</p>
            )}
        </div>
    );
}

export default TopicPage;

