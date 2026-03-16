const router = require("express").Router()

const adminController = require("../controllers/adminController")

const authMiddleware = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")

router.get("/users",authMiddleware,roleMiddleware,adminController.getAllUsers)

router.put("/block/:id",authMiddleware,roleMiddleware,adminController.blockUser)

router.put("/promote/:id",authMiddleware,roleMiddleware,adminController.promoteUser)

module.exports = router