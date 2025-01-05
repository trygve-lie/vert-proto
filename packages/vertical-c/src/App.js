import React from "react";
import { useState } from 'react';

import '@lit-labs/ssr-react/enable-lit-ssr.js';

import AppView from './AppView.js';
import Search from './Search.js';
import Slot from "./Slot.js";

export default function App() {
  const [count, setCount] = useState(1);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <h1>Hello from React.</h1> 
      <p>Counter: {count}</p>

      <AppView target="messaging">Open messaging</AppView>

      <Slot name="search">
        <Search onClick={handleClick} />
      </Slot>
    </>
  );
}
    