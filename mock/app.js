const express = require('express')
const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')

const app = express()
app.get('/rest', (req, res) => {
  res.json({
    status: 1,
    message: 'request ok'
  })
})

app.get('/rest/cities', (req, res) => {
  // res.json({
  //   status: 1,
  //   message: 'request ok'
  // })
  const cities = fs.readFileSync(path.join(__dirname, './rest/cities.json'))

  res.json({
    status: 1,
    message: JSON.parse(cities)
  })
})

app.get('/rest/search', (req, res) => {
  return res.json({
    result: [
      {
        key: '芜湖',
        display: '芜湖'
      },
      {
        key: '井冈山',
        display: '井冈山'
      },
      {
        key: '铁岭',
        display: '铁岭'
      }
    ],
    searchKey: req.query.key
  })
})

app.get('/api/query', (req, res) => {
  const response = require('./rest/query.json')

  response.dataMap.directTrainInfo.trains = response.dataMap.directTrainInfo.trains.reverse()

  res.json(response)
})

app.get('/api/ticket', (req, res) => {
  const { date } = req.query

  return res.json({
    detail: {
      departTimeStr: '07:15',
      arriveTimeStr: '11:47',
      arriveDate: dayjs(date).valueOf(),
      durationStr: '4小时32分'
    },
    candidates: [
      {
        type: '二等座',
        priceMsg: '443.5',
        ticketsLeft: '有票',
        channels: [
          {
            name: '快速预订',
            desc: '含40元出行保障 快速出票 迅捷无忧'
          },
          {
            name: '普通预订',
            desc: '出票较慢，高峰期需要排队'
          }
        ]
      },
      {
        type: '一等座',
        priceMsg: '748.5',
        ticketsLeft: '有票',
        channels: [
          {
            name: '快速预订',
            desc: '含40元出行保障 快速出票 迅捷无忧'
          },
          {
            name: '普通预订',
            desc: '出票较慢，高峰期需要排队'
          }
        ]
      },
      {
        type: '商务座',
        priceMsg: '1403.5',
        ticketsLeft: '5张',
        channels: [
          {
            name: '快速预订',
            desc: '含40元出行保障 快速出票 迅捷无忧'
          },
          {
            name: '普通预订',
            desc: '出票较慢，高峰期需要排队'
          }
        ]
      }
    ]
  })
})

app.get('/api/search', (req, res) => {
  const query = req.query.query

  let data = null
  if (query.includes('redux')) {
    data = {
      status: 1,
      message: [
        { id: 1001, title: 'redux' },
        { id: 1002, title: 'react-redux' },
        { id: 1003, title: 'redux-hook' }
      ]
    }
  } else if (query.includes('vue')) {
    data = {
      status: 1,
      message: [
        { id: 2001, title: 'vue' },
        { id: 2002, title: 'vuex' },
        { id: 2003, title: 'vue-router' }
      ]
    }
  } else if (query.includes('angular')) {
    data = {
      status: 1,
      message: [
        { id: 3001, title: 'angular' },
        { id: 3002, title: 'angular-router' },
        { id: 3003, title: 'angular-redux' }
      ]
    }
  }

  // res.json({
  //     status: 1,
  //     message:'request ok'
  // })
  res.json(data)
})

app.listen(5000)
