import Mock from 'mockjs';
Mock.setup({
  timeout: '600-1000' // 模拟响应时间
});


import mockLoginService from '../mock/auth/MockLoginService';
import { AUTH_LOGIN_URL, AUTH_USERINFO_URL} from '../api/login';

Mock.mock(new RegExp(AUTH_LOGIN_URL), /post|get/i, mockLoginService.login);
Mock.mock(new RegExp(AUTH_USERINFO_URL), /post|get/i, mockLoginService.getUserInfo);


import { INDEX_DEMO_URL } from '../api/demo';
import mockDemoService from './demo/MockDemoService';
Mock.mock(new RegExp(INDEX_DEMO_URL), /post|get/i, mockDemoService.demoIndex);


