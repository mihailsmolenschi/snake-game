const Settings = (props) => {
  const { speed, changeSpeedHandler } = props;
  return (
    <div className="settings">
      <div className="speed-container">
        <label>speed: </label>
        <button onClick={changeSpeedHandler} name="-">
          -
        </button>
        <span>{speed}</span>
        <button onClick={changeSpeedHandler} name="+">
          +
        </button>
      </div>
    </div>
  );
};

export default Settings;
