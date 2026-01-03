const sequelize = require('../common/database');
const loadJob = require('../models/Job');
const Job = loadJob(sequelize);
const scheduler = require('../common/scheduler');

exports.run = async (req, res) => {
console.log("DEBUG: run job, "+req.params.name)
    
    const job = await Job.findByPk(req.params.name);
    scheduler.run(job.name, job.sch, job.lib, job.fn, job.args, job.delay, job.repeat_every, job.repeat_limit, job.cron);

    res.status(201).json({
      success: true,
      job: { name: req.params.name },
    });
}

exports.end = async (req, res) => {
console.log("DEBUG: stop job, "+req.params.name)
    
    const job = await Job.findByPk(req.params.name);
    scheduler.end(job.name);

    res.status(201).json({
      success: true,
      job: { name: req.params.name },
    });
}

exports.add = async (req, res) => {
  try {
    console.log("DEBUG request: job create, ",req.params.name);

    const { doc, sch, lib, fn, delay, repeat_every, repeat_limit, cron  } = req.body;
    const name = req.params.name;
  
    const job = await Job.create({name, doc, sch, lib, fn, delay, repeat_every, repeat_limit, cron});

    res.status(201).json({
      success: true,
      lib: { name: job.name },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.upd = async (req, res) => {
  try {
    console.log("DEBUG request: job update, ",req.params.name);

    const { doc, sch, lib, fn, delay, repeat_every, repeat_limit, cron  } = req.body;
    const name = req.params.name;
   
    const job = await Job.findByPk(req.params.name);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    job.doc = doc;
    job.sch = sch;
    job.lib = lib;
    job.fn = fn;
    job.delay = delay;
    job.repeat_every = repeat_every;
    job.repeat_limit = repeat_limit;
    job.cron = cron;
    await job.save();

    res.status(201).json({
      success: true,
      job: { name: job.name },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.get = async (req, res) => {
  console.log("DEBUG request: job get, ",req.params.name);

  const job = await Job.findByPk(req.params.name);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json({ success: true, doc: job.doc, sch: job.sch, lib: job.lib, fn: job.fn, delay: job.delay, repeat_every: job.repeat_every, repeat_limit: job.repeat_limit, cron: job.cron});
};

exports.all = async (req, res) => {
  console.log("DEBUG request: jobs list");

  const jobs = await Job.findAll();
  res.json({ success: true, data: jobs });
};

exports.del = async (req, res) => {
  console.log("DEBUG job delete, ",req.params.name);

  await Job.destroy({where: {name: req.params.name}});

  res.json({ success: true, name: req.params.name });
};
