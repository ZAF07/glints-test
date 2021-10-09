const getDishes = (arr) => {
  const restaurants = arr;
  // console.log('ress => ', restaurants);
  const menuForEachRest = [];
  restaurants.forEach(rest => {
    const restMenu = {
      restaurantName: rest.restaurantName,
      menu: []
    };
    const dishesAndPrices = rest.menu;
    // console.log('dsa => ', dishesAndPrices);
    //  ABSTRACT EACH DISH
    dishesAndPrices.forEach(dish => {
      restMenu.menu.push(dish);

    })
    menuForEachRest.push(restMenu);
    // console.log('dish ==---> ', restMenu);
  });
  return menuForEachRest;
  // console.log('ALL RESTARUANT ==> ', menuForEachRest[100]);
}
 exports.getDishes = getDishes;