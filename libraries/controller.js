const sequelize = require('../common/database');
const loadLib = require('../models/Library');
const Lib = loadLib(sequelize);
const loadFn = require('../models/Function');
const Fn = loadFn(sequelize);

exports.use = async (req, res) => {
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

exports.add = async (req, res) => {
  try {
    console.log("DEBUG request: library create, ",req.params.name);

    const { doc } = req.body;
    const name = req.params.name;
  
    const lib = await Lib.create({name, doc});

    res.status(201).json({
      success: true,
      lib: { name: lib.name },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.upd = async (req, res) => {
  try {
    console.log("DEBUG request: library update, ",req.params.name);

    const { doc } = req.body;
    const name = req.params.name;
  
    const lib = await Lib.findByPk(req.params.name);
    if (!lib) return res.status(404).json({ error: 'Library not found' });

    lib.doc = doc;
    await lib.save();

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

exports.all = async (req, res) => {
  console.log("DEBUG request: libraries list");

  const libs = await Lib.findAll();
  res.json({ success: true, data: libs });
};

exports.del = async (req, res) => {
  console.log("DEBUG library delete, ",req.params.name);

  await Fn.destroy({where: {lib: req.params.name}});

  const libs = await Lib.findAll({ where: {name: req.params.name} });
  if (libs.length==0) return res.status(404).json({ error: 'Library not found' });
  await libs[0].destroy();

  res.json({ success: true, name: libs[0].name });
};
