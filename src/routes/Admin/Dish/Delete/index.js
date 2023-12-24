const { Router } = require('express');
const router = Router();
const {notFound, unknown, errJSON} = require("../../../error").handler;
const {Dish, Diet}=require("../../../../db").handler;
const {getMany, relationGetter}=require("../../../routeFormatter").handler;

//The route /delete_dish/:id recives the dish's id the client wants to delete.
router.delete("/delete_dish/:id", async (req,res)=>{
	try{
		Dish.findByPk(req.params.id)
		.then(dish=>{
			if(dish){
				dish.destroy({force:true})
				.then(async ()=>{
					relationGetter(Diet, [ "id", "description", "optionId" ], res);
					await getMany(Dish, req.query, res, "Dishes");
				});
			}else{
				res.json(errJSON("not_found", notFound("Dish")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

//The route /delete_dishes recives throug body an array that has the id of the dishes the client wants to delete.
router.delete("/delete_dishes", async (req,res)=>{
	try{
		req.body.dishes.forEach(id=>{
			Dish.findByPk(id)
			.then(async dish=>{
				if(dish){
					await dish.destroy({force:true});
				};
			})
		}).then(()=>{res.json({message:"Dishes deleted."})});
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:unknown}});
	};
});


module.exports.handler = router;
// router.delete("/test",async(req,res)=>{
// 	Dish.findAndCountAll({limit:"2", offset:"0"}).then(dishes=>{res.json(dishes);});
// });


