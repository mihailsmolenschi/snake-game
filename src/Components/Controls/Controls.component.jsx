const Controls = (props) => {
  const { onClickHandler } = props;
  return (
    <div className="controls">
      <button onClick={onClickHandler} name="up" className="up">
        up
      </button>
      <button onClick={onClickHandler} name="down" className="down">
        down
      </button>
      <button onClick={onClickHandler} name="right" className="right">
        right
      </button>
      <button onClick={onClickHandler} name="left" className="left">
        left
      </button>
    </div>
  );
};

export default Controls;
