import { drizzle } from 'drizzle-orm/neon-http';

const useDatabase = drizzle(process.env.DATABASE_URL as string);

export default useDatabase;
