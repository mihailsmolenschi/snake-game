import { GRID_SIZE } from "../defaults";

export const generateRandomPosition = () => {
  return {
    x: Math.ceil(Math.random() * GRID_SIZE.columns),
    y: Math.ceil(Math.random() * GRID_SIZE.rows),
  };
};
