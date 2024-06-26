const express = require("express");
const cors = require("cors");
const couponRoutes = require("./api/couponRoutes");
const messageRoutes = require("./api/messageRoutes");
const { setupDatabase } = require("./models/index");

const app = express();
const PORT = process.env.PORT || 27946; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Middleware
app.use(express.json());
//For testing purposes, we allow all origins
app.use(cors());
app.use("/uploads", express.static("uploads")); //to acces the uploaded images on the server under the /uploads path

// Routes
app.use("/api/coupons", couponRoutes);
app.use("/api/messages", messageRoutes);

// Setup database and start server
setupDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Fehler beim starten des Servers:", error);
  });

// Global error handler, for when something really unexpected happens
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    message:
      "GÜNTHER!! Desch App Ding funktschioniert scho widder net. Wasch müsch ma da mache?!",
  });
});
