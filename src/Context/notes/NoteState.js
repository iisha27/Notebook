import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    let notesInitial=[
        {
          "_id": "62dfc51f26dc323a923cb911",
          "user": "62dfc2c94c4807baa9839859",
          "title": "New note",
          "description": "Please access the playlist",
          "tag": "Youtube",
          "date": "2022-07-26T10:42:39.556Z",
          "__v": 0
        },
        {
          "_id": "62e2c54b893a4f403a29b31e",
          "user": "62dfc2c94c4807baa9839859",
          "title": "About me",
          "description": "I am a student",
          "tag": "personal",
          "date": "2022-07-28T17:20:11.918Z",
          "__v": 0
        },
        {
          "_id": "62dfc51f26dc323jna923cb911",
          "user": "62dfc2c94c4807baa9839859",
          "title": "New note",
          "description": "Please access the playlist ",
          "tag": "Youtube",
          "date": "2022-07-26T10:42:39.556Z",
          "__v": 0
        },
        {
          "_id": "62e2c54b893a4f40dx3a29b31e",
          "user": "62dfc2c94c4807baa9839859",
          "title": "About me",
          "description": "I am a student",
          "tag": "personal",
          "date": "2022-07-28T17:20:11.918Z",
          "__v": 0
        },
        {
          "_id": "62dfc51f26dc323a9jb23cb911",
          "user": "62dfc2c94c4807baa9839859",
          "title": "New note ",
          "description": "Please access the playlist ",
          "tag": "Youtube",
          "date": "2022-07-26T10:42:39.556Z",
          "__v": 0
        },
        {
          "_id": "62e2c54b893a4f403jba29b31e",
          "user": "62dfc2c94c4807baa9839859",
          "title": "About me",
          "description": "I am a student",
          "tag": "personal",
          "date": "2022-07-28T17:20:11.918Z",
          "__v": 0
        }
      ]
      const [notes, setNotes]=useState(notesInitial);
   
    return (
    <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )


}
export default NoteState