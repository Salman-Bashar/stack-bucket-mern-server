const { Schema, model } = require("mongoose")

const SuggestionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
})

const Suggestion = model("Suggestion", SuggestionSchema)
module.exports = Suggestion
