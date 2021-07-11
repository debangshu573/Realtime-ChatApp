import React ,{useState,useEffect} from 'react';
import './App.css';
import Sidebar from'./sidebar.js';
import Chat from './chat.js';
import Pusher from 'pusher-js';
import axios from './axios'

function App() {

  const [messages,setMessages] = useState([]);
  
  useEffect(()=>{
      axios.get('/messages/sync')
        .then(response=>{
            setMessages(response.data);
        })
  },[]);

  // Connecting the backend to this frontend
  useEffect(() =>{
      const pusher = new Pusher('b60d896ef97cbceab53d',{
        cluster : "eu"
      });
      const channel = pusher.subscribe('messages');
      channel.bind('inserted',(newMessage)=>{
          // alert(JSON.stringify(newMessage));
          setMessages([...messages,newMessage]);
    });

    // Cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  },[messages] );

  console.log(messages);

  return (
    <div className="app">
        <div className="app_body">
          <Sidebar />
          <Chat messages={messages} />
        </div>
    
    </div>
  );
}

export default App;
