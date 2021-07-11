import React from 'react';
import "./SidebarChat.css";
import {Avatar} from "@material-ui/core";

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebar_info">
                <h2>Name</h2>
                <p>This is the last msg</p>
            </div>
        </div>
    )
}

export default SidebarChat;
