const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/download", async (req, res) => {
  const url = req.body.url;

  if (!url || !url.includes("instagram.com")) {
    return res.status(400).send("Invalid Instagram URL");
  }

  try {
    // Replace with your real API later
    const apiUrl = `https://instagram-downloader-api-for-free.p.rapidapi.com/index?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl, {
      headers: {
        "X-RapidAPI-Key": "your_rapidapi_key_here",
        "X-RapidAPI-Host": "instagram-downloader-api-for-free.p.rapidapi.com",
      },
    });

    const downloadUrl = response.data.media;
    res.redirect(downloadUrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something went wrong. Please try again.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 
