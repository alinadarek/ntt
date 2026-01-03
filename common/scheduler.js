const Queue = require('bull');

const jobsQueue = new Queue('jobsQueue', { redis: { host: '127.0.0.1', port: 6379 } });

jobsQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

jobsQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});

exports.schrun = (name) => {
  if (global.schedulers[name]==null) {
    console.error("Scheduler ",name," not defined.")
  } else if (global.schedulers[name]==false) {
    console.log("Running scheduler",name);

    jobsQueue.process(name, async (job) => {
      if (global.schedulers[name]==null) {
        console.error("Scheduler ",name," not defined.")
      } else if (global.schedulers[name]==false) {
        //scheduler is paused
      } else {
        console.log(`Processing job: ${job.id}`);
        eval("global."+job.data.lib+"."+job.data.fn+job.data.args);
      }
    });

    global.schedulers[name]=true;
  }
}

exports.schend = (name) => {
  if (global.schedulers[name]==null) {
    console.error("Scheduler ${name} not defined.")
  } else {
    global.schedulers[name]=false;
  }
}

exports.run = (name, sch, lib, fn, args, delay, repeat_every, repeat_limit, cron) => {
  console.log("Starting job",name,"on scheduler",sch);

  if (delay != null) {
    jobsQueue.add(sch, { lib: lib, fn: fn, args: args}, {delay: delay});
    return;
  } 
  if (repeat_every != null && repeat_limit != null) {
    jobsQueue.add(sch, { lib: lib, fn: fn, args: args }, {repeat: {every: repeat_every, limit: repeat_limit}});
    return;
  }
  if (cron != null) {
    jobsQueue.add(sch, { lib: lib, fn: fn, args: args }, {repeat: { cron: cron }});
    return;
  } 
  if (delay == null && repeat_every == null && repeat_limit == null && cron == null) {
    console.log("job added","fn:",fn,"lib",lib,"sch",sch)
    jobsQueue.add(sch, { lib: lib, fn: fn, args: args });
    return;
  } 
  console.error("Problem with job definition.")
}

exports.end = (name, repeat_every, repeat_limit, cron) => {
  if (cron!=null) removeRepeatable(name, {every: repeat_every, limit: repeat_limit});
  if (cron==null) removeRepeatable(name, {cron: cron});
}