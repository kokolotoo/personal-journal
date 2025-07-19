import React from 'react'
import styles from '../topic.module.css'
import { useState, useContext, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from '@/hooks/firebase_config';
import useFunction from '../../../../hooks/useFunction';


const AllComments = ({ currentTopic, user }) => {

    const [message, setMessage] = useState('');
    const { sendUserMessage } = useFunction()
    console.log(currentTopic);


    return (


        <main
            className={styles.commentsContainer}
        >
            {currentTopic.comments.length > 0 && (
                <ul className={styles.commentsList}>
                    {currentTopic.comments.map((comment, index) => (
                        <li key={index} className={styles.commentItem}>
                            <div className={styles.commentInfo}>
                                <b
                                    style={comment.userId === user.id ? { color: 'rgb(128,128,0)' } : {}}
                                >
                                    {comment.user}
                                </b>
                                <span>
                                    {comment.date}
                                </span>
                            </div>

                            <p className={styles.commentContent}>{comment.text}</p>

                        </li>
                    ))}
                </ul>
            )}
        </main>


    )
}

export default AllComments
