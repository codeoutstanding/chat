/**
 * Created by gen on 2016-10-31.
 */
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var groupSchema = new mongoose.Schema({
    groupName: String,
    groupDescription: String,
    groupIcon: String
});

//employeeSchema.plugin(autoIncrement.plugin, 'Employee');
//this will have an _id field added of type Number and will automatically increment with each new document
//you can assign starting number and increment by number.
groupSchema.plugin(autoIncrement.plugin, { model: 'Group', field: 'groupId'});

module.exports = mongoose.model('Group', groupSchema);