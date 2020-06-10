/* 数据库增删改查语句*/

var sqlMap = {
	/*getValue:'select * from user where uid=?',
	setValue:'update user set uname=? where uid=?',*/
	userLogin:'select * from admin where id=? and pwd=?',
	
	assetsList:"select did,dname,duser,dtype,dprice,ddescribe,darea,DATE_FORMAT(dindate, '%Y/%m/%d %H:%i:%s') AS dindate from assetslist order by dindate desc LIMIT ?,?;select count(*) as total from assetslist",
	assetType:"select typeid,typename,typedescribe,DATE_FORMAT(typeindate,'%Y/%m/%d %H:%i:%s') AS typeindate from assetstype order by typeindate desc LIMIT ?,?;select count(*) as total from assetstype",
	areaList:"select aid,aname,adescribe,DATE_FORMAT(aindate,'%Y/%m/%d %H:%i:%s') AS aindate from arealist order by aindate desc LIMIT ?,?;select count(*) as total from arealist",
	adminList:"select * from admin",
	
	updateAdmin:'update admin set username=?,type=?,pwd=? where uid=?',
	updateAsset:"update assetslist set dname=?,dprice=?,darea=?,duser=?,dtype=?,ddescribe=? where did=?",
	updateArea:"update arealist set aname=?,adescribe=? where aid=?",
	updateType:"update assetstype set typename=?,typedescribe=? where typeid=?",
	
	deluser:'delete from admin where id=?',
	delassets:'delete from assetslist where did=?',
	delarea:'delete from arealist where aid=?',	
	deltype:'delete from assetstype where typeid=?',	
	
	addAssets:'insert into assetslist (did,dname,dtype,duser,ddescribe,dprice,darea) values(?,?,?,?,?,?,?)',
	addArea:'insert into arealist (aid,aname,adescribe) values(?,?,?)',
	addType:'insert into assetstype (typeid,typename,typedescribe) values(?,?,?)',
	addadmin:'insert into admin (id,pwd,type,username) values(?,?,?,?)'
}

module.exports = sqlMap;