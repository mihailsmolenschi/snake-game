function Score({ score }) {
  return (
    <div className="score">
      <img className="score--img" src="./icons/fruit-basket.svg" alt="score" />
      <p className="score--text">{score}</p>
    </div>
  );
}

export default Score;
