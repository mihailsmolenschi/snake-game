const Snake = (props) => {
  const { head, body } = props.snake;

  return (
    <>
      <div
        className="head"
        style={{
          gridRow: head.y,
          gridColumn: head.x,
        }}
      >
        &nbsp;
      </div>
      {body.map((cell, index) => {
        return (
          <div
            key={index}
            className="body"
            style={{
              gridRow: cell.y,
              gridColumn: cell.x,
            }}
          >
            &nbsp;
          </div>
        );
      })}
    </>
  );
};

export default Snake;
