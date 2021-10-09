/**
 * 
 * @param {Array} dataToConvert parsed and formatted data from json file 
 * @returns {Array} seed formatted data (opening_hours table)
 */
const convertTimeSeed = async (fileData) => {
  const timeSeeders = [];
  for (let i = 0; i < fileData.length; i += 1) {
    const oneRestaurantOpenHours = [];
    const openingHours = fileData[i].openingHours;
    
    for (let j = 0; j < openingHours.length; j += 1) {
      const data = {};
      // data.name = fileData[i].name;
      data.day = openingHours[j].day;
      data.open_hours = openingHours[j].openHours;
      data.opening_time = openingHours[j].openingTime
      data.closing_time = openingHours[j].closingTime
      data.created_at = new Date();
      data.updated_at = new Date();
      oneRestaurantOpenHours.push(data);
    }
    timeSeeders.push(oneRestaurantOpenHours); 
  }

  return timeSeeders;
}

exports.convertTimeSeed = convertTimeSeed;