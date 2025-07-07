import React from 'react'
import styles from '../topic.module.css'

const AllComments = ({ currentTopic }) => {

    return (
        <main
            className={styles.commentsContainer}
        >
            {currentTopic.comments.length > 0 && (
                <ul className={styles.commentsList}>
                    {currentTopic.comments.map((comment, index) => (
                        <li key={index} className={styles.commentItem}>
                            <div className={styles.commentInfo}>
                                <p><b>{comment.user}</b>:</p>
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
