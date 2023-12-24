const { Router } = require('express');
const router = Router();
const {Diet, Option}=require("../../../../db");
const {errJSON, notFound, unknown} = require("../../../error");

router.get("/get_option", async(req,res)=>{
	try{
		Option.findOne({where:{model:req.query.model}, attributes:{exclude:["id", "model"]}, raw:true})
		.then(opt=>{
			if(opt){
				if(req.query.model==="Dish"){
					Diet.findAll({attributes:{exclude:["id", "description", "optionId"]}, through:{attributes:[]}, raw:true})
					.then(diets=>{
						if(diets.length){
							opt.updatable.diets = diets.map(diet=>diet.name);
							res.json(opt);
						}else{
							res.json(opt);
						};
					});
				}else{
					res.json(opt);
				};
			}else{
				res.json(null);
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

module.exports = router;