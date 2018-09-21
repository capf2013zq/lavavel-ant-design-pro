import { ceup,e } from '../services/api';   //调用api接口的数据

export default {
  namespace: 'ceup',

  state: [],

  effects: {
    * update({ id }, { call, put }) {       //put调用同步方法    修改方法
      const response = yield call(e,id);
      yield put({
        type: 'save',
        idd: response,
      });
      // console.log('修改的值');
      //  console.log(response);
    },
  },
  reducers: {
    save( state,action) {   //==============这里把数据存入state
      // console.log(action.idd)
      return [
        action.idd,
      ];
    },
  },
};
