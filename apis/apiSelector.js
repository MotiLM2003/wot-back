const  {processors }  = require('../json-data/processors')
const  { DBGetRecurringById} = require('../actions/recurringDBActions');
const  { DBgetCampingById } = require('../actions/campingDBActuib');
const   benqwestAPI = require('../apis/banquestAPI/banquestAPI')
const apiSelector = async (id) => {
    console.log('Getting recurring data by id: '.inverse.red, id);
    const recurring =  await DBGetRecurringById(id);
    const proc = processors[recurring.paymentInterface.processor];
    // console.log(recurring.campaign)    
    // console.log('campaign'.inverse.green, campaign.campaignName);
    console.log('Selected Processor:'.inverse.green,proc.name );
    console.log('payment interface:'.inverse.green, recurring.paymentInterface.paymentName);
     
    switch(recurring.paymentInterface.processor) {
        case 0: {
            try {
            if(recurring.paymentType === 0) {
                console.log("running benqwest creditcard card".inverse.cyan);
              const  { data } =  await  benqwestAPI.post('/charge',{
                    "amount": 2.01,
                    "expiry_month": 12,
                    "expiry_year": 2022,
                    "cvv2": "123",
                    "card": "4111111111111111",
                    "capture": true,
                    "save_card": false
                  }
                  )
               
                  if(data && data.status_code && data.status_code === "A") {
                      return { isApproved : true , data : data}
                  } else {
                   
                    return { isApproved : false , data : {}}
                  }
            } else {
                  console.log("running benqest ACH".inverse.cyan)
            }
        } catch(error) {
        console.log('error', error)
        }
            break;
        } case 2: {
            console.log('running Paypal, selected payment type'.inverse.red)
        }
    }

}



module.exports = { apiSelector}