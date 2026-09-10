import { formatDistanceToNowStrict } from 'date-fns'

export const timeAgo = (date) => {
  return formatDistanceToNowStrict(new Date(date))
}
