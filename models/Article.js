// bringing in mongoose package
const mongoose = require("mongoose");

// saving reference to the Schema Constructor
const Schema = mongoose.Schema;

// creating a article object with the schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },

  saved: {
    type: Boolean,
    default: false
  },

  //   links the model to the comment model so it can get populated with the associated comment
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// creates the model from the above schema, using mongoose model method
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
