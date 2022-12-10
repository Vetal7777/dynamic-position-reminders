import React from 'react';
import './App.css';
import styles from './App.module.css'
import Dashboard from "./components/dashboard/dashboard";
import Header from "./components/header/header";

function App() {
  return (
      <>
          <div className={styles.container}>
            <Header/>
            <Dashboard/>
          </div>
      </>
  );
}

export default App;
