const Settings = (props) => {
  const { speed, changeSpeedHandler } = props;
  return (
    <div className="settings">
      <div className="speed-container">
        <button onClick={changeSpeedHandler} value="-">
          -
        </button>
        <label>speed</label>
        <button onClick={changeSpeedHandler} value="+">
          +
        </button>
        <span>{speed}</span>
      </div>
    </div>
  );
};

export default Settings;
