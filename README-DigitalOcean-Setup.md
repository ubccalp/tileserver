# Setup & Deploy Tileserver on Digital Ocean

# first create your droplet on digital ocean
do all the things!

# Next add your ssh key to your server

```
cat ~/.ssh/<your_id_rsa.pub> | ssh root@<###.###.##.###> "mkdir -p ~/.ssh && cat >>  ~/.ssh/authorized_keys"
```

# Login

```
ssh root@<###.###.##.###>
```

# install some stuffs

```
sudo apt-get update

sudo apt-get install curl git

sudo apt-get install nodejs npm
```

    
# setup domain in your domain host provider:

add:

```
energyexplorer.ca
```


`A` name:

```
tiles
```


points to:

```
#ip address 
<###.###.##.###>
```

click: add record


# Change the IP Address in the `.env` file


```
IPADDRESS=###.###.##.###
```



# move tilehutjs local copy to server
open new terminal:

```
scp -r /path/to/ubccalp/tileserver root@###.###.##.###:~
```


# link nodejs to node
```
sudo ln -s `which nodejs` /usr/bin/node
```

# run the thing!

```
npm start
```


if you need to kill the thing:

```
killall -9 node
```

# now fix the domain names 

you need to set your CNAME name in droplet:

```
CNAME   
tiles.energyexplorer.ca   energyexplorer.com   43200
```

set A name in GoDaddy:
```
a   tiles   ###.###.##.###
```


# run app with pm2

```
npm install -g pm2

pm2 start server.js --watch
```

make sure that your `config.js`:

```
PORT: ... || 80,
```

