const Food = (props) => {
  const { x, y } = props.food;
  return (
    <div
      className="food"
      style={{
        gridRow: y,
        gridColumn: x,
      }}
    >
      &nbsp;
    </div>
  );
};

export default Food;
