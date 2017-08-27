import getActualPosition from './getActualPosition';

/**
 * 偵測是否超出邊界，回傳調整後X, Y軸
 */
export default (BOX, CANVAS_WIDTH, CANVAS_HEIGHT) => {
  const position1 = getActualPosition(1, BOX);
  const position2 = getActualPosition(2, BOX);
  const position3 = getActualPosition(3, BOX);
  const position4 = getActualPosition(4, BOX);

  const MIN = {
    x: Math.min(position1.x, position2.x, position3.x, position4.x),
    y: Math.min(position1.y, position2.y, position3.y, position4.y)
  };

  const MAX = {
    x: Math.max(position1.x, position2.x, position3.x, position4.x),
    y: Math.max(position1.y, position2.y, position3.y, position4.y)
  };

  // 防止超出左方邊線
  if (MIN.x < 0) BOX.x = Math.abs(MIN.x);

  // 防止超出上方邊線
  if (MIN.y < 0) BOX.y = Math.abs(MIN.y);

  // 防止超出右方邊線
  if (MAX.x > CANVAS_WIDTH) BOX.x -= MAX.x - CANVAS_WIDTH;

  // 防止超出下方邊線
  if (MAX.y > CANVAS_HEIGHT) BOX.y -= MAX.y - CANVAS_HEIGHT;

  return {
    x: BOX.x,
    y: BOX.y,
  };
};
