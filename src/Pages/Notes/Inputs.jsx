import React from 'react'
import './notes.css'

const Inputs = ({
    title, setTitle, newNote, setNewNote, addNote
}) => {


    return (
        <section className='add_note'>
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
        </section>
    )
}

export default Inputs
