import "expo-router/entry"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isFuture from './app/backend/services/timeservice/isFuture';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isFuture);
dayjs.extend(utc);