import "./App.css";

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src="src/assets/white.svg" alt="Logo" />
        </div>
      </nav>

      <h1>Welcome to PianoRoll frontend coding challenge!</h1>

      <div id="buttonContainer">
        <button id="loadCSV">Load Piano Rolls!</button>
      </div>

      <div id="pianoRollContainer"></div>
    </>
  );
}

export default App;
