import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';

function App() {

  useEffect(() => {
    const socket = io("localhost:8000", { transports: ['websocket'] });
    socket.on("hello", recieved => {
      console.log(recieved)
    })

    socket.emit("pingpong", "hello server", (res) => console.log(`server said: ${res}`));
  })

  return (
    <div className="App">

    </div>
  );
}

export default App;
