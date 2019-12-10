const express = require('express');
const path = require('path');
const fs = require('fs');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
            res.render('index', {
                title: 'rokin',
            });
});
app.get('/cal', (req, res) => {
    let firstNum = Number(req.query.num1);
    let secondNum = Number(req.query.num2);
    function saveValues(result) {
        result == 0 || result == Infinity ? fs.writeFile('result.txt',(''), (err) => {
            if (err) throw err;
            console.log('The file has been created!');
          }) : fs.appendFile('result.txt', (`firstNum:${firstNum},secondNum:${secondNum},operation:${req.query.operation},result:${result} ${'\n'}`), (err) => {
            if (err) throw err;
            console.log('The file has been updated!');
          });
    }
    switch(req.query.operation) {
        case 'add':
            let sum = firstNum + secondNum;
            saveValues(sum);
            res.json(sum);
        break;
        case 'sub':
            let diff = firstNum - secondNum;
            saveValues(diff);
            res.json(diff);
        break;
        case 'multiply':
            let val = firstNum * secondNum;
            saveValues(val);
            res.json(val);
        break;
        case 'divide':
            let remainder = firstNum / secondNum;
            saveValues(remainder);
            remainder == null ? res.json(remainder) : res.json(`Can't divide a number by 0`);
        break;
    }
});
app.listen('8080');