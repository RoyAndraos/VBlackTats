const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  login,
  sendEmail,
  getFlashTattoos,
  uploadFlashImage,
  getFlashById,
  uploadTattoo,
  getTattoos,
  deleteTattoo,
  deleteFlash,
  sendEmailForFlash,
  getFeatured,
  deleteFeatured,
  uploadFeatured,
  uploadLandingPageImage,
  uploadTattoosImage,
  uploadFlashesImage,
  getLandingPageImage,
  getTattoosPageImage,
  getFlashesPageImage,
  getLandingPageImagePC,
  uploadLandingPageImagePC,
} = require("./server");

const app = express();
app.options("*", cors()); // Handle preflight requests for all routes
express()
  .use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(cors())
  .use(morgan("dev"))
  .use(express.json({ limit: "50mb" }))
  .use(express.static("public"))
  .use(cors())
  .get("/getFlash", getFlashTattoos)
  .get("/getTattoos", getTattoos)
  .get("/getFlashById/:id", getFlashById)
  .get("/getFeatured", getFeatured)
  .get("/getLandingPageImage", getLandingPageImage)
  .get("/getLandingPageImagePC", getLandingPageImagePC)
  .get("/getTattoosPageImage", getTattoosPageImage)
  .get("/getFlashesPageImage", getFlashesPageImage)
  .post("/uploadFlashImage", upload.single("file"), uploadFlashImage)
  .post("/uploadTattoo", upload.single("file"), uploadTattoo)
  .post(
    "/uploadLandingPageImage",
    upload.single("file"),
    uploadLandingPageImage
  )
  .post(
    "/uploadLandingPageImagePC",
    upload.single("file"),
    uploadLandingPageImagePC
  )
  .post("/uploadTattoosImage", upload.single("file"), uploadTattoosImage)
  .post("/uploadFlashesImage", upload.single("file"), uploadFlashesImage)
  .post("/login", login)
  .post(
    "/submitBooking",
    upload.fields([
      { name: "tattooRef", maxCount: 10 },
      { name: "placementRef", maxCount: 10 },
    ]),
    sendEmail
  )
  .post("/uploadFeatured", upload.single("file"), uploadFeatured)
  .post("/submitBookingFlash", upload.single("tattooRef"), sendEmailForFlash)

  .delete("/deleteTattoo/:id", deleteTattoo)
  .delete("/deleteFlash/:id", deleteFlash)
  .delete("/deleteFeatured/:id", deleteFeatured);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
