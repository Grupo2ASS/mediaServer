  var fs = require('fs');
  var http = require('http');
  var url = require('url');
  var sys = require('sys');
  var exec = require('child_process').exec;
  var _ = require('underscore');
  var child;
  
  http.createServer(function (req, res ) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var url_parts = url.parse(req.url, true);
    console.log(url_parts.query);
    //try{
    var image_url = url_parts.query['image_url'];
/*What was on original script
 path = url.split('/')[3:]
			pathname = "../"
			for i in path[:-1]:
				#if folder doesn't exist create
				pathname += i + '/'
				if not os.path.exists(pathname):
					os.makedirs(pathname)
			#if picture (path[-1]) doesn't exist, download 
				#curl url to path
			if not os.path.exists(pathname + path[-1]):
				os.system('curl -o '+pathname+path[-1]+' '+url)
				additions += 1
		if additions:
			print "Added " + additions.to_s + " new pictures"
*/
    var path = image_url.split('/').splice(3);
    var pathname = "../";
    _.each(path,function(elem, index){
	pathname += elem + '/';
	if(!(fs.existsSync(pathname))){
		if(index == path.length-1){
			child = exec('curl -o '+pathname+path[path.length-1]+' '+image_url, function (error, stdout, stderr) {
				sys.print('stdout: ' + stdout);
				sys.print('stderr: ' + stderr);
				console.log("downloaded file " + pathname+path[path.length-1]);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
   			 });
		}
		else{
		fs.mkdirSync(pathname);
	}
	}

    });
  // catch(e){
   // }
	 //console.log(e);
   //} 
    
    res.end("holi");
  }).listen(3000);
