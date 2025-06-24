import { useCallback, useState, useEffect, useContext } from 'react';
import { doc, setDoc, getDocs, getDoc, collection, query, orderBy, deleteDoc } from "firebase/firestore";
import { db } from '@/hooks/firebase_config';
import DataContext from '@/Context/DataContext';


const useFunction = () => {

    const [newNote, setNewNote] = useState(``);
    const [title, setTitle] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const { user } = useContext(DataContext);
    const [editNoteId, setEditNoteId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [viewNotes, setViewNotes] = useState(false);
    const [visibleNewNote, setVisibleNewNote] = useState(false);


    const startEditing = (note) => {
        setEditNoteId(note.id);
        setEditTitle(note.title);
        setEditBody(note.body);
    };


    
    const saveEditedNote = async () => {
        try {
            const noteRef = doc(db, 'Users', user.id, 'Notes', editNoteId);
            const noteSnap = await getDoc(noteRef);

            if (!noteSnap.exists()) {
                console.log('Note not found');
                return;
            }

            const existingNote = noteSnap.data();
            const oldCreatedAt = existingNote.createdAt || new Date(); // ако няма `createdAt`, използваме текущата дата като fallback

            await setDoc(noteRef, {
                title: editTitle,
                body: editBody,
                createdAt: oldCreatedAt // запазваме оригиналната дата
            });

            setEditNoteId(null);
            setEditTitle('');
            setEditBody('');
            fetchNotes();
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
        } catch (err) {
            console.log(err.message);
        }
    }, [user?.id]);  // зависи само от user.id



    const addNote = async () => {
        if (title.trim() === '' || newNote.trim() === '') return

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
            setVisibleNewNote(false)
            setViewNotes(true)
        } catch (err) {
            console.log(err.message);
        }
    };

    return {
        newNote, setNewNote, title, setTitle,
        allNotes, setAllNotes, editNoteId, setEditNoteId,
        editTitle, setEditTitle, editBody, setEditBody,
        startEditing, saveEditedNote, deleteNote, fetchNotes,
        addNote, user, viewNotes, setViewNotes, visibleNewNote,
        setVisibleNewNote
    }

}

export default useFunction;
