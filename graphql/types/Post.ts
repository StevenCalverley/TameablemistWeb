import { objectType, extendType } from 'nexus';

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
