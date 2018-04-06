# DigitalOcean Setup

***
## Step 0: Get SSH Key

In order to add files or make changes to the existing DigitalOcean droplet, you will be using an SSH key to access the server. 

To do this, you will have to:

1. Create an ssh key - public/private - on your machine: 
    - https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets
    - you will generate a public and private key:

    ```
    # for example in your ~/.ssh/
    ## private key
    id_rsa_deepti
    ## public key
    id_rsa_deepti.pub
    ```

2. Next you will add your public SSH key (`your_rsa_key.pub`, in this case let's say it's called `id_rsa_deepti.pub`) to DigitalOcean by going to your: profile >> settings >> security >> SSH Keys >> add SSH key to the menu that pops up.

    ![](https://assets.digitalocean.com/articles/how-to-use-ssh-keys-with-digitalocean-droplets/key_added.png)

3. You will now be able to ssh into the server AFTER you've spun up a droplet

    ```
    ssh root@###.###.##.###
    # or if you get "permission denied (publickey)" where id_rsa_deepti is your private key name
    ssh root@###.###.##.### -i ~/.ssh/id_rsa_deepti
    ```



***

## Creating your tileserver

### Use the one-click app setup to create your server:

DigitalOcean provides nifty one-click app setups for common systems. Since we are using a simple node.js app here, we can take advantage of this. In DigitalOcean:

> Create droplet >> navigate to the tab: one-click apps >> select: nodejs >> 1gb/1cpu (or whichever you need) >> Toronto data center (yay Canada) >> add your ssh key or select the one you produced in Step 0 >> name: tileserver-calp (or whatever you choose to name it) >> add some tags: e.g. tileserver, tilehuts, nodejs

### Move your local tileserver repo to the server using `scp`

You can transfer your local working copy of the tileserver to the DigitalOcean droplet by using the `scp` command from your terminal

```
scp -i ~/.ssh/id_rsa_calp -r /Users/joeyklee/Code/src/github/ubccalp/tileserver root@###.###.##.###:~
```

where:

* `~/.ssh/id_rsa_calp`: is my private key
* `/Users/joeyklee/Code/src/github/ubccalp/tileserver`: is the tileserver repo on my machine
* `root@###.###.##.###:~`: is the directory on the server where the tileserver repo will be transferred to. 

NOTE: all of the data you want to transfer should be in the `/data` folder at this point

### transfering other data to the data folder:

If you need to transfer more data to your tiles data folder, it should be something like:
```
scp -i ~/.ssh/id_rsa_calp -r <local/path/to/your/file.mbtiles> root@###.###.##.###:~/tileserver/data/
```


### SSH into your server and run the thing

In order to run our project we will be using `pm2` to keep our project running. So to do this let's do the following:

SSH into your server

```
ssh -i id_rsa_calp root@###.###.##.###
```

Next, run `npm install` to install your project dependencies

```
cd tileserver
npm install
```

then you will install pm2 globally:

```
npm install -g pm2
```

`pm2` will use the `ecosystem.config.js` file to get the IP address that you specified in there (NOTE: if there is no IP address specified or an old one, then YOU NEED TO CHANGE IT!). Now you can run the tileserver

```
pm2 start ecosystem.config.js --watch
```


If you navigate to your IP address in your browser, you can now see `:)`

*** 
## Domain Handling

### Adding a domain name: On Digital Ocean

To add a specific domain to your DigitalOcean Droplet:

> go to your droplet >> dropdown menu: add domain >> select: A Record >> hostname: tiles.energyexplorer.ca >> will direct to: your.ip.address >> TTL (seconds): 3600 >> click: Create Record

### Adding a domain name: On StormWeb (or any other service)

https://www.hostpapa.com/knowledgebase/add-subdomain-points-ip-address/

In Stormweb you will be adding the `A name` of `tiles.energyexplorer.ca` to the IPADDRESS from your DigitalOcean Droplet. StormWeb is weird, so instead of doing this in the `Domains` tab, you have to:

> log in stormweb >> client area >> my products & services >> product details >> log into CPanel >> Domains: zone editor >> add: A Name >> name: tiles.energyexplorer.ca >> address: IPADDRESS from digital ocean >> Add A record
> 

That should do it. Now if you go to `tiles.energyexplorer.ca` you should see: `:)`




