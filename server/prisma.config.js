// prisma.config.ts
import 'dotenv/config'; // Must be the first import to load env vars
import { defineConfig, env } from '@prisma/config';

export default defineConfig({
    schema: 'prisma/schema.prisma', // Adjust path if necessary
    datasource: {
        url: env('DATABASE_URL'), // Use the env function to get the variable
    },
});
