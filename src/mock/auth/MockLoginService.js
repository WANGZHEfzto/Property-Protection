import MockUtils from '../../utils/MockUtils';

const userMap = {
  admin: {
    username: 'admin',
    password: 'admin',
    name: 'admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
};

export default {
  login: (config) => {
    const { username, password } = MockUtils.param2Obj(config.url);
    const userInfo = userMap[username];
    if (password === userInfo.password) {
      return MockUtils.buildSuccessResult({
        token:username,
        username: username,
        name: userInfo.name
      });
    }
    return MockUtils.buildFailedResult(10001, '登录失败，用户名密码错误!');
  },

  getUserInfo: (config) => {
    const { token } = MockUtils.param2Obj(config.url);
    const userInfo = userMap[token];
    if(userInfo){
      return MockUtils.buildSuccessResult({
        token: userInfo.username,
        username: userInfo.username,
        name: userInfo.name,
        role:['admin'],
        roles: ['admin'],
        avatar: userInfo.avatar
      });
    }
    return MockUtils.buildFailedResult(10001, '登录失败，用户名密码错误!');
  },

  logout: () => {
    return MockUtils.buildSuccessResult({ msg: '退出系统成功' });
  }
};
