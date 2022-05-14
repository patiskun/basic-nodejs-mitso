import config from './common/config';
import app from './app';

const { PORT } = config;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
