import {db} from './db.js'
import {BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME, BLOCKED_WORDS} from '../src/constants';
import * as econ from './cmds/economy.js';
import * as misc from './cmds/misc.js';
var colors = require('colors');
var version = "1.0.2";
var warning_timers = [1, 5, 60];

export function add_user(user){
  if(user){
    db.run("INSERT OR IGNORE INTO users (UserID, UserName) VALUES (?, ?)",
    user['user-id'], user.username);
  }
}

export function perform(channel, user, cmd, args, client){
  //update coin count for user and check message count
  update_records(user);
  check_activity(channel, user, client);

  if (!automod(user, cmd, args, channel, client)){
    if (cmd === '!hello'){
      client.say(channel, `${user.username}, heya!`);
      console.log(`* Executed ${cmd} command`.green);
    }
  
    if (cmd === '!about'){
      client.say(channel, `version: ${version}; Developed by interyon.`);
      console.log(`* Executed ${cmd} command`.green);
    }

    if (cmd === '!commands' ||
    cmd === "!comms"){
      client.say(channel,
        `${user.username}, a list of commands can be found here! https://pastebin.com/iTZzHBU6`
      );
      console.log(`* Executed ${cmd} command`.green);
    }
    
    if (cmd === '!katt'){
      misc.katt(channel, cmd, client);
    }
  
    if (cmd === '!leia'){
      misc.leia(channel, cmd, client);
    }
  
    if (cmd === '!nyla'){
      misc.nyla(channel, cmd, client);
    }
  
    if (cmd === '!ley'){
      misc.ley(channel, cmd, client);
    }
  
    if (cmd === '!malachi'){
      misc.malachi(channel, cmd, client);
    }
  
    if (cmd === '!randa'){
      misc.randa(channel, cmd, client);
    }
  
    if (cmd === '!luna'){
      misc.luna(channel, user, cmd, args, client);
    }
  
    if (cmd === '!coins' ||
    cmd === '!points' ||
    cmd === '!bolts'){
      econ.get_coins(channel, user, cmd, args, client);
    }
  
    if (cmd === '!bid' ||
    cmd === '!bet'){
      econ.gamble(channel, user, cmd, args, client);
    }
  
    if (cmd === '!myd'){
      misc.myd(channel, user, cmd, args, client);
    }
  
    if (cmd === '!warn'){
      warn(channel, user, cmd, args, client);
    }
  
    if (cmd === '!rmwarn'){
      rmwarn(channel, user, cmd, args, client);
    }
  
    if (cmd === "!addpoints"){
      econ.addpoints(channel, user, cmd, args, client);
    }
    
    if (cmd === "!interyon"){
      misc.interyon(channel, cmd, client);
    }

    if (cmd === "!ash" ||
        cmd === "!ashley"){
          misc.ashley(channel, cmd, client);
    }


    if (cmd === "!exotix"){
      misc.exotix(channel, cmd, client);
    }

    if (cmd === "!hit" || cmd === "!bonk"){
      misc.hit(channel, user, cmd, args, client);
    }
  }
}

function automod(user, cmd, args, channel, client){
  if (user.username === BOT_USERNAME || CHANNEL_NAME.includes(`#` + user.username)){
    return;}
  let shouldSendMessage = false;
  //check message
  
  shouldSendMessage = BLOCKED_WORDS.some(blockedWord =>
    args.includes(blockedWord.toLowerCase()));
    
  //delete message
  if (shouldSendMessage || BLOCKED_WORDS.some(blockedWord => cmd.includes(blockedWord.toLowerCase()))){
    shouldSendMessage = true;
    client.deletemessage(channel, user.id)
    .then((data) => {
      //tell user message is getting deleted
      client.say(channel, `${user.username}, your message has been deleted.`);

      warn(channel, user, cmd, args, client, 1);
    }).catch((err) => {
      client.say(channel, `cannot delete message: ${err}`);
    });
  }
  return shouldSendMessage;
}

function update_records(user){
  db.run("UPDATE users SET UserName = ?, MessagesSent = MessagesSent + 1 WHERE UserID = ?",
  user.username, user['user-id']);
  db.run("UPDATE users SET UserName = ?, Coins = Coins + ? WHERE UserID = ?",
  user.username, Math.floor(Math.random() * 4), user['user-id'])
}

function check_activity(channel, user, client){
  var count = db.get("SELECT MessagesSent FROM users WHERE UserID = ?", user['user-id']);
  if (count % 500 == 0){
    client.say(channel, `Thanks for being active in interyonBOT chats, ${user.username}
    - You've sent ${count} messages! Keep it up!`)
  }
}

function warn(channel, user, cmd, args, client, automod){
  console.log(`${automod}`);
  if(automod == null){
    if (`#${user.username}` === channel || user.mod === true){
      if (!args[0]){
        client.say(channel,
          `Must specify a target`
        );
      }else{
        let target = args.shift().toLowerCase();
        if (target[0] == '@'){
          target.shift();
        }
        console.log(`${target}`);
        let reason = args.join(' ');
        var warnings;
        
        new Promise(resolve => {
          db.get("SELECT Warnings FROM users WHERE UserName = ?",
            target, (err, row) => {
              if(err){
                client.say(channel,
                  `${target} has not typed in chat`
                );
                console.log(`exit on error 1: ${err.message}`.red);
                return;
              }else{
                try{
                  warnings = row.Warnings;
                  resolve(warnings);
                }
                catch(err){
                  client.say(channel,
                    `undefined user`
                  );
                  console.log(`exit on error 2: undefined user`.red);
                  return;
                }
              }
            });
        }).then((warnings) => {
          if (warnings < warning_timers.length){
            let tot = warning_timers[warnings]; //tot = time out time
            client.say(channel,
              `/timeout ${target} ${tot}m`
            );
            client.say(channel,
              `${target}, you have been muted for the following reason: ${reason}. You will be unmuted in ${tot} minute(s)`
            );
            console.log(`${target} timed out for ${tot}m in ${channel} for ${reason}\n
            ${target} now has ${warnings} warnings`.green);
  
            db.run("UPDATE users SET Warnings = Warnings + 1 WHERE UserName = ?", target);
          }else{
            client.say(channel,
              `/ban ${target} repeat infractions`
            );
            client.say(channel,
              `${target}, you have been banned for repeat infractions`
            );
            console.log(`${target} banned in ${channel}`.green);
          }
        });
      }
    }
  }else{
    let target = user.username;
    let reason = 'use of a blocked word';
    var warnings;
    
    new Promise(resolve => {
      db.get("SELECT Warnings FROM users WHERE UserName = ?",
        target, (err, row) => {
          if(err){
            client.say(channel,
              `${target} has not typed in chat`
            );
            console.log(`exit on error 1: ${err.message}`.red);
            return;
          }else{
            try{
              warnings = row.Warnings;
              resolve(warnings);
            }
            catch(err){
              client.say(channel,
                `undefined user`
              );
              console.log(`exit on error 2: undefined user`.red);
              return;
            }
          }
        });
    }).then((warnings) => {
      if (warnings < warning_timers.length){
        let tot = warning_timers[warnings]; //tot = time out time
        client.say(channel,
          `/timeout ${target} ${tot}m`
        );
        client.say(channel,
          `${target}, you have been muted for the following reason: ${reason}. You will be unmuted in ${tot} minute(s)`
        );
        console.log(`${target} timed out for ${tot}m in ${channel} for ${reason}\n
        ${target} now has ${warnings} warnings`.green);

        db.run("UPDATE users SET Warnings = Warnings + 1 WHERE UserName = ?", target);
      }else{
        client.say(channel,
          `/ban ${target} repeat infractions`
        );
        client.say(channel,
          `${target}, you have been banned for repeat infractions`
        );
        console.log(`${target} banned in ${channel}`.green);
      }
    });
  }
  
  console.log(`* Executed ${cmd} command`.green);
}

function rmwarn(channel, user, cmd, args, client){
  if (`#${user.username}` === channel || user.mod === true){
    if (!args[0]){
      client.say(channel,
        `Must specify a target`
      );
    }else{
      let target = args.shift().toLowerCase();
      if(target[0] == '@'){
        target.shift();
      }
      var warnings;
      new Promise(resolve => {
        db.get("SELECT Warnings FROM users WHERE UserName = ?",
          target, (err, row) => {
            if(err){
              client.say(channel,
                `${target} has not typed in chat`
              );
              console.log(`exit on error 1: ${err.message}`.red);
              return;
            }else{
              warnings = row.Warnings;
              resolve(warnings);
            }
          });
      }).then((warnings) => {
        if (warnings === 0){
          client.say(channel,
            `${target} has 0 warnings`);
        }else{
          db.run("UPDATE users SET Warnings = Warnings - 1 WHERE UserName = ?", target);
          client.say(channel,
            `/untimeout ${target}`
          );
          client.say(channel,
            `Warning for ${target} revoked.`
          );
          console.log(`Removed warning for ${target}: ${warnings - 1}`.green);
        }
      });
    }
  }
  console.log(`* Executed ${cmd} command`.green);
}