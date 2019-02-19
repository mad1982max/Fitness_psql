const express = require('express');
const bodyParser = require('body-parser');


const clientsRoutes = require('./routes/clients.routes.js');
const typesRoutes = require('./routes/types.routes.js');
const roomsRoutes = require('./routes/rooms.routes.js');
const recordsRoutes = require('./routes/records.routes.js');

const service = require('./services/logger.js');
const MyErrors = require('./libs/error.js');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(service.logger);

app.use('/clients', clientsRoutes);
app.use('/types', typesRoutes);
app.use('/rooms', roomsRoutes);
app.use('/records', recordsRoutes);

app.use(MyErrors.error404);
app.use(MyErrors.errorHandler);

const port = 3000;
app.listen(port, () => console.log(`*****listening port ${port}`));