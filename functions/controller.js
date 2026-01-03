const sequelize = require('../common/database');
const loadFn = require('../models/Function');
const Fn = loadFn(sequelize);

exports.add = async (req, res) => {
  try {
    console.log("DEBUG request: function load, ",req.params.name);

    const {doc, args, body} = req.body;
    const name = req.params.name;
    const lib = req.params.lib;
    const fn = await Fn.create({name, lib, doc, args, body});
 
    //extend library
    eval("global."+req.params.lib+"."+req.params.name+"="+fn.body);

    res.status(201).json({
      success: true,
      function: { id: fn.id},
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.upd = async (req, res) => {
  try {
    console.log("DEBUG request: function update, ",req.params.name);
    var fns;

    const {doc, args, body} = req.body;
    const name = req.params.name;
    const lib = req.params.lib;
    
    fns = await Fn.findAll({ where: {name: req.params.name, lib: req.params.lib} });
    if (fns.length == 0) return res.status(404).json({ error: 'Function not found' });

    fns[0].doc = doc;
    fns[0].args = args;
    fns[0].body = body;
    await fns[0].save();

    //update library
    eval("global."+req.params.lib+"."+req.params.name+"="+body);

    res.status(201).json({
      success: true,
      fn: { id: fns[0].id },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.get = async (req, res) => {
  console.log("DEBUG request: function get, ",req.params.name);

  const fns = await Fn.findAll({ where: {name: req.params.name, lib: req.params.lib} });
  if (fns.length==0) return res.status(404).json({ error: 'Function not found' });
  res.json({ success: true, id: fns[0], doc: fns[0].doc, body: fns[0].body });
};

exports.all = async (req, res) => {
  console.log("DEBUG request: function list");

  const fns = await Fn.findAll();
  res.json({ success: true, data: fns });
};

exports.run = async (req, res) => {
    var fns;
    console.log("DEBUG request: function execute, ",req.params.name);

    fns = await Fn.findAll({ where: {name: req.params.name, lib: req.params.lib} });
    if (fns.length==0) return res.status(404).json({ error: 'Function not found' });
    if (global[req.params.lib]==null) return res.status(404).json({ error: 'Library not compiled' });
 
    const args = req.body.args;
    const iife="(function ret() {return global."+req.params.lib+"."+fns[0].name+args+"})()";
    console.log("DEBUG iife",iife);
    const ret=eval(iife);
    res.json({ success: true, data: ret });
};

exports.del = async (req, res) => {
  console.log("DEBUG request: function delete, ",req.params.name);

  fns = await Fn.findAll({ where: {name: req.params.name, lib: req.params.lib} });
  if (fns.length==0) return res.status(404).json({ error: 'Function not found' });
  await fns[0].destroy();

  res.json({ success: true, id: fns[0].id });
};