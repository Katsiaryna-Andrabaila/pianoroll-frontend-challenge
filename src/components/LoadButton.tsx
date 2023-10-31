export const LoadButton = (props: { generateSVGs: () => Promise<void> }) => {
  return (
    <div id="buttonContainer">
      <button id="loadCSV" onClick={props.generateSVGs}>
        Load Piano Rolls!
      </button>
    </div>
  );
};
