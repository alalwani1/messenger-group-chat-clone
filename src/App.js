import React , { useState, useEffect, useRef } from 'react';
import { FormControl, Input } from '@material-ui/core';
import Message from './Message';
import './App.css';
import { db } from './firebase';
import firebase from 'firebase';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import ReactScrollableFeed from 'react-scrollable-feed';
import logo from './clone.jpg';

function App() {
  const [input, setInput] = useState(''); 
  //const [messages, setMessages] = useState(['hello', 'hi']);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState();

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    //run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id:doc.id, message:doc.data()})))
    })
    //scrollToBottom();
  })

  useEffect(() =>{
    //if it is black inside [] then it will run once the component loads
    setUsername(prompt('Please enter your name'))
  }, [])//condition

  const sendMessage = (event) =>{
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
   // setMessages([...messages, {username:username, text:input}]);
    setInput('');
    //all logic for sending message
  }

  return (
    <div className="App">
      <h1>facebook messenger clone</h1>
      <img src={logo} width="50" height="50"/>
      <h1>welcome {username}</h1>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange = {event => setInput(event.target.value)}/>
          <IconButton className="app__iconButton" disabled={!input} variant= "contained" color = "primary" type='submit' onClick={sendMessage}>
            <SendIcon/>
          </IconButton>
        </FormControl>  
      </form>
      <div style={{overflowY: 'scroll', height: '600px'}}>
      <ReactScrollableFeed>
        {
          messages.map(({id, message}) => (
            //keys helps u to show data orderwise and render only particular object not all list
            <Message key={id} username={username} message={message}/>
          ))
        }
        </ ReactScrollableFeed>
        </div>
        
    </div>
  );
}

export default App;
