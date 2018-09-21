import { phoot,oto,ott } from '../services/api';

export default {
  namespace: 'phoot',

  state: [],

  effects: {
    * fetch({ id }, { call, put }) {       //初始页面拿数据
      const response = yield call(oto,id);
      yield put({
        type: 'save',
        id: response,
      });
       console.log(response);           数据库内值
    },
    * spp({ id }, { call, put }) {       //添加数据方法
      const response = yield call(ott,id);
      yield put({
        type: 'save',
        id: response,
      });
      console.log(response);
    },
    // * delete({ id }, { call, put }) {       //put调用同步方法    删除方法
    //   const response = yield call(d,id);
    //   yield put({
    //     type: 'save',
    //     id: response,
    //   });
    //   console.log('删除d');
    //   console.log(response);
    // },
    // * cha({ id }, { call, put }) {       //put调用同步方法    删除方法
    //   const response = yield call(g,id);
    //   yield put({
    //     type: 'save',
    //     id: response,
    //   });
    //   console.log('查询的');
    //   console.log(response);
    // },
    // * edit({ id }, { call, put }) {       //put调用同步方法    正式修改
    //   const response = yield call(f,id);
    //   yield put({
    //     type: 'save',
    //     id: response,
    //   });
    //   console.log('正修改＊＊＊');
    //   console.log(response);
    // },
  },
  reducers: {
    save( state,action) {               //==============这里把数据存入state
      return [
        action.id,
      ];
    },
  },
};
