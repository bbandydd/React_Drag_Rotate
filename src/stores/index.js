import { useStrict } from 'mobx';
import BoxStore from './BoxStore';

useStrict(true);

export default {
  boxStore: new BoxStore()
};
