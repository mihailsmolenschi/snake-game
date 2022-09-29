const Snake = (props) => {
  // const { head, body } = props.snake;
  const { snake } = props;

  const snakeCopy = [...snake];
  const head = snakeCopy[snakeCopy.length - 1];
  // remove last element (head), remains body
  snakeCopy.pop();
  const body = [...snakeCopy];

  const bodyEl = body.map((cell, index) => {
    return (
      <div
        key={index}
        className="body"
        style={{ gridColumn: cell.x, gridRow: cell.y }}
      >
        &nbsp;
      </div>
    );
  });

  return (
    <>
      {bodyEl}
      <div className="head" style={{ gridColumn: head.x, gridRow: head.y }}>
        &nbsp;
      </div>
    </>
  );
};

export default Snake;
