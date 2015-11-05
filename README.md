# [Material-UI](http://callemall.github.io/material-ui/) - Example Webpack Project

This is an example project that uses [Material-UI](http://callemall.github.io/material-ui/).

## Installation
After cloning the repository, install dependencies:
```
cd <project folder>/material-ui/examples/webpack-example
npm install
```

Now you can run your local server:
```
npm start
```
Server is located at http://localhost:3000

#Description of [Webpack](http://webpack.github.io/docs/)
Webpack is a module bundler that we are using to run our documentation site. This is a quick overview of how the configuration file works.
##Webpack Configuration:
###Entry:
Webpack creates entry points for the application to know where it starts.
###Resolve:
Webpack uses this configuration options to determine how it will deal with requiring files. For example, when the extension is omitted in a require, Webpack will look at the extensions option and try applying one of those.
###Output:
This is where the bundled project will go to and any other files necessary for it to run.
###Plugins:
These are plugins Webpack uses for more functionality. The HTML Webpack Plugin, for example, will add the index.html to your build folder.
###Modules:
Modules and other things that are required will usually need to be loaded and interpreted by Webpack when bundling, and this is where Webpack looks for the different loaders.
*Loading .js files in es6 and es7 will require a loader like babel-loader to interpret the files into es5.
# doc-pc


{
	"status": 1,
	"msg": "\u6570\u636e\u8bf7\u6c42\u6210\u529f",
	"data": [{
		"id": "753",
		"title": "\u98ce\u683c",
		"pinyin": "fengge",
		"py": "fg",
		"timeline": "1446726760",
		"content": [{
			"i": "12",
			"t": "\u767d\u679c",
			"k": "3",
			"u": "\u514b",
			"b": "\u53e6\u5305"
		}, {
			"i": "156",
			"t": "\u5730\u9aa8\u76ae",
			"k": "16",
			"u": "\u514b",
			"b": ""
		}]
	}]
}


amount	6
content	[
  {
    "k" : "3",
    "i" : "12",
    "u" : "克",
    "b" : "另包",
    "t" : "白果"
  },
  {
    "k" : "16",
    "i" : "156",
    "u" : "克",
    "b" : "",
    "t" : "地骨皮"
  }
]
describe	很快进步
did	163
doc_advice	休息
is_decoction	1
patient_name	张学友
phone	16583962587
result	结果
time_re	2
receiver_name
receiver_gender
receiver_age
