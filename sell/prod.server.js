
let express = require('express')
let config = require('./config/index')

let port = process.env.PORT||config.build.port;

let app = express();

let router = express.Router();

router.get('/',function(req,res,next){
    req.url = '/index.html';
    next();
});

app.use(router);



let appData = require('./db.json')
let seller = appData.seller;
let goods = appData.goods;
let ratings = appData.ratings;

app.get('/api/seller',function(req,res){
    res.json({
      errno:0,
      data:seller
    })
  })
  app.get('/api/goods',function(req,res){
    res.json({
      errno:0,
      data:goods
    });
  });
  app.get('/api/ratings',function(req,res){
    res.json({
      errno:0,
      data:ratings
    })
  })

let apiRouter = express.Router();
app.use('/api',apiRouter);


app.use(express.static('./dist'));

module.exports = app.listen(port,function(err){
    if(err){
        console.info(err);
        return
    }
    console.log('Listening at port '+port+'\n')
})