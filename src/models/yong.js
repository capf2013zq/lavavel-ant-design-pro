import { yong, b, c, d, f, cateList, edd, oto ,g,opp} from '../services/api';

export default {
  namespace: 'yong',

  state: [],

  effects: {
    * fetch({ id }, { call, put }) {       //初始页面拿数据
      const response = yield call(b,id);
      yield put({
        type: 'save',
        id: response,
      });
      // console.log(response);           数据库内值
    },
    * spp({ id }, { call, put }) {       //添加数据方法
      const response = yield call(c,id);
      yield put({
        type: 'save',
        id: response,
      });
       // console.log(response);
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
    * cha({ id }, { call, put }) {       //put调用同步方法    删除方法
      const response = yield call(g,id);
      yield put({
        type: 'save',
        id: response,
      });
      // console.log('查询的');
      // console.log(response);
    },
    * edit({ id }, { call, put }) {       //put调用同步方法    正式修改
      const response = yield call(f,id);
      yield put({
        type: 'save',
        id: response,
      });
      console.log('正修改＊＊＊');
      console.log(response);
    },
    * see({ id }, { call, put }) {       //    查看多图
      const response = yield call(opp,id);
      yield put({
        // type: 'saa',
        id: response,
      });
      console.log('查看多图＊＊＊');
      console.log(response);
    },
    * ftt({ id }, { call, put }) {       //加多图
      const response = yield call(oto,id);
      yield put({
        type: 'save',
        id: response,
      });
      console.log(response);           //数据库内值
    },
  },
  reducers: {
    save( state,action) {               //==============这里把数据存入state
      return [
        action.id,
      ];
    },
    saa( ) {               //==============这里把数据存入state
      return [

      ];
    },
  },
};
