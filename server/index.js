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
} = require("./server");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.get("/getFlash", getFlashTattoos);
app.get("/getTattoos", getTattoos);
app.get("/getFlashById/:id", getFlashById);
app.get("/getFeatured", getFeatured);
app.get("/getLandingPageImage", getLandingPageImage);
app.get("/getTattoosPageImage", getTattoosPageImage);
app.get("/getFlashesPageImage", getFlashesPageImage);

app.post("/uploadFlashImage", upload.single("file"), uploadFlashImage);
app.post("/uploadTattoo", upload.single("file"), uploadTattoo);
app.post(
  "/uploadLandingPageImage",
  upload.single("file"),
  uploadLandingPageImage
);
app.post("/uploadTattoosImage", upload.single("file"), uploadTattoosImage);
app.post("/uploadFlashesImage", upload.single("file"), uploadFlashesImage);
app.post("/login", login);
app.post(
  "/submitBooking",
  upload.fields([
    { name: "tattooRef", maxCount: 10 },
    { name: "placementRef", maxCount: 10 },
  ]),
  sendEmail
);
app.post("/uploadFeatured", upload.single("file"), uploadFeatured);
app.post("/submitBookingFlash", upload.single("tattooRef"), sendEmailForFlash);

app.delete("/deleteTattoo/:id", deleteTattoo);
app.delete("/deleteFlash/:id", deleteFlash);
app.delete("/deleteFeatured/:id", deleteFeatured);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
