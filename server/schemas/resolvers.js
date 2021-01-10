const { User, Comment, Perspective  } = require('../models');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { signToken } = require('../utils/auth');


const resolvers = {
    
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
          return new Date(value); // value from the client
        },
        serialize(value) {
          return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return new Date(+ast.value) // ast value is always in string format
          }
          return null;
        },
    }),

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('perspectives');
                
                return userData;
            }
            throw new AuthenticationError("login error...");
        },

        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('perspectives');
        },

        perspective: async(parent, { _id }, context) => {
            return Perspective.findOne( {_id });
        },

        perspectives: async () => {
            return Perspective.find()
            .select('-__v -password')
            .populate('comments');
        }
    },

    Mutation: {
        createUser: async (parent, args) => {
            console.log("create user Mutation");
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            if(!user) {
                throw new AuthenticationError('login error...please check your credentials');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('login error...please check your credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        addPerspective: async(parent, args, context) => {
            if(context.user) {
                const newPerspective = await Perspective.create({ ...args, email: context.user.email });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { perspectives: newPerspective._id } },
                    { new: true, runValidators: true }
                )
                console.log("new perspective added...");
                return newPerspective;
            }
            throw new AuthenticationError("You must be logged in...how dare you...")
        },

        addComment: async(parent, { perspectiveId, text }, context) => {
            if(context.user) {
                const newComment = await Comment.create({ commentText: text, email: context.user.email });

                const updatedPerspective = await Perspective.findByIdAndUpdate(
                    { _id: perspectiveId },
                    { $push: { comments: newComment._id } },
                    { new: true }
                );
                
                return updatedPerspective;
            }
            throw new AuthenticationError('You need to be logged in!')
        }

    }

}



module.exports = resolvers;