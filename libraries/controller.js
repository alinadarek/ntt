const sequelize = require('../common/database');
const loadLib = require('../models/Library');
const Lib = loadLib(sequelize);
const loadFn = require('../models/Function');
const Fn = loadFn(sequelize);

exports.compile = async (req, res) => {
console.log("DEBUG: use lib, "+req.params.name)
    global[req.params.name]={};

    var fn;
    for (var i=1;i<=8;i++) {
        fn = await Fn.findByPk(i);
        if (fn) eval("global."+req.params.name+"."+fn.name+"="+fn.body);
    }

    res.status(201).json({
      success: true,
      lib: { name: req.params.name },
    });
}

exports.create = async (req, res) => {
  try {
    console.log("DEBUG request: library create, ",req.body.name);

    const { name, doc } = req.body;
    const lib = await Lib.create({name, doc});

    res.status(201).json({
      success: true,
      lib: { name: lib.name },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.get = async (req, res) => {
  console.log("DEBUG request: library get, ",req.params.name);

  const lib = await Lib.findByPk(req.params.name);
  if (!lib) return res.status(404).json({ error: 'Library not found' });
  res.json({ success: true, doc: lib.doc });
};

exports.getAll = async (req, res) => {
  console.log("DEBUG request: libraries list");

  const libs = await Lib.findAll();
  res.json({ success: true, data: libs });
};
