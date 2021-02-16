const { Schema, model } = require("mongoose")

const BucketSchema = new Schema(
  {
    name: {
      type: String,
      requiured: true,
    },
    items: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    cost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Bucket = model("Bucket", BucketSchema)
module.exports = Bucket
