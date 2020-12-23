const express = require("express");

const router = express.Router();
const apiPath = "/api";

router.use(`${apiPath}/driver`, require("./api/driver"));
router.use(`${apiPath}/rider`, require("./api/rider"));
router.use(`${apiPath}/admin`, require("./api/admin"));
router.use(`${apiPath}/rides`, require("./api/rides"));

module.exports = router;
