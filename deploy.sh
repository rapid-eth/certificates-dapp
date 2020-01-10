
ssh -i ~/.keys/consensys-aws-account.pem ubuntu@certificates.rapidteam.io << 'EOF'
/home/ubuntu/.nvm/versions/node/v10.16.0/bin/pm2 stop all
cd certificates-dapp
rm -rf build
exit
EOF

# #2 sftp package into staging directory on EC2
sftp -i ~/.keys/consensys-aws-account.pem ubuntu@certificates.rapidteam.io <<EOF
cd certificates-dapp
put -r build
put pm2-server.config.js
exit
EOF

ssh -i ~/.keys/consensys-aws-account.pem ubuntu@certificates.rapidteam.io << 'EOF'
cd certificates-dapp
/home/ubuntu/.nvm/versions/node/v10.16.0/bin/pm2 start pm2-server.config.js
exit
EOF