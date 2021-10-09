const convertMenuSeed = (dataToConvert) => {
  const menuSeeders = [];
  for (let i = 0; i < dataToConvert.length; i += 1) {
    const singleRestaurantMenu = [];
    const dishes = dataToConvert[i].menu;
    
    for (let j = 0; j < dishes.length; j += 1) {
      const data = {};
      
      data.dish = dishes[j].dishName;
      data.price = dishes[j].price;
      data.created_at = new Date();
      data.updated_at = new Date();
      singleRestaurantMenu.push(data)
    }
    menuSeeders.push(singleRestaurantMenu)
  }

  return menuSeeders;
  }

  exports.convertMenuSeed = convertMenuSeed;