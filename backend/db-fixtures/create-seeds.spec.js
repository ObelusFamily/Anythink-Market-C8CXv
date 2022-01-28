const User = require("../models/User");
const Item = require("../models/Item");
const Comment = require("../models/Comment");
const dbClient = require("../dbClient");
const { exec } = require("child_process");

require("dotenv").config();

describe('Create Seed', () => {
    it('should add item with user associate with it', async () => {
        exec('yarn run seeds')

        await dbClient.dbConnect()
        const numberOfUsers = await User.count({})
        const numberOfItems = await Item.count({})
        const numberOfComments = await Comment.count({})
        expect(numberOfUsers).toBe(100)
        expect(numberOfItems).toBe(100)
        expect(numberOfComments).toBe(100)
    })
})