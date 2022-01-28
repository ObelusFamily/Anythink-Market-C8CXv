const User = require("../models/User");
const Item = require("../models/Item");
const Comment = require("../models/Comment");
const dbClient = require("../dbClient");

const DEFAULT_NUMBER_OF_ITEMS = 100

async function initializeDb() {
    require("dotenv").config();
    await dbClient.dbConnect()
}

async function SeedItems(total = DEFAULT_NUMBER_OF_ITEMS) {
    for (let i=1; i < total+1; i++) {
        const user = await new User( {
            username: `user${i}`,
            email: `user${i}@google.com`,
            bio: 'user bio',
            image: 'what should go here?',
            favorites: [],
            following: [],
            hash: 'hash',
            salt: 'salt'
        }).save()
        const item = await new Item({
            slug: `sample-item-${i}`,
            title: 'item-title',
            description: 'item-description',
            image: 'what should go here?',
            comments: [],
            tagList: [],
            seller: user
        }).save()
        const comment = await new Comment({
            body: "comment",
            seller: user,
            item: item
  }).save()
        console.log(`[${i}] Saved User: ${user.username} item: ${item.slug} comment: ${comment.body}`)

    }
}

async function removeOldSeeds() {
    const users = await User.deleteMany({})
    console.log(`Removed: ${users.deletedCount} Users`)
    const items = await Item.deleteMany({})
    console.log(`Removed: ${items.deletedCount} Items`)
    const comments = await Comment.deleteMany({})
    console.log(`Removed: ${comments.deletedCount} Comments`)

}

async function run() {
    if (process.env.NODE_ENV === "production") {
        console.error("Can't seed in production env")
        return
    }
    await initializeDb();
    await removeOldSeeds()
    await SeedItems();
}

run()
    .then(() => {
        dbClient.dbClose().then(() => "Closed db successfully")
        console.log('Created Mock data')
    })
    .catch(error => {
        dbClient.dbClose().then(() => "Closed db successfully")
        console.error("Found error", error)
    })