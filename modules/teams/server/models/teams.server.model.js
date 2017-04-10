+'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  categorie: {
    type: Schema.ObjectId,
    ref: 'Categorie',
    required: 'Categorie cannot be blank'
  }
});

mongoose.model('Team', TeamSchema);
