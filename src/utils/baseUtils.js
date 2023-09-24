class baseUtils {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _request(url, props, sourceError, withToken = false) {
    if (withToken) {
      props.headers.authorization =  `Bearer ${localStorage.getItem('JWT')}`
    }
    /*console.log(this._baseUrl, url, sourceError)*/
    const res = await fetch( `${this._baseUrl}${url}`, props );
    return this._checkResponse(res, sourceError);
  }

  _checkResponse(res, sourceError) {
    return res.ok
      ? res.json()
      : Promise.reject(`${sourceError}${res.status}(${res.statusText})`)
  }

}

export default baseUtils;
