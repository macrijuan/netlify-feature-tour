const {Router} = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Dish, Diet, dish_diets } = require("../../../../../db").handler;
const { errJSON, notFound } = require("../../../../error").handler;

router.use( async( req, res, next )=>{
  Dish.findByPk( res.locals.params.id )
  .then(dish=>{
    if(dish){
      if(req.body.ingredients){
        switch(req.body.ingredients.method){
          case "add":
          dish.ingredients = dish.ingredients.concat(req.body.ingredients.data.filter(ingr=>!dish.ingredients.includes(ingr)));
          console.log(dish.ingredients);
          dish.changed("ingredients", true);
          break;
          case "remove":
          dish.ingredients.forEach((ingr,i)=>{
            if(req.body.ingredients.data.includes(ingr))dish.ingredients.splice(i,1);
          });
          dish.changed("ingredients", true);
        };
        delete req.body.ingredients;
      };
      if( req.body.diets &&req.body.diets.data &&req.body.diets.method &&req.body.diets.data.length ){
        Diet.findAll({
          where:{ name:{ [Op.in]:req.body.diets.data } },
          raw:true
        }).then(async diets=>{
          switch(req.body.diets.method){
            case "add":
              dish.addDiets(diets.map(diet=>diet.id)).then(()=>{ next() });
              break;
            case "remove":
            res.locals.removeDiets = diets.map(async diet=>await dish_diets.destroy({
              where:{
                dietId:diet.id,
                dishId:dish.dataValues.id
              },
              force:true
            }));
            Promise.all( res.locals.removeDiets ).then(()=>{ next() });
          };
          delete req.body.diets;
        });
      }else{
        next();
      };
      res.locals.dish = dish;
    }else{
      res.status(404).json(errJSON("not_found", notFound("Dish")));
    };
  });
});

module.exports.handler=router;