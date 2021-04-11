"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  /* 
    Here we are specifying that the title, body, and
    author properties are String type.
  */
  title: String,
  body: String,
  author: String,
  /* 
    The following specifies that the collection will 
    have an array containing objects that represent 
    comments that would be written on a blog post.  
  */
  comments: [
    {
      body: String,
      date: Date,
    },
  ],
  /*
    Properties can also utilize objects to add multiple
    specifications. In this example, the publishedDate
    property is being specified to have the date type.
    The default value specifies that the default blog 
    post publishedDate should be the current date and
    time.
  */
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});