const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelpCamp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6421e0da8e90d4d01b9e760a",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dhkcrfue8/image/upload/v1680603207/YelpCamp/ga2bnhhltgrc2o4qs0k6.jpg",
          filename: "YelpCamp/ga2bnhhltgrc2o4qs0k6",
        },
        {
          url: "https://res.cloudinary.com/dhkcrfue8/image/upload/v1680601905/YelpCamp/uhgwzqzitz8avjhzbfdv.jpg",
          filename: "YelpCamp/uhgwzqzitz8avjhzbfdv",
        },
      ],
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut autem quis distinctio voluptates suscipit, ducimus exercitationem vitae expedita facilis maxime, nihil ea repudiandae earum corrupti obcaecati illum laboriosam, repellat fuga.",
      price,
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
