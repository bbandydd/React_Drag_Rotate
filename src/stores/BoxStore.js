import { observable, computed } from 'mobx';

const DEFAULT_CANVAS = {
  scale: 10,
  width: 1000,
  height: 600,
};

export default class BoxStore {
  @observable CANVAS = { ...DEFAULT_CANVAS };
}
