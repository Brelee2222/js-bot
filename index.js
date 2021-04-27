require('./server')();


const { Client, Intents } = require('discord.js');

console.log(Intents.ALL)
const client = new Client({ ws: { intents: Intents.ALL}});

client.on('ready', async () => {
  
  console.log(client.guilds.cache.get('836393628128641044').members.cache)
  const guildinfostuff = client.guilds.cache.get('836393628128641044').members.cache
});


client.on('message', async message => {
  console.log(message);
  if (message.author.bot) {
    return
  }
  if (message.author.id == 479792413884547072) {
    if (message.content.startsWith('make role ')) {
      message.content = message.content.replace('make role ', '');
      roleinfo = message.content.split(' ');
      nameofrole = roleinfo[0];
      delete roleinfo[0];
      color = roleinfo[0]
      delete roleinfo[1]
      
      try {
        rolestuff = await message.guild.roles.create({data: {name: nameofrole, permissions: roleinfo, color: color}});
      } catch {
        rolestuff = await message.guild.roles.create({data: {name: nameofrole, color: color}});
      }
      console.log(rolestuff);
      console.log('now');
      message.author.send((rolestuff.id + ' ' + rolestuff.name));
      console.log(color)
      console.log(roleinfo)
    }
    if (message.content.startsWith('delete role ')) {
      try{
        const role = message.guild.roles.cache.get(message.content.replace('delete role ', '')).delete()
        
      } catch (error) {
        message.author.send(error)
      }
    }
    if (message.content.startsWith('role info ')) {
      role = await message.guild.roles.cache.get(message.content.replace('role info ', ''))
      console.log(role)
    }
  }
    if (message.content.startsWith('give role ')) {
      givinginfo = message.content.replace('give role ').split(' ')
      const members = client.guilds.cache.get(message.guild.id).members.cache
      console.log(members)
      console.log('lol')
      const member = await members.get(givinginfo[0].replace('undefined', ''))
      
      console.log(member)
      

      role = await message.guild.roles.cache.get(givinginfo[1])
      member.roles.add(role)
    }
});

require('server')();
client.login(process.env.TOKEN);