import React from 'react';
import styles from '../topic.module.css'
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { TiLockOpenOutline } from "react-icons/ti";
import { FaRegCommentDots } from "react-icons/fa6";
import useTopicsFunction from '@/hooks/useTopicPageFunction';

const TopicFooter = ({ currentTopic, user, fetchTopics }) => {

    const { lockUnlockTopic,
        likeUnlikeTopic,
        handleDeleteTopic, contextHolder } = useTopicsFunction(currentTopic, user, fetchTopics, );


    return (
        <footer className={styles.footer}>
            {contextHolder}
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
                <button className={styles.commentBtn}> <FaRegCommentDots /> Comment</button>
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
    );
}

export default TopicFooter;
