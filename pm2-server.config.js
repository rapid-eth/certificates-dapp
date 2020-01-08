module.exports = {
    apps: [
      {
        name: 'certificates-dapp2',
        script: '/home/ubuntu/.nvm/versions/node/v10.16.0/bin/npx',
        instances: 0,
        watch: false,
        args: "serve -p 3000 -s build"
     }
    ]
  };
