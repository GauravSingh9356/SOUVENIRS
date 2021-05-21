import React, { useState, useRef, useEffect, forwardRef } from 'react';
import './style.css';

const MessageDiv = ({ socket }) => {
  const [messageBox, setMessageBox] = useState([]);

  const messageEndRef = useRef();
  const name =
    JSON.parse(localStorage.getItem('profile'))?.result?.name?.split(' ')[0] ||
    null;

  const scrollToBottom = () => {
    //console.log(messagesEndRef);
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  });

  socket.on('broadcastMessage', (data) => {
    // messageBox.push(data);
    // localStorage.setItem('chat', JSON.stringify([...messageBox]));
    // totalMessages = JSON.parse(localStorage.getItem('chat'));
    // console.log(totalMessages);

    setMessageBox([
      ...messageBox,
      {
        message: data.message,
        name: data.name,
        pic: data.pic,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    // console.log(messageBox);
    // setRen(!ren);
  });

  return (
    <main className='msger-chat'>
      {messageBox.map((data) => {
        return (
          <div key={Math.random()} className='box'>
            <div
              className={data.name == name ? `msg right-msg` : 'msg left-msg'}
            >
              <div
                className='msg-img'
                style={{
                  backgroundImage:
                    'url(' +
                    `${
                      data.pic ||
                      'https://image.flaticon.com/icons/svg/145/145867.svg'
                    }` +
                    ')',
                }}
              ></div>

              <div className='msg-bubble'>
                <div className='msg-info'>
                  <div className='msg-info-name'>{data.name}</div>
                  <div className='msg-info-time'>{data.time}</div>
                </div>

                <div className='msg-text'>{data.message}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messageEndRef}></div>
    </main>
  );
};

export default MessageDiv;
