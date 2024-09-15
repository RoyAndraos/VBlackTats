const LOGIN_USERNAME = process.env.LOGIN_USERNAME;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
const jwt = require("jsonwebtoken");
const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;
const { MongoClient } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;
const cloudinary = require("cloudinary").v2;
// const client = new MongoClient(MONGO_URI_RALF);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { MailtrapClient } = require("mailtrap");

const mailtrapClient = new MailtrapClient({
  token: process.env.EMAIL_TOKEN,
});

const sender = {
  email: "mailtrap@vblacktattoos.com",
  name: "Tattoo Shop",
};
const recipients = [
  //change to v.black.tattoos@gmail.com
  {
    email: "v.black.tattoos@gmail.com",
  },
];

const sendEmail = async (req, res) => {
  const {
    fname,
    lname,
    email,
    phone,
    age,
    placement,
    size,
    description,
    budget,
  } = req.body;

  const tattooRef = req.files.tattooRef;
  const placementRef = req.files.placementRef;
  try {
    const attachments = [];

    // Add tattoo reference images to attachments
    if (tattooRef && tattooRef.length > 0) {
      tattooRef.forEach((file) => {
        attachments.push({
          filename: file.originalname,
          content: file.buffer,
        });
      });
    }

    // Add placement reference images to attachments
    if (placementRef && placementRef.length > 0) {
      placementRef.forEach((file) => {
        attachments.push({
          filename: file.originalname,
          content: file.buffer,
        });
      });
    }

    // Send the email with attachments
    await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "New Booking Request",
      text: `Name: ${fname} ${lname}\nEmail: ${email}\nPhone: ${phone}\nAge: ${age}\nPlacement: ${placement}\nSize: ${size} inches\nDescription: ${description}\nBudget: ${budget} CAD`,
      category: "New Booking Request (Custom)",
      attachments,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};

const sendEmailForFlash = async (req, res) => {
  const { fname, lname, email, phone, age, placement } = req.body;
  const tattooRef = req.file; // multer processes single file as `req.file`

  try {
    const attachments = [];

    // Add tattoo reference image to attachments
    if (tattooRef) {
      attachments.push({
        filename: "flash",
        content: tattooRef.buffer,
      });
    }

    // Send the email with the attachment
    await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "New Booking Request (Flash)",
      text: `Name: ${fname} ${lname}\nEmail: ${email}\nPhone: ${phone}\nAge: ${age}\nPlacement: ${placement}\n`,
      category: "Booking Request",
      attachments,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const correctUsername = LOGIN_USERNAME === username;
    const correctPassword = LOGIN_PASSWORD === password;
    if (correctPassword && correctUsername) {
      const token = jwt.sign({ userId: "admin" }, JWT_TOKEN_KEY, {
        expiresIn: "3h",
      });
      res.status(200).json({ status: 200, token: token });
    } else {
      res
        .status(401)
        .json({ status: 401, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  jwt.verify(token, JWT_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // Token is valid; user identification is available in decoded.userId
    req.userId = decoded.userId;
    next();
  });
};

//-------------------------------------------------------------------------------------------------------
// GET ENDPOINTS
//-------------------------------------------------------------------------------------------------------
const getLandingPageImagePC = async (req, res) => {
  try {
    // Perform the search query to retrieve images from the "Flash" folder
    const result = await cloudinary.search
      .expression("folder:LandingPagePC/*")
      .execute();

    // Check if the result contains resources (images)
    const images = result.resources;

    if (images && images.length > 0) {
      // If images are found, return them in the response
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: images });
    } else {
      // If no images are found, return a 404 response
      return res.status(404).json({ status: 404, message: "No images found" });
    }
  } catch (error) {
    // Handle any errors that occur during the search
    console.error("Error fetching images:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};
const getLandingPageImage = async (req, res) => {
  try {
    // Perform the search query to retrieve images from the "Flash" folder
    const result = await cloudinary.search
      .expression("folder:LandingPage/*")
      .execute();

    // Check if the result contains resources (images)
    const images = result.resources;

    if (images && images.length > 0) {
      // If images are found, return them in the response
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: images });
    } else {
      // If no images are found, return a 404 response
      return res.status(404).json({ status: 404, message: "No images found" });
    }
  } catch (error) {
    // Handle any errors that occur during the search
    console.error("Error fetching images:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const getTattoosPageImage = async (req, res) => {
  try {
    // Perform the search query to retrieve images from the "Flash" folder
    const result = await cloudinary.search
      .expression("folder:TattoosImage/*")
      .execute();

    // Check if the result contains resources (images)
    const images = result.resources;

    if (images && images.length > 0) {
      // If images are found, return them in the response
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: images });
    } else {
      // If no images are found, return a 404 response
      return res.status(404).json({ status: 404, message: "No images found" });
    }
  } catch (error) {
    // Handle any errors that occur during the search
    console.error("Error fetching images:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const getFlashesPageImage = async (req, res) => {
  try {
    // Perform the search query to retrieve images from the "Flash" folder
    const result = await cloudinary.search
      .expression("folder:FlashesImage/*")
      .execute();

    // Check if the result contains resources (images)
    const images = result.resources;

    if (images && images.length > 0) {
      // If images are found, return them in the response
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: images });
    } else {
      // If no images are found, return a 404 response
      return res.status(404).json({ status: 404, message: "No images found" });
    }
  } catch (error) {
    // Handle any errors that occur during the search
    console.error("Error fetching images:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const getFeatured = async (req, res) => {
  try {
    // Perform the search query to retrieve images from the "Flash" folder
    const result = await cloudinary.search
      .expression("folder:Featured/*")
      .execute();

    // Check if the result contains resources (images)
    const images = result.resources;

    if (images && images.length > 0) {
      // If images are found, return them in the response
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: images });
    } else {
      // If no images are found, return a 404 response
      return res.status(404).json({ status: 404, message: "No images found" });
    }
  } catch (error) {
    // Handle any errors that occur during the search
    console.error("Error fetching images:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const getTattoos = async (req, res) => {
  try {
    // Perform the search query to retrieve images from the "Flash" folder
    const result = await cloudinary.search
      .expression("folder:Tattoo/*")
      .execute();

    // Check if the result contains resources (images)
    const images = result.resources;

    if (images && images.length > 0) {
      // If images are found, return them in the response
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: images });
    } else {
      // If no images are found, return a 404 response
      return res.status(404).json({ status: 404, message: "No images found" });
    }
  } catch (error) {
    // Handle any errors that occur during the search
    console.error("Error fetching images:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const getFlashById = async (req, res) => {
  const { id } = req.params;

  try {
    // Perform the search query to retrieve images from the "Flash" folder
    const result = await cloudinary.search
      .expression(`folder:Flash AND public_id:Flash/${id}`)
      .execute();
    // Log the result for debugging

    // Check if the result contains resources (images)
    const images = result.resources;

    if (images && images.length > 0) {
      // If images are found, return them in the response
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: images });
    } else {
      // If no images are found, return a 404 response
      return res.status(404).json({ status: 404, message: "No images found" });
    }
  } catch (error) {
    // Handle any errors that occur during the search
    console.error("Error fetching images:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};
const getFlashTattoos = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  try {
    // Perform the search query to retrieve images from the "Flash" folder
    const result = await cloudinary.search
      .expression("folder:Flash/*")
      .execute();

    // Check if the result contains resources (images)
    const images = result.resources;
    if (images && images.length > 0) {
      const db = client.db("VeroTattoo");
      const imagesData = await db.collection("Flash").find().toArray();
      //link the imagesData to the Images by matching the public_id with the _id
      const linkedImages = images.map((image) => {
        const foundImage = imagesData.find(
          (img) => img._id === image.public_id
        );
        return {
          ...image,
          ...foundImage,
        };
      });

      // If images are found, return them in the response
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: linkedImages });
    } else {
      // If no images are found, return a 404 response
      return res.status(404).json({ status: 404, message: "No images found" });
    }
  } catch (error) {
    // Handle any errors that occur during the search
    console.error("Error fetching images:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

//-------------------------------------------------------------------------------------------------------
// POST ENDPOINTS
//-------------------------------------------------------------------------------------------------------

const uploadTattoo = async (req, res) => {
  try {
    const file = req.file; // Access the uploaded file
    if (!file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }

    // Upload the file buffer to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "Tattoo" },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).json({ status: 500, message: error.message });
        }

        res.json({
          status: 200,
          message: "Image uploaded",
          data: result,
        });
      }
    );

    // Pipe the file buffer to the Cloudinary upload stream
    uploadStream.end(file.buffer); // Use `file.buffer` for memoryStorage
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: 500, message: error.message });
  }
};

const uploadFlashImage = async (req, res) => {
  try {
    const file = req.file; // Access the uploaded file
    if (!file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }

    // Upload the file buffer to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "Flash" },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).json({ status: 500, message: error.message });
        }

        // Connect to MongoDB and insert the document
        const client = new MongoClient(MONGO_URI);
        try {
          await client.connect();
          const db = client.db("VeroTattoo");
          // Insert the document with the public_id as the _id
          await db.collection("Flash").insertOne({
            _id: result.public_id, // Use the public_id from Cloudinary as the _id
            size: req.body.artSize,
            price: req.body.price,
            artName: req.body.artName || "",
          });

          // Respond with success
          res.json({
            status: 200,
            message: "Image uploaded and data saved",
            data: result,
          });
        } catch (dbError) {
          console.error("Error saving to MongoDB:", dbError);
          res.status(500).json({ status: 500, message: dbError.message });
        } finally {
          client.close();
        }
      }
    );

    // Pipe the file buffer to the Cloudinary upload stream
    uploadStream.end(file.buffer); // Use `file.buffer` for memoryStorage
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: 500, message: error.message });
  }
};

const uploadFeatured = async (req, res) => {
  try {
    const file = req.file; // Access the uploaded file
    if (!file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }
    // Upload the file buffer to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "Featured" },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).json({ status: 500, message: error.message });
        }

        res.json({
          status: 200,
          message: "Image uploaded",
          data: result,
        });
      }
    );

    // Pipe the file buffer to the Cloudinary upload stream
    uploadStream.end(file.buffer); // Use `file.buffer` for memoryStorage
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: 500, message: error.message });
  }
};
const uploadLandingPageImagePC = async (req, res) => {
  const oldImage = req.body.oldImage;
  try {
    const file = req.file; // Access the uploaded file
    if (!file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }
    //remove oldImage then upload the new one
    const result = await cloudinary.uploader.destroy(`${oldImage}`);
    if (result.result === "ok") {
      // Upload the file buffer to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "LandingPagePC" },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            return res
              .status(500)
              .json({ status: 500, message: error.message });
          }

          res.json({
            status: 200,
            message: "Image uploaded",
            data: result,
          });
        }
      );

      // Pipe the file buffer to the Cloudinary upload stream
      uploadStream.end(file.buffer); // Use `file.buffer` for memoryStorage
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: 500, message: error.message });
  }
};
const uploadLandingPageImage = async (req, res) => {
  const oldImage = req.body.oldImage;
  try {
    const file = req.file; // Access the uploaded file
    if (!file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }
    //remove oldImage then upload the new one
    const result = await cloudinary.uploader.destroy(`${oldImage}`);
    if (result.result === "ok") {
      // Upload the file buffer to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "LandingPage" },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            return res
              .status(500)
              .json({ status: 500, message: error.message });
          }

          res.json({
            status: 200,
            message: "Image uploaded",
            data: result,
          });
        }
      );

      // Pipe the file buffer to the Cloudinary upload stream
      uploadStream.end(file.buffer); // Use `file.buffer` for memoryStorage
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: 500, message: error.message });
  }
};

const uploadTattoosImage = async (req, res) => {
  const oldImage = req.body.oldImage;
  try {
    const file = req.file; // Access the uploaded file
    if (!file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }
    //remove oldImage then upload the new one
    const result = await cloudinary.uploader.destroy(`${oldImage}`);
    if (result.result === "ok") {
      // Upload the file buffer to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "TattoosImage" },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            return res
              .status(500)
              .json({ status: 500, message: error.message });
          }

          res.json({
            status: 200,
            message: "Image uploaded",
            data: result,
          });
        }
      );

      // Pipe the file buffer to the Cloudinary upload stream
      uploadStream.end(file.buffer); // Use `file.buffer` for memoryStorage
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: 500, message: error.message });
  }
};

const uploadFlashesImage = async (req, res) => {
  const oldImage = req.body.oldImage;
  try {
    const file = req.file; // Access the uploaded file
    if (!file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }
    //remove oldImage then upload the new one
    const result = await cloudinary.uploader.destroy(`${oldImage}`);
    if (result.result === "ok") {
      // Upload the file buffer to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "FlashesImage" },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            return res
              .status(500)
              .json({ status: 500, message: error.message });
          }

          res.json({
            status: 200,
            message: "Image uploaded",
            data: result,
          });
        }
      );

      // Pipe the file buffer to the Cloudinary upload stream
      uploadStream.end(file.buffer); // Use `file.buffer` for memoryStorage
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: 500, message: error.message });
  }
};

//-------------------------------------------------------------------------------------------------------
// DELETE ENDPOINTS
//-------------------------------------------------------------------------------------------------------

const deleteFlash = async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  try {
    const result = await cloudinary.uploader.destroy(`Flash/${id}`);

    if (result.result === "ok") {
      await client
        .db("VeroTattoo")
        .collection("Flash")
        .deleteOne({
          _id: `Flash/${id}`,
        });
      return res.status(200).json({ status: 200, message: "Image deleted" });
    } else {
      return res.status(404).json({ status: 404, message: "Image not found" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

const deleteTattoo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await cloudinary.uploader.destroy(`Tattoo/${id}`);

    if (result.result === "ok") {
      return res.status(200).json({ status: 200, message: "Image deleted" });
    } else {
      return res.status(404).json({ status: 404, message: "Image not found" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const deleteFeatured = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await cloudinary.uploader.destroy(`Featured/${id}`);

    if (result.result === "ok") {
      return res.status(200).json({ status: 200, message: "Image deleted" });
    } else {
      return res.status(404).json({ status: 404, message: "Image not found" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

//-------------------------------------------------------------------------------------------------------
// EXPORTS
//-------------------------------------------------------------------------------------------------------

module.exports = {
  verifyToken,
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
  uploadLandingPageImagePC,
  getLandingPageImagePC,
};
