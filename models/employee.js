/**
 * Created by gen on 2016-10-31.
 */
var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    employeeId: { type: String, unique: true, index: true },
    employeeName: String,
    employeeDescription: String,
    employeeIcon: String
});

module.exports = mongoose.model('Employee', employeeSchema);