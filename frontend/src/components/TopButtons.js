
const TopButtons = ({ index, changeIndex }) => {
  return (
    <>
      <div
        className="btn-group"
        id="header-buttons"
        role="group"
        aria-label="Basic example"
      >
        <button
          type="button"
          className="header-button"
          id="last-button"
          onClick={() => changeIndex(-1)}
        >
          &lt; Last
        </button>
        <button
          type="button"
          className="header-button"
          onClick={() => changeIndex(1)}
        >
          Next &gt;
        </button>
      </div>
    </>
  );
};

export default TopButtons;
