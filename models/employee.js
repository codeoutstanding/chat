/**
 * Created by gen on 2016-10-31.
 */
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var employeeSchema = new mongoose.Schema({
    group: { type: Number, ref: 'Group'},
    employeeName: String,
    employeeDescription: String,
    employeeIcon: String
});

//employeeSchema.plugin(autoIncrement.plugin, 'Employee');
//this will have an _id field added of type Number and will automatically increment with each new document
//you can assign starting number and increment by number.
employeeSchema.plugin(autoIncrement.plugin, 'Employee');

module.exports = mongoose.model('Employee', employeeSchema);