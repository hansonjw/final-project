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
                    .select('-__v -password');
                
                return userData;
            }
            throw new AuthenticationError("login error...");
        },
        users: async () => {
            return User.find();
        },
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

        // addPerspective: async(parent, { input }, context) => {
        //     if(context.user) {
        //         const updatedSecurity = await User.findOneAndUpdate(
        //             { ticker: input.security },
        //             { $addToSet: { perspectives: input } },
        //             { new: true, runValidators: true }
        //         )
        //         console.log("new perspective added...");
        //         return updatedSecurity
        //     }
        //     throw new AuthenticationError("You must be logged in...how dare you...")
        // }

    }

}



module.exports = resolvers;