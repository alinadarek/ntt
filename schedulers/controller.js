const sequelize = require('../common/database');
const loadSch = require('../models/Scheduler');
const Sch = loadSch(sequelize);
const scheduler = require('../common/scheduler');

exports.run = async (req, res) => {
console.log("DEBUG: run scheduler, "+req.params.name)
    
    const sch = await Sch.findByPk(req.params.name);
    scheduler.schrun(req.params.name);

    await sch.update({ active: true });
 
    res.status(201).json({
      success: true,
      sch: { name: req.params.name },
    });
}

exports.end = async (req, res) => {
console.log("DEBUG: stop scheduler, "+req.params.name)
    
    const sch = await Sch.findByPk(req.params.name);
    scheduler.schend(sch.name);

    await sch.update({ active: false });
 
    res.status(201).json({
      success: true,
      sch: { name: req.params.name },
    });
}

exports.add = async (req, res) => {
  try {
    console.log("DEBUG request: scheduler create, ",req.params.name);

    const { doc } = req.body;
    const name = req.params.name;
  
    const sch = await Sch.create({name, doc});
    global.schedulers.name = false;

    res.status(201).json({
      success: true,
      sch: { name: sch.name },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.upd = async (req, res) => {
  try {
    console.log("DEBUG request: scheduler update, ",req.params.name);

    const { doc } = req.body;
    const name = req.params.name;
   
    const sch = await Sch.findByPk(req.params.name);
    if (!sch) return res.status(404).json({ error: 'Scheduler not found' });

    job.doc = doc;
    await sch.save({ fields: ['doc'] });

    res.status(201).json({
      success: true,
      sch: { name: sch.name },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.get = async (req, res) => {
  console.log("DEBUG request: scheduler get, ",req.params.name);

  const sch = await Sch.findByPk(req.params.name);
  if (!sch) return res.status(404).json({ error: 'Scheduler not found' });
  res.json({ success: true, doc: sch.doc, active: sch.active });
};

exports.all = async (req, res) => {
  console.log("DEBUG request: schedulers list");

  const schs = await Sch.findAll();
  res.json({ success: true, data: schs });
};

exports.del = async (req, res) => {
  console.log("DEBUG scheduler delete, ",req.params.name);

  await Sch.destroy({where: {name: req.params.name}});

  global.schedulers[req.paams.name]=null;
  
  res.json({ success: true, name: req.params.name });
};
