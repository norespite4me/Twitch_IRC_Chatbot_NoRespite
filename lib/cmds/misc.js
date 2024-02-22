import * as tool from '../../src/tools.js';
import { db } from '../db';

var colors = require('colors');
var fetch = require('node-fetch');


export function quest(channel, client){
    client.say(channel, `/me Peli 7on ${randemote()}`);
    console.log(`* Executed quest command`.green);
}

export function xemphas(channel, client){
    client.say(channel, `/me Really likes hentai and is a weeb. KappaPride`);
    console.log(`* Executed xemphas command`.green);
}

export function rosie(channel, client){
    client.say(channel, `/me Rosie does the chipi chapa! ${randemote()}`);
    console.log(`* Executed rosie command`.green);
}


export function crazy(channel, client){
    client.say(channel, `/me crazy? i was crazy once. they locked me in a room. a rubber room. a rubber room with rats. and rats make me crazy`);
    console.log(`* Executed crazy command`.green);
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
    client.say(channel, "/me interyPOP UR FRIENDLY TWITCH BOT interyPOP");
    console.log(`* Executed ${cmd} command`.green);
}


export async function hit(channel, user, cmd, args, client) {
    var target;
    try{
        if (!args[0]) {
            target = channel.substring(1);
            console.log(target);
        } else {
            target = args[0];
        }
    
        let key = (cmd === "!hit") ? "hit" : "bonked";
    
        var item;
        if (target.includes("interyon") || target.includes("inter")){
            item = "nothing but love and affection ah ha ha interyPOP";
        }else if (target.includes("kels")){
            item = "noahj. omg what? noahj? NOAH J?? OMG OMG OMG he's so dreamy :pleading_face:";
        }else{
            item = randitem();
        }
    
        client.say(channel,
            `/me ${user.username} has ${key} ${target} with ${item}`);
        console.log(`* Executed ${cmd} commands`.green);
    }
    catch (e)
    {
        console.log('Error: ', e, target);
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