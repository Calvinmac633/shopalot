const router = require("express").Router();
const listController = require("../../controllers/listController");

// Matches with "/api/list"
router.route("/")
  .get(listController.findAll)
  
  router.route('/:listname')
  .post(listController.create)
  
  router
  .route("/:codename")
  .get(listController.findOne)
  
  // .post(listController.create)
  .put(listController.findOneAndUpdate)
  //need to use this put function to also update Favoritessss
  // .favePut(listController.findOneAndUpdateFave)
  
  router
  .route("/:codename/:id")
  .put(listController.remove);


module.exports = router;