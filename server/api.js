/*连接数据库各种方法实现*/

const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

/*图片上传相关*/
var path = require('path');   //路径管理模块
var fs = require('fs');       //文件管理模块
/*var formidable = require('formidable');  //处理表单模块
var uuid = require('node-uuid');    //生成id模块*/
var rootDir="E:/HbuilderProject/Chenlulu/chenlulu/my-bolg/static";//上传图片设置的路径
const pool = mysql.createPool({
	host: dbConfig.mysql.host,
	user: dbConfig.mysql.user,
	password: dbConfig.mysql.password,
	database: dbConfig.mysql.database,
	port: dbConfig.mysql.port,
	multipleStatements: true, // 多语句查询
})
module.exports = {
	getValue(req,res,next) {
		var uid = req.query.uid;
		pool.getConnection((err,connection)=>{
			var sql = sqlMap.getValue;
			connection.query(sql,[uid],(err,result)=>{
				res.json(result);
				connection.release();
			})
		})
	},
	setValue(req,res,next) {
		var  uid = req.body.uid,
			 uname=req.body.uname;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.setValue;
			connection.query(sql,[uname,uid],(err,result)=>{
				res.json(result);
				connection.release();
			})
		})
	},
	userLogin(req,res,next){
		var id = req.query.id;
		var pwd = req.query.pwd;
		pool.getConnection((err,connection)=>{
			var sql = sqlMap.userLogin;
			connection.query(sql,[id,pwd],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
				
			})
		})
	},
	getAssetsList(req,res,next){
		var pagestart=req.query.pageStart*1;
		var pageend=req.query.pageEnd*1;
		pool.getConnection((err,connection)=>{
			var sql = sqlMap.assetsList;
			connection.query(sql,[pagestart,pageend],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					/*console.log(result);*/
					connection.release();
				}
				
			})
		})
		
	},
	queryAssetsList(req,res,next){
		var pagestart=req.query.pageStart*1;
		var pageend=req.query.pageEnd*1;
		var condition=req.query.condition;
		var val=req.query.val;
		
		pool.getConnection((err,connection)=>{
	var sql ="select SQL_CALC_FOUND_ROWS did,dname,duser,dtype,dprice,ddescribe,darea,DATE_FORMAT(dindate, '%Y/%m/%d %H:%i:%s') AS dindate from assetslist where "+condition+" like '%"+val+"%' order by dindate desc LIMIT "+pagestart+","+pageend+";select found_rows()  as total";  
			connection.query(sql,(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					/*console.log(result);*/
					connection.release();
				}
				
			})
		})
	
	},
	addAssets(req,res,next) {
		var  did = req.body.did,
			 dtype = req.body.dtype,
			 darea = req.body.darea,
			 duser = req.body.duser,
			 ddescribe = req.body.ddescribe,
			 dname=req.body. dname,
			 dprice=req.body.dprice;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.addAssets;
			connection.query(sql,[did,dname,dtype,duser,ddescribe,dprice,darea],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	delAssets(req,res,next){
		var did=req.body.did;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.delassets;
			connection.query(sql,[did],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	delassetsmultiple(req,res,next){
		var dids=req.body.dids;
		pool.getConnection((err,connection)=>{
			var sql="delete from assetslist where did in("+dids+")";
			connection.query(sql,[dids],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	editAssets(req,res,next){
		//updateAsset:"update assetlist set dname=?,did=?,dindate=?,dprice=?,darea=?,duser=?,dtype=?,ddescribe=?",
		var  did = req.body.did,
			 dtype = req.body.dtype,
			 darea = req.body.darea,
			 duser = req.body.duser,
			 ddescribe = req.body.ddescribe,
			 dname=req.body. dname,
			 dprice=req.body.dprice;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.updateAsset;
			connection.query(sql,[dname,dprice,darea,duser,dtype,ddescribe,did],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	/*资产类型*/
	getAssetsTypeList(req,res,next){
		var pagestart=req.query.pageStart*1;
		var pageend=req.query.pageEnd*1;
		pool.getConnection((err,connection)=>{
			var sql = sqlMap.assetType;
			connection.query(sql,[pagestart,pageend],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					/*console.log(result);*/
					connection.release();
				}
				
			})
		})
		
	},
	editAssetsType(req,res,next){
		//updateAsset:"update assetlist set dname=?,did=?,dindate=?,dprice=?,darea=?,duser=?,dtype=?,ddescribe=?",
		var  typeid = req.body.typeid,
			 typedescribe = req.body.typedescribe,
			 typename=req.body.typename;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.updateType;
			connection.query(sql,[typename,typedescribe,typeid],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	addAssetsType(req,res,next) {
		var  typeid = req.body.typeid,
			 typedescribe = req.body.typedescribe,
			 typename=req.body.typename;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.addType;
			connection.query(sql,[typeid,typename,typedescribe],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	delAssetsType(req,res,next){
		var typeid=req.body.typeid;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.deltype;
			connection.query(sql,[typeid],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	delassetsTypemultiple(req,res,next){
		var dids=req.body.dids;
		pool.getConnection((err,connection)=>{
			var sql="delete from assetstype where typeid in("+dids+")";
			connection.query(sql,[dids],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	
	/*区域管理*/
	getArea(req,res,next){
		var pagestart=req.query.pageStart*1;
		var pageend=req.query.pageEnd*1;
		pool.getConnection((err,connection)=>{
			var sql = sqlMap.areaList;
			connection.query(sql,[pagestart,pageend],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					/*console.log(result);*/
					connection.release();
				}
				
			})
		})
		
	},
	editArea(req,res,next){
		//updateAsset:"update assetlist set dname=?,did=?,dindate=?,dprice=?,darea=?,duser=?,dtype=?,ddescribe=?",
		var  aid = req.body.aid,
			adescribe = req.body.adescribe,
			 aname=req.body.aname;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.updateArea;
			connection.query(sql,[aname,adescribe,aid],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	addArea(req,res,next) {
		var  aid = req.body.aid,
			 adescribe = req.body.adescribe,
			 aname=req.body.aname;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.addArea;
			connection.query(sql,[aid,aname,adescribe],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	delArea(req,res,next){
		var aid=req.body.aid;
		pool.getConnection((err,connection)=>{
			var sql=sqlMap.delarea;
			connection.query(sql,[aid],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	delAreaM(req,res,next){
		var aids=req.body.aids;
		pool.getConnection((err,connection)=>{
			var sql="delete from arealist where aid in("+aids+")";
			connection.query(sql,[aids],(err,result)=>{
				if(err!=null){
					console.log(err);
				}else{
					res.json(result);
					connection.release();
				}
			})
		})
	},
	
}
