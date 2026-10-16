const http = require('http');
const stu = require('./students.json');
const fs = require('fs');
const url = require('url');
const port = 3000;
const server = http.createServer(function(req,res)
{
	res.setHeader("Content-Type","text/html");
	if(req.method == "GET" && req.url=="/")		//endpoint 1
	{
		res.write("<h1>Welcome to my REST API SERVER</h1>");
		res.end();
	}	

	if(req.method == "GET" && req.url=="/list")	//endpoint 2
	{
		fs.readFile("students.json",function(err,data)
		{
			res.write(data);
			res.end();
		});

	}
	if(req.method == "POST")	//endpoint 3
	{
		newStu = url.parse(req.url,true).query;
		stu.push(newStu);
		mywrite(stu);
		res.write("<h1>Student REcord inserted");
		res.end();
	}
	if(req.method == "PUT")
	{	
		upStu = url.parse(req.url,true).query;
		for(s in stu)
		{
			if(stu[s]['roll'] == upStu['roll'])
			{
				stu[s]['name'] = upStu['name'];
				stu[s]['year'] = upStu['year'];
				stu[s]['branch'] = upStu['branch'];	
				stu[s]['cgpa'] = upStu['cgpa'];
				mywrite(stu);
			res.write("<h1>Student Data Updated successfully</h1>");
 			}
		}
		res.end();
	}
	if(req.method == "DELETE")
	{	
		delStu = url.parse(req.url,true).query;
		for(s in stu)
		{
			if(stu[s]['roll'] == delStu['roll'])
			{
				stu.splice(s,1);
				mywrite(stu);
			res.write("<h1>Student data deleted successfully</h1>");
			}
		}
		res.end();

	}

	function mywrite(data)
	{
		fs.writeFile("students.json",JSON.stringify(data),function(err)
		{
			
		});
	}
});
server.listen(port,function()
{
	console.log("Server Started...");
	console.log("Server is listening on: "+port);
});
