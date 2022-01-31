var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");
var User = mongoose.model("User");


var ItemSchema = new mongoose.Schema(
  {
    slug: { type: String, lowercase: true, unique: true },
    title: String,
    description: String,
    image: String,
    favoritesCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tagList: [{ type: String }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

ItemSchema.plugin(uniqueValidator, { message: "is already taken" });

ItemSchema.pre("validate", function(next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

ItemSchema.methods.slugify = function() {
  this.slug =
    slug(this.title) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

ItemSchema.methods.updateFavoriteCount = async function() {
    const item = this;
    item.favoritesCount = await User.count({favorites: {$in: [item._id]}});
    await Item.findOneAndUpdate({_id:item._id}, item, { upsert: true })
    return item;
};

ItemSchema.methods.toJSONFor = function(user) {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    image: this.image ? this.image : 'http://localhost:3000/placeholder.png',
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    seller: this.seller.toProfileJSONFor(user)
  };
};

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
