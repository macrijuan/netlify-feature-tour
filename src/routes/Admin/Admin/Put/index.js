const{Router}=require("express");
const router = Router();
const format = require("./Controller/format").handler;
const statusFormat = require("./Controller/status_data");
const existing = require("./Controller/existing").handler;
const{Admin}=require("../../../../db").handler;
const {Op}=require("sequelize");
const {notFound, unknown, errJSON} = require("../../../error").handler;
const {getMany}=require("../../../routeFormatter").handler;

router.put("/update_admin_user/:id",
  (req,res,next)=>{res.locals.params=req.params; next();},
  format, 
  existing, 
  async(req,res)=>{
  try{
      Admin.findByPk(req.params.id)
      .then(admin=>{
        if(admin){
          admin.update(req.body)
          .then( update=>update.save()
            .then( async ()=>{
              await getMany(Admin, req.query, res, "Administrators");
            } ) 
          );
        }else{
          res.status(404).json( { errors:{ not_found: notFound("Administrator") }, update:true});
        };
      });
    }catch(err){
      res.status(500).json({errors:{unknown:unknown}});
    };
});

router.put("/update_admin_status/:id",
	(req,res, next)=>{ res.locals.params=req.params; res.locals.errors={}; next(); },
	statusFormat,
 	async(req,res)=>{
	try{
		Admin.findByPk(req.params.id)
		.then(async (admin)=>{
			if(admin){
        res.locals.data = {limit:req.query.perPage,offset:req.query.index, attributes:{exclude:["options", "password"]}};
        Object.keys(req.query).forEach(prop=>{
          if(typeof req.query[prop]==="string" && [ "first_name", "last_name", "status" ].includes(prop)){
            res.locals.filter[prop]=query[prop];
          };
        });
        if(!(admin.email==="superAdmin@example.com")){
          res.locals.filter = {email:{[Op.notILike]: '%superAdmin@example.com'}};
          res.locals.data.where=res.locals.filter;
          console.log({status:req.body.status})
          admin.update({status:req.body.status})
          .then(updated_admin=>updated_admin.save())
          .then(async (admin)=>{
            if(req.query.single==="t"){
              res.json(admin);
            }else{
              await getMany(Admin, req.query, res, "Administrators");
            };
          });
        }else{
          res.status(403).json(errJSON("status", ["It's not possible to apply these changes."]));
        };
			}else{
				res.status(404).json(errJSON("not_found", notFound(`Administrator (id:${req.params.id})`)));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

module.exports.handler=router;