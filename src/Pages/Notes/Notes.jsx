import { useEffect } from 'react';
import './notes.css'
import xssProtect from '@/Utils/xssProtect';
import useFunction from '@/hooks/useFunction';
import Inputs from './Inputs';
import SingleAcordeon from '../Home/SingleAcordeon';
import { FloatButton } from 'antd';
import { GoMoveToTop } from "react-icons/go";

const Notes = () => {

    const {
        newNote, setNewNote, title, setTitle,
        allNotes, setAllNotes, editNoteId, setEditNoteId,
        editTitle, setEditTitle, editBody, setEditBody,
        startEditing, saveEditedNote, deleteNote, fetchNotes,
        addNote, user, viewNotes, setViewNotes, visibleNewNote,
        setVisibleNewNote
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


    // Функция за скролиране до началото на елемента с overflow
    const scrollToTopOfElement = () => {
        const element = document.querySelector('.note_container');
        if (element) {
            element.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }



    return (
        <main className='note_container'>
            <header className='button_section'>
                <button onClick={shownAddNote}>New Note</button>
                <button onClick={shownAllNote}>View All Note</button>
            </header>
            {!visibleNewNote && !viewNotes &&
            allNotes.length > 0 ?
                <p className='notification_message'>You have {allNotes.length} notes</p>
                :
                <p className='notification_message'>Loading notes...</p>
            }
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
                <section className='note_section'>
                    {allNotes.length > 0 ? (
                        allNotes.map(note => (
                            <div key={note.id} className='note'>
                                {editNoteId === note.id ? (
                                    <div className='edit_container'>
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        /> <br />
                                        <textarea
                                            value={editBody}
                                            onChange={(e) => setEditBody(e.target.value)}
                                            rows={7}
                                        /> <br />
                                        <div className='edited_buttons'>
                                            <button onClick={saveEditedNote}>Save</button>
                                            <button onClick={() => setEditNoteId(null)}>Cancel</button>
                                        </div>

                                    </div>
                                ) : (
                                    <SingleAcordeon
                                        title={note.title}
                                    >
                                        <div className='single_note_container'>
                                            <aside > {new Date(note.createdAt.seconds * 1000).toLocaleString()}</aside>
                                            <p dangerouslySetInnerHTML={{ __html: xssProtect(note.body) }} />
                                            <div className='edited_buttons'>
                                                <button onClick={() => deleteNote(note.id)}>Delete</button>
                                                <button onClick={() => startEditing(note)}>Edit</button>
                                            </div>
                                        </div>
                                    </SingleAcordeon>

                                )}

                            </div>
                        ))
                    ) : (
                        <p>No notes yet.</p>
                    )}
                    <FloatButton
                        onClick={scrollToTopOfElement}
                        icon={<GoMoveToTop />}
                        shape="square"
                        style={{ insetInlineEnd: 25 }}
                    />

                </section>
            }
        </main>
    );
};

export default Notes;

