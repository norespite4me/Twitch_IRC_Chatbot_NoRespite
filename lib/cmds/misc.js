var colors = require('colors');

export function katt(channel, cmd, client){
  client.say(channel, `/me hot hot hot hot hot TehePelo`);
  console.log(`* Executed ${cmd} command`.green);
}

export function leia(channel, cmd, client){
  client.say(channel, `/me professional real irl in game dodger leiabeNala`);
  console.log(`* Executed ${cmd} command`.green);
}

export function nyla(channel, cmd, client){
  client.say(channel, `/me QT QT QT QT daddy QT QT QT QT nylawuLove`);
  console.log(`* Executed ${cmd} command`.green);
}

export function ley(channel, cmd, client){
  client.say(channel, `/me ley is godlike vleyAmazed`);
  console.log(`* Executed ${cmd} command`.green);
}

export function randa(channel, cmd, client){
  client.say(channel, `/me cooler than you CoolCat`);
  console.log(`* Executed ${cmd} command`.green);
}

export function malachi(channel, cmd, client){
  client.say(channel, `/me hot eboy with a juicy ass NomNom`);
  console.log(`* Executed ${cmd} command`.green);
}

export function luna(channel, user, cmd, args, client){
  if (!args[0]){
    client.say(channel, `/me ${user.username}, donate here to help my friends Leia
      and Nathan with paying for treatment for their dog, Luna. 
      https://bit.ly/3l5Kb91`);
  }else{
    client.say(channel, `/me ${args[0]}, donate here to help my friends Leia
    and Nathan with paying for treatment for their dog, Luna. 
    https://bit.ly/3l5Kb91`);
  }
  console.log(`* Executed ${cmd} command`.green);
}

export function myd(channel, user, cmd, args, client){
  let randy = Math.floor(Math.random() * 36) + 1;
  if (!args[0]){
    client.say(channel, `/me ${user.username}'s D is approximately ${randy} cm long! ${randemote()}`);
  }else{
    client.say(channel, `/me ${args[0]}'s D is approximately ${randy} cm long! ${randemote()}`);
  }
  console.log(`* Executed ${cmd} command`.green);
}

export function interyon(channel, cmd, client){
  client.say(channel, 
    `/me PogChamp BEST BOT PogChamp BEST MOD PogChamp 
    BEST BOT PogChamp BEST MOD PogChamp BEST BOT 
    PogChamp BEST MOD PogChamp`
  );
  console.log(`* Executed ${cmd} command`.green);
}

function randemote(){
  let emotes = [
    'interyPOP', 'interyISCREAM', 'ayylmaoCracked',
    'ayylmaoBlooAH', 'bunnie4Love', 'bunnie3Hype',
    'bunnie3Angry', 'zmalac2Angry', 'zmalac2Hey',
    'vleyCry', 'shorty18Gasm', 'shorty18Love',
    'marvel66Bruh', 'marvel664k', 'marvel66POG',
    'nylawuT', 'nylawuLove', 'nylawuPls',
    'FortOne', 'PogChamp', 'BOP',
    'TPFufun', 'Squid1 Squid2 Squid3 Squid2 Squid4', 'PunOko',
    'KonCha', 'BegWan', 'BrainSlug',
    'LUL', 'Jebaited', 'cmonBruh',
    'OhMyDog', 'CoolCat', 'SoBayed',
    'BibleThump', 'PJSalt', 'Keepo'
  ]
  return emotes[Math.floor(Math.random() * (emotes.length))]
}