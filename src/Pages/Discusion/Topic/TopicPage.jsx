import { useEffect, useState } from 'react';
import useTopicsFunction from '@/hooks/useTopicsFunction';
import { useParams } from "react-router-dom";
import styles from './topic.module.css';
import { useNavigate } from 'react-router-dom';
import TopicFooter from './Footer/TopicFooter';
import AddComment from './Comment/AddComment';
import AllComments from './Comment/AllComments';

const TopicPage = () => {
    const { topicId } = useParams();
    const { allTopics, fetchTopics, user, contextHolder } = useTopicsFunction();
    const [currentTopic, setCurrentTopic] = useState(null);
    const [commentFormVisible, setCommentFormVisible] = useState(false);

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


    return (
        <div className={styles.container}>
            {contextHolder}
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
                    </main>

                    <TopicFooter
                        currentTopic={currentTopic}
                        user={user}
                        fetchTopics={fetchTopics}
                        setCommentFormVisible={setCommentFormVisible}
                    />


                    <AddComment
                        currentTopic={currentTopic}
                        user={user}
                        commentFormVisible={commentFormVisible}
                        setCommentFormVisible={setCommentFormVisible}
                    />

                    <AllComments
                        currentTopic={currentTopic}
                    />
                </section>
            ) : (
                <p>Loading topic...</p>
            )}
        </div>
    );
}

export default TopicPage;

