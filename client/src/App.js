import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from "./routes";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </>
  );
}
