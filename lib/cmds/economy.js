import {db} from '../db.js';
var colors = require('colors');

export function get_coins(channel, user, cmd, args, client){
  if (!args[0]){
    db.get("SELECT Coins FROM users WHERE UserID = ?", user['user-id'], (err, row) => {
      if (err){
        client.say(channel, `unable to GET economy data: ${err.message}`);
        console.log(`${err}`.red);
      }else{
        console.log(`${user.username}`.cyan, `${row.Coins}`.yellow);
        client.say(channel, `${user.username}, you have ${row.Coins} bolts!`);
      }
    });
  }else{
    db.get("SELECT Coins FROM users WHERE UserName = ?", args[0], (err, row) => {
      if (err){
        client.say(channel, `unable to GET economy data: ${err.message}`);
        console.log(`${err}`.red);
      }else{
        console.log(`${args[0]}`.cyan, `${row.Coins}`.yellow);
        client.say(channel, `${args[0]} has ${row.Coins} bolts!`);
      }
    });
  }
  console.log(`* Executed ${cmd} command`.green)
}

export function gamble(channel, user, cmd, args, client){
  let losecent = 50;
  var coins;
  let bet = parseInt(args[0], 10);
  new Promise(resolve => {
    var curr;
    db.get("SELECT Coins FROM users WHERE UserID = ?", user['user-id'], (err, row) => {
      if (err){
        client.say(channel, `unable to process transaction`);
        console.log(`exit on error 1: ${err.message}`.red);
        return;
      }else{
        console.log(`${user.username}`.cyan, `${row.Coins}`.yellow);
        curr = row.Coins;
        resolve(curr);
      }
    });
  }).then((curr) => {
    coins = curr;
    if (args[0] == "all" && coins > 10){
      bet = coins;
      let randy = Math.floor(Math.random() * 101);
      console.log(`Draw needed to win: ${losecent}\nUser Draw: ${randy}`.brightYellow);
      if (randy < losecent){
        db.run("UPDATE users SET Coins = Coins - ? WHERE UserID = ?", bet, user['user-id']);
        coins -= bet;
        console.log(`${user.username}`.cyan, `${coins}`.yellow);
        client.say(channel, `Too bad! ${user.username} gambled and lost ${bet} bolts!
        They now have ${coins}!`);
      }else{
        db.run("UPDATE users SET Coins = Coins + ? WHERE UserID = ?", bet, user['user-id']);
        coins += bet;
        console.log(`${user.username}`.cyan, `${coins}`.yellow);
        client.say(channel, `You won! ${user.username} just bet ${bet} bolts, and now has ${coins}!`);
      }
    }else{
      let randy = Math.floor(Math.random() * 101);
      console.log(`Draw needed to win:: ${losecent}\nUser Draw: ${randy}`.brightYellow);
      if (!args[0] || isNaN(bet)){
        client.say(channel, `must specify bidding amount!`);
      }else{
        if (bet > coins){
          client.say(channel, `you only have ${coins} bolts to gamble!`);
          console.log(`exit on insufficient funds`.yellow);
        }else if (bet < 10){
          client.say(channel, `must bid at least 10 bolts!`);
          console.log(`exit on low bid`.yellow);
        }else if (randy < losecent){
          db.run("UPDATE users SET Coins = Coins - ? WHERE UserID = ?", bet, user['user-id']);
          coins -= bet;
          console.log(`${user.username}`.cyan, `${coins}`.yellow);
          client.say(channel, `Too bad! ${user.username} gambled and lost ${bet} bolts!
          They now have ${coins}!`);
        }else{
          db.run("UPDATE users SET Coins = Coins + ? WHERE UserID = ?", bet, user['user-id']);
          coins += bet;
          console.log(`${user.username}`.cyan, `${coins}`.yellow);
          client.say(channel, `Winner! ${user.username} just bet ${bet} bolts, and now has ${coins}!`);
        }
      }
    }
    console.log(`* Executed ${cmd} command`.green);
  });
}

export function addpoints(channel, user, cmd, args, client){
  if(user.username != 'interyon'){
    client.say(channel,
      `YOU HAVE NOT THE POWER TO USE THAT COMMAND!`
    );
  }else{
    if(!args[1] || !args[0]){
      client.say(channel,
        `you gotta specify a name and amount, dummy`
      );
    }else{
      db.run("UPDATE users SET Coins = Coins + ? WHERE UserName = ?", args[1], args[0], err => {
        if (err){
          client.say(channel,
            `Either you typed the username wrong, orrrrrr, you typed somethin other than a numba`
          );
        }else{
          db.get("SELECT Coins FROM users WHERE UserName = ?", args[0], (err, row) => {
            if (err){
              console.log(`${err.message}`.red)
            }else{
              try{
                client.say(channel,
                  `${args[0]} was given ${args[1]} bolts, and now has ${row.Coins}`
                );
                console.log(`${args[0]}`.cyan, `${row.Coins}`.yellow);
              }catch(err){
                client.say(channel,
                  `ya typed something wrong, dumbfuck`
                );
                console.log(`Something was typed wrong...`.red);
              }
            }
          });
        }
      });
    }
  }
  console.log(`* Executed ${cmd} command`.green);
}