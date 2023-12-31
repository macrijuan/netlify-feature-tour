const { Router } = require('express');
const { Op } = require("sequelize");
const router = Router();
const { Dish, Diet }=require("../../../../db").handler;
const { unknown, errJSON, notFound } = require("../../../error").handler;
const { getMany, relationGetter }=require("../../../routeFormatter").handler;
const format = require("./Controller/format").handler;
const existing = require("./Controller/existing").handler;

router.post("/post_dish",
format,
existing,
async( req, res )=>{
	try{
		const { name, ingredients,  description, image, taste, price, available, diets }=req.body;
    Dish.create({
      name, ingredients:ingredients.data, description, image, taste, price, available:available==="false"?false:true
    }).then( async (newDish)=>{
			Diet.findAll({
				where:{
					name:{ [Op.in]:diets.data }
				}
			}).then( async _diets=>{
				if(_diets.length){
					newDish.addDiets(_diets )
					.then( async ()=>{
						relationGetter(Diet, ["id", "description", "optionId"], res);
						await getMany(Dish, req.query, res, "Dishes");
					});
				}else{
					res.status(404).json( { errors:{ diets:[ notFound("Diets") ] }, post:true } );
				};
			});
    });
	}catch(err){
		console.log("ERROR:");
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

// router.post("/test", async(req,res)=>{
// 	// relationGetter(Diet, ["id", "description", "optionId"], res);
// 	Dish.findByPk(req.query.id,{ 
//     include:[ 
//       {
//         model:Diet, 
//         attributes:{ exclude:["id", "description", "optionId"] },
//         through:{ attributes:[] }
//       } 
//     ],
//     distinct:true,
// 		attributes:{ exclude:["optionId"] },
//   }).then(dish=>{res.json(dish)});
// });

module.exports.handler = router;