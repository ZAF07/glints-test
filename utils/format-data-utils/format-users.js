const getUserDetails = (arr) => {
  // console.log('SINGLE USER RAN******************');
  // console.log(arr[0]);
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