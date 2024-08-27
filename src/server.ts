import app from './app';
import env from './config/env';

const PORT = env.port;
app.listen(3000, () => console.log(`Server listening on port http://localhost:${PORT}`));
