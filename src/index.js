export default class {
  constructor ({
    storeKeyPrefix = 'cache::',
    storeMetaKeyPrefix = 'cachemeta::'
  } = {
    storeKeyPrefix: 'cache::',
    storeMetaKeyPrefix: 'cachemeta::'
  }) {
    this.storeKeyPrefix = storeKeyPrefix
    this.storeMetaKeyPrefix = storeMetaKeyPrefix
  }

  get isSupported () {
    return 'localStorage' in window
  }

  init () {
    if (!this.isSupported) {
      throw new Error('Your browser does not support localStorage.')
    }

    this.flushExpired()
  }

  set (key, value, expiry) {
    this._set(`${this.storeKeyPrefix}${key}`, value)
    this._set(`${this.storeMetaKeyPrefix}${key}`, { exp: +new Date() + expiry })
    this.flushIfNeeded(key)
  }

  get (key) {
    this.flushIfNeeded(key)
    return this._get(`${this.storeKeyPrefix}${key}`)
  }

  remove (key) {
    this._remove(`${this.storeKeyPrefix}${key}`)
    this._remove(`${this.storeMetaKeyPrefix}${key}`)
  }

  flushAll () {
    this._getKeys().forEach(key => {
      this.remove(key)
    })
  }

  flushExpired () {
    this._getKeys().forEach(key => {
      this.flushIfNeeded(key)
    })
  }

  flushIfNeeded (key) {
    const meta = this._get(`${this.storeMetaKeyPrefix}${key}`)
    if (typeof meta === 'object' && meta !== null && meta.exp < +new Date()) {
      this.remove(key)
    }
  }

  _getKeys () {
    const keys = []
    Object.keys(window.localStorage).forEach(key => {
      if (key.indexOf(this.storeKeyPrefix) === 0) {
        keys.push(key)
      }
    })
    return keys
  }

  _set (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  _get (key) {
    const payload = window.localStorage.getItem(key)
    if (typeof payload === 'string' && payload.length > 0) {
      return JSON.parse(payload)
    }
    return undefined
  }

  _remove (key) {
    window.localStorage.removeItem(key)
  }
}
