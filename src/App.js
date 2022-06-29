import "./App.scss";
import { useEffect, useState } from "react";
import { GRID_SIZE, INITIAL_SNAKE, DEFAULT_SPEED } from "./defaults";
import { generateRandomPosition } from "./helpers/helper";
import Food from "./Components/Food/Food.component";
import Snake from "./Components/Snake/Snake.component";
import Settings from "./Components/Settings/Settings.component";
import Controls from "./Components/Controls/Controls.component";

const App = () => {
  //-----------------------------------
  // STATES
  //-----------------------------------
  //  Snake state
  const [snake, setSnake] = useState(INITIAL_SNAKE);

  // Food state
  const [food, setFood] = useState(generateRandomPosition());

  // Scoreboard
  const [score, setScore] = useState(0);

  const [startGame, setStartGame] = useState(false);

  // Keyboard input
  const [currentPressedKey, setCurrentPressedKey] = useState("");

  console.log("🐍🐍🐍:");
  console.dir(snake);

  //-----------------------------------
  // EFFECTS
  // ----------------------------------
  // Keyboard support
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      setCurrentPressedKey(event.key.toLowerCase());
    });

    if (currentPressedKey === "escape") {
      resetGame();
    }
    if (currentPressedKey === "enter") {
      setStartGame(true);
    }
  }, [currentPressedKey]);

  // speed of the game
  useEffect(() => {
    const tick = setInterval(() => {
      if (startGame) {
        main();
      }
    }, snake.speed);

    return () => clearInterval(tick);
  });

  //-----------------------------------
  // GAME
  //-----------------------------------
  const main = () => {
    move(currentPressedKey);
    eat();
    checkCollision();
  };

  const move = (direction) => {
    const newBody = JSON.parse(JSON.stringify(snake.body));
    newBody.unshift({ x: snake.head.x, y: snake.head.y });
    newBody.pop();

    if (direction === "d" || direction === "right") {
      setSnake({
        ...snake,
        head: { ...snake.head, x: snake.head.x + 1 },
        body: newBody,
      });
    }
    if (direction === "a" || direction === "left") {
      setSnake({
        ...snake,
        head: { ...snake.head, x: snake.head.x - 1 },
        body: newBody,
      });
    }
    if (direction === "w" || direction === "up") {
      setSnake({
        ...snake,
        head: { ...snake.head, y: snake.head.y - 1 },
        body: newBody,
      });
    }
    if (direction === "s" || direction === "down") {
      setSnake({
        ...snake,
        head: { ...snake.head, y: snake.head.y + 1 },
        body: newBody,
      });
    }
  };

  const eat = () => {
    if (snake.head.x === food.x && snake.head.y === food.y) {
      setScore(score + 1);
      setFood(generateRandomPosition);
      grow();
    }
  };

  const grow = () => {
    const newBody = JSON.parse(JSON.stringify(snake.body));
    newBody.unshift({ x: snake.head.x, y: snake.head.y });
    setSnake({
      ...snake,
      body: newBody,
      speed: accelerate(),
    });
  };

  const accelerate = () => {
    return snake.speed - 5;
  };

  const checkCollision = () => {
    if (
      snake.head.x > GRID_SIZE.columns ||
      snake.head.x < 1 ||
      snake.head.y > GRID_SIZE.rows ||
      snake.head.y < 1
    ) {
      resetGame();
    }
  };

  const resetGame = () => {
    console.log(`🆕 Reset game.`);
    setStartGame(false);
    setSnake(INITIAL_SNAKE);
    setFood({ x: 10, y: 10 });
    setScore(0);
  };
  const changeSpeed = (event) => {
    const { name } = event.target;
    if (name === "+") {
      setSnake({ ...snake, speed: snake.speed + 10 });
    }
    if (name === "-") {
      setSnake({ ...snake, speed: snake.speed - 10 });
    }
  };

  const onClickControlsHandler = (event) => {
    const { name } = event.target;
    console.log(name);
    move(name);
  };

  return (
    <div className="App">
      <h1>Snake</h1>
      <div className="info">
        <p>
          <strong>enter</strong> - to start/pause the game
        </p>
        <p>
          <strong>escape</strong> - to reset the game
        </p>
      </div>

      <h3>Score: {score}</h3>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE.columns}, 20px)`,
          gridTemplateRows: `repeat(${GRID_SIZE.rows}, 20px)`,
          // if you add the gap at the the width will grow
          // width: `calc(${GRID_SIZE.columns} * 20px)`,
        }}
      >
        <Snake snake={snake} />
        <Food food={food} />
      </div>

      <Settings speed={snake.speed} changeSpeedHandler={changeSpeed} />
      <Controls onClickHandler={onClickControlsHandler} />
    </div>
  );
};

export default App;
