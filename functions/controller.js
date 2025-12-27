const sequelize = require('../common/database');
const loadFn = require('../models/Function');
const Fn = loadFn(sequelize);

exports.load = async (req, res) => {
  try {
    console.log("DEBUG request: function load, ",req.params.name);

    const {doc, args, body} = req.body;
    const fn = await Fn.create({doc, args, body});
 
    //extend library
    eval("global."+req.params.lib+"."+req.params.name+"="+fn.body);

    res.status(201).json({
      success: true,
      function: { id: fn.id, llib: req.params.lib, name: req.params.name},
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.get = async (req, res) => {
  console.log("DEBUG request: function get, ",req.params.id);

  const fn = await Fn.findByPk(req.params.id);
  if (!fn) return res.status(404).json({ error: 'Function not found' });
  res.json({ success: true, name: fn.name, doc: fn.doc, lib: fn.lib, body: fn.body });
};

exports.getAll = async (req, res) => {
  console.log("DEBUG request: function list");

  const fns = await Fn.findAll();
  res.json({ success: true, data: fns });
};

exports.exec = async (req, res) => {
    var fns;
    console.log("DEBUG request: function execute, ",req.params.name);

    fns = await Fn.findAll({ where: {name: req.params.name, lib: req.params.lib} });
    if (fns.length==0) return res.status(404).json({ error: 'Function not found' });
    if (global[req.params.lib]==null) return res.status(404).json({ error: 'Library not compiled' });
 
    const args = req.body.args;
    const iife="(function ret() {return global."+req.params.lib+"."+fns[0].name+args+"})()";
    const ret=eval(iife);
    res.json({ success: true, data: ret });
};