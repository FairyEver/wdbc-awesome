export default ({ request }) => ({
  /**
   * @description 获得
   */
  MATERIALS_FETCH () {
    return request({
      url: '/build/materials.json',
      method: 'get'
    })
  }
})
