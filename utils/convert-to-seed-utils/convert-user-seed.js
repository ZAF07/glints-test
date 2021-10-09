/**
 * 
 * @param {Array} dataToConvert parsed and formatted data from json file 
 * @returns {Array} seed formatted data (users table)
 */
const convertUserSeed = (dataToConvert) => {
  const usersSeed = [];
  for (let i = 0; i < dataToConvert.length; i += 1) {
    const data = {}
    data.name = dataToConvert[i].name;
    data.cash_balance = dataToConvert[i].cashBalance;
    data.created_at = new Date();
    data.updated_at = new Date();
    usersSeed.push(data);
  }

  return usersSeed
}

exports.convertUserSeed = convertUserSeed