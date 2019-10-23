// req.query: parametros expostos na chamada url
// req.body: corpo da requisição
// req.params: parametros de rota na url para updates/deletes

const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

// Controllers
const SessionController   = require("./controllers/SessionController");
const SpotController      = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController   = require("./controllers/BookingController");
const ApprovalController   = require("./controllers/ApprovalController");
const RejectionController   = require("./controllers/RejectionController");

const routes = express.Router();
const upload = multer(uploadConfig);

// Sessions
routes.post('/sessions', SessionController.store);

// Spots
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

// Dashboard
routes.get('/dashboard', DashboardController.show);

// Bookings
routes.post('/spots/:spot_id/bookings', BookingController.store);

// Approving booking
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;