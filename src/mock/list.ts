const Mock = require('mockjs')
const count = 38
const listNo = 10
let getGoodsList = []
for (let i = 0; i < count; i++) {
  getGoodsList.push(Mock.mock({
    id: '@id',
    'goodsName|1': ['简约刷牙漱口杯', '创意漱口杯', '小黄人漱口杯'],
    'englishName|1': ['cup1', 'cup2', 'cup3'],
    'shortName|1': ['glass4', 'glass5', 'glass6'],
    'goodsDesc|1': ['商品描述1', '商品描述2', '商品描述3'],
    'goodsbrand|1': ['houya', 'Edo', 'CH'],
    'goodsSpec|1': ['大', '中', '小']
  }))
}
module.exports = function (app) {
  // 监听请求
  app
    .get('/getList', (req, res) => {
      const { pageNo, pageSize, goodsName } = req.query
      let long = 0
      let list = getGoodsList
      if (goodsName) {
        list = getGoodsList.filter((item) => {
          const goodsNames = item.goodsName
          if (goodsNames.includes(goodsName)) {
            return item
          }
        })
      }
      long = list.length
      list = list.slice((pageNo - 1) * listNo, pageSize * pageNo)
      res.json(

        Mock.mock({
          code: 200,
          msg: '后端返回的提示信息！',
          data: {
            list,
            totalCount: long,
            pageNo: pageNo || 1,
            pageSize: pageSize || listNo
          }
        })

      )
    })
    .get('/deleteItem', (req, res) => {
      const { id } = req.query
      getGoodsList = getGoodsList.filter(item => item.id !== id)
      const list = getGoodsList.slice(0, listNo)
      res.json(
        Mock.mock({
          code: 200,
          msg: 'success',
          data: {
            list,
            pageNo: 1,
            pageSize: listNo
          }
        })
      )
    })
    .put('/addItem', (req, res) => {
      const list = req.body
      res.json(
        Mock.mock({
          code: 200,
          msg: 'success',
          data: {
            list,
            pageNo: 1,
            pageSize: listNo
          }
        })
      )
    })
    .post('/updateItem', (req, res) => {
      const list = req.body
      res.json(
        Mock.mock({
          code: 200,
          msg: 'success',
          data: {
            list,
            pageNo: 1,
            pageSize: listNo
          }
        })
      )
    })
}
