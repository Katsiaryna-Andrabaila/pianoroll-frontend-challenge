import "./loadButton.css";

export const LoadButton = (props: { generateSVGs: () => Promise<void> }) => {
  return (
    <div id="buttonContainer">
      <button onClick={props.generateSVGs}>Load Piano Rolls!</button>
    </div>
  );
};
