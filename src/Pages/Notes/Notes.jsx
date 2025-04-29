import { useCallback, useState, useEffect, useContext } from 'react';
import styles from './notes.module.css';
import { doc, setDoc, getDocs, getDoc, collection, query, orderBy, deleteDoc } from "firebase/firestore";
import { db } from '@/hooks/firebase_config';
import DataContext from '@/Context/DataContext';
import xssProtect from '@/Utils/xssProtect';

const Notes = () => {
    const [newNote, setNewNote] = useState(``);
    const [title, setTitle] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const { user } = useContext(DataContext);
    const [editNoteId, setEditNoteId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    const startEditing = (note) => {
        setEditNoteId(note.id);
        setEditTitle(note.title);
        setEditBody(note.body);
    };

    const saveEditedNote = async () => {
        try {
            const noteRef = doc(db, 'Users', user.id, 'Notes', editNoteId);
            await setDoc(noteRef, {
                title: editTitle,
                body: editBody,
                createdAt: new Date() // може да запазиш стария createdAt ако искаш
            });
            console.log('Note updated');
            setEditNoteId(null); // приключи редакцията
            setEditTitle('');
            setEditBody('');
            fetchNotes(); // обновява бележките
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteNote = async (id) => {
        try {
            const noteRef = doc(db, 'Users', user.id, 'Notes', id);
            await deleteDoc(noteRef);
            console.log('Note deleted');
            fetchNotes(); // обновява списъка след изтриване
        } catch (err) {
            console.log(err.message);
        }
    };


    useEffect(() => {
        if (user?.id) {
            fetchNotes();
        }
    }, [user]);

    const fetchNotes = useCallback(async () => {
        try {
            const notesRef = collection(db, 'Users', user.id, 'Notes');
            const q = query(notesRef, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const notesArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).reverse();
            setAllNotes(notesArray);
            console.log(notesArray);
        } catch (err) {
            console.log(err.message);
        }
    }, [user?.id]);  // зависи само от user.id

    const addNote = async () => {
        const now = new Date();
        const formattedDate = now.toISOString().replace(/[:.]/g, "-"); // безопасен ID без ':' и '.'
        try {
            // Проверка дали има документ за потребителя
            const userRef = doc(db, 'Users', user.id);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    createdAt: new Date(),
                    email: user.email
                });
            }

            const notesRef = collection(db, 'Users', user.id, 'Notes');
            const noteRef = doc(notesRef, formattedDate); // вече безопасно ID

            const storedNote = {
                title: title,
                body: newNote,
                createdAt: now // полето нужно за сортиране
            };

            await setDoc(noteRef, storedNote);
            console.log('New note added');
            setNewNote('');
            setTitle('');
            fetchNotes(); // ⚡ Рефрешваме списъка с бележки веднага!
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <main className={styles.note_container}>
            <h2>Notes</h2>
            <input
                type="text"
                placeholder='Note title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /> <br />
            <textarea
                name="note"
                placeholder='New note'
                rows={3}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
            ></textarea><br />
            <button onClick={addNote}>Add Note</button>

            <section>
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
        </main>
    );
};

export default Notes;

