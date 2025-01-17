const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const db = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ForgotPasswordRequest = require('./models/forgotpasswordrequest');
const Report = require('./models/report');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');
const morgan = require('morgan');

const app = express();
app.use(cors({credentials:true,origin:'*'}));

//Test push --Remove
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'});

//app.use(morgan('combined',{stream:accessLogStream}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    //send login page if user lands on HOME
    res.sendFile(path.join(__dirname, "public", "login.html"))
})

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/password', passwordRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);

app.use((req,res) => {
    console.log('URL :: ',req.url);
    console.log('Req Reached server, and is almost complete! ');
    res.sendFile(path.join(__dirname,"public",`${req.url}`));
});

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

User.hasMany(Report)
Report.belongsTo(User);

db.sync()
    .then(() => {
        app.listen(process.env.PORT);
        console.log('Listening to port: ' + process.env.PORT);
        })
        .catch (err => console.log(err));