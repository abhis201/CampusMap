const mongoose = require("mongoose");
// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    purchasedCourses: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    }]
  });
  
const adminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });
// Tracking courses is a bit much for a map but at most the course ID is needed
const courseSchema = new mongoose.Schema({
    courseID: {
      type: String,
      required: true
    },
  });

// Needs good method of tracking location
const parkingSchema = new mongoose.Schema({
  preferred: {
    type: Boolean,
    required: true
  },
  handicap: {
    type: Boolean,
    required: true
  }
});

// Needs good method of tracking location
const buildingSchema = new mongoose.Schema({
  buildingName: {
    type: String,
    required: true
  },
  floors: [{
    type: ObjectId,
    ref: 'Floor'
  }],
  searchTags: [{
    type: String
  }]
});

// Needs other category of services like cafeteria/library
const floorSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    set: n => Math.max(Math.floor(n), 1),
    required: true
  },
  departments: [{
    type: ObjectId,
    ref: 'Department'
  }],
  offices: [{
    type: ObjectId,
    ref: 'Office'
  }]
});

// Look it up on the school website for more information
const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true
  },
  searchTags: [{
    type: String
  }]
});

// Look it up on the school website for more information
const officeSchema = new mongoose.Schema({
  officeName: {
    type: String,
    required: true
  },
  searchTags: [{
    type: String
  }]
})

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Parking = mongoose.model('Parking', parkingSchema);
const Building = mongoose.model('Building', buildingSchema);
const Floor = mongoose.model('Floor', floorSchema);
const Department = mongoose.model('Department', departmentSchema);
const Office = mongoose.model('Office', officeSchema);
  
  module.exports = {
    User,
    Admin,
    Course,
    Parking,
    Building,
    Floor,
    Department,
    Office
  }