import styles from '../topic.module.css';

const AddComment = ({
    currentTopic,
    commentFormVisible,
    setCommentFormVisible,
    addNewComment,
    newComment,
    setNewComment
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addNewComment(currentTopic, newComment);
        setCommentFormVisible(false);
        setNewComment('');
    };

    if (!commentFormVisible) return null;

    return (
        <form onSubmit={handleSubmit} className={styles.commentForm}>
            <textarea
                rows={3}
                placeholder='Add a comment...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
            />
            <button type='submit' className={styles.postBtn}>Post</button>
            <button
                type='button'
                className={styles.cancelBtn}
                onClick={() => {
                    setCommentFormVisible(false);
                    setNewComment('');
                }}
            >
                Cancel
            </button>
        </form>
    );
};

export default AddComment;

