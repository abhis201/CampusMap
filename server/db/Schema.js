const mongoose = require("mongoose");

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: {type: String},
  password: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
  
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  courseName: String,
  courseCode: Number,
  faculty: String,
  classroom: String
})

const buildingSchema = new mongoose.Schema({
  offices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Office' }],
  floor_count: Number,
  live_events: [String],
  classrooms: [Number],
  name: String
})

const officeSchema = new mongoose.Schema({
  office_name: String,
  building_name: String
})

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Building = mongoose.model('Building', buildingSchema);
const Office = mongoose.model('Office', officeSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
  User,
  Admin,
  Building,
  Office,
  Course
}