const { Router } = require('express');
const router = Router();
const format = require("./Controller/format").handler;
const existing = require("./Controller/existing").handler;
const {Diet}=require("../../../../db").handler;
const {getMany}=require("../../../routeFormatter").handler;
const {notFound, unknown, errJSON} = require("../../../error").handler;

router.put("/update_diet/:id",
	(req,res, next)=>{res.locals.params=req.params; res.locals.errors={}; next();},
	format,
 	existing,
 	async(req,res)=>{
	try{
		Diet.findByPk(req.params.id)
		.then(async (diet)=>{
			if(diet){
				diet.update(req.body)
				.then(updated_diet=>updated_diet.save())
				.then(async (diet)=>{
					if(req.query.single==="t"){
						res.json(diet);
					}else{
						await getMany(Diet, req.query, res, "Diets");
					};
				});
			}else{
				res.status(404).json(errJSON("not_found", notFound("Diets")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

module.exports.handler = router;