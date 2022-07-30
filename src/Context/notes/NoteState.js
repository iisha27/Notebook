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
            console.log(json);
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
     

    console.log("Adding a new note")
    const note = {

          "_id": "62e4f5dc61c9ae7d93d112e0",
          "user": "62e4f4df61c9ae7d93d112dc",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-07-30T09:11:56.234Z",
          "__v": 0
    };
     
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
        console.log(json);
          console.log("Deleting the note with id "+ id)
          const newNotes=notes.filter((note)=>{return note._id!==id})
          setNotes(newNotes)

      }

      //Edit a note
      const editNote= async(id, title, description, tag) =>{
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST', 
         
          headers: {
            'Content-Type': 'application/json',
            "auth-token":' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNGY0ZGY2MWM5YWU3ZDkzZDExMmRjIn0sImlhdCI6MTY1OTE3MjE5OX0.-0FSgQyEcAC-mpeya4lWXS5fQjAeRFJASbwau2fn8VY'
          },
          body: JSON.stringify({title, description, tag})
        });
        const json= response.json(); 
      
        //Logic to edit in notes
          for(let i=0; i<notes.length; i++){
            const element= notes[i];
            if(element._id===id){
              element.title=title;
              element.description=description;
              element.tag=tag;
            }
          }
      }
   
    return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
    )


}
export default NoteState