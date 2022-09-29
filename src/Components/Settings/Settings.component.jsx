const Settings = (props) => {
  const { speed, changeSpeedHandler } = props;
  return (
    <div className="settings-container">
      <div className="speed-container">
        <img
          className="img--speedometer"
          src="./icons/speedometer.png"
          alt="speedometer"
        />
        <button className="btn" onClick={changeSpeedHandler} name="+">
          &ndash;
        </button>
        <span>{speed}</span>
        <button className="btn" onClick={changeSpeedHandler} name="-">
          +
        </button>
      </div>
    </div>
  );
};

export default Settings;
