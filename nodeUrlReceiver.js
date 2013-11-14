  var fs = require('fs');
  var http = require('http');
  var url = require('url');
  var sys = require('sys');
  var exec = require('child_process').exec;
  var _ = require('underscore');
  var mkdirp = require('mkdirp');
  var child;
  
  http.createServer(function (req, res ) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var url_parts = url.parse(req.url, true);
    console.log(url_parts.query);
    try{
    var image_url = url_parts.query['image_url'];
    var path = image_url.split('/').splice(3);
    var pathname = "../";
    mkdirp(pathname + path.slice(0,path.length-1).join('/'));
    if(!(fs.existsSync(pathname+path.join('/')))){
	child = exec('curl -o '+pathname+'/'+path[path.length-1]+' '+image_url, function (error, stdout, stderr) {
	sys.print('stdout: ' + stdout);
	sys.print('stderr: ' + stderr);
	console.log("downloaded file " + pathname+path[path.length-1]);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
   	 });
		}

    }
   catch(e){
	 console.log(e);
   } 
    
    res.end("holi");
  }).listen(3000);
