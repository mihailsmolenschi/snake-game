import "./App.scss";
import { useEffect, useState } from "react";
import { GRID_SIZE, INITIAL_SNAKE, DEFAULT_SPEED } from "./defaults";
import Food from "./Components/Food/Food.component";
import Snake from "./Components/Snake/Snake.component";
import Settings from "./Components/Settings/Settings.component";
import Score from "./Components/Score/Score.component";
import Info from "./Components/Info/Info.components";

function generateRandom(limit) {
  return Math.ceil(Math.random() * limit);
}

function App() {
  //-----------------------------------
  // STATES
  //-----------------------------------
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateFood());
  const [score, setScore] = useState(0);
  const [currentPressedKey, setCurrentPressedKey] = useState("");
  const [direction, setDirection] = useState("d");
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [startGame, setStartGame] = useState(false);

  //-----------------------------------
  // EFFECTS
  // ----------------------------------

  // Keyboard support
  useEffect(() => {
    const keyDown = (e) => {
      const key = e.key.toLowerCase();
      setCurrentPressedKey(key);
    };

    document.addEventListener("keydown", keyDown);

    // This is componentDidUnmount, bassically to tell React to stop adding eventListeners to document
    return () => document.removeEventListener("keydown", keyDown);
  }, []); // The component will mount only ones (at the first render), its basically like componentDidMount

  useEffect(() => {
    if (currentPressedKey === "enter") {
      setStartGame(true);
    }
    if (currentPressedKey === "escape") {
      setStartGame(false);
      resetGame();
    }
  }, [setStartGame, currentPressedKey]);

  useEffect(() => {
    // get current input only if "startGame" is true
    if (startGame) {
      const allowedDirections = ["w", "a", "s", "d"];
      // snake is not allowed to turn in opposite direction
      if (allowedDirections.includes(currentPressedKey)) {
        if (direction !== "w" && currentPressedKey === "s")
          setDirection(currentPressedKey);
        if (direction !== "s" && currentPressedKey === "w")
          setDirection(currentPressedKey);
        if (direction !== "a" && currentPressedKey === "d")
          setDirection(currentPressedKey);
        if (direction !== "d" && currentPressedKey === "a")
          setDirection(currentPressedKey);
      }
    }
  }, [setDirection, currentPressedKey, direction, startGame]);

  useEffect(() => {
    let interval = null;

    if (startGame) {
      interval = setInterval(() => {
        move(direction);
      }, speed);
    }

    return () => clearInterval(interval);
  });

  useEffect(() => {
    eat();
    checkBorderCollision();
    checkBodyCollision();
  });

  //-----------------------------------
  // GAME
  //-----------------------------------

  function move(dir) {
    let newSnake = [...snake];
    let newHead = newSnake[newSnake.length - 1];

    if (dir === "d") newHead = { ...newHead, x: newHead.x + 1 };
    else if (dir === "a") newHead = { ...newHead, x: newHead.x - 1 };
    else if (dir === "w") newHead = { ...newHead, y: newHead.y - 1 };
    else if (dir === "s") newHead = { ...newHead, y: newHead.y + 1 };

    newSnake.push(newHead);
    newSnake.shift();
    setSnake(newSnake);
  }

  function generateFood() {
    const snakeCoords = [...snake];
    let xRand = generateRandom(GRID_SIZE.columns);
    let yRand = generateRandom(GRID_SIZE.rows);

    // Loop and generate until no same coords
    for (let i = 0; i < snakeCoords.length; i++) {
      const { x, y } = snakeCoords[i];

      if (xRand === x && yRand === y) {
        xRand = generateRandom(GRID_SIZE.columns);
        yRand = generateRandom(GRID_SIZE.rows);
        // loop will start again
        i = 0;
      }
    }

    return { x: xRand, y: yRand };
  }

  function eat() {
    let head = snake[snake.length - 1];
    if (food.x === head.x && food.y === head.y) {
      setScore(score + 1);
      setFood(generateFood());
      growTail();
      accelerate();
    }
  }

  function growTail() {
    let newSnake = [...snake];
    const tail = newSnake[0];

    newSnake.unshift({
      x: tail.x,
      y: tail.y,
    });

    setSnake(newSnake);
  }

  function checkBorderCollision() {
    const head = snake[snake.length - 1];

    if (
      head.x > GRID_SIZE.columns ||
      head.x < 1 ||
      head.y > GRID_SIZE.rows ||
      head.y < 1
    ) {
      resetGame();
    }
  }

  function checkBodyCollision() {
    const head = snake[snake.length - 1];
    const body = [...snake];

    // remove the head, to later check every "body coords" with "head coords"
    body.pop();

    // check body elements with head for same coords
    body.forEach((cell) => {
      if (cell.x === head.x && cell.y === head.y) {
        resetGame();
      }
    });
  }

  function accelerate() {
    if (speed > 60) setSpeed(speed - 5);
    else setSpeed(speed - 1);
  }

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood);
    setScore(0);
    setStartGame(false);
    setSpeed(DEFAULT_SPEED);
    setCurrentPressedKey("");
    setDirection("d");
  }

  function changeSpeed(event) {
    const { name } = event.target;
    if (name === "+") {
      setSpeed(speed + 5);
    }
    if (name === "-") {
      setSpeed(speed - 5);
    }
  }

  return (
    <div className="App">
      <h1 className="game-tile">Snake</h1>

      <Info />

      <Score score={score} />

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE.columns}, 20px)`,
          gridTemplateRows: `repeat(${GRID_SIZE.rows}, 20px)`,
        }}
      >
        <Snake snake={snake} />
        <Food food={food} />
      </div>

      <Settings speed={speed} changeSpeedHandler={changeSpeed} />
    </div>
  );
}

export default App;
