const { Router } = require('express');
const router = Router();
const format = require("./Controller/format");
const existing = require("./Controller/existing");
const {Inventory}=require("../../../../db");
const {getMany}=require("../../../routeFormatter");
const {notFound, unknown, errJSON} = require("../../../error");

router.put("/update_inventory/:id",
	(req,res, next)=>{ res.locals.params=req.params; res.locals.errors={}; next(); },
	format,
 	existing,
 	async(req,res)=>{
	try{
		Inventory.findByPk(req.params.id)
		.then(async (inventory)=>{
			if(inventory){
				inventory.update(req.body)
				.then(updated_inventory=>updated_inventory.save())
				.then(async (inventory)=>{
					if(req.query.single==="t"){
						res.json(inventory);
					}else{
						await getMany(Inventory, req.query, res, "Inventory's elements");
					};
				});
			}else{
				res.status(404).json(errJSON("not_found", notFound("Inventory")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

module.exports.handler = router;