import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '@/hooks/firebase_config';
import { useNavigate } from 'react-router-dom';

const useTopicsFunction = ( currentTopic, user, fetchTopics ) => {
    const navigate = useNavigate();

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
        if (currentTopic.locked) {
            alert('This topic is locked, you cannot like or dislike it.')
            return
        };
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



    return {
        lockUnlockTopic,
        likeUnlikeTopic,
        handleDeleteTopic
    }

}

export default useTopicsFunction;