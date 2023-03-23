import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import LoadingSpinner from "./loadingSpinner/loadingSpinner";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import RoutesList from './Routes/Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RoutesList/>
      </header>
    </div>
  );
}

export default App;
