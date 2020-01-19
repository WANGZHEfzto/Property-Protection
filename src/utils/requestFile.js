import axios from 'axios'
function service(url, data, name) {
  axios
    .post(process.env.BASE_API + url, data, { responseType: 'blob' })
    .then(function(response) {
      // console.log(response)
      var blob = new Blob([response.data])
      var downloadElement = document.createElement('a')
      var href = window.URL.createObjectURL(blob) // 创建下载的链接
      downloadElement.href = href
      downloadElement.download = name // 下载后文件名
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    })
    .catch(function(error) {
      console.log(error)
    })
}

export default service
