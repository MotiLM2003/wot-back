 const  moment = require('moment');
 var colors = require('colors');
 const donationOptions = [
    {
      id: 0,
      text: "Weekly",
      days: 7,
    },
    {
      id: 1,
      text: "Bi-Weekly",
      days: 14,
    },
    {
      id: 2,
      text: "Monthly",
      days: 30,
    },
    {
      id: 3,
      text: "Quarterly",
      days: 91,
    },
    {
      id: 4,
      text: "Daily",
      days: 1,
    },
  ];

  


const  { DBGetRecurringTaskList, updateById} = require('../actions/recurringDBActions');
const  { addImmediatePayment} = require('../controllers/recurringController');

const taskChargeRecurrings =  async (task) => {
    const list = await DBGetRecurringTaskList();
    for(const donation of list) {
        const now = moment();
        const  options =  donationOptions[donation.recurringType];
        const nextPaymentDate = moment(donation.lastPaymentDate).add(options.days, "days");
        const test = moment(donation.lastPaymentDate).add(-14, "days");
        // console.log((test));
        // console.log('donation every',options.days, 'days');
        // console.log('last payment', moment(donation.lastPaymentDate).format("DD-MM-YY HH:mm"));
        // console.log('next payment', moment(nextPaymentDate).format("DD-MM-YY HH:mm"));
        // console.log('Current round', donation.currentRecurringCount + 1);
        // console.log('end round', donation.recurringCount);
        const diff = now.diff(nextPaymentDate, 'minutes');
        // console.log('diff', diff)
        const isPayment = diff >= 0
        if(isPayment) {
            // console.log('making payment');
            donation.currentRecurringCount = donation.currentRecurringCount + 1;
            if( donation.recurringCount > 0 && donation.currentRecurringCount >= donation.recurringCount) {
                donation.isActive = false;
            }
            addImmediatePayment(donation);
            updateById({ _id : donation._id , 
                lastPaymentDate :new Date(),
                 currentRecurringCount : 
                  donation.currentRecurringCount, isActive: donation.isActive })
        } else {
            console.log('skipping payment'.underline.red)
        }
    }

}



module.exports = {taskChargeRecurrings};
