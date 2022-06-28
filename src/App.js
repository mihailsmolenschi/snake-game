import "./App.scss";
import { useEffect, useState } from "react";
import { GRID_SIZE } from "./config";

const inintialSnakePosition = {
  gridRow: 1,
  gridColumn: 1,
};

const generateRandomFoodPosition = () => {
  return {
    gridRow: Math.ceil(Math.random() * GRID_SIZE.gridRow),
    gridColumn: Math.ceil(Math.random() * GRID_SIZE.gridColumn),
  };
};

const App = () => {
  const [snakePosition, setSnakePosition] = useState({
    ...inintialSnakePosition,
  });
  const [foodPosition, setFoodPosition] = useState(
    generateRandomFoodPosition()
  );
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState("");
  const [snake, setSnake] = useState({
    tail: 0,
  });
  const [speed, setSpeed] = useState(200);

  console.log(GRID_SIZE.gridColumn);

  const onClickHandler = (event) => {
    const { name } = event.target;

    setDirection(name);

    checkPositions();
  };

  const checkPositions = () => {
    if (
      snakePosition.gridColumn === foodPosition.gridColumn &&
      snakePosition.gridRow === foodPosition.gridRow
    ) {
      setScore(score + 1);
      setSnake({ ...snake, tail: snake.tail + 1 });
      setFoodPosition(generateRandomFoodPosition);
    }
    if (
      snakePosition.gridColumn > GRID_SIZE.gridColumn ||
      snakePosition.gridColumn < 1 ||
      snakePosition.gridRow > GRID_SIZE.gridRow ||
      snakePosition.gridRow < 1 ||
      direction === "escape"
    ) {
      console.log("hello bleaghi");
      setSnakePosition(inintialSnakePosition);
      setDirection("");
      setScore(0);
      setFoodPosition(generateRandomFoodPosition);
    }
  };
  useEffect(checkPositions);

  const reportPosition = () => console.log(snakePosition, foodPosition);

  // -----------------------------------
  // Move
  // -----------------------------------
  const move = (direction) => {
    if (direction === "up" || direction === "w" || direction === "arrowup") {
      setSnakePosition({
        ...snakePosition,
        gridRow: snakePosition.gridRow - 1,
      });
    }
    if (
      direction === "down" ||
      direction === "s" ||
      direction === "arrowdown"
    ) {
      setSnakePosition({
        ...snakePosition,
        gridRow: snakePosition.gridRow + 1,
      });
    }
    if (
      direction === "left" ||
      direction === "a" ||
      direction === "arrowleft"
    ) {
      setSnakePosition({
        ...snakePosition,
        gridColumn: snakePosition.gridColumn - 1,
      });
    }
    if (
      direction === "right" ||
      direction === "d" ||
      direction === "arrowright"
    ) {
      setSnakePosition({
        ...snakePosition,
        gridColumn: snakePosition.gridColumn + 1,
      });
    }
    console.log(direction);
  };

  useEffect(() => {
    // on key down
    document.addEventListener("keydown", (event) => {
      console.log(event.key);
      setDirection(event.key.toLowerCase());
    });

    const interval = setInterval(() => {
      move(direction);
    }, speed);

    return () => clearInterval(interval);
  });

  const changeSpeedHandler = (event) => {
    const { value } = event.target;
    console.log(value);

    if (value === "+") {
      setSpeed(speed + 10);
    }
    if (value === "-") {
      setSpeed(speed - 10);
    }
  };

  return (
    <div className="App">
      <h1>Snake</h1>

      <h3>Score: {score}</h3>

      <div className="grid">
        <div
          className="snake"
          style={{
            gridRow: snakePosition.gridRow,
            gridColumn: snakePosition.gridColumn,
          }}
          onClick={reportPosition}
        >
          &nbsp;
        </div>
        <div
          className="food"
          style={{
            gridRow: foodPosition.gridRow,
            gridColumn: foodPosition.gridColumn,
          }}
          onClick={reportPosition}
        >
          &nbsp;
        </div>
      </div>

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
    </div>
  );
};

export default App;
