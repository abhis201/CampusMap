const mongoose = require("mongoose");

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  courses: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Course' 
    }]
});
  
const adminSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String
  },
  courseCode: {
    type: Number
  },
  faculty: {
    type: String
  },
  classroom: {
    type: String
  }
})

/*
This will be the data schema used for the buildings
buildingName: name of the building i.e. Classroom Office Building
buildingLat: latitude of the building
buildingLng: longitude of the building
buildingPicture: path of building picture
websiteLink: url to page on pnw.edu
searchTerms: additional names that may be used to search i.e. CLO
*/
const buildingSchema = new mongoose.Schema({
  buildingName: {
    type: String,
    required: true
  },
  buildingLat: {
    type: Number,
    required: true
  },
  buildingLng: {
    type: Number,
    required: true
  },
  buildingPicture: {
    type: String
  },
  websiteLink: {
    type: String
  },
  searchTerms: [{
    type: String
  }]
})


/*
This will be the data schema for everything not a building
placeName: name of the place i.e. department/office/service/event
placeBuilding: reference to the building it is in i.e. id of CLO
placeFloor: number of floor it is on i.e. 3
placeLink: url to page on pnw.edu
searchTerms: additional names that may be used to search
*/
const placeSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true
  },
  placeBuilding: {
    type: ObjectId,
    required: true
  },
  placeFloor: {
    type: Number,
    default: 1,
    required: true
  },
  placeLink: {
    type: String,
    required: true
  },
  searchTerms: [{
    type: String
  }]
})

const officeSchema = new mongoose.Schema({
  office_name: {
    type: String
  },
  building_name: {
    type: String
  }
})

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Building = mongoose.model('Building', buildingSchema);
const Place = mongoose.model('Place', placeSchema);
const Office = mongoose.model('Office', officeSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
  User,
  Admin,
  Building,
  Place,
  Office,
  Course
}