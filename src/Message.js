import React, {forwardRef} from "react";
import {Card, CardContent, Typography} from '@material-ui/core';
import './Message.css'

const Message = forwardRef(({message, userName}, ref) =>{
  const isUser = message.userName === userName;
  return(
      <div ref={ref} className={!isUser?"message_card" :"message_user" }>
        <Card className={isUser?"message_userCard":"message_gusetCard"}>
          <CardContent>
            <Typography
              color="white"
              variet="h5"
              component="h2"
            >
              {!isUser && `${message.userName || "Unknown User"}:`} {message.message}
            </Typography>
          </CardContent>
        </Card>

      </div>
  )
})

export default Message
