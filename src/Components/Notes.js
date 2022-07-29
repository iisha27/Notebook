 import React, {useContext} from 'react';
 import noteContext from "../Context/notes/noteContext";
 import NoteItem from './NoteItem';
 
 
 const Notes = () => {
    const context=useContext(noteContext);
    const {notes, setNotes} =context;
   return (
     <div>
       <div className="row my-3">
      <h2>Your Note</h2>
      {notes.map((note)=>{
        return <NoteItem key={note._id} note={note} />
      })}
      </div>
     </div>
   )
 }
 
 export default Notes
 