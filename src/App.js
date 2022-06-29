import "./App.scss";
import { useEffect, useState } from "react";
import { GRID_SIZE, INITIAL_SNAKE, DEFAULT_SPEED } from "./defaults";
import { generateRandomPosition } from "./helpers/helper";
import Food from "./Components/Food/Food.component";
import Snake from "./Components/Snake/Snake.component";
import Settings from "./Components/Settings/Settings.component";
import Controls from "./Components/Controls/Controls.component";

const App = () => {
  //  Snake state
  const [snake, setSnake] = useState(INITIAL_SNAKE);

  // Food state
  const [food, setFood] = useState(generateRandomPosition());

  // Scoreboard
  const [score, setScore] = useState(0);

  // Movement
  const [direction, setDirection] = useState("");
  const [turnDirection, setTurnDirection] = useState("");

  // Keyboard input
  const [currentPressedKey, setCurrentPressedKey] = useState("");

  console.log("🐍🐍🐍:");
  console.dir(snake);

  //-----------------------------------
  // EFFECTS
  // ----------------------------------
  useEffect(() => {
    // Keyboard support
    document.addEventListener("keydown", (event) => {
      setDirection(event.key.toLowerCase());
    });
  });

  useEffect(() => {
    // Moving interval (speed and direction)
    const tick = setInterval(() => {
      move(direction);
    }, snake.speed);
    main();
    return () => clearInterval(tick);
  });

  const onClickHandler = (event) => {
    const { name } = event.target;

    setDirection(name);

    main();
  };

  const dynamicDifficulty = () => {
    if (score === 10) {
      setSnake({ ...snake, speed: snake.speed - 10 });
    }
    if (score === 20) {
      setSnake({ ...snake, speed: snake.speed - 20 });
    }

    if (score === 30) {
      setSnake({ ...snake, speed: snake.speed - 30 });
    }
    if (score === 40) {
      setSnake({ ...snake, speed: snake.speed - 40 });
    }
    if (score === 50) {
      setSnake({ ...snake, speed: snake.speed - 10 });
    }
  };

  // const turn = () => {
  //   if (turnDirection === "s" && (direction === "a" || direction === "d")) {
  //   }
  // };

  const move = (pula) => {
    // start to move when press enter
    if (pula === "up" || pula === "w" || pula === "arrowup") {
      setSnake({
        ...snake,
        head: { ...snake.head, y: snake.head.y - 1 },
        body: snake.body.map((cell) => {
          return { ...cell, y: cell.y - 1 };
        }),
      });
    }
    if (pula === "down" || pula === "s" || pula === "arrowdown") {
      setSnake({
        ...snake,
        head: { ...snake.head, y: snake.head.y + 1 },
        body: snake.body.map((cell) => {
          return { ...cell, y: cell.y + 1 };
        }),
      });
    }
    if (pula === "left" || pula === "a" || pula === "arrowleft") {
      setSnake({
        ...snake,
        head: { ...snake.head, x: snake.head.x - 1 },
        body: snake.body.map((cell) => {
          return { ...cell, x: cell.x - 1 };
        }),
      });
    }

    if (pula === "right" || pula === "d" || pula === "arrowright") {
      // const newBody = snake.body.map((cell) => {
      //   return { ...cell, x: cell.x + 1 };
      // });
      // console.log(newBody);
      setSnake({
        ...snake,
        head: { ...snake.head, x: snake.head.x + 1 },
        body: snake.body.map((cell) => {
          return { ...cell, x: cell.x + 1 };
        }),
      });
    }
  };

  const changeSpeed = (event) => {
    const { value } = event.target;

    if (value === "+") {
      setSnake({ ...snake, speed: snake.speed + 10 });
    }
    if (value === "-") {
      setSnake({ ...snake, speed: snake.speed - 10 });
    }
  };

  const resetGame = () => {
    console.log(`🗑️🗑️🗑️ Reset game!`);

    setSnake(INITIAL_SNAKE);
    setFood(generateRandomPosition);
    setDirection("");
    setScore(0);
  };

  //-----------------------------------
  // Main (rules of the game)
  // ----------------------------------
  const main = () => {
    // Eat food
    if (snake.head.y === food.y && snake.head.x === food.x) {
      console.log(
        `💥💥💥 Contact at: \n🐍: { x: ${snake.head.x}, y: ${snake.head.y} }\n🍅: { x: ${food.x}, y: ${food.y} }`
      );
      // -----------------
      // NEED REWORK HERE
      // -----------------
      // newbody
      // const newBody = snake.body.map((cell) => {
      //   console.log(`{ x: ${cell.x}, y: ${cell.y} }`);
      //   return { x: cell.x, y: cell.y };
      // });
      // console.log(newBody);

      // // put the new element at the beggining fo the body array
      // newBody.unshift({ x: food.x, y: food.y });
      // console.log(newBody);

      // // setSnake({
      // //   ...snake,
      // //   head:
      // //   body: newBody,
      // // });

      // --------------
      // END
      // --------------

      setScore(score + 1);
      setFood(generateRandomPosition);

      dynamicDifficulty();
    }
    // Reset game if out of boundaries of the grid or pressed escape
    if (
      snake.head.y > GRID_SIZE.columns ||
      snake.head.y < 0 ||
      snake.head.x > GRID_SIZE.rows ||
      snake.head.x < 0 ||
      direction === "escape"
    ) {
      resetGame();
    }
  };

  return (
    <div className="App">
      <h1>Snake</h1>
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
      <Controls onClickHandler={onClickHandler} />
    </div>
  );
};

export default App;
