export const GRID_SIZE = {
  columns: 20,
  rows: 20,
};

export const DEFAULT_SPEED = 200;

export const INITIAL_SNAKE = {
  head: {
    x: 6,
    y: 2,
  },
  body: [
    { x: 5, y: 2 },
    { x: 4, y: 2 },
  ],
  speed: DEFAULT_SPEED,
};
