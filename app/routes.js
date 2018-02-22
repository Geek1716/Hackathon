var plants = require('./models/plants');
var maps = require('./maps');


module.exports = function(app){
	app.get('/plants',function(req,res){
			res.render('plants.ejs');
		});

		app.post('/plants',function(req,res){
			plants.find({uses:req.body.condition},function(err,data){
				var plants = [];
				for(i=0;i<data.length;i++){
					plants[i]=data[i].name;
				}
				res.send(plants);
			})
			//res.send(req.body);
		});

		app.get('/info',function(req,res){
			res.render('info.ejs');
		});

		app.post('/info',function(req,res){
			plants.findOne({name:req.body.plant},function(err,data){
				res.send(data.uses);
			});
		});

		app.get('/datasave',function(req,res){
		var newplants = new plants();
		newplants.name = 'Neem';
		newplants.uses = ['bloody nose','fever','diabetes','pain','cough','head lice'];
		newplants.save(function(err){
			console.log("saved!");
			res.send("Data has been saved");
		});
	});

		app.get('/maps/:address',function(req,res){
			maps(res,req.params.address);
		});

		
        
}