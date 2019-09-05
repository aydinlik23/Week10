//1./calculator/num1/num2/operator route(GET) that works with these operators: +, -, *, /, %(percentage)

//Example: /calculator/20/10/% returns %10

const express = require('express')

const bodyParser = require('body-parser')

const { calculator } = require('./index');

const obj = require('./myCompany.json');

const moment = require('moment');

const fs = require('fs');

const app = express()
const port = 3000


// middware
 
app.use(bodyParser.json());
 
//middware

    app.get('/calculator/:num1/:num2/:operator',(req,res) => {
        let { num1, num2, operator } = req.params;
        res.send({ return: calculator (num1, num2, operator) });
    
    })



//2./todo route that makes possible to add new todo with POST, 
//get all todos with GET, delete a todo with DELETE method.

var database = ['Having breakfast','taking my son to shool', 'studying Dutch', 'doing Livcoding assignment', 'going to downtown for shopping'];
            app.get('/todolist', (req,res) => {
                res.send(database);
            });

        app.post('/todolist', (req,res) => {
                database.push(req.body.todolist);
                console.log(req.body);
                res.send(database);
            });
        app.delete('/todolist/:todolist', (req,res) => {
                database = database.filter(val => val != req.params.todolist);
                res.send(database);
            });
        


//3.future/hours route(GET) that adds given hours to the current datetime and returns result.

//var moment = require('moment');


app.get('/future/:hours', (req, res) => {
    let futureDate = moment()
    .add(req.params.hours, 'hours')
    .format('LLL');

    res.send(futureDate)
});



//4.login route((POST) that checks if the given username and password is correct or not and will respond with appropriate status code.
//The correct credentials; username: admin, password:password.

app.post('/login', (req,res) => {
    let { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        res.send('Success');
    }else{
        res.sendStatus(401);
    }
});
 

        

//5.Report route(POST) that gets the example data below and creates a json file based on that 
//report in the reports folder. The json file will have the name of customer.

//Example data:
//{
  //"customer": "X Company",
  //"budget": "$200",
  //"submitDate: "22-10-2019"}
//Example file: X Company.json

app.post('/report', (req,res) => {
    obj.push(req.body.report);
    fs.writeFileSync('./myCompany.json',JSON.stringify(obj));
    console.log(req.body)
    res.send(obj);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))