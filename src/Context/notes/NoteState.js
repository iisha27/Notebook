import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host="http://localhost:5000"
    const notesInitial=[]  
      const [notes, setNotes]=useState(notesInitial)
      // GET ALL NOTES
         const getNotes= async() =>{
         //API call
         const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
         
          headers: {
            'Content-Type': 'application/json',
            "auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNGY0ZGY2MWM5YWU3ZDkzZDExMmRjIn0sImlhdCI6MTY1OTE3MjE5OX0.-0FSgQyEcAC-mpeya4lWXS5fQjAeRFJASbwau2fn8VY'
            
          }
        });
        const json= await response.json()
            
            setNotes(json)
         }

          // Add a Note
  const addNote = async (title, description, tag) => {
    
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNGY0ZGY2MWM5YWU3ZDkzZDExMmRjIn0sImlhdCI6MTY1OTE3MjE5OX0.-0FSgQyEcAC-mpeya4lWXS5fQjAeRFJASbwau2fn8VY'
      },
      body: JSON.stringify({title, description, tag})
    });
    const note=await response.json();
    setNotes(notes.concat(note))
  }

      //Delete a note
      const deleteNote= async (id) =>{
        //TODO:API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
         
          headers: {
            'Content-Type': 'application/json',
            "auth-token":' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNGY0ZGY2MWM5YWU3ZDkzZDExMmRjIn0sImlhdCI6MTY1OTE3MjE5OX0.-0FSgQyEcAC-mpeya4lWXS5fQjAeRFJASbwau2fn8VY'
          },
        });
        const json= response.json(); 
          const newNotes=notes.filter((note)=>{return note._id!==id})
          setNotes(newNotes)

      }

      //Edit a note
      const editNote= async(id, title, description, tag) =>{
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
         
          headers: {
            'Content-Type': 'application/json',
            "auth-token":' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNGY0ZGY2MWM5YWU3ZDkzZDExMmRjIn0sImlhdCI6MTY1OTE3MjE5OX0.-0FSgQyEcAC-mpeya4lWXS5fQjAeRFJASbwau2fn8VY'
          },
          body: JSON.stringify({title, description, tag})
        });
        const json= await response.json(); 

        let newNotes=JSON.parse(JSON.stringify(notes))
      
        //Logic to edit in notes
          for(let index=0; index<notes.length; index++){
            const element= newNotes[index];
            if(element._id===id){
              newNotes[index].title=title;
              newNotes[index].description=description;
              newNotes[index].tag=tag;
              break;
            }
            
          }
          setNotes(newNotes)
      }
   
    return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
    )


}
export default NoteState