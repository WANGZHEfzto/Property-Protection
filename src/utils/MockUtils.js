export default {
  buildSuccessResult: data => ({
    success: true,
    errorCode: null,
    errorMsg: null,
    data: data
  }),

  buildFailedResult: (errorCode, errorMsg) => ({
    success: false,
    errorCode: errorCode,
    errorMsg: errorMsg,
    data: null
  }),

  buildPageResult: (totalSize, totalPageSize, currentPageNumber, dataList) => ({
    success: true,
    totalSize: totalSize,
    totalPageSize: totalPageSize,
    currentPageNumber: currentPageNumber,
    data: dataList
  }),

  param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
      return {};
    }
    const paramStr = `{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`;
    return JSON.parse(paramStr);
  }
};
