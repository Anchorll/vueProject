/*后端express 路由配置*/

const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/getValue',(req,res,next)=>{
	api.getValue(req,res,next);
});
router.get('/userLogin',(req,res,next)=>{
	api.userLogin(req,res,next);
});
router.get('/getAssetsList',(req,res,next)=>{
	api.getAssetsList(req,res,next);
});

router.get('/queryAssetsList',(req,res,next)=>{
	api.queryAssetsList(req,res,next);
});

router.post('/addAssets',(req,res,next)=>{
	api.addAssets(req,res,next);
});
router.post('/editAssets',(req,res,next)=>{
	api.editAssets(req,res,next);
});
router.post('/delAssets',(req,res,next)=>{
	api.delAssets(req,res,next);
});
router.post('/delassetsmultiple',(req,res,next)=>{
	api.delassetsmultiple(req,res,next);
});
/*资产类型*/
router.get('/getAssetsTypeList',(req,res,next)=>{
	api.getAssetsTypeList(req,res,next);
});
router.post('/addAssetsType',(req,res,next)=>{
	api.addAssetsType(req,res,next);
});
router.post('/delAssetsType',(req,res,next)=>{
	api.delAssetsType(req,res,next);
});
router.post('/delassetsTypemultiple',(req,res,next)=>{
	api.delassetsTypemultiple(req,res,next);
});
router.post('/editAssetsType',(req,res,next)=>{
	api.editAssetsType(req,res,next);
});

/*区域管理*/
router.get('/getArea',(req,res,next)=>{
	api.getArea(req,res,next);
});
router.post('/addArea',(req,res,next)=>{
	api.addArea(req,res,next);
});
router.post('/delArea',(req,res,next)=>{
	api.delArea(req,res,next);
});
router.post('/delAreaM',(req,res,next)=>{
	api.delAreaM(req,res,next);
});
router.post('/editArea',(req,res,next)=>{
	api.editArea(req,res,next);
});

module.exports = router;