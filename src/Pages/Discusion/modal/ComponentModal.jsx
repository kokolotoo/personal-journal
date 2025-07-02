import { Modal } from 'antd';

export const ComponentModal = ({
    isModalOpen,
    modalTitle,
    newTopic,
    setNewTopic,
    createNewTopic,
    closeModal,
    style
}) => {

    return (
        <Modal
            title={modalTitle}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={createNewTopic}
            okText='Create'
            onCancel={closeModal}
        >
            <section className={style.form} >


                <input type="text" placeholder='Title'
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                    required
                />
                <textarea name="new topic" placeholder='Text' rows='3'
                    value={newTopic.text}
                    onChange={(e) => setNewTopic({ ...newTopic, text: e.target.value })}
                    required
                ></textarea>


            </section>
        </Modal>
    )
}
