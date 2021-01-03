module.exports = function override(config, env) {
  //console.log('webpack override');
  //console.log('\x1b[33m', 'old config', '\x1b[00m');
  
  //override webpack to include an svg file-loader
  //console.log(config.module.rules[1].oneOf);

  config.module.rules[1].oneOf.unshift(
    {
      test: /\.svg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'images/[hash]-[name].[ext]',
          }
        }
      ]
    }
  );
  //console.log('\x1b[33m', 'new addition inserted at beginning of file-loaders', '\x1b[00m');
  //console.log(config.module.rules[1].oneOf[0]);

  return config;
};