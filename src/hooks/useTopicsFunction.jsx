import { useState, useContext } from 'react';
import { doc, setDoc, getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from '@/hooks/firebase_config';
import DataContext from '@/Context/DataContext';
import { message } from 'antd';

const useTopicsFunction = () => {
    const { user } = useContext(DataContext);
    const [messageApi, contextHolder] = message.useMessage();
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
            alert('Title and text are required');
            return;
        }
        try {
            const newTopicRef = doc(collection(db, 'Topics'));
            await setDoc(newTopicRef, {
                ...newTopic,
                createdAt: new Date().toISOString(),
            });
            success();
        } catch (error) {
            console.error("Error creating new topic: ", error);
            errorMessage();
        } finally {
            closeModal()
            fetchTopics()
        }

    }

    const closeModal = () => {
        setIsModalOpen(false);
        setNewTopic((prev) => {
            return {
                ...prev,
                title: '',
                text: '',
            }
        })
    }

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'New topic created successfully',
        });
    };

    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'Error creating topic. Please try again.',
        });
    };

    const addNewComment = async (currentTopic) => {
      
        if (!newComment.trim()) {
            alert('Comment cannot be empty');
            return;
        }
        const comment = {
            text: newComment,
            user: user.name,
            userId: user.id,
            date: new Date().toLocaleString().replace(/[:.]/g, "-")
        }
        const updatedComments = [...currentTopic.comments, comment];
        const updatedTopic = {
            ...currentTopic,
            comments: updatedComments,
        }


        try {
            const topicRef = doc(db, 'Topics', currentTopic.id);
            await setDoc(topicRef, updatedTopic, { merge: true });
            // Optionally, you can also fetch the updated topic or update the state in the parent component
           
        } catch (error) {
            console.error("Error adding comment: ", error);
            alert('Failed to add comment');
        } finally {
            setNewComment('');
            fetchTopics();
        }
        success()
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
        success,
        errorMessage,
        user,
        setNewComment,
        newComment,
        addNewComment,
    };


}

export default useTopicsFunction;