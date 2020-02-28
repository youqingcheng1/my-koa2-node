const router = require('koa-router')()
const userService = require('../controllers/mysqlConfig');

router.prefix('/users')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
  try{
    let result = await userService.findUserData('ddsd');
    ctx.body = userService.resultSuccessJson(undefined,undefined,result)
  } catch(err){
    ctx.body = userService.resultErrorJson(undefined,err,{})
  }
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
  let arr = [];

  arr.push(ctx.request.body['name']);
  arr.push(ctx.request.body['pass']);
  arr.push(ctx.request.body['auth']);

  await userService.addUserData(arr)
      .then((data) => {
          let r = '';
          if (data.affectedRows != 0) {
              r = 'ok';
          }
          ctx.body = {
              data: r
          }
      }).catch(() => {
          ctx.body = {
              data: 'err'
          }
      })
})

module.exports = router