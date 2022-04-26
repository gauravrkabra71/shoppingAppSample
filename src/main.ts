import mongoose from 'mongoose';
import { AppConfigs } from './configs';
import { CONFIGS } from './configs/configs.enum';
import app from './app';

AppConfigs.ensureRequiredConfigs();

const serverPort = AppConfigs.getIntValue(CONFIGS.SERVER_PORT);

mongoose.connect(AppConfigs.getMongoDBConnectionString(), () => {
  console.log(`connected to db (testdb)`);
});

app.listen(serverPort, () => {
  console.log(`server is started at port ${serverPort}`);
});
