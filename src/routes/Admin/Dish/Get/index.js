const { Router } = require('express');
const router = Router();
const {Op}=require("sequelize");
const {Dish, Diet}=require("../../../../db").handler;
const errors = require("../../../error").handler;
const { getMany, relationGetter }=require("../../../routeFormatter").handler;

router.get("/get_dishes", async(req,res)=>{
	try{
		relationGetter(Diet, [ "id", "description" ], res);
		if(req.query.diets) {
			res.ignore=1;
			res.locals.data.include[0].where={ name:{ [Op.in]:JSON.parse(req.query.diets).data } };
		};
		await getMany(Dish, req.query, res, "Dishes");
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:errors.unknown}});
	};
});

router.get("/get_dishes/test", async(req,res)=>{
	Dish.findAndCountAll({
		limit:12, offset:0,
		include: [{
			model: Diet,
			where: { name:{[Op.in]:["vegetarian", "vegan"]} },
		}],
		where:{
			name:{[Op.substring]:'to'}
		},
		distinct:true
	})
	.then(dishes => {res.send(dishes)})
	.catch(err=>res.send(err));
});

router.get("/get_dish/:id", async(req,res)=>{
	try{
		relationGetter(Diet, ["id", "description", "optionId"], res);
		Dish.findByPk(req.params.id, res.locals.data)
		.then((dish)=>{
			if(dish){
				res.status(200).json(dish);
			}else{
				res.status(404).json({errors:{not_found:errors.notFound("Dish")}});
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:errors.unknown}});
	};
});

router.get("/test", async(req,res)=>{
	try{
		function fromDataType (Model, data={}){
			Object.keys(Model.rawAttributes).forEach(prop=>{
				if(!["deletion_code", "tableId", "userId", "reservationTicket"].includes(prop)){
					// console.log("HOLAAAAAAAAAAAA");
					console.log(Model.tableAttributes[prop].type.constructor.key==="ENUM");
					switch(Model.tableAttributes[prop].type.constructor.key){
						case "INTEGER": data[prop]="number";break;
						case "BOOLEAN": data[prop]=["true", "false"];break;
						case "ENUM": data[prop]=Model.tableAttributes[prop].values;break;
						default: data[prop]="string";
					};
				};
			});
			return data;
		};
		res.json(fromDataType(Dish));
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:errors.unknown}});
	};
});




module.exports.handler = router;