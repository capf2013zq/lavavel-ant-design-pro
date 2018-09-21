import { ceshi,b,c,d,f, cateList,edd } from '../services/api';   //调用api接口的数据

export default {
  namespace: 'ceshi',

  state: [],

  effects: {
    * fetch({ id }, { call, put }) {       //put调用同步方法    call处理业务逻辑
      const response = yield call(b,id);
      yield put({
        type: 'save',
        id: response,
      });
    },
    * spp({ id }, { call, put }) {       //put调用同步方法    添加方法
      const response = yield call(c,id);
      // yield put({
      //   type: 'save',
      //   id: response,
      // });
      console.log(response);
    },
    * edd({ id }, { call, put }) {       //put调用同步方法    添加方法
      const response = yield call(edd,id);
      yield put({
        type: 'save',
        id: response,
      });
      console.log(response);
    },
    * edit({ id }, { call, put }) {       //put调用同步方法    正式修改
      const response = yield call(f,id);
      yield put({
        type: 'save',
        id: response,
      });
      console.log('正修改＊＊＊');
      console.log(response);
      message.success("修改成功!");
    },
    * delete({ id }, { call, put }) {       //put调用同步方法    删除方法
      const response = yield call(d,id);
      yield put({
        type: 'save',
        id: response,
      });
      console.log('删除d');
      console.log(response);
    },

  },
  reducers: {
    save(state, action) {   //==============这里把数据存入state
      return [
        // ...state,　　　有了他添加删除/就不能自动刷新覆盖
        action.id,
      ];
    },
    saa(sta, action) {   //==============这里把数据存入state

      return [
        ...state,
        action.id,
      ];
    },
  },
};
