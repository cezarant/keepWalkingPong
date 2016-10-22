var express = require('express');

app.get('/', function(req, res){
  res.render('Teste');
});


app.use(function(err, req, res, next) {
  res.send(err.stack);
});

/* istanbul ignore next */
if (!module.parent) {
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log('Express started on port 3000');
}