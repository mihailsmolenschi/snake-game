function Info() {
  return (
    <div className="info-container">
      <p className="info-item">
        <img
          className="info-item--img img--enter"
          src="./icons/enter.png"
          alt="enter"
        />
        &ndash; start
      </p>
      <p className="info-item">
        <img
          className="info-item--img img--esc"
          src="./icons/esc.png"
          alt="escape"
        />
        &ndash; reset
      </p>
      <p className="info-item">
        <img
          className="info-item--img img--wasd"
          src="./icons/wasd.png"
          alt="wasd"
        />
        &ndash; move
      </p>
    </div>
  );
}

export default Info;
