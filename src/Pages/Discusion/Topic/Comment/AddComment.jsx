
import styles from '../topic.module.css'
import useTopicsFunction from '@/hooks/useTopicsFunction';

const AddComment = (props) => {

    const { currentTopic, setCommentFormVisible, commentFormVisible } = props;
    const { addNewComment, newComment, setNewComment } = useTopicsFunction();



    return (
        <form onSubmit={
            (e) => {
                e.preventDefault();
                addNewComment(currentTopic);
                setCommentFormVisible(false);
            }
        }
            className={
                commentFormVisible ? styles.commentForm : styles.hiddenForm
            }
        >
            <textarea
                rows={3}
                placeholder='Add a comment...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
            />
            <button
                type='submit'
                className={styles.postBtn}
            >Post</button>

            <button
                className={styles.cancelBtn}
                type='button'
                onClick={() => setCommentFormVisible(false)}
            >Cancel</button>
        </form>
    )
}

export default AddComment
