const { Router } = require('express');
const router = Router();
const format = require("../Controller/format");
const existing = require("../Controller/existing");
const {Table}=require("../../../../db");
const {getMany}=require("../../../routeFormatter");
const {notFound, unknown, errJSON} = require("../../../error");

router.put("/update_table/:id",
	(req,res, next)=>{res.locals.params=req.params; res.locals.errors={}; res.locals.update=true; next();},
	format,
 	existing,
 	async(req,res)=>{
	try{
		Table.findByPk(req.params.id)
		.then(async (table)=>{
			if(table){
				table.update(req.body)
				.then(updated_table=>updated_table.save())
				.then(async (table)=>{
					if(req.query.single==="t"){
						res.json(table);
					}else{
						await getMany(Table, req.query, res, "Table");
					};
				});
			}else{
				res.status(404).json(errJSON("not_found", notFound("Table")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

// router.put("/test",
//  	async(req,res)=>{
// 	try{
// 		table.findAndCountAll({limit:3, offset:0})
// 		.then(rest=>{res.json(rest)});
// 	}catch(err){
// 		console.log(err);
// 		res.status(500).json(errJSON("unknown", unknown));
// 	};
// });

module.exports = router;