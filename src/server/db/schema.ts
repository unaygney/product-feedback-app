import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const categoryEnum = pgEnum('category', [
  'feature',
  'ui',
  'ux',
  'enhancement',
  'bug',
])

export const statusEnum = pgEnum('status', ['planned', 'in-progress', 'live'])

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const product = pgTable('product', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  logo: text('logo'),
  websiteUrl: text('website_url'),
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const suggestion = pgTable('suggestion', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: categoryEnum('category').notNull(),
  status: statusEnum('status').notNull().default('planned'),
  productId: uuid('product_id')
    .notNull()
    .references(() => product.id),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
function getCommentId() {
  return comment.id
}

export const comment = pgTable('comment', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  suggestionId: uuid('suggestion_id')
    .notNull()
    .references(() => suggestion.id),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  parentCommentId: uuid('parent_comment_id').references(getCommentId, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const vote = pgTable('vote', {
  id: uuid('id').primaryKey().defaultRandom(),
  suggestionId: uuid('suggestion_id')
    .notNull()
    .references(() => suggestion.id),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const mentionedUser = pgTable('mentioned_user', {
  id: uuid('id').primaryKey().defaultRandom(),
  commentId: uuid('comment_id')
    .notNull()
    .references(() => comment.id),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
