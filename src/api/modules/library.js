export default ({ request }) => ({
  /**
   * @description 获得
   */
  LIBRARY_LOAD () {
    return request({
      url: '/build/materials.json',
      method: 'get'
    })
  }
})
