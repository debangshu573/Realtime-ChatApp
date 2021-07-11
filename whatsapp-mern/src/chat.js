import React, {useState} from 'react';
import "./chat.css";
import { Avatar,IconButton} from "@material-ui/core";
import {SearchOutlined,AttachFile,MoreVert, Mic} from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import axios from './axios';

function chat({messages}) {
    const [input, setInput] = useState{"");

    const sendMessage = async (e) =>{
        e.preventDefault();

        await axios.post('/messages/new',{
            "message": input,
            "name": "WhatsApp User",
            "timestamp": "Just Now",
            "received": false
        });

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar/>
                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at....</p>
                </div>

                <div className="char_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) => {
                    <p className={`chat_message ${message.received &&"chat_receiver"}`}>
                    <span className="chat_name">message.name</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                </p>

                })}

            </div>
            
            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <form>
                    <input value={input} onChange ={ e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send message</button>
                </form>
                <IconButton>
                    <Mic/>
                </IconButton>
                
            </div>
        </div>
    )
}

export default chat
