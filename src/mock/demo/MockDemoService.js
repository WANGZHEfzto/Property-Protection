import MockUtils from '../../utils/MockUtils'

const list = [
  {stockCode:'000391', stockName: '22', currPrice: '33', thisWeek: '44', trend: '55', lastUpdate: '66', status: '空'},
  {stockCode:'000392', stockName: '22', currPrice: '33', thisWeek: '44', trend: '55', lastUpdate: '66', status: '多'}
]

export default {
  demoIndex: (config) => {
    return MockUtils.buildSuccessResult({
      username: 'demo username'
    });
  }
};
