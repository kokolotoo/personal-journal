import React from 'react'
import styles from '../topic.module.css'
import { useState, useContext, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from '@/hooks/firebase_config';


const AllComments = ({ currentTopic, user }) => {

    const [message, setMessage] = useState('');

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
                                <span className={styles.commentDate}>
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
