import { formatDistanceToNow } from 'date-fns'

export const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date)).replace('about ', '')
}
