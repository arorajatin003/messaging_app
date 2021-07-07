import React, { useState,useEffect } from 'react';
import {
    Button, FormControl, InputLabel, Input, IconButton
  } from '@material-ui/core';
import Message from "./Message";
import './App.css';
import db from "./firebase";
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import {ThemeProvider, createGlobalStyle} from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body{
    background-color: ${props => props.theme.mode === 'dark'? 'black': '#EEE'};
    color: ${props => props.theme.mode === 'dark'? '#EEE': 'black'};
  }
`;


const useStyles = makeStyles((mode) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: mode.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const[input, setInput] = useState("");
  const[messages, setMessages]= useState([]);
  const [userName, setUserName] = useState("");
  const [theme, setTheme]=useState({mode: 'dark'});
  const classes = useStyles();
  console.log(theme);
  useEffect(()=>{
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  },[])

  useEffect(()=>{
    setUserName(prompt("Enter your name"))
  },[])

  const sendMessage = (event)=> {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      userName: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }
  return (
    <div className="App">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          Group Messaging App
        </Typography>
        <Button onClick={()=>
          setTheme(
              theme.mode === 'dark'
                ? {mode: 'light'}
                : {mode: 'dark'}
          )} color="inherit">Mode</Button>
      </Toolbar>
    </AppBar>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <h1>Welcome {userName}</h1>
        <form className="app__form">
        <FormControl className="app__fromControl">
          <Input className="app_input" placeholder='Enter your message...' value={input} onChange={event=>setInput(event.target.value)}/>
          <IconButton className='app__iconButton' variant="contained" color="primary" type="submit" disabled={!input} onClick={sendMessage}>
            <SendIcon></SendIcon>
          </IconButton>
        </FormControl>
        </form>
        <FlipMove>
          {
            messages.map(({id,message}) =>(
              <Message key={id} userName={userName} message={message} ></Message>
            ))
          }
        </FlipMove>
      </>
    </ThemeProvider>
    </div>
  );
}

export default App;
