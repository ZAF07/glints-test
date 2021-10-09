const getDishes = (arr) => {
  const restaurants = arr;
  const menuForEachRest = [];
  restaurants.forEach(rest => {
    const restMenu = {
      restaurantName: rest.restaurantName,
      menu: []
    };
    const dishesAndPrices = rest.menu;
    //  ABSTRACT EACH DISH
    dishesAndPrices.forEach(dish => {
      restMenu.menu.push(dish);

    })
    menuForEachRest.push(restMenu);
  });
  return menuForEachRest;
}
 exports.getDishes = getDishes;