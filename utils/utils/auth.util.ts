import { User } from '@supabase/supabase-js'

export function isSuperadmin(user: User | null) {
  if (user === null) return false
  return user.user_metadata.role === 'superadmin'
}

export function isOwner(user: User | null) {
  if (user === null) return false
  return user.user_metadata.role === 'owner'
}

export function isUser(user: User | null) {
  if (user === null) return false
  return user.user_metadata.role === 'user' && !user.is_anonymous
}

export function isAnonymousUser(user: User | null) {
  if (user === null) return false
  return user.user_metadata.role === 'user' && user.is_anonymous
}
