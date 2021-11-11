import { objectType, extendType, nonNull, intArg, stringArg } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.string('title');
    t.string('content');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.post.findMany();
      },
    });
  },
});

export const PostsByIDQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('postById', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
          },
        });
      },
    });
  },
});

export const PostUpdateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updatePost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        content: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.post.update({
          where: {
            id: args.id,
          },
          data: {
            title: args.title,
            content: args.content,
          },
        });
      },
    });
  },
});
