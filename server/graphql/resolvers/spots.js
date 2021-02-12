const { AuthenticationError, UserInputError } = require('apollo-server');
const { argsToArgsConfig } = require('graphql/type/definition');

const Spot = require('../../models/Spot');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {
    async getSpots() {
      try {
        const spots = await Spot.find().sort({ createdAt: -1 });
        return spots;
      } catch (error) {
        throw new Error(err);
      }
    },
    async getSpot(_, { spotId }) {
      try {
        const spot = await Spot.findById(spotId);
        if (spot) {
          return spot;
        } else {
          throw new Error('Spot not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createSpot(
      _,
      { body, longitude, latitude, description, bustability },
      context
    ) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new Error('Spot body must not be empty');
      }

      const newSpot = new Spot({
        body,
        longitude,
        latitude,
        description,
        bustability,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const spot = await newSpot.save();

      context.pubsub.publish('NEW_SPOT', {
        newSpot: spot,
      });

      return spot;
    },
    async deleteSpot(_, { spotId }, context) {
      const user = checkAuth(context);

      try {
        const spot = await Spot.findById(spotId);
        if (user.username === spot.username) {
          await spot.delete();
          return 'Spot deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likeSpot(_, { spotId }, context) {
      const { username } = checkAuth(context);

      const spot = await Spot.findById(spotId);
      if (spot) {
        if (spot.likes.find((like) => like.username === username)) {
          //Spot already liked, unlike it
          spot.likes = spot.likes.filter((like) => like.username !== username);
        } else {
          // not liked, like it
          spot.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await spot.save();
        return spot;
      } else throw new UserInputError('Spot not found.');
    },
  },
  Subscription: {
    newSpot: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_SPOT'),
    },
  },
};
