var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { 
    type: String, required: 'Kindly enter the title of the post'
  },
  title_description: { 
    type: String,
    required: 'Kindly enter a title discription of the post'
  },
  image: { 
    type: String,
  },
  contenu: { 
    type: String, required: 'Kindly enter the contenu of the post'
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: "Categories"
  },
  created: {
    type: Date, default: Date.now
  },
  updated: {
    type: Date,default: Date.now
  },
});
module.exports = mongoose.model('Posts', PostSchema);
