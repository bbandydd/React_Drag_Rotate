import { observable } from 'mobx';

const DEFAULT_CANVAS = {
  scale: 10,
  width: 1000,
  height: 600,
};

export default class BoxStore {
  @observable CANVAS = { ...DEFAULT_CANVAS };

  /**
   * 取得旋轉後四個點座標
   * 旋轉公式 以中心點為圓心，逆時針旋轉
   * x' = cos * x - sin * y
   * y' = sin * x + cos * y
   */
  getActualPosition = (POSITION, BOX) => {
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
  }

  /**
 * 偵測是否超出邊界，回傳調整後X, Y軸
 */
  getOffsetPosition = (BOX) => {
    const position1 = this.getActualPosition(1, BOX);
    const position2 = this.getActualPosition(2, BOX);
    const position3 = this.getActualPosition(3, BOX);
    const position4 = this.getActualPosition(4, BOX);

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
    if (MAX.x > this.CANVAS.width) BOX.x -= MAX.x - this.CANVAS.width;

    // 防止超出下方邊線
    if (MAX.y > this.CANVAS.height) BOX.y -= MAX.y - this.CANVAS.height;

    return {
      x: BOX.x,
      y: BOX.y,
    };
  }
}
