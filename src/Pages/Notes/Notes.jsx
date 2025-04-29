import { useState, useEffect } from 'react';
import styles from './notes.module.css';
import xssProtect from '@/Utils/xssProtect';
import useFunction from '@/hooks/useFunction';
import Inputs from './Inputs';

const Notes = () => {
    const [viewNotes, setViewNotes] = useState(false);
    const [visibleNewNote, setVisibleNewNote] = useState(false);
    const {
        newNote, setNewNote, title, setTitle,
        allNotes, setAllNotes, editNoteId, setEditNoteId,
        editTitle, setEditTitle, editBody, setEditBody,
        startEditing, saveEditedNote, deleteNote, fetchNotes,
        addNote, user
    } = useFunction()


    useEffect(() => {
        if (user?.id) {
            fetchNotes();
        }
    }, [user]);

    const shownAddNote = () => {
        setVisibleNewNote(true)
        setViewNotes(false)
    }

    const shownAllNote = () => {
        setVisibleNewNote(false)
        setViewNotes(true)
    }

    return (
        <main className={styles.note_container}>
            <header className={styles.button_section}>
                <button onClick={shownAddNote}>New Note</button>
                <button onClick={shownAllNote}>View All Note</button>
            </header>

            {visibleNewNote &&
                <Inputs
                    title={title}
                    setTitle={setTitle}
                    newNote={newNote}
                    setNewNote={setNewNote}
                    addNote={addNote}
                />
            }

            {viewNotes &&
                <section className={styles.note_section}>
                    {allNotes.length > 0 ? (
                        allNotes.map(note => (
                            <div key={note.id} className={styles.note}>
                                {editNoteId === note.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        /> <br />
                                        <textarea
                                            value={editBody}
                                            onChange={(e) => setEditBody(e.target.value)}
                                        /> <br />
                                        <button onClick={saveEditedNote}>Save</button>
                                        <button onClick={() => setEditNoteId(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 dangerouslySetInnerHTML={{ __html: xssProtect(note.title) }} />
                                        <p dangerouslySetInnerHTML={{ __html: xssProtect(new Date(note.createdAt.seconds * 1000).toLocaleString()) }} />
                                        <p dangerouslySetInnerHTML={{ __html: xssProtect(note.body) }} />
                                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                                        <button onClick={() => startEditing(note)}>Edit</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No notes yet.</p>
                    )}

                </section>
            }
        </main>
    );
};

export default Notes;

