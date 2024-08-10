import React from 'react';
import './App.scss';
import { processes } from "./data";
import {ProcessFlexTable, ProcessTable} from "./components";

function App() {
  return (
    <div className="app-container">
			<nav className="app-nav">
				DEMO PROCESS TABLE
			</nav>

			<div className="app-content">
				<h1>HTML TABLE</h1>
				<ProcessTable data={processes} />
				<div style={{height: "50px"}}></div>
				<h1>FLEX</h1>
				<ProcessFlexTable data={processes} />
			</div>
    </div>
  );
}

export default App;
