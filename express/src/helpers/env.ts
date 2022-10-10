import dotenv from 'dotenv';
const ENVS = ['.env.local', '.env'];
ENVS.forEach(path => dotenv.config({ path }));