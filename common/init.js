const sequelize = require('../common/database');
const loadSch = require('../models/Scheduler');
const Sch = loadSch(sequelize);
const loadFn = require('../models/Function');
const Fn = loadFn(sequelize);
const loadLib = require('../models/Library');
const Lib = loadLib(sequelize);

exports.initsch = async () => {
  global.schedulers={};

  const schs = await Sch.findAll();
  
  if (schs.length>0) schs.forEach(sch => {
    console.log("init scheduler",sch.name);
    global.schedulers[sch.name]=false;
  });
}

exports.initfn = async () => {
  const fns = await Fn.findAll();
  
  if (fns.length>0) fns.forEach(fn => {
    console.log("init function",fn.name);
    eval("global."+fn.lib+"."+fn.name+"="+fn.body);
  });
}

exports.initlib = async () => {
  const libs = await Lib.findAll();
  
  if (libs.length>0) libs.forEach(lib => {
    console.log("init library",lib.name);
    eval("global."+lib.name+"={}");
  });
}