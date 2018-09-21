import { stringify } from 'qs';
import request from '@/utils/request';


//===================

export async function b(params) {
  return request('/o/user', {
    method: 'GET',
    body: params,
  });
}
//======================
//          添加方法
//======================
export async function c(params) {
  return request('/o/add', {
    method: 'POST',
    body: params,
  });
}
//======================
//          查询方法
//======================
export async function g(params) {
  return request('/o/search', {
    method: 'POST',
    body: params,
  });
}

export async function f(params) {
  return request('/o/edit', {
    method: 'POST',
    body: params,
  });
}

export async function d(params) {
  return request('/o/del', {
    method: 'POST',
    body: params,
  });
}
//修改信息
export async function e(params) {
  return request('/o/up', {
    method: 'POST',
    body: params,
  });
}

export async function edd(params) {
  return request('/o/edd', {
    method: 'POST',
    body: params,
  });
}

//=添加多图
export async function oto(params) {
  return request('/o/oto', {
    method: 'POST',
    body: params,
  });
}

//查询多图
export async function ott(params) {
  return request('/o/ott', {
    method: 'POST',
    body: params,
  });
}

export async function opp(params) {
  return request('/o/opp', {
    method: 'POST',
    body: params,
  });
}

export async function ceshi() {
  return request('/api/project/notice');
}

export async function yong() {
  return request('/api/project/notice');
}

export async function phoot() {
  return request('/api/project/notice');
}
//=====================

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     body: params,
//   });
// }
//======================================================登录
export async function fakeAccountLogin(params) {
  // return request('/api/login/account', {
  return request('/o/login', {
    method: 'POST',
    body: params,
  });
}


export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
