module.exports={
	entry:"./client.js",
	output:{
		filename: "public/javascript/bundle.js"
	},

 module: {
   loaders: [
     {
       loader: 'babel',
       exclude: /(node_modules|server.js)/,
       query: {
         presets: ['react', 'es2015']
       }
     },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      }
   ]
 }
};
