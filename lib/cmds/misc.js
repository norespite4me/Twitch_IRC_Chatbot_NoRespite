import { db } from '../db';
import * as tool from '../../src/tools.js';

var colors = require('colors');
var fetch = require('node-fetch');

export function katt(channel, cmd, client) {
    client.say(channel, `/me hot hot hot hot hot TehePelo`);
    console.log(`* Executed ${cmd} command`.green);
}

export function leia(channel, cmd, client) {
    client.say(channel, `/me professional irl in game dodger leiabeNala`);
    console.log(`* Executed ${cmd} command`.green);
}

export function nyla(channel, cmd, client) {
    client.say(channel, `/me daddy nylawuLove`);
    console.log(`* Executed ${cmd} command`.green);
}

export function ley(channel, cmd, client) {
    client.say(channel, `/me ley is godlike vleyAmazed`);
    console.log(`* Executed ${cmd} command`.green);
}

export function randa(channel, cmd, client) {
    client.say(channel, `/me cooler than you CoolCat`);
    console.log(`* Executed ${cmd} command`.green);
}

export function malachi(channel, cmd, client) {
    client.say(channel, `/me hot eboy with a juicy ass NomNom`);
    console.log(`* Executed ${cmd} command`.green);
}

export function luna(channel, user, cmd, args, client) {
    if (!args[0]) {
        client.say(channel, `/me ${user.username}, donate here to help my friends Leia
        and Nathan with paying for treatment for their dog, Luna. 
        https://bit.ly/3l5Kb91`);
    } else {
        client.say(channel, `/me ${args[0]}, donate here to help my friends Leia
    and Nathan with paying for treatment for their dog, Luna. 
    https://bit.ly/3l5Kb91`);
    }
    console.log(`* Executed ${cmd} command`.green);
}

export function squirt(channel, user, cmd, args, client) {
    let randy = Math.floor(Math.random() * 36) + 1;
    if (!args[0]) {
        if (user.username == 'interyon') {
            client.say(channel, `/me ${user.username}'s squirt distance is 50 feet!  interyPOP`);
        } else {
            client.say(channel, `/me ${user.username}'s squirt distance is ${randy} feet! ${randemote()}`);
        }

    } else {
        if (args[0] == 'interyon' || args[0] == '@interyon') {
            client.say(channel, `/me ${args[0]}'s squirt distance is 50 feet! interyPOP`);
        } else {
            client.say(channel, `/me ${args[0]}'s squirt distance is approximately ${randy} feet! ${randemote()}`);
        }
    }
    console.log(`* Executed ${cmd} command`.green);
}

export function interyon(channel, cmd, client) {
    client.say(channel, "/me interyPOP OFFICIAL 23 CROWNS TWITCH BOT interyPOP");
    console.log(`* Executed ${cmd} command`.green);
}

export function ashley(channel, cmd, client) {
    client.say(channel,
        `/me WIFEY interyPOP ashlee16Love`
    );
    console.log(`* Executed ${cmd} commands`.green);
}

export function exotix(channel, cmd, client) {
    client.say(channel, "exotixlogic is most cracked minor alive");
    console.log(`* Executed ${cmd} commands`.green);
}

export async function hit(channel, user, cmd, args, client) {
    var target;
    if (!args[0]) {
        var chn = channel.substring(1);
        let url = `https://2g.be/twitch/randomviewer.php?channel=${chn}`;
        target = await fetch(url)
            .then(response => response.text())
            .then(data => {
                return data
            });
        console.log(target);
    } else {
        target = args[0];
    }

    let key = (cmd === "!hit") ? "hit" : "bonked";

    var item;
    if (target.includes("interyon") || target.includes("inter")){
        item = "nothing but love and affection ah ha ha interyPOP";
    }else{
        item = randitem();
    }

    client.say(channel,
        `/me ${user.username} has ${key} ${target} with ${item}`);
    console.log(`* Executed ${cmd} commands`.green);
}

export async function hug(channel, user, cmd, args, client) {
    var target;
    if (!args[0]) {
        var chn = channel.substring(1);
        let url = `https://2g.be/twitch/randomviewer.php?channel=${chn}`;
        target = await fetch(url)
            .then(response => response.text())
            .then(data => {
                return data
            });
        console.log(target);
    } else {
        target = args[0];
    }


    client.say(channel,
        `/me ${user.username} has given ${target} a BIG HUG <3`);
    console.log(`* Executed ${cmd} command`.green);
}

export function remind(channel, user, cmd, args, client) {
    if (channel != '#shortyple') {
        var remindmsg = args.join(' ').toUpperCase();

        client.say(
            channel,
            `/me interyPOP ${channel.substring(1).toUpperCase()} YOU OLD FART! REMEMBER ${remindmsg}! interyPOP`
        );

        console.log(`* Executed ${cmd} command`.green);
    }
}

export function level(channel, user, cmd, args, client)
{
    //17462 messages to reach prestige
    //equation to get level -> y = 0.907783x^0.462992 - 0.201842 where y is level and x is messages sent
    var PRESTIGE_MSG = 17462;
    var target;
    var level;
    if (args[0]){
        target = (args[0][0] == '@' ? args[0].substring(1) : args[0]);
    }
    else
    {
        target = user.username;
    }

    db.get("SELECT MessagesSent FROM users WHERE UserName = ?", target, function(err, row)
    {
        if (err)
        {
            client.say(channel,
                `/me ${target} has not typed in chat`);
            console.log(`exit on error 1: ${err.message}`.red);
            return;
        }
        else
        {
            try
            {
                var prestige = Math.floor(row.MessagesSent / PRESTIGE_MSG);
                var msgs = row.MessagesSent % PRESTIGE_MSG;

                if (prestige <= 10)
                {
                    level = Math.floor(0.907783 * Math.pow(msgs, 0.462992) - 0.201842);
                    client.say(channel,
                        `/me ${target} is Prestige ${prestige} level ${level} with ${tool.intFormat(row.MessagesSent * 100)} xp`);
                }
                else
                {
                    level = Math.floor(80 + msgs / 505);
                    client.say(channel,
                        `/me ${target} is Master Prestige level ${tool.intFormat(level)} with ${tool.intFormat(row.MessagesSent * 100)} xp`);
                }
                
                
                
            }
            catch (err)
            {
                client.say(channel,
                    `${target} is an undefined user`);
            }
            return;
        }
    });
}

function randemote() {
    let emotes = [
        'interyPOP', 'interyISCREAM', 'vleyCry',
        'FortOne', 'PogChamp', 'BOP',
        'TPFufun', 'Squid1 Squid2 Squid3 Squid2 Squid4',
        'PunOko', 'KonCha', 'BegWan',
        'BrainSlug', 'LUL', 'Jebaited',
        'cmonBruh', 'OhMyDog', 'CoolCat',
        'SoBayed', 'BibleThump', 'PJSalt',
        'Keepo', ':tf:', 'AngelThump',
        'ariW', 'BroBalt', 'bttvNice',
        'bUrself', 'CandianRage', 'CiGrip',
        'ConcernDoge', 'CruW', 'cvHazmat',
        'cvL', 'cvMask', 'cvR',
        'D:', 'DatSauce', 'DogChamp',
        'DuckerZ', 'FeelsAmazingMan', 'FeelsBadMan',
        'FeelsBirthdayMan', 'FeelsGoodMan', 'FireSpeed',
        'FishMoley', 'ForeverAlone', 'GabeN',
        'haHAA', 'HailHelix', 'Hhhehehe',
        'KappaCool', 'KaRappa', 'KKona',
        'LuL', 'M&Mjc', 'monkaS',
        'NaM', 'notsquishY', 'PoleDoge',
        'RarePepe', 'RonSmug', 'SaltyCorn',
        'ShoopDaWhoop', 'sosGame', 'SourPls',
        'SqShy', 'TaxiBro', 'tehPoleCat',
        'TwaT', 'VisLaud', 'WatChuSay',
        'Wowee', 'WubTF'
    ];
    return emotes[Math.floor(Math.random() * (emotes.length - 1))];
}

function randitem() {
    let items = [
        'a CD', 'an alarm clock', 'an armoire',
        'a backpack', "a bag of delicious snickers. you're not you when you're hungry",
        'a bag of gummy bears', 'a banana', 'a bar of soap',
        'their bare hands', 'a bed', 'some bedding', 'a bedspread',
        'a binder', 'a blanket', 'blinds',
        'a book', 'a bookcase', 'a boom box',
        'a bottle', 'a box', 'boxing glove',
        'bread', 'a broom', 'a brush',
        'a bucket', 'a butter-filled sock',
        'a calendar', 'a candle', 'a car',
        'a chair', 'a chancla', 'a clock',
        'a comfortor', 'a computer', 'a controller',
        'a cookie', 'a couch cushion', 'a couch',
        'a credenza', 'a cup', 'a desk',
        'a dish towel', 'a dishwasher', 'a dog',
        'a door stop', 'a drape', 'a drill',
        'a dryer', 'a dust pan', 'an end table',
        'an extension cord', 'a fan', 'a figurine',
        'a file cabinet', 'a fire extinguisher', 'a flashlight',
        'flatware', 'a flower', 'a fork',
        'a frying pan', 'a furnace', 'a gallon of milk',
        'a garlic clove', 'a glove', 'a glowstick',
        'a grape', 'a hairbrush', 'a hammer',
        'a headset', 'a heater', 'a helmet',
        'a high dosage of KETAMINE', 'a hockey puck', 'a houseplant',
        'an iphone', 'an ipod', 'an iron',
        'an ironing board', 'a keyboard', 'a knife',
        'a lamp', 'a light bulb', 'a light switch',
        'a magnet', 'a marker', 'a marriage proposal',
        'a microwave', 'a mobile home', 'a monopoly thimble',
        'mop', 'a mug', 'nothing but love and affection ah ha ha',
        'an oven', 'a painting', 'a pair of glasses',
        'a pair of pants', "a pair of yo momma's underwear", 'a pan',
        'a pen', 'a pencil', 'a piano',
        'a pickle', 'a potato', 'a purse',
        'a raw egg', 'a roll of toilet paper', 'a rubber duck',
        'a sandal', 'a screw', 'a screwdriver',
        'a shelf', 'a shoe', 'a slipper',
        'a snare drum', 'a sousaphone', 'a sponge',
        'a spoon', 'a stop sign', 'a traffic light',
        'a suitcase', 'a table', 'a teddy bear',
        'a telephone', 'a television', 'a tissue box',
        'a toaster', 'a toilet', 'a tomato',
        'a toothbrush', 'a toothpaste', 'a toothpick',
        'a toy', 'a train', 'a trashcan',
        'a tree', 'a trombone', 'a truck',
        'a trumpet', 'a turkey', 'a tv',
        'a vacuum', 'a vase', 'a wagon',
        'a wallet', 'a walnut', 'a walrus',
        'a washer', 'a washing machine', 'a tundra',
        'an intervention', 'an msr', 'a pelington',
        'an aglet. you know, the plastic tip at the end of a shoelace?'
    ];

    return items[Math.floor(Math.random() * (items.length - 1))];
}