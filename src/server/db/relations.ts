import { relations } from 'drizzle-orm'

import {
  comment,
  mentionedUser,
  product,
  suggestion,
  user,
  vote,
} from './schema'

export const userRelations = relations(user, ({ many }) => ({
  products: many(product),
  suggestions: many(suggestion),
  votes: many(vote),
  comments: many(comment),
  mentionedIn: many(mentionedUser),
}))

export const productRelations = relations(product, ({ one, many }) => ({
  owner: one(user, {
    fields: [product.ownerId],
    references: [user.id],
  }),
  suggestions: many(suggestion),
}))

export const suggestionRelations = relations(suggestion, ({ one, many }) => ({
  product: one(product, {
    fields: [suggestion.productId],
    references: [product.id],
  }),
  creator: one(user, {
    fields: [suggestion.userId],
    references: [user.id],
  }),
  votes: many(vote),
  comments: many(comment),
}))

export const voteRelations = relations(vote, ({ one }) => ({
  suggestion: one(suggestion, {
    fields: [vote.suggestionId],
    references: [suggestion.id],
  }),
  user: one(user, {
    fields: [vote.userId],
    references: [user.id],
  }),
}))

export const commentRelations = relations(comment, ({ one, many }) => ({
  suggestion: one(suggestion, {
    fields: [comment.suggestionId],
    references: [suggestion.id],
  }),
  author: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),
  mentionedUsers: many(mentionedUser),
}))
export const mentionedUserRelations = relations(mentionedUser, ({ one }) => ({
  comment: one(comment, {
    fields: [mentionedUser.commentId],
    references: [comment.id],
  }),
  user: one(user, {
    fields: [mentionedUser.userId],
    references: [user.id],
  }),
}))
