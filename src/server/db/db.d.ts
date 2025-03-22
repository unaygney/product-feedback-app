import {
  account,
  comment,
  mentionedUser,
  product,
  session,
  suggestion,
  user,
  verification,
  vote,
} from './schema'

// User types
type SelectUser = typeof user.$inferSelect
type InsertUser = typeof user.$inferInsert

// Account types
type SelectAccount = typeof account.$inferSelect
type InsertAccount = typeof account.$inferInsert

// Session types
type SelectSession = typeof session.$inferSelect
type InsertSession = typeof session.$inferInsert

// Verification types
type SelectVerification = typeof verification.$inferSelect
type InsertVerification = typeof verification.$inferInsert

// Product types
type SelectProduct = typeof product.$inferSelect
type InsertProduct = typeof product.$inferInsert

// Suggestion types
type SelectSuggestion = typeof suggestion.$inferSelect
type InsertSuggestion = typeof suggestion.$inferInsert

// Comment types
type SelectComment = typeof comment.$inferSelect
type InsertComment = typeof comment.$inferInsert

// Vote types
type SelectVote = typeof vote.$inferSelect
type InsertVote = typeof vote.$inferInsert

// MentionedUser types
type SelectMentionedUser = typeof mentionedUser.$inferSelect
type InsertMentionedUser = typeof mentionedUser.$inferInsert
