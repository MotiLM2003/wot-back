const { ToadScheduler, SimpleIntervalJob, Task : engineTask } = require('toad-scheduler')
const {addLogger} = require('../actions/loggerDBActions');
const  { getAll, updateById} = require('../actions/tasksDBActions');
const { taskChargeRecurrings} = require('./taskChargeRecurrings');
const tasks = [];
const scheduler = new ToadScheduler()

const initialTasks =  async () => {
    await addLogger({ loggerId : 1, statusCode  : 200 , descriptionId  : 0});
     list = await getTasks();
    for (const task of list) {
         if(task.isActive) {
          await  addLogger({ loggerId : 1,
                 statusCode  : 201 ,
                 descriptionId  : 1, 
                params : [task.description, task.intervalType === 0 ? "minutes" : "hours", task.intervalTicks]});
             startTask(task)
        } else {
            await addLogger({ loggerId : 1, statusCode  : 401 , descriptionId  : 2, params : task.description});
         }
    };
   
//  tasks[0] = new engineTask('id1', () => { console.log('simple task')})
// const job = new SimpleIntervalJob({ seconds: 5,runImmediately : true }, tasks[0],"id1")
// scheduler.addSimpleIntervalJob(job)
// // when stopping your app
// // scheduler.stop()

}


const getTaskAction = (task) => {
    switch(task.id ) {
        case 0: return chargeRecurrings(task);
        case 1: return updatePending(task);
        case 2: return constUpdateExchangeRate(task);
    }
}

const chargeRecurrings = async (task) => {
    updateById({_id:   task._id  , lastRunDate : new Date()})
    await  addLogger({ loggerId : 1,
        statusCode  : 201 ,
        descriptionId  : 3, 
       params : [task.description]});

       taskChargeRecurrings();

}


const updatePending = async (task) => {
    updateById({_id:   task._id  , lastRunDate : new Date()})
    await  addLogger({ loggerId : 1,
        statusCode  : 201 ,
        descriptionId  : 3, 
       params : [task.description]});
    // console.log('update pending')
}


const constUpdateExchangeRate = async (task) => {
    updateById({_id:   task._id  , lastRunDate : new Date()})
    await  addLogger({ loggerId : 1,
        statusCode  : 201 ,
        descriptionId  : 3, 
       params : [task.description]});
    // console.log('update exchange rate')
    
}

 


const startTask = async (task) => {
    const intervalType = task.intervalType === 0 ? "minutes" : "hours"
    const t = new engineTask(task.description, () => { getTaskAction(task)})
    const job = new SimpleIntervalJob({ 
        [intervalType] : task.intervalTicks ,runImmediately : true }, t,task._id )
    scheduler.addSimpleIntervalJob(job)
    updateById({_id:   task._id  , lastStartDate : new Date()})
// when stopping your app
// scheduler.stop()
}

const getTasks= async () => {
     const  list = await getAll(); 
    
     return list;
}
const stopTask = (id) =>  {
 


    console.log('stopping task')
    scheduler.stopById(id);
}

const reStartTask =  async (id) =>  {
    console.log('starting task')
    scheduler.startById(id);
}

const setTaskActiveStatus = async(task) => {
    if(!task.isActive) {
        await  addLogger({ loggerId : 1,
            statusCode  : 300 ,
            descriptionId  : 4, 
           params : [task.description]});
        stopTask(task._id)
    } else {
        await  addLogger({ loggerId : 1,
            statusCode  : 201 ,
            descriptionId  : 1, 
           params : [task.description, task.intervalType === 0 ? "minutes" : "hours", task.intervalTicks]});
    
        reStartTask(task._id)
    }
    getTaskStatus(task._id)
}


const getTaskStatus = (id) => {
    const status = scheduler.getById(id).getStatus();
    console.log('status: ',status)
}

const runTask = async (task) => {
    // console.log('running task', task)
    getTaskAction(task);
    
}

module.exports = { initialTasks, tasks,stopTask,setTaskActiveStatus ,runTask};



