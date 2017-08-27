/**
 * 取得旋轉後四個點座標
 * 旋轉公式 以中心點為圓心，逆時針旋轉
 * x' = cos * x - sin * y
 * y' = sin * x + cos * y
 */
export default (POSITION, BOX) => {
  const {
    x, y, BOX_WIDTH, BOX_HEIGHT, rotate,
  } = BOX;

  // 以中心點為圓心計算旋轉角度
  const CENTER_POSITION = {
    x: x + (BOX_WIDTH / 2),
    y: y + (BOX_HEIGHT / 2),
  };

  // 以中心點為圓心，計算原座標於新圓心的座標
  let NEW_POSITION;

  if (POSITION === 1) { // 左上
    NEW_POSITION = {
      x: x - CENTER_POSITION.x,
      y: y - CENTER_POSITION.y,
    };
  } else if (POSITION === 2) { // 右上
    NEW_POSITION = {
      x: CENTER_POSITION.x - x,
      y: y - CENTER_POSITION.y,
    };
  } else if (POSITION === 3) { // 左下
    NEW_POSITION = {
      x: x - CENTER_POSITION.x,
      y: CENTER_POSITION.y - y,
    };
  } else if (POSITION === 4) { // 右下
    NEW_POSITION = {
      x: CENTER_POSITION.x - x,
      y: CENTER_POSITION.y - y,
    };
  }

  const cos = deg => Math.round(Math.cos((deg / 180) * Math.PI) * 100) / 100;
  const sin = deg => Math.round(Math.sin((deg / 180) * Math.PI) * 100) / 100;

  // 套用旋轉公式計算
  const ROTATE_POSITION = {
    x: (cos(rotate) * NEW_POSITION.x) - (sin(rotate) * NEW_POSITION.y),
    y: (sin(rotate) * NEW_POSITION.x) + (cos(rotate) * NEW_POSITION.y),
  };

  return {
    x: Math.ceil(CENTER_POSITION.x + ROTATE_POSITION.x),
    y: Math.ceil(CENTER_POSITION.y + ROTATE_POSITION.y),
  };
};
