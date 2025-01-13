const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes');

const app = express();
const PORT = 5001;  

app.use(cors());
app.use(bodyParser.json());

app.use('/api/companies', companyRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
