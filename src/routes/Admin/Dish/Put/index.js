const { Router } = require('express');
const router = Router();
const format = require("./Controller/format").handler;
const existing = require("./Controller/existing").handler;
const { Dish, Diet }=require("../../../../db").handler;
const { getMany, relationGetter }=require("../../../routeFormatter").handler;
const { unknown, errJSON } = require("../../../error").handler;
const specialUpdates = require("./Controller/specialUpdates").handler;

router.put("/update_dish/:id",
	(req,res, next)=>{res.locals.params=req.params; res.locals.errors={}; next();},
	format,
 	existing,
	specialUpdates,
 	async(req,res)=>{
	try{
		res.locals.dish.update(req.body)
		.then(async updDish=>updDish.save()
			.then(async svdDish=>{
				if(svdDish){
					relationGetter(Diet, [ "id", "description", "optionId" ], res);
					await getMany(Dish, req.query, res, "Dishes");
				}else{
					res.status(500).json("unknown", unknown);
				};
			})
		);
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

// router.put("/test/:id", async(req,res)=>{
// 	try{

// 	}catch(err){
// 		res.send("ERROR: "+err);
// 	};
// });

module.exports.handler = router;
