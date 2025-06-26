import style from './discusionPage.module.css';
import { useState, useEffect, useContext } from 'react';
import useTopicsFunction from '../../hooks/useTopicsFunction';
import { ComponentModal } from './modal/ComponentModal';
import { Link } from 'react-router-dom';
import { LuMessageCircleMore } from "react-icons/lu";

const DiscusionPage = () => {

    const {
        contextHolder,
        isModalOpen,
        setIsModalOpen,
        loading,
        allTopics,
        newTopic,
        setNewTopic,
        fetchTopics,
        createNewTopic,
        closeModal,
        user
    } = useTopicsFunction();

    useEffect(() => {
        //console.log('user', user);
        fetchTopics();
    }, []);


    return (
        <div className={style.container}>
            {contextHolder}

            <button
                onClick={() => setIsModalOpen(true)}
                className={style.createTopicButton}
            >
                Create New Topic
            </button>

            <ComponentModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setNewTopic={setNewTopic}
                newTopic={newTopic}
                createNewTopic={createNewTopic}
                closeModal={closeModal}
                style={style}
            />



            {
                loading ? (
                    <div className={style.loading}>
                        <p>Loading topics...</p>
                    </div>
                ) :
                    allTopics.length > 0 ? (
                        <div className={style.topicsContainer}>
                            {
                                allTopics.map((topic) => (


                                    <Link
                                        to={`/topic/${topic.id}`}
                                        key={topic.id}>
                                        <div className={style.topicCard}>
                                            <p className={style.topicTitle}>{topic.title}</p>
                                            <p>
                                                <LuMessageCircleMore />
                                                <b className={style.number_comments}>{topic.comments ? topic.comments.length : 0}</b> 
                                            </p>

                                        </div>


                                    </Link>
                                ))
                            }
                        </div>
                    ) : (
                        <div className={style.noTopics}>
                            <p>No topics available. </p>
                            <p>Start the discussion by creating a new topic!</p>
                        </div>
                    )}

        </div>
    );
}


export default DiscusionPage