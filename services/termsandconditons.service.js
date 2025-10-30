const TermsAndConditons = require('../models/termsandconditons')

//
const createTermsAndConditons = async(req) => {
    const {termsAndConditions} = req.body

    const existing = await TermsAndConditons.findOne()

    let result

    if(existing){
        result = await TermsAndConditons.findByIdAndUpdate(
            existing._id,
            {$set:{termsAndConditions}},
            {new:true}
        )
    }
    else{
        result = await TermsAndConditons.create({termsAndConditions})
    }

    return result
}

//delete terms and conditions

const deleteTermsAndConditions = async () => {
  const deletedItem = await TermsAndConditons.deleteMany({});
  return deletedItem;
};

const getTermsAndConditions = async () => {
  const item = await TermsAndConditons.find();
  return item;
};

module.exports = {
    createTermsAndConditons,
    deleteTermsAndConditions,
    getTermsAndConditions
}