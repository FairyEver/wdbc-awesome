export default ({ request }) => ({
  /**
   * @description 获得
   */
  LIBRARY_LOAD () {
    return request({
      url: '/db.json',
      method: 'get'
    })
  }
})
