function codepoints() {
	
	// Check if file name was passed on the command line
	if (process.argv.length < 3) {
		process.exit(1);
	}

	// Access the file and read the contents
	const codepoints_arr = [];
	let fs = require('fs')
	let filename = process.argv[2];
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err) throw err;
  		let lines = data.split('\n');
  		for(let line = 0; line < lines.length; line++) {
  			let line_arr = lines[line].split(' ');
  			if(line_arr[0][0] == 'U') {
  				codepoints_arr.push(line_arr[0].substring(0, line_arr[0].length - 2));
  			}
  		}
  		console.log(codepoints_arr);
	});
}

codepoints();