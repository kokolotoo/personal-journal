import { useState, useContext, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from '@/hooks/firebase_config';
import DataContext from '@/Context/DataContext';
import { message } from 'antd';

const useTopicsFunction = () => {
    const { user } = useContext(DataContext);
    const [messageApi, contextHolder] = message.useMessage();

    // ✅ Flags for safe message rendering
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [allTopics, setAllTopics] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newTopic, setNewTopic] = useState({
        title: '',
        text: '',
        author: user ? user.name : 'Anonymous',
        createdAt: new Date().toLocaleString().replace(/[:.]/g, "-"),
        authorId: user ? user.id : null,
        locked: false,
        comments: [],
        likes: [],
        dislikes: [],
    });

    useEffect(() => {
        if (successMessage) {
            messageApi.open({
                type: 'success',
                content: successMessage,
            });
            setSuccessMessage(null);
        }
    }, [successMessage, messageApi]);

    useEffect(() => {
        if (errorMessage) {
            messageApi.open({
                type: 'error',
                content: errorMessage,
            });
            setErrorMessage(null);
        }
    }, [errorMessage, messageApi]);

    const fetchTopics = async () => {
        try {
            const topicsCollection = collection(db, 'Topics');
            const topicsQuery = query(topicsCollection, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(topicsQuery);
            const topicsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllTopics(topicsList);
        } catch (error) {
            console.error("Error fetching topics: ", error);
        } finally {
            setLoading(false);
        }
    }

    const createNewTopic = async () => {
        if (!newTopic.title || !newTopic.text) {
            setErrorMessage('Error creating topic. Please try again.');
            return;
        }
        try {
            const newTopicRef = doc(collection(db, 'Topics'));
            await setDoc(newTopicRef, {
                ...newTopic,
                createdAt: new Date().toISOString(),
            });
            setSuccessMessage('New topic created successfully');
        } catch (error) {
            console.error("Error creating new topic: ", error);
            setErrorMessage('Error creating topic. Please try again.');
        } finally {
            closeModal();
            fetchTopics();
        }
    }

    const addNewComment = async (currentTopic, commentText) => {
        if (!commentText.trim()) {
            alert('Comment cannot be empty');
            return;
        }
        const comment = {
            text: commentText,
            user: user?.name || 'Anonymous',
            userId: user?.id || null,
            date: new Date().toLocaleString().replace(/[:.]/g, "-")
        };

        const updatedComments = [...(currentTopic.comments || []), comment];
        const updatedTopic = {
            ...currentTopic,
            comments: updatedComments,
        };

        try {
            const topicRef = doc(db, 'Topics', currentTopic.id);
            await setDoc(topicRef, updatedTopic, { merge: true });

            setAllTopics(prev =>
                prev.map(topic =>
                    topic.id === currentTopic.id ? updatedTopic : topic
                )
            );

            setSuccessMessage('Comment added successfully');
        } catch (error) {
            console.error("Error adding comment: ", error);
            setErrorMessage('Failed to add comment');
        } finally {
            fetchTopics();
        }
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
        setNewTopic((prev) => ({
            ...prev,
            title: '',
            text: '',
        }));
    }

    return {
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
        user,
        setNewComment,
        newComment,
        addNewComment,
    };
}

export default useTopicsFunction;
