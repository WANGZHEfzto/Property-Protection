import secret from '@/utils/secret'

export default {

  getCookie(name) {
    var usercontent = $cookies.get('usercontent')
    if (usercontent) {
      usercontent = JSON.parse(secret.decrypt($cookies.get('usercontent')))
      return usercontent[name]
    } else {
      return null
    }
  },

  setCookie(name, value, expire) {
    var usercontent = $cookies.get('usercontent')
    if (usercontent) {
      usercontent = JSON.parse(secret.decrypt($cookies.get('usercontent')))
      usercontent[name] = value
      usercontent = secret.encrypt(JSON.stringify(usercontent))
      if (expire) {
        $cookies.set('usercontent', usercontent, expire)
      } else {
        $cookies.set('usercontent', usercontent)
      }
    }
  },

  setAllKeysCookie(value, expire) {
    if (expire) {
      $cookies.set('usercontent', secret.encrypt(JSON.stringify(value)), expire)
    } else {
      $cookies.set('usercontent', secret.encrypt(JSON.stringify(value)))
    }
  },

  clearCookie() {
    $cookies.remove('usercontent')
  }
}

