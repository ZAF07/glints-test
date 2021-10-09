/**
 * 
 * @param {Array} arr  parsed data from json file 
 * @returns {Array} abstracted data specific to filename (user name and cashBalance only)
 */
const getUserDetails = (arr) => {
  const users = arr;
  const userDetails = [];

  users.forEach(user => {
    const singleUser = {};
    singleUser.name = user.name;
    singleUser.cashBalance =user.cashBalance;
    userDetails.push(singleUser);
  })
  // console.log('RETURN HERE -> ', userDetails);
  return userDetails;
};

exports.getUserDetails = getUserDetails;