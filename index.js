const PORT = 8100
const express = require('express')
const axios = require('axios').default;
const cheerio = require('cheerio');
const {attr} = require("cheerio/lib/api/attributes");
const {add} = require("cheerio/lib/api/traversing");
const {response, request} = require("express");
const {param} = require("express/lib/router");
const e = require("express");
const app = express()
let details = []
let animelist = [
    {
        "id": 1,
        "title": "A Channel The Animation",
        "href": "https://www.animeforce.it/anime/a-channel-the-animation/"
    },
    {
        "id": 3,
        "title": "A3! Season Spring & Summer",
        "href": "https://www.animeforce.it/anime/a3-season-spring-summer/"
    },
    {
        "id": 5,
        "title": "Absolute Duo",
        "href": "https://www.animeforce.it/anime/absolute-duo/"
    },
    {
        "id": 7,
        "title": "ACCA: 13-ku Kansatsu-ka",
        "href": "https://www.animeforce.it/anime/acca-13-ku-kansatsu-ka/"
    },
    {
        "id": 9,
        "title": "Accel World",
        "href": "https://www.animeforce.it/anime/accel-world/"
    },
    {
        "id": 11,
        "title": "Accel World: Infinite Burst",
        "href": "https://www.animeforce.it/anime/accel-world-infinite-burst/"
    },
    {
        "id": 13,
        "title": "Acchi Kocchi",
        "href": "https://www.animeforce.it/anime/acchi-kocchi/"
    },
    {
        "id": 15,
        "title": "Ace of Diamond",
        "href": "https://www.animeforce.it/anime/ace-of-diamond/"
    },
    {
        "id": 17,
        "title": "Ace of Diamond 2",
        "href": "https://www.animeforce.it/anime/ace-of-diamond-2/"
    },
    {
        "id": 19,
        "title": "Ace of Diamond: Act II",
        "href": "https://www.animeforce.it/anime/ace-of-diamond-act-ii/"
    },
    {
        "id": 21,
        "title": "Action Heroine Cheer Fruits",
        "href": "https://www.animeforce.it/anime/action-heroine-cheer-fruits/"
    },
    {
        "id": 23,
        "title": "Active Raid",
        "href": "https://www.animeforce.it/anime/active-raid/"
    },
    {
        "id": 25,
        "title": "Active Raid 2",
        "href": "https://www.animeforce.it/anime/active-raid-2/"
    },
    {
        "id": 27,
        "title": "Actors: Song Connection",
        "href": "https://www.animeforce.it/anime/actors-song-connection/"
    },
    {
        "id": 29,
        "title": "AD Police",
        "href": "https://www.animeforce.it/anime/ad-police/"
    },
    {
        "id": 31,
        "title": "AD Police (1999)",
        "href": "https://www.animeforce.it/anime/ad-police-1999/"
    },
    {
        "id": 33,
        "title": "Adachi to Shimamura",
        "href": "https://www.animeforce.it/anime/adachi-to-shimamura/"
    },
    {
        "id": 35,
        "title": "Africa no Salaryman",
        "href": "https://www.animeforce.it/anime/africa-no-salaryman/"
    },
    {
        "id": 37,
        "title": "Afro Samurai",
        "href": "https://www.animeforce.it/anime/afro-samurai/"
    },
    {
        "id": 39,
        "title": "Aguu: Tensai Ningyou",
        "href": "https://www.animeforce.it/anime/aguu-tensai-ningyou/"
    },
    {
        "id": 41,
        "title": "Ahiru no Sora",
        "href": "https://www.animeforce.it/anime/ahiru-no-sora/"
    },
    {
        "id": 43,
        "title": "Aho Girl",
        "href": "https://www.animeforce.it/anime/aho-girl/"
    },
    {
        "id": 45,
        "title": "Ai Tenchi Muyo!",
        "href": "https://www.animeforce.it/anime/ai-tenchi-muyo/"
    },
    {
        "id": 47,
        "title": "Ai Yori Aoshi",
        "href": "https://www.animeforce.it/anime/ai-yori-aoshi/"
    },
    {
        "id": 49,
        "title": "Ai Yori Aoshi: Enishi",
        "href": "https://www.animeforce.it/anime/ai-yori-aoshi-enishi/"
    },
    {
        "id": 51,
        "title": "Air",
        "href": "https://www.animeforce.it/anime/air/"
    },
    {
        "id": 53,
        "title": "Air Gear",
        "href": "https://www.animeforce.it/anime/air-gear/"
    },
    {
        "id": 55,
        "title": "Air Master",
        "href": "https://www.animeforce.it/anime/air-master/"
    },
    {
        "id": 57,
        "title": "Aishiteruze Baby",
        "href": "https://www.animeforce.it/anime/aishiteruze-baby/"
    },
    {
        "id": 59,
        "title": "Ajimu: Kaigan Monogatari",
        "href": "https://www.animeforce.it/anime/ajimu-kaigan-monogatari/"
    },
    {
        "id": 61,
        "title": "Ajin",
        "href": "https://www.animeforce.it/anime/ajin/"
    },
    {
        "id": 63,
        "title": "Ajin 2",
        "href": "https://www.animeforce.it/anime/ajin-2/"
    },
    {
        "id": 65,
        "title": "Ajin Movie",
        "href": "https://www.animeforce.it/anime/ajin-movie/"
    },
    {
        "id": 67,
        "title": "Akagami no Shirayuki-hime",
        "href": "https://www.animeforce.it/anime/akagami-no-shirayuki-hime/"
    },
    {
        "id": 69,
        "title": "Akagami no Shirayuki-hime 2",
        "href": "https://www.animeforce.it/anime/akagami-no-shirayuki-hime-2/"
    },
    {
        "id": 71,
        "title": "Akai Hayate",
        "href": "https://www.animeforce.it/anime/akai-hayate/"
    },
    {
        "id": 73,
        "title": "Akai Koudan Zillion",
        "href": "https://www.animeforce.it/anime/akai-koudan-zillion/"
    },
    {
        "id": 75,
        "title": "Akame ga Kill!",
        "href": "https://www.animeforce.it/anime/akame-ga-kill/"
    },
    {
        "id": 77,
        "title": "Akaneiro ni Somaru Saka",
        "href": "https://www.animeforce.it/anime/akaneiro-ni-somaru-saka/"
    },
    {
        "id": 79,
        "title": "Akanesasu Shojo",
        "href": "https://www.animeforce.it/anime/akanesasu-shojo/"
    },
    {
        "id": 81,
        "title": "Akanesasu Shoujo",
        "href": "https://www.animeforce.it/anime/akanesasu-shoujo/"
    },
    {
        "id": 83,
        "title": "Akatsuki no Yona",
        "href": "https://www.animeforce.it/anime/akatsuki-no-yona/"
    },
    {
        "id": 85,
        "title": "AKB0048",
        "href": "https://www.animeforce.it/anime/akb0048/"
    },
    {
        "id": 87,
        "title": "AKB0048 Next Stage",
        "href": "https://www.animeforce.it/anime/akb0048-next-stage/"
    },
    {
        "id": 89,
        "title": "Aki no Kanade",
        "href": "https://www.animeforce.it/anime/aki-no-kanade/"
    },
    {
        "id": 91,
        "title": "Akiba’s Trip The Animation",
        "href": "https://www.animeforce.it/anime/akibas-trip-the-animation/"
    },
    {
        "id": 93,
        "title": "Akikan!",
        "href": "https://www.animeforce.it/anime/akikan/"
    },
    {
        "id": 95,
        "title": "Akkun to Kanojo",
        "href": "https://www.animeforce.it/anime/akkun-to-kanojo/"
    },
    {
        "id": 97,
        "title": "Aku no Hana",
        "href": "https://www.animeforce.it/anime/aku-no-hana/"
    },
    {
        "id": 99,
        "title": "Akudama Drive",
        "href": "https://www.animeforce.it/anime/akudama-drive/"
    },
    {
        "id": 101,
        "title": "Akuma no Riddle",
        "href": "https://www.animeforce.it/anime/akuma-no-riddle/"
    },
    {
        "id": 103,
        "title": "Aldnoah.Zero",
        "href": "https://www.animeforce.it/anime/aldnoah-zero/"
    },
    {
        "id": 105,
        "title": "Aldnoah.Zero 2",
        "href": "https://www.animeforce.it/anime/aldnoah-zero-2/"
    },
    {
        "id": 107,
        "title": "Alice in Deadly School",
        "href": "https://www.animeforce.it/anime/alice-in-deadly-school/"
    },
    {
        "id": 109,
        "title": "Alice or Alice",
        "href": "https://www.animeforce.it/anime/alice-or-alice/"
    },
    {
        "id": 111,
        "title": "Alice to Zouroku",
        "href": "https://www.animeforce.it/anime/alice-to-zouroku/"
    },
    {
        "id": 113,
        "title": "Alien 9",
        "href": "https://www.animeforce.it/anime/alien-9/"
    },
    {
        "id": 115,
        "title": "All Out!!",
        "href": "https://www.animeforce.it/anime/all-out/"
    },
    {
        "id": 117,
        "title": "Allison to Lillia",
        "href": "https://www.animeforce.it/anime/allison-to-lillia/"
    },
    {
        "id": 119,
        "title": "Amaama to Inazuma",
        "href": "https://www.animeforce.it/anime/amaama-to-inazuma/"
    },
    {
        "id": 121,
        "title": "Amaenaide yo!!",
        "href": "https://www.animeforce.it/anime/amaenaide-yo/"
    },
    {
        "id": 123,
        "title": "Amaenaide yo!! Katsu!!",
        "href": "https://www.animeforce.it/anime/amaenaide-yo-katsu/"
    },
    {
        "id": 125,
        "title": "Amagami SS",
        "href": "https://www.animeforce.it/anime/amagami-ss/"
    },
    {
        "id": 127,
        "title": "Amagami SS Plus",
        "href": "https://www.animeforce.it/anime/amagami-ss-plus/"
    },
    {
        "id": 129,
        "title": "Amagi Brilliant Park",
        "href": "https://www.animeforce.it/anime/amagi-brilliant-park/"
    },
    {
        "id": 131,
        "title": "Amai Choubatsu: Watashi wa Kanshu Senyou Pet",
        "href": "https://www.animeforce.it/anime/amai-choubatsu-watashi-wa-kanshu-senyou-pet/"
    },
    {
        "id": 133,
        "title": "Amanchu!",
        "href": "https://www.animeforce.it/anime/amanchu/"
    },
    {
        "id": 135,
        "title": "Amanchu! Advance",
        "href": "https://www.animeforce.it/anime/amanchu-advance/"
    },
    {
        "id": 137,
        "title": "Amatsuki",
        "href": "https://www.animeforce.it/anime/amatsuki/"
    },
    {
        "id": 139,
        "title": "Amazing Nuts!",
        "href": "https://www.animeforce.it/anime/amazing-nuts/"
    },
    {
        "id": 141,
        "title": "Ame to Shoujo to Watashi no Tegami",
        "href": "https://www.animeforce.it/anime/ame-to-shoujo-to-watashi-no-tegami/"
    },
    {
        "id": 143,
        "title": "Ame-iro Cocoa",
        "href": "https://www.animeforce.it/anime/ame-iro-cocoa/"
    },
    {
        "id": 145,
        "title": "Ame-iro Cocoa: Side G",
        "href": "https://www.animeforce.it/anime/ame-iro-cocoa-side-g/"
    },
    {
        "id": 147,
        "title": "Amnesia",
        "href": "https://www.animeforce.it/anime/amnesia/"
    },
    {
        "id": 149,
        "title": "Amon Saga",
        "href": "https://www.animeforce.it/anime/amon-saga/"
    },
    {
        "id": 151,
        "title": "Ane Log",
        "href": "https://www.animeforce.it/anime/ane-log/"
    },
    {
        "id": 153,
        "title": "Ange Vierge",
        "href": "https://www.animeforce.it/anime/ange-vierge/"
    },
    {
        "id": 155,
        "title": "Angel Beats!",
        "href": "https://www.animeforce.it/anime/angel-beats/"
    },
    {
        "id": 157,
        "title": "Angel Densetsu",
        "href": "https://www.animeforce.it/anime/angel-densetsu/"
    },
    {
        "id": 159,
        "title": "Angel Heart",
        "href": "https://www.animeforce.it/anime/angel-heart/"
    },
    {
        "id": 161,
        "title": "Angel’s Feather",
        "href": "https://www.animeforce.it/anime/angels-feather/"
    },
    {
        "id": 163,
        "title": "Angolmois: Genkou Kassenki",
        "href": "https://www.animeforce.it/anime/angolmois-genkou-kassenki/"
    },
    {
        "id": 165,
        "title": "Anima Yell!",
        "href": "https://www.animeforce.it/anime/anima-yell/"
    },
    {
        "id": 167,
        "title": "Anime-Gataris",
        "href": "https://www.animeforce.it/anime/anime-gataris/"
    },
    {
        "id": 169,
        "title": "Anitore! EX",
        "href": "https://www.animeforce.it/anime/anitore-ex/"
    },
    {
        "id": 171,
        "title": "Anitore! XX",
        "href": "https://www.animeforce.it/anime/anitore-xx/"
    },
    {
        "id": 173,
        "title": "Anne Happy",
        "href": "https://www.animeforce.it/anime/anne-happy/"
    },
    {
        "id": 175,
        "title": "Anne no Nikki",
        "href": "https://www.animeforce.it/anime/anne-no-nikki/"
    },
    {
        "id": 177,
        "title": "Ano Natsu de Matteru",
        "href": "https://www.animeforce.it/anime/ano-natsu-de-matteru/"
    },
    {
        "id": 179,
        "title": "AnoHana Movie",
        "href": "https://www.animeforce.it/anime/anohana-movie/"
    },
    {
        "id": 181,
        "title": "Another",
        "href": "https://www.animeforce.it/anime/another/"
    },
    {
        "id": 183,
        "title": "Ansatsu Kyoushitsu",
        "href": "https://www.animeforce.it/anime/ansatsu-kyoushitsu/"
    },
    {
        "id": 185,
        "title": "Ansatsu Kyoushitsu 2",
        "href": "https://www.animeforce.it/anime/ansatsu-kyoushitsu-2/"
    },
    {
        "id": 187,
        "title": "Ansatsu Kyoushitsu: 365-nichi no Jikan",
        "href": "https://www.animeforce.it/anime/assassination-classroom-the-movie-365-days/"
    },
    {
        "id": 189,
        "title": "Ao Haru Ride",
        "href": "https://www.animeforce.it/anime/ao-haru-ride/"
    },
    {
        "id": 191,
        "title": "Ao no Exorcist",
        "href": "https://www.animeforce.it/anime/ao-no-exorcist/"
    },
    {
        "id": 193,
        "title": "Ao no Exorcist: Kyoto Fujouou-hen",
        "href": "https://www.animeforce.it/anime/ao-no-exorcist-kyoto-fujouou-hen/"
    },
    {
        "id": 195,
        "title": "Ao no Kanata no Four Rhythm",
        "href": "https://www.animeforce.it/anime/ao-no-kanata-no-four-rhythm/"
    },
    {
        "id": 197,
        "title": "Ao no Strada",
        "href": "https://www.animeforce.it/anime/ao-no-strada/"
    },
    {
        "id": 199,
        "title": "Ao Oni: The Animation",
        "href": "https://www.animeforce.it/anime/ao-oni-the-animation/"
    },
    {
        "id": 201,
        "title": "Aoharu x Kikanjuu",
        "href": "https://www.animeforce.it/anime/aoharu-x-kikanjuu/"
    },
    {
        "id": 203,
        "title": "Aoi Bungaku Series",
        "href": "https://www.animeforce.it/anime/aoi-bungaku-series/"
    },
    {
        "id": 205,
        "title": "Aoi Hana",
        "href": "https://www.animeforce.it/anime/aoi-hana/"
    },
    {
        "id": 207,
        "title": "Aoi Sekai no Chuushin de",
        "href": "https://www.animeforce.it/anime/aoi-sekai-no-chuushin-de/"
    },
    {
        "id": 209,
        "title": "Aoi Umi no Tristia",
        "href": "https://www.animeforce.it/anime/aoi-umi-no-tristia/"
    },
    {
        "id": 211,
        "title": "Aoki Hagane no Arpeggio",
        "href": "https://www.animeforce.it/anime/aoki-hagane-no-arpeggio/"
    },
    {
        "id": 213,
        "title": "Aoki Hagane no Arpeggio Movie",
        "href": "https://www.animeforce.it/anime/aoki-hagane-no-arpeggio-movie/"
    },
    {
        "id": 215,
        "title": "Aoki Ryuusei SPT Layzner",
        "href": "https://www.animeforce.it/anime/aoki-ryuusei-spt-layzner/"
    },
    {
        "id": 217,
        "title": "Aozora Shoujo-tai",
        "href": "https://www.animeforce.it/anime/aozora-shoujo-tai/"
    },
    {
        "id": 219,
        "title": "Appare-Ranman!",
        "href": "https://www.animeforce.it/anime/appare-ranman/"
    },
    {
        "id": 221,
        "title": "Appleseed XIII",
        "href": "https://www.animeforce.it/anime/appleseed-xiii/"
    },
    {
        "id": 223,
        "title": "Aquarian Age: Sign for Evolution",
        "href": "https://www.animeforce.it/anime/aquarian-age-sign-for-evolution/"
    },
    {
        "id": 225,
        "title": "Aquarion Evol",
        "href": "https://www.animeforce.it/anime/aquarion-evol/"
    },
    {
        "id": 227,
        "title": "Aquarion Logos",
        "href": "https://www.animeforce.it/anime/aquarion-logos/"
    },
    {
        "id": 229,
        "title": "Ar Tonelico: Sekai no Owari de Utai Tsuzukeru Shoujo",
        "href": "https://www.animeforce.it/anime/ar-tonelico-sekai-no-owari-de-utai-tsuzukeru-shoujo/"
    },
    {
        "id": 231,
        "title": "Araburu Kisetsu no Otome-domo yo.",
        "href": "https://www.animeforce.it/anime/araburu-kisetsu-no-otome-domo-yo/"
    },
    {
        "id": 233,
        "title": "Aragne no Mushikago",
        "href": "https://www.animeforce.it/anime/aragne-no-mushikago/"
    },
    {
        "id": 235,
        "title": "Araiya-san!: Ore to Aitsu ga Onnayu de!?",
        "href": "https://www.animeforce.it/anime/araiya-san-ore-to-aitsu-ga-onnayu-de/"
    },
    {
        "id": 237,
        "title": "Arakawa Under the Bridge",
        "href": "https://www.animeforce.it/anime/arakawa-under-the-bridge/"
    },
    {
        "id": 239,
        "title": "Arakawa Under the Bridge X Bridge",
        "href": "https://www.animeforce.it/anime/arakawa-under-the-bridge-x-bridge/"
    },
    {
        "id": 241,
        "title": "Arata Kangatari",
        "href": "https://www.animeforce.it/anime/arata-kangatari/"
    },
    {
        "id": 243,
        "title": "Arcade Gamer Fubuki",
        "href": "https://www.animeforce.it/anime/arcade-gamer-fubuki/"
    },
    {
        "id": 245,
        "title": "Arcana Famiglia",
        "href": "https://www.animeforce.it/anime/arcana-famiglia/"
    },
    {
        "id": 247,
        "title": "Area 88",
        "href": "https://www.animeforce.it/anime/area-88/"
    },
    {
        "id": 249,
        "title": "Area no Kishi",
        "href": "https://www.animeforce.it/anime/area-no-kishi/"
    },
    {
        "id": 251,
        "title": "Arete Hime",
        "href": "https://www.animeforce.it/anime/arete-hime/"
    },
    {
        "id": 253,
        "title": "Argento Soma",
        "href": "https://www.animeforce.it/anime/argento-soma/"
    },
    {
        "id": 255,
        "title": "Aria The Avvenire",
        "href": "https://www.animeforce.it/anime/aria-the-avvenire/"
    },
    {
        "id": 257,
        "title": "Ariel Deluxe",
        "href": "https://www.animeforce.it/anime/ariel-deluxe/"
    },
    {
        "id": 259,
        "title": "Ariel Visual",
        "href": "https://www.animeforce.it/anime/ariel-visual/"
    },
    {
        "id": 261,
        "title": "Arifureta Shokugyou de Sekai Saikyou",
        "href": "https://www.animeforce.it/anime/arifureta-shokugyou-de-sekai-saikyou/"
    },
    {
        "id": 263,
        "title": "Ark IX",
        "href": "https://www.animeforce.it/anime/ark-ix/"
    },
    {
        "id": 265,
        "title": "Armed Blue Gunvolt",
        "href": "https://www.animeforce.it/anime/armed-blue-gunvolt/"
    },
    {
        "id": 267,
        "title": "ARP Backstage Pass",
        "href": "https://www.animeforce.it/anime/arp-backstage-pass/"
    },
    {
        "id": 269,
        "title": "Arslan Senki",
        "href": "https://www.animeforce.it/anime/arslan-senki/"
    },
    {
        "id": 271,
        "title": "Arslan Senki: Fuujin Ranbu",
        "href": "https://www.animeforce.it/anime/arslan-senki-fuujin-ranbu/"
    },
    {
        "id": 273,
        "title": "Arte",
        "href": "https://www.animeforce.it/anime/arte/"
    },
    {
        "id": 275,
        "title": "Aru Tabibito no Nikki",
        "href": "https://www.animeforce.it/anime/aru-tabibito-no-nikki/"
    },
    {
        "id": 277,
        "title": "Aru Zombie Shoujo no Sainan",
        "href": "https://www.animeforce.it/anime/aru-zombie-shoujo-no-sainan/"
    },
    {
        "id": 279,
        "title": "Arve Rezzle",
        "href": "https://www.animeforce.it/anime/arve-rezzle/"
    },
    {
        "id": 281,
        "title": "Asa made Jugyou Chu!",
        "href": "https://www.animeforce.it/anime/asa-made-jugyou-chu/"
    },
    {
        "id": 283,
        "title": "Asagao to Kase-san",
        "href": "https://www.animeforce.it/anime/asagao-to-kase-san/"
    },
    {
        "id": 285,
        "title": "Asagiri no Miko",
        "href": "https://www.animeforce.it/anime/asagiri-no-miko/"
    },
    {
        "id": 287,
        "title": "Asatte no Houkou",
        "href": "https://www.animeforce.it/anime/asatte-no-houkou/"
    },
    {
        "id": 289,
        "title": "Asobi Asobase",
        "href": "https://www.animeforce.it/anime/asobi-asobase/"
    },
    {
        "id": 291,
        "title": "Asobi ni iku yo!",
        "href": "https://www.animeforce.it/anime/asobi-ni-iku-yo/"
    },
    {
        "id": 293,
        "title": "Assassins Pride",
        "href": "https://www.animeforce.it/anime/assassins-pride/"
    },
    {
        "id": 295,
        "title": "Assault Lily: Bouquet",
        "href": "https://www.animeforce.it/anime/assault-lily-bouquet/"
    },
    {
        "id": 297,
        "title": "Assemble Insert",
        "href": "https://www.animeforce.it/anime/assemble-insert/"
    },
    {
        "id": 299,
        "title": "Astarotte No Omocha",
        "href": "https://www.animeforce.it/anime/astarotte-no-omocha/"
    },
    {
        "id": 301,
        "title": "Astro Boy: Tetsuwan Atom (2003)",
        "href": "https://www.animeforce.it/anime/astro-boy-tetsuwan-atom-2003/"
    },
    {
        "id": 303,
        "title": "Asu no Yoichi!",
        "href": "https://www.animeforce.it/anime/asu-no-yoichi/"
    },
    {
        "id": 305,
        "title": "Asura",
        "href": "https://www.animeforce.it/anime/asura/"
    },
    {
        "id": 307,
        "title": "Asura Cryin",
        "href": "https://www.animeforce.it/anime/asura-cryin/"
    },
    {
        "id": 309,
        "title": "Asura Cryin 2",
        "href": "https://www.animeforce.it/anime/asura-cryin-2/"
    },
    {
        "id": 311,
        "title": "Asylum Session",
        "href": "https://www.animeforce.it/anime/asylum-session/"
    },
    {
        "id": 313,
        "title": "Atelier Escha & Logy",
        "href": "https://www.animeforce.it/anime/atelier-escha-logy/"
    },
    {
        "id": 315,
        "title": "Atom: The Beginning",
        "href": "https://www.animeforce.it/anime/atom-the-beginning/"
    },
    {
        "id": 317,
        "title": "Aura: Maryuuin Kouga Saigo no Tatakai",
        "href": "https://www.animeforce.it/anime/aura-maryuuin-kouga-saigo-no-tatakai/"
    },
    {
        "id": 319,
        "title": "Avenger",
        "href": "https://www.animeforce.it/anime/avenger/"
    },
    {
        "id": 321,
        "title": "Ayakashi",
        "href": "https://www.animeforce.it/anime/ayakashi/"
    },
    {
        "id": 323,
        "title": "Ayakashi: Japanese Classic Horror",
        "href": "https://www.animeforce.it/anime/ayakashi-japanese-classic-horror/"
    },
    {
        "id": 325,
        "title": "Ayane-chan High Kick!",
        "href": "https://www.animeforce.it/anime/ayane-chan-high-kick/"
    },
    {
        "id": 327,
        "title": "Azumanga Daioh",
        "href": "https://www.animeforce.it/anime/azumanga-daioh/"
    },
    {
        "id": 329,
        "title": "Azur Lane",
        "href": "https://www.animeforce.it/anime/azur-lane/"
    },
    {
        "id": 331,
        "title": "Azur Lane: Bisoku Zenshin!",
        "href": "https://www.animeforce.it/anime/azur-lane-bisoku-zenshin/"
    },
    {
        "id": 333,
        "title": "Azusa, Otetsudai Shimasu!",
        "href": "https://www.animeforce.it/anime/azusa-otetsudai-shimasu/"
    },
    {
        "id": 335,
        "title": "B Gata H Kei",
        "href": "https://www.animeforce.it/anime/b-gata-h-kei/"
    },
    {
        "id": 337,
        "title": "B-Project: Kodou Ambitious",
        "href": "https://www.animeforce.it/anime/b-project-kodou-ambitious/"
    },
    {
        "id": 339,
        "title": "B-Project: Zecchou Emotion",
        "href": "https://www.animeforce.it/anime/b-project-zecchou-emotion/"
    },
    {
        "id": 341,
        "title": "Babel Nisei (2001)",
        "href": "https://www.animeforce.it/anime/babel-nisei-2001/"
    },
    {
        "id": 343,
        "title": "Baby Princess 3D Paradise 0 [Love]",
        "href": "https://www.animeforce.it/anime/baby-princess-3d-paradise-0-love/"
    },
    {
        "id": 345,
        "title": "Baby Steps",
        "href": "https://www.animeforce.it/anime/baby-steps/"
    },
    {
        "id": 347,
        "title": "Baby Steps 2",
        "href": "https://www.animeforce.it/anime/baby-steps-2/"
    },
    {
        "id": 349,
        "title": "Babylon",
        "href": "https://www.animeforce.it/anime/babylon/"
    },
    {
        "id": 351,
        "title": "Baccano!",
        "href": "https://www.animeforce.it/anime/baccano/"
    },
    {
        "id": 353,
        "title": "Back Arrow",
        "href": "https://www.animeforce.it/anime/back-arrow/"
    },
    {
        "id": 355,
        "title": "Back Street Girls: Gokudolls",
        "href": "https://www.animeforce.it/anime/back-street-girls-gokudolls/"
    },
    {
        "id": 357,
        "title": "Baja no Studio",
        "href": "https://www.animeforce.it/anime/baja-no-studio/"
    },
    {
        "id": 359,
        "title": "Baka to Test to Shoukanjuu",
        "href": "https://www.animeforce.it/anime/baka-to-test-to-shoukanjuu/"
    },
    {
        "id": 361,
        "title": "Baka to Test to Shoukanjuu Ni!",
        "href": "https://www.animeforce.it/anime/baka-to-test-to-shoukanjuu-ni/"
    },
    {
        "id": 363,
        "title": "Baka to Test to Shoukanjuu: Matsuri",
        "href": "https://www.animeforce.it/anime/baka-to-test-to-shoukanjuu-matsuri/"
    },
    {
        "id": 365,
        "title": "Bakemonogatari",
        "href": "https://www.animeforce.it/anime/bakemonogatari/"
    },
    {
        "id": 367,
        "title": "Baki (2018)",
        "href": "https://www.animeforce.it/anime/baki-2018/"
    },
    {
        "id": 369,
        "title": "Bakuman",
        "href": "https://www.animeforce.it/anime/bakuman/"
    },
    {
        "id": 371,
        "title": "Bakuman 2",
        "href": "https://www.animeforce.it/anime/bakuman-2/"
    },
    {
        "id": 373,
        "title": "Bakuman 3",
        "href": "https://www.animeforce.it/anime/bakuman-3/"
    },
    {
        "id": 375,
        "title": "Bakumatsu",
        "href": "https://www.animeforce.it/anime/bakumatsu/"
    },
    {
        "id": 377,
        "title": "Bakumatsu Gijinden Roman",
        "href": "https://www.animeforce.it/anime/bakumatsu-gijinden-roman/"
    },
    {
        "id": 379,
        "title": "Bakumatsu Kikansetsu Irohanihoheto",
        "href": "https://www.animeforce.it/anime/bakumatsu-kikansetsu-irohanihoheto/"
    },
    {
        "id": 381,
        "title": "Bakumatsu Rock",
        "href": "https://www.animeforce.it/anime/bakumatsu-rock/"
    },
    {
        "id": 383,
        "title": "Bakuon!!",
        "href": "https://www.animeforce.it/anime/bakuon/"
    },
    {
        "id": 385,
        "title": "Bakuretsu Tenshi: Infinity",
        "href": "https://www.animeforce.it/anime/bakuretsu-tenshi-infinity/"
    },
    {
        "id": 387,
        "title": "Bakuten!!",
        "href": "https://www.animeforce.it/anime/bakuten/"
    },
    {
        "id": 389,
        "title": "Ballroom e Youkoso",
        "href": "https://www.animeforce.it/anime/ballroom-e-youkoso/"
    },
    {
        "id": 391,
        "title": "Bamboo Blade",
        "href": "https://www.animeforce.it/anime/bamboo-blade/"
    },
    {
        "id": 393,
        "title": "Banana Fish",
        "href": "https://www.animeforce.it/anime/banana-fish/"
    },
    {
        "id": 395,
        "title": "Bang Dream!",
        "href": "https://www.animeforce.it/anime/bang-dream/"
    },
    {
        "id": 397,
        "title": "Bang Dream! 2",
        "href": "https://www.animeforce.it/anime/bang-dream-2/"
    },
    {
        "id": 399,
        "title": "BanG Dream! 3",
        "href": "https://www.animeforce.it/anime/bang-dream-3/"
    },
    {
        "id": 401,
        "title": "BanG Dream! Garupa☆Pico",
        "href": "https://www.animeforce.it/anime/bang-dream-garupa%e2%98%86pico/"
    },
    {
        "id": 403,
        "title": "BanG Dream! Garupa☆Pico: Oomori",
        "href": "https://www.animeforce.it/anime/bang-dream-garupa%e2%98%86pico-oomori/"
    },
    {
        "id": 405,
        "title": "Barakamon",
        "href": "https://www.animeforce.it/anime/barakamon/"
    },
    {
        "id": 407,
        "title": "Basilisk: Ouka Ninpouchou",
        "href": "https://www.animeforce.it/anime/basilisk-ouka-ninpouchou/"
    },
    {
        "id": 409,
        "title": "Basquash",
        "href": "https://www.animeforce.it/anime/basquash/"
    },
    {
        "id": 411,
        "title": "Battery",
        "href": "https://www.animeforce.it/anime/battery/"
    },
    {
        "id": 413,
        "title": "Battle Athletess Daiundoukai ReSTART!",
        "href": "https://www.animeforce.it/anime/battle-athletes-daiundokai-restart/"
    },
    {
        "id": 415,
        "title": "Battle Girl High School",
        "href": "https://www.animeforce.it/anime/battle-girl-high-school/"
    },
    {
        "id": 417,
        "title": "Bayonetta: Bloody Fate",
        "href": "https://www.animeforce.it/anime/bayonetta-bloody-fate/"
    },
    {
        "id": 419,
        "title": "Beastars",
        "href": "https://www.animeforce.it/anime/beastars/"
    },
    {
        "id": 421,
        "title": "Beastars 2",
        "href": "https://www.animeforce.it/anime/beastars-2/"
    },
    {
        "id": 423,
        "title": "Beatless",
        "href": "https://www.animeforce.it/anime/beatless/"
    },
    {
        "id": 425,
        "title": "Beatless Final Stage",
        "href": "https://www.animeforce.it/anime/beatless-final-stage/"
    },
    {
        "id": 427,
        "title": "Beelzebub-jou no Okinimesu mama",
        "href": "https://www.animeforce.it/anime/beelzebub-jou-no-okinimesu-mama/"
    },
    {
        "id": 429,
        "title": "BEM",
        "href": "https://www.animeforce.it/anime/bem/"
    },
    {
        "id": 431,
        "title": "Bem Movie: Become Human",
        "href": "https://www.animeforce.it/anime/bem-movie-become-human/"
    },
    {
        "id": 433,
        "title": "Ben-To",
        "href": "https://www.animeforce.it/anime/ben-to/"
    },
    {
        "id": 435,
        "title": "Bernard-jou Iwaku.",
        "href": "https://www.animeforce.it/anime/bernard-jou-iwaku/"
    },
    {
        "id": 437,
        "title": "Berserk (2016)",
        "href": "https://www.animeforce.it/anime/berserk-2016/"
    },
    {
        "id": 439,
        "title": "Berserk (2017)",
        "href": "https://www.animeforce.it/anime/berserk-2017/"
    },
    {
        "id": 441,
        "title": "Big Order",
        "href": "https://www.animeforce.it/anime/big-order/"
    },
    {
        "id": 443,
        "title": "Big Order OAV",
        "href": "https://www.animeforce.it/anime/big-order-oav/"
    },
    {
        "id": 445,
        "title": "Bikini Warriors",
        "href": "https://www.animeforce.it/anime/bikini-warriors/"
    },
    {
        "id": 447,
        "title": "Binan Koukou Chikyuu Bouei Bu Happy Kiss!",
        "href": "https://www.animeforce.it/anime/binan-koukou-chikyuu-bouei-bu-happy-kiss/"
    },
    {
        "id": 449,
        "title": "Binan Koukou Chikyuu Bouei Bu Love!",
        "href": "https://www.animeforce.it/anime/binan-koukou-chikyuu-bouei-bu-love/"
    },
    {
        "id": 451,
        "title": "Binan Koukou Chikyuu Bouei Bu Love! Love!",
        "href": "https://www.animeforce.it/anime/binan-koukou-chikyuu-bouei-bu-love-love/"
    },
    {
        "id": 453,
        "title": "Bishoujo Yuugi Unit Crane Game Girls",
        "href": "https://www.animeforce.it/anime/bishoujo-yuugi-unit-crane-game-girls/"
    },
    {
        "id": 455,
        "title": "Bishounen Tanteidan",
        "href": "https://www.animeforce.it/anime/bishounen-tanteidan/"
    },
    {
        "id": 457,
        "title": "Black Bullet",
        "href": "https://www.animeforce.it/anime/black-bullet/"
    },
    {
        "id": 459,
        "title": "Black Cat",
        "href": "https://www.animeforce.it/anime/black-cat/"
    },
    {
        "id": 461,
        "title": "Black Clover",
        "href": "https://www.animeforce.it/anime/black-clover/"
    },
    {
        "id": 463,
        "title": "Blade",
        "href": "https://www.animeforce.it/anime/blade/"
    },
    {
        "id": 465,
        "title": "Blade & Soul",
        "href": "https://www.animeforce.it/anime/blade-soul/"
    },
    {
        "id": 467,
        "title": "BlazBlue: Alter Memory",
        "href": "https://www.animeforce.it/anime/blazblue-alter-memory/"
    },
    {
        "id": 469,
        "title": "Bleach",
        "href": "https://www.animeforce.it/anime/bleach/"
    },
    {
        "id": 471,
        "title": "Blend S",
        "href": "https://www.animeforce.it/anime/blend-s/"
    },
    {
        "id": 473,
        "title": "Blood Lad",
        "href": "https://www.animeforce.it/anime/blood-lad/"
    },
    {
        "id": 475,
        "title": "Blood-C",
        "href": "https://www.animeforce.it/anime/blood-c/"
    },
    {
        "id": 477,
        "title": "Bloodivores",
        "href": "https://www.animeforce.it/anime/bloodivores/"
    },
    {
        "id": 479,
        "title": "Blue Period",
        "href": "https://www.animeforce.it/anime/blue-period/"
    },
    {
        "id": 481,
        "title": "Blue Reflection Ray",
        "href": "https://www.animeforce.it/anime/blue-reflection-ray/"
    },
    {
        "id": 483,
        "title": "BNA: Brand New Animal",
        "href": "https://www.animeforce.it/anime/bna-brand-new-animal/"
    },
    {
        "id": 485,
        "title": "Bobby ni Kubittake",
        "href": "https://www.animeforce.it/anime/bobby-ni-kubittake/"
    },
    {
        "id": 487,
        "title": "Boku Dake ga Inai Machi",
        "href": "https://www.animeforce.it/anime/boku-dake-ga-inai-machi/"
    },
    {
        "id": 489,
        "title": "Boku no Hero Academia",
        "href": "https://www.animeforce.it/anime/boku-no-hero-academia/"
    },
    {
        "id": 491,
        "title": "Boku no Hero Academia 2",
        "href": "https://www.animeforce.it/anime/boku-no-hero-academia-2/"
    },
    {
        "id": 493,
        "title": "Boku no Hero Academia 3",
        "href": "https://www.animeforce.it/anime/boku-no-hero-academia-3/"
    },
    {
        "id": 495,
        "title": "Boku no Hero Academia 4",
        "href": "https://www.animeforce.it/anime/boku-no-hero-academia-4/"
    },
    {
        "id": 497,
        "title": "Boku no Hero Academia 5",
        "href": "https://www.animeforce.it/anime/boku-no-hero-academia-5/"
    },
    {
        "id": 499,
        "title": "Boku no Hero Academia OAV",
        "href": "https://www.animeforce.it/anime/boku-no-hero-academia-oav/"
    },
    {
        "id": 501,
        "title": "Boku no Hero Academia the Movie 2: Heroes:Rising",
        "href": "https://www.animeforce.it/anime/boku-no-hero-academia-the-movie-2-heroesrising/"
    },
    {
        "id": 503,
        "title": "Boku no Hero Academia: Ikinokore! Kesshi no Survival Kunren",
        "href": "https://www.animeforce.it/anime/boku-no-hero-academia-ikinokore-kesshi-no-survival-kunren/"
    },
    {
        "id": 505,
        "title": "Boku no Kanojo ga Majimesugiru Sho-bitch na Ken",
        "href": "https://www.animeforce.it/anime/boku-no-kanojo-ga-majimesugiru-sho-bitch-na-ken/"
    },
    {
        "id": 507,
        "title": "Boku no Tonari ni Ankoku Hakaishin ga Imasu.",
        "href": "https://www.animeforce.it/anime/boku-no-tonari-ni-ankoku-hakaishin-ga-imasu/"
    },
    {
        "id": 509,
        "title": "Boku wa Imouto ni Koi wo Suru",
        "href": "https://www.animeforce.it/anime/boku-wa-imouto-ni-koi-wo-suru/"
    },
    {
        "id": 511,
        "title": "Boku wa Tomodachi ga Sukunai",
        "href": "https://www.animeforce.it/anime/boku-wa-tomodachi-ga-sukunai/"
    },
    {
        "id": 513,
        "title": "Boku wa Tomodachi ga Sukunai Next",
        "href": "https://www.animeforce.it/anime/boku-wa-tomodachi-ga-sukunai-next/"
    },
    {
        "id": 515,
        "title": "Bokura ga Ita",
        "href": "https://www.animeforce.it/anime/bokura-ga-ita/"
    },
    {
        "id": 517,
        "title": "Bokura wa Minna Kawaisou",
        "href": "https://www.animeforce.it/anime/bokura-wa-minna-kawaisou/"
    },
    {
        "id": 519,
        "title": "Bokutachi no Remake",
        "href": "https://www.animeforce.it/anime/bokutachi-no-remake/"
    },
    {
        "id": 521,
        "title": "Bokutachi wa Benkyou ga Dekinai",
        "href": "https://www.animeforce.it/anime/bokutachi-wa-benkyou-ga-dekinai/"
    },
    {
        "id": 523,
        "title": "Bokutachi wa Benkyou ga Dekinai 2",
        "href": "https://www.animeforce.it/anime/bokutachi-wa-benkyou-ga-dekinai-2/"
    },
    {
        "id": 525,
        "title": "Bonjour: Koiaji Patisserie",
        "href": "https://www.animeforce.it/anime/bonjour-koiaji-patisserie/"
    },
    {
        "id": 527,
        "title": "Boogiepop wa Warawanai (2019)",
        "href": "https://www.animeforce.it/anime/boogiepop-wa-warawanai-2019/"
    },
    {
        "id": 529,
        "title": "Boruto: Naruto Next Generations",
        "href": "https://www.animeforce.it/anime/boruto-naruto-next-generations/"
    },
    {
        "id": 531,
        "title": "Boruto: Naruto the Movie",
        "href": "https://www.animeforce.it/anime/boruto-naruto-the-movie/"
    },
    {
        "id": 533,
        "title": "Brave 10",
        "href": "https://www.animeforce.it/anime/brave-10/"
    },
    {
        "id": 535,
        "title": "Brave Witches",
        "href": "https://www.animeforce.it/anime/brave-witches/"
    },
    {
        "id": 537,
        "title": "Break Blade",
        "href": "https://www.animeforce.it/anime/break-blade/"
    },
    {
        "id": 539,
        "title": "Break Blade Movie",
        "href": "https://www.animeforce.it/anime/break-blade-movie/"
    },
    {
        "id": 541,
        "title": "Breakers",
        "href": "https://www.animeforce.it/anime/breakers/"
    },
    {
        "id": 543,
        "title": "Brotherhood: Final Fantasy XV",
        "href": "https://www.animeforce.it/anime/brotherhood-final-fantasy-xv/"
    },
    {
        "id": 545,
        "title": "Brothers Conflict",
        "href": "https://www.animeforce.it/anime/brothers-conflict/"
    },
    {
        "id": 547,
        "title": "Btooom!",
        "href": "https://www.animeforce.it/anime/btooom/"
    },
    {
        "id": 549,
        "title": "Bubuki Buranki",
        "href": "https://www.animeforce.it/anime/bubuki-buranki/"
    },
    {
        "id": 551,
        "title": "Bubuki Buranki: Hoshi no Kyojin",
        "href": "https://www.animeforce.it/anime/bubuki-buranki-hoshi-no-kyojin/"
    },
    {
        "id": 553,
        "title": "Buddy Complex",
        "href": "https://www.animeforce.it/anime/buddy-complex/"
    },
    {
        "id": 555,
        "title": "Buddy Complex: Final Chapter",
        "href": "https://www.animeforce.it/anime/buddy-complex-final-chapter/"
    },
    {
        "id": 557,
        "title": "Bungou Stray Dogs",
        "href": "https://www.animeforce.it/anime/bungou-stray-dogs/"
    },
    {
        "id": 559,
        "title": "Bungou Stray Dogs 2",
        "href": "https://www.animeforce.it/anime/bungou-stray-dogs-2/"
    },
    {
        "id": 561,
        "title": "Bungou Stray Dogs 3",
        "href": "https://www.animeforce.it/anime/bungou-stray-dogs-3/"
    },
    {
        "id": 563,
        "title": "Bungou Stray Dogs Wan!",
        "href": "https://www.animeforce.it/anime/bungou-stray-dogs-wan/"
    },
    {
        "id": 565,
        "title": "Bungou Stray Dogs: Dead Apple",
        "href": "https://www.animeforce.it/anime/bungou-stray-dogs-dead-apple/"
    },
    {
        "id": 567,
        "title": "Bungou to Alchemist: Shinpan no Haguruma",
        "href": "https://www.animeforce.it/anime/bungou-to-alchemist-shinpan-no-haguruma/"
    },
    {
        "id": 569,
        "title": "Burn the Witch",
        "href": "https://www.animeforce.it/anime/burn-the-witch/"
    },
    {
        "id": 571,
        "title": "Busou Renkin",
        "href": "https://www.animeforce.it/anime/busou-renkin/"
    },
    {
        "id": 573,
        "title": "Busou Shoujo Machiavellianism",
        "href": "https://www.animeforce.it/anime/busou-shoujo-machiavellianism/"
    },
    {
        "id": 575,
        "title": "Butlers: Chitose Momotose Monogatari",
        "href": "https://www.animeforce.it/anime/butlers-chitose-momotose-monogatari/"
    },
    {
        "id": 577,
        "title": "Buzzer Beater",
        "href": "https://www.animeforce.it/anime/buzzer-beater/"
    },
    {
        "id": 579,
        "title": "Buzzer Beater 2",
        "href": "https://www.animeforce.it/anime/buzzer-beater-2/"
    },
    {
        "id": 581,
        "title": "C – The Money of Soul and Possibility Control",
        "href": "https://www.animeforce.it/anime/c-the-money-of-soul-and-possibility-control/"
    },
    {
        "id": 583,
        "title": "C3 – Cube×Cursed×Curious",
        "href": "https://www.animeforce.it/anime/c3-cubexcursedxcurious/"
    },
    {
        "id": 585,
        "title": "Caligula",
        "href": "https://www.animeforce.it/anime/caligula/"
    },
    {
        "id": 587,
        "title": "Campione!",
        "href": "https://www.animeforce.it/anime/campione/"
    },
    {
        "id": 589,
        "title": "Canaan",
        "href": "https://www.animeforce.it/anime/canaan/"
    },
    {
        "id": 591,
        "title": "Captain Earth",
        "href": "https://www.animeforce.it/anime/captain-earth/"
    },
    {
        "id": 593,
        "title": "Captain Tsubasa (2018)",
        "href": "https://www.animeforce.it/anime/captain-tsubasa-2018/"
    },
    {
        "id": 595,
        "title": "Cardcaptor Sakura",
        "href": "https://www.animeforce.it/anime/cardcaptor-sakura/"
    },
    {
        "id": 597,
        "title": "Cardcaptor Sakura: Clear Card-hen",
        "href": "https://www.animeforce.it/anime/cardcaptor-sakura-clear-card-hen/"
    },
    {
        "id": 599,
        "title": "Carnival Phantasm",
        "href": "https://www.animeforce.it/anime/carnival-phantasm/"
    },
    {
        "id": 601,
        "title": "Carole & Tuesday",
        "href": "https://www.animeforce.it/anime/carole-tuesday/"
    },
    {
        "id": 603,
        "title": "Cencoroll Connect",
        "href": "https://www.animeforce.it/anime/cencoroll-connect/"
    },
    {
        "id": 605,
        "title": "Centaur no Nayami",
        "href": "https://www.animeforce.it/anime/centaur-no-nayami/"
    },
    {
        "id": 607,
        "title": "Cestvs: The Roman Fighter",
        "href": "https://www.animeforce.it/anime/cestvs-the-roman-fighter/"
    },
    {
        "id": 609,
        "title": "Chain Chronicle: Haecceitas no Hikari",
        "href": "https://www.animeforce.it/anime/chain-chronicle-haecceitas-no-hikari/"
    },
    {
        "id": 611,
        "title": "Chaos Dragon: Sekiryuu Sen’eki",
        "href": "https://www.animeforce.it/anime/chaos-dragon-sekiryuu-seneki/"
    },
    {
        "id": 613,
        "title": "Chaos;Child",
        "href": "https://www.animeforce.it/anime/chaoschild/"
    },
    {
        "id": 615,
        "title": "Chaos;Head",
        "href": "https://www.animeforce.it/anime/chaoshead/"
    },
    {
        "id": 617,
        "title": "Charlotte",
        "href": "https://www.animeforce.it/anime/charlotte/"
    },
    {
        "id": 619,
        "title": "Cheat Kusushi no Slow Life: Isekai ni Tsukurou Drugstore",
        "href": "https://www.animeforce.it/anime/cheat-kusushi-no-slow-life-isekai-ni-tsukurou-drugstore/"
    },
    {
        "id": 621,
        "title": "Cheating Craft",
        "href": "https://www.animeforce.it/anime/cheating-craft/"
    },
    {
        "id": 623,
        "title": "Cheer Danshi!!",
        "href": "https://www.animeforce.it/anime/cheer-danshi/"
    },
    {
        "id": 625,
        "title": "Chihayafuru",
        "href": "https://www.animeforce.it/anime/chihayafuru/"
    },
    {
        "id": 627,
        "title": "Chihayafuru 2",
        "href": "https://www.animeforce.it/anime/chihayafuru-2/"
    },
    {
        "id": 629,
        "title": "Chihayafuru 3",
        "href": "https://www.animeforce.it/anime/chihayafuru-3/"
    },
    {
        "id": 631,
        "title": "Chio-chan no Tsuugakuro",
        "href": "https://www.animeforce.it/anime/chio-chan-no-tsuugakuro/"
    },
    {
        "id": 633,
        "title": "Chiruran: Nibun no Ichi",
        "href": "https://www.animeforce.it/anime/chiruran-nibun-no-ichi/"
    },
    {
        "id": 635,
        "title": "Chobits",
        "href": "https://www.animeforce.it/anime/chobits/"
    },
    {
        "id": 637,
        "title": "Chocolate Underground",
        "href": "https://www.animeforce.it/anime/chocolate-underground/"
    },
    {
        "id": 639,
        "title": "Chou Kadou Girl 1/6: Amazing Stranger",
        "href": "https://www.animeforce.it/anime/chou-kadou-girl-16-amazing-stranger/"
    },
    {
        "id": 641,
        "title": "Choujin Koukousei-tachi wa Isekai demo Yoyuu de Ikinuku you desu!",
        "href": "https://www.animeforce.it/anime/choujin-koukousei-tachi-wa-isekai-demo-yoyuu-de-ikinuku-you-desu/"
    },
    {
        "id": 643,
        "title": "Chrome Shelled Regios",
        "href": "https://www.animeforce.it/anime/chrome-shelled-regios/"
    },
    {
        "id": 645,
        "title": "Chu Feng: BEE",
        "href": "https://www.animeforce.it/anime/chu-feng-bee/"
    },
    {
        "id": 647,
        "title": "Chu-Bra!!",
        "href": "https://www.animeforce.it/anime/chu-bra/"
    },
    {
        "id": 649,
        "title": "Chuukan Kanriroku Tonegawa",
        "href": "https://www.animeforce.it/anime/chuukan-kanriroku-tonegawa/"
    },
    {
        "id": 651,
        "title": "Chuunibyou demo Koi ga Shitai!",
        "href": "https://www.animeforce.it/anime/chuunibyou-demo-koi-ga-shitai/"
    },
    {
        "id": 653,
        "title": "Chuunibyou demo Koi ga Shitai! Movie: Take On Me",
        "href": "https://www.animeforce.it/anime/chuunibyou-demo-koi-ga-shitai-movie-take/"
    },
    {
        "id": 655,
        "title": "Chuunibyou demo Koi ga Shitai! Ren",
        "href": "https://www.animeforce.it/anime/chuunibyou-demo-koi-ga-shitai-ren/"
    },
    {
        "id": 657,
        "title": "Citrus",
        "href": "https://www.animeforce.it/anime/citrus/"
    },
    {
        "id": 659,
        "title": "Clannad",
        "href": "https://www.animeforce.it/anime/clannad/"
    },
    {
        "id": 661,
        "title": "Clannad After Story",
        "href": "https://www.animeforce.it/anime/clannad-after-story/"
    },
    {
        "id": 663,
        "title": "ClassicaLoid",
        "href": "https://www.animeforce.it/anime/classicaloid/"
    },
    {
        "id": 665,
        "title": "ClassicaLoid 2",
        "href": "https://www.animeforce.it/anime/classicaloid-2/"
    },
    {
        "id": 667,
        "title": "Classroom Crisis",
        "href": "https://www.animeforce.it/anime/classroom-crisis/"
    },
    {
        "id": 669,
        "title": "Clione no Akari",
        "href": "https://www.animeforce.it/anime/clione-no-akari/"
    },
    {
        "id": 671,
        "title": "Clockwork Planet",
        "href": "https://www.animeforce.it/anime/clockwork-planet/"
    },
    {
        "id": 673,
        "title": "Code Geass: Fukkatsu no Lelouch",
        "href": "https://www.animeforce.it/anime/code-geass-fukkatsu-no-lelouch/"
    },
    {
        "id": 675,
        "title": "Code Geass: Hangyaku no Lelouch",
        "href": "https://www.animeforce.it/anime/code-geass-lelouch-of-the-rebellion/"
    },
    {
        "id": 677,
        "title": "Code Geass: Hangyaku no Lelouch I – Koudou",
        "href": "https://www.animeforce.it/anime/code-geass-hangyaku-no-lelouch-koudou/"
    },
    {
        "id": 679,
        "title": "Code Geass: Hangyaku no Lelouch II – Handou",
        "href": "https://www.animeforce.it/anime/code-geass-hangyaku-no-lelouch-ii-handou/"
    },
    {
        "id": 681,
        "title": "Code Geass: Hangyaku no Lelouch III – Oudou",
        "href": "https://www.animeforce.it/anime/code-geass-hangyaku-no-lelouch-iii-oudou/"
    },
    {
        "id": 683,
        "title": "Code Geass: Hangyaku no Lelouch R2",
        "href": "https://www.animeforce.it/anime/code-geass-hangyaku-no-lelouch-r2/"
    },
    {
        "id": 685,
        "title": "Code-E",
        "href": "https://www.animeforce.it/anime/code-e/"
    },
    {
        "id": 687,
        "title": "Code:Breaker",
        "href": "https://www.animeforce.it/anime/codebreaker/"
    },
    {
        "id": 689,
        "title": "Code:Realize: Sousei no Himegimi",
        "href": "https://www.animeforce.it/anime/coderealize-sousei-no-himegimi/"
    },
    {
        "id": 691,
        "title": "Comet Lucifer",
        "href": "https://www.animeforce.it/anime/comet-lucifer/"
    },
    {
        "id": 693,
        "title": "Comic Girl",
        "href": "https://www.animeforce.it/anime/comic-girl/"
    },
    {
        "id": 695,
        "title": "Conception",
        "href": "https://www.animeforce.it/anime/conception/"
    },
    {
        "id": 697,
        "title": "Concrete Revolutio: Choujin Gensou",
        "href": "https://www.animeforce.it/anime/concrete-revolutio-choujin-gensou/"
    },
    {
        "id": 699,
        "title": "Concrete Revolutio: Choujin Gensou 2",
        "href": "https://www.animeforce.it/anime/concrete-revolutio-choujin-gensou-2/"
    },
    {
        "id": 701,
        "title": "Cop Craft",
        "href": "https://www.animeforce.it/anime/cop-craft/"
    },
    {
        "id": 703,
        "title": "Corpse Party",
        "href": "https://www.animeforce.it/anime/corpse-party/"
    },
    {
        "id": 705,
        "title": "Cross Ange: Tenshi to Ryuu no Rondo",
        "href": "https://www.animeforce.it/anime/cross-ange-tenshi-to-ryuu-no-rondo/"
    },
    {
        "id": 707,
        "title": "Cuticle Detective Inaba",
        "href": "https://www.animeforce.it/anime/cuticle-detective-inaba/"
    },
    {
        "id": 709,
        "title": "Cutie Honey Universe",
        "href": "https://www.animeforce.it/anime/cutie-honey-universe/"
    },
    {
        "id": 711,
        "title": "D-Frag!",
        "href": "https://www.animeforce.it/anime/d-frag/"
    },
    {
        "id": 713,
        "title": "D.Gray-man Hallow",
        "href": "https://www.animeforce.it/anime/d-gray-man-hallow/"
    },
    {
        "id": 715,
        "title": "D4DJ: First Mix",
        "href": "https://www.animeforce.it/anime/d4dj-first-mix/"
    },
    {
        "id": 717,
        "title": "D_Cide Traumerei the Animation",
        "href": "https://www.animeforce.it/anime/d_cide-traumerei-the-animation/"
    },
    {
        "id": 719,
        "title": "Da Capo (Prima Stagione)",
        "href": "https://www.animeforce.it/anime/da-capo-prima-stagione/"
    },
    {
        "id": 721,
        "title": "Da Capo (Seconda Stagione)",
        "href": "https://www.animeforce.it/anime/capo-seconda-stagione/"
    },
    {
        "id": 723,
        "title": "Da Capo II (Prima Stagione)",
        "href": "https://www.animeforce.it/anime/capo-ii-stagione/"
    },
    {
        "id": 725,
        "title": "Da Capo II (Seconda Stagione)",
        "href": "https://www.animeforce.it/anime/capo-ii-seconda-stagione/"
    },
    {
        "id": 727,
        "title": "Da Capo III",
        "href": "https://www.animeforce.it/anime/da-capo-iii/"
    },
    {
        "id": 729,
        "title": "Dagashi Kashi",
        "href": "https://www.animeforce.it/anime/dagashi-kashi/"
    },
    {
        "id": 731,
        "title": "Dagashi Kashi 2",
        "href": "https://www.animeforce.it/anime/dagashi-kashi-2/"
    },
    {
        "id": 733,
        "title": "Daitoshokan no Hitsujikai",
        "href": "https://www.animeforce.it/anime/daitoshokan-no-hitsujikai/"
    },
    {
        "id": 735,
        "title": "Dakara Boku wa, H ga Dekinai",
        "href": "https://www.animeforce.it/anime/dakara-boku-wa-h-ga-dekinai/"
    },
    {
        "id": 737,
        "title": "Dakaretai Otoko 1-i ni Odosarete Imasu.",
        "href": "https://www.animeforce.it/anime/dakaretai-otoko-1-ni-odosarete-imasu/"
    },
    {
        "id": 739,
        "title": "Dame x Prince Anime Caravan",
        "href": "https://www.animeforce.it/anime/dame-x-prince-anime-caravan/"
    },
    {
        "id": 741,
        "title": "Dance with Devils",
        "href": "https://www.animeforce.it/anime/dance-with-devils/"
    },
    {
        "id": 743,
        "title": "Danchigai",
        "href": "https://www.animeforce.it/anime/danchigai/"
    },
    {
        "id": 745,
        "title": "Danganronpa 3: Kibou-hen",
        "href": "https://www.animeforce.it/anime/danganronpa-3-kibou-hen/"
    },
    {
        "id": 747,
        "title": "Danganronpa 3: Mirai-hen",
        "href": "https://www.animeforce.it/anime/danganronpa-3-mirai-hen/"
    },
    {
        "id": 749,
        "title": "Danganronpa 3: Zetsubou-hen",
        "href": "https://www.animeforce.it/anime/danganronpa-3-zetsubou-hen/"
    },
    {
        "id": 751,
        "title": "Danganronpa: The Animation",
        "href": "https://www.animeforce.it/anime/danganronpa-the-animation/"
    },
    {
        "id": 753,
        "title": "DanMachi",
        "href": "https://www.animeforce.it/anime/danmachi/"
    },
    {
        "id": 755,
        "title": "DanMachi Gaiden: Sword Oratoria",
        "href": "https://www.animeforce.it/anime/danmachi-gaiden-sword-oratoria/"
    },
    {
        "id": 757,
        "title": "DanMachi II",
        "href": "https://www.animeforce.it/anime/danmachi-ii/"
    },
    {
        "id": 759,
        "title": "DanMachi II OAV",
        "href": "https://www.animeforce.it/anime/danmachi-ii-oav/"
    },
    {
        "id": 761,
        "title": "DanMachi III",
        "href": "https://www.animeforce.it/anime/danmachi-iii/"
    },
    {
        "id": 763,
        "title": "DanMachi Movie: Orion no Ya",
        "href": "https://www.animeforce.it/anime/danmachi-movie-orion-no-ya/"
    },
    {
        "id": 765,
        "title": "Danna ga Nani o Itteiru ka Wakaranai Ken",
        "href": "https://www.animeforce.it/anime/danna-ga-nani-itteiru-ka-wakaranai-ken/"
    },
    {
        "id": 767,
        "title": "Danna ga Nani o Itteiru ka Wakaranai Ken 2",
        "href": "https://www.animeforce.it/anime/danna-ga-nani-itteiru-ka-wakaranai-ken-2/"
    },
    {
        "id": 769,
        "title": "Dansai Bunri No Crime Edge",
        "href": "https://www.animeforce.it/anime/dansai-bunri-no-crime-edge/"
    },
    {
        "id": 771,
        "title": "Danshi Koukousei no Nichijou",
        "href": "https://www.animeforce.it/anime/danshi-koukousei-no-nichijou/"
    },
    {
        "id": 773,
        "title": "Dantalian No Shoka",
        "href": "https://www.animeforce.it/anime/dantalian-no-shoka/"
    },
    {
        "id": 775,
        "title": "Darker than Black: Kuro no Keiyakusha",
        "href": "https://www.animeforce.it/anime/darker-than-black-kuro-no-keiyakusha/"
    },
    {
        "id": 777,
        "title": "Darling in the FranXX",
        "href": "https://www.animeforce.it/anime/darling-the-franxx/"
    },
    {
        "id": 779,
        "title": "Darwin’s Game",
        "href": "https://www.animeforce.it/anime/darwins-game/"
    },
    {
        "id": 781,
        "title": "Date A Bullet: Dead or Bullet",
        "href": "https://www.animeforce.it/anime/date-a-bullet-dead-or-bullet/"
    },
    {
        "id": 783,
        "title": "Date A Bullet: Nightmare or Queen",
        "href": "https://www.animeforce.it/anime/date-bullet-nightmare-or-queen/"
    },
    {
        "id": 785,
        "title": "Date A Live",
        "href": "https://www.animeforce.it/anime/date-a-live/"
    },
    {
        "id": 787,
        "title": "Date A Live II",
        "href": "https://www.animeforce.it/anime/date-live-ii/"
    },
    {
        "id": 789,
        "title": "Date A Live III",
        "href": "https://www.animeforce.it/anime/date-live-iii/"
    },
    {
        "id": 791,
        "title": "Date A Live Movie: Mayuri Judgment",
        "href": "https://www.animeforce.it/anime/date-live-movie-mayuri-judgment/"
    },
    {
        "id": 793,
        "title": "Days",
        "href": "https://www.animeforce.it/anime/days/"
    },
    {
        "id": 795,
        "title": "DearS",
        "href": "https://www.animeforce.it/anime/dears/"
    },
    {
        "id": 797,
        "title": "Death March Kara Hajimaru Isekai Kyousoukyoku",
        "href": "https://www.animeforce.it/anime/death-march-kara-hajimaru-isekai-kyousoukyoku/"
    },
    {
        "id": 799,
        "title": "Death Parade",
        "href": "https://www.animeforce.it/anime/death-parade/"
    },
    {
        "id": 801,
        "title": "Deatte 5-byou de Battle",
        "href": "https://www.animeforce.it/anime/deatte-5-byou-de-battle/"
    },
    {
        "id": 803,
        "title": "Deca-Dence",
        "href": "https://www.animeforce.it/anime/deca-dence/"
    },
    {
        "id": 805,
        "title": "Deep Insanity: The Lost Child",
        "href": "https://www.animeforce.it/anime/deep-insanity-the-lost-child/"
    },
    {
        "id": 807,
        "title": "Deji Meets Girl",
        "href": "https://www.animeforce.it/anime/deji-meets-girl/"
    },
    {
        "id": 809,
        "title": "Demi-chan wa Kataritai",
        "href": "https://www.animeforce.it/anime/demi-chan-wa-kataritai/"
    },
    {
        "id": 811,
        "title": "Denkigai no Honya-san",
        "href": "https://www.animeforce.it/anime/denkigai-no-honya-san/"
    },
    {
        "id": 813,
        "title": "Denpa Onna To Seishun Otoko",
        "href": "https://www.animeforce.it/anime/denpa-onna-to-seishun-otoko/"
    },
    {
        "id": 815,
        "title": "Devil Survivor 2 The Animation",
        "href": "https://www.animeforce.it/anime/devil-survivor-2-the-animation/"
    },
    {
        "id": 817,
        "title": "Devilman: Crybaby",
        "href": "https://www.animeforce.it/anime/devilman-crybaby/"
    },
    {
        "id": 819,
        "title": "Devils Line",
        "href": "https://www.animeforce.it/anime/devils-line/"
    },
    {
        "id": 821,
        "title": "Diabolik Lovers",
        "href": "https://www.animeforce.it/anime/diabolik-lovers/"
    },
    {
        "id": 823,
        "title": "Diabolik Lovers More, Blood",
        "href": "https://www.animeforce.it/anime/diabolik-lovers-more-blood/"
    },
    {
        "id": 825,
        "title": "Dies Irae",
        "href": "https://www.animeforce.it/anime/dies-irae/"
    },
    {
        "id": 827,
        "title": "Dies Irae: To the Ring Reincarnation",
        "href": "https://www.animeforce.it/anime/dies-irae-to-the-ring-reincarnation/"
    },
    {
        "id": 829,
        "title": "Digimon Adventure (2020)",
        "href": "https://www.animeforce.it/anime/digimon-adventure-2020/"
    },
    {
        "id": 831,
        "title": "Digimon Adventure tri.",
        "href": "https://www.animeforce.it/anime/digimon-adventure-tri/"
    },
    {
        "id": 833,
        "title": "Digimon Ghost Game",
        "href": "https://www.animeforce.it/anime/digimon-ghost-game/"
    },
    {
        "id": 835,
        "title": "Dimension W",
        "href": "https://www.animeforce.it/anime/dimension-w/"
    },
    {
        "id": 837,
        "title": "Dive!!",
        "href": "https://www.animeforce.it/anime/dive/"
    },
    {
        "id": 839,
        "title": "Divine Gate",
        "href": "https://www.animeforce.it/anime/divine-gate/"
    },
    {
        "id": 841,
        "title": "Dog Days",
        "href": "https://www.animeforce.it/anime/dog-days/"
    },
    {
        "id": 843,
        "title": "Dog Days 2",
        "href": "https://www.animeforce.it/anime/dog-days-2/"
    },
    {
        "id": 845,
        "title": "Dog Days 3",
        "href": "https://www.animeforce.it/anime/dog-days-3/"
    },
    {
        "id": 847,
        "title": "Dogeza de Tanondemita",
        "href": "https://www.animeforce.it/anime/dogeza-de-tanondemita/"
    },
    {
        "id": 849,
        "title": "Dokyuu Hentai HxEros",
        "href": "https://www.animeforce.it/anime/dokyuu-hentai-hxeros/"
    },
    {
        "id": 851,
        "title": "Domestic na Kanojo",
        "href": "https://www.animeforce.it/anime/domestic-na-kanojo/"
    },
    {
        "id": 853,
        "title": "Donten ni Warau",
        "href": "https://www.animeforce.it/anime/donten-ni-warau/"
    },
    {
        "id": 855,
        "title": "Dorei-ku The Animation",
        "href": "https://www.animeforce.it/anime/dorei-ku-the-animation/"
    },
    {
        "id": 857,
        "title": "Dorohedoro",
        "href": "https://www.animeforce.it/anime/dorohedoro/"
    },
    {
        "id": 859,
        "title": "Dororo",
        "href": "https://www.animeforce.it/anime/dororo/"
    },
    {
        "id": 861,
        "title": "Double Decker! Doug & Kirill",
        "href": "https://www.animeforce.it/anime/double-decker-doug-kirill/"
    },
    {
        "id": 863,
        "title": "Doukyonin wa Hiza, Tokidoki, Atama no Ue.",
        "href": "https://www.animeforce.it/anime/doukyonin-wa-hiza-tokidoki-atama-no-ue/"
    },
    {
        "id": 865,
        "title": "Dounika Naru Hibi",
        "href": "https://www.animeforce.it/anime/dounika-naru-hibi/"
    },
    {
        "id": 867,
        "title": "Dr. Stone",
        "href": "https://www.animeforce.it/anime/dr-stone/"
    },
    {
        "id": 869,
        "title": "Dr. Stone: Stone Wars",
        "href": "https://www.animeforce.it/anime/dr-stone-stone-wars/"
    },
    {
        "id": 871,
        "title": "Dragon Ball Super",
        "href": "https://www.animeforce.it/anime/dragon-ball-super/"
    },
    {
        "id": 873,
        "title": "Dragon Crisis!",
        "href": "https://www.animeforce.it/anime/dragon-crisis/"
    },
    {
        "id": 875,
        "title": "Dragon Quest: Dai no Daibouken (2020)",
        "href": "https://www.animeforce.it/anime/dragon-quest-dai-no-daibouken-2020/"
    },
    {
        "id": 877,
        "title": "Dragon, Ie wo Kau.",
        "href": "https://www.animeforce.it/anime/dragon-ie-wo-kau/"
    },
    {
        "id": 879,
        "title": "Dragonaut: The Resonance",
        "href": "https://www.animeforce.it/anime/dragonaut-the-resonance/"
    },
    {
        "id": 881,
        "title": "DRAMAtical Murder",
        "href": "https://www.animeforce.it/anime/dramatical-murder/"
    },
    {
        "id": 883,
        "title": "Drifters",
        "href": "https://www.animeforce.it/anime/drifters/"
    },
    {
        "id": 885,
        "title": "Dumbbell Nan Kilo Moteru?",
        "href": "https://www.animeforce.it/anime/dumbbell-nan-kilo-moteru/"
    },
    {
        "id": 887,
        "title": "Durarara!!",
        "href": "https://www.animeforce.it/anime/durarara/"
    },
    {
        "id": 889,
        "title": "Durarara!!x2 Ketsu",
        "href": "https://www.animeforce.it/anime/durararax2-ketsu/"
    },
    {
        "id": 891,
        "title": "Durarara!!x2 Shou",
        "href": "https://www.animeforce.it/anime/durararax2-shou/"
    },
    {
        "id": 893,
        "title": "Durarara!!x2 Ten",
        "href": "https://www.animeforce.it/anime/durararax2-ten/"
    },
    {
        "id": 895,
        "title": "Dynamic Chord",
        "href": "https://www.animeforce.it/anime/dynamic-chord/"
    },
    {
        "id": 897,
        "title": "Eden",
        "href": "https://www.animeforce.it/anime/eden/"
    },
    {
        "id": 899,
        "title": "Edens Zero",
        "href": "https://www.animeforce.it/anime/edens-zero/"
    },
    {
        "id": 901,
        "title": "Egao no Daika",
        "href": "https://www.animeforce.it/anime/egao-no-daika/"
    },
    {
        "id": 903,
        "title": "Eizouken ni wa Te wo Dasu na!",
        "href": "https://www.animeforce.it/anime/eizouken-ni-wa-wo-dasu-na/"
    },
    {
        "id": 905,
        "title": "elDLIVE",
        "href": "https://www.animeforce.it/anime/eldlive/"
    },
    {
        "id": 907,
        "title": "Elfen Lied",
        "href": "https://www.animeforce.it/anime/elfen-lied/"
    },
    {
        "id": 909,
        "title": "Elsword: El Lady",
        "href": "https://www.animeforce.it/anime/elsword-el-lady/"
    },
    {
        "id": 911,
        "title": "Emiya-san Chi no Kyou no Gohan",
        "href": "https://www.animeforce.it/anime/emiya-san-no-kyou-no-gohan/"
    },
    {
        "id": 913,
        "title": "Endride",
        "href": "https://www.animeforce.it/anime/endride/"
    },
    {
        "id": 915,
        "title": "Endro~!",
        "href": "https://www.animeforce.it/anime/endro/"
    },
    {
        "id": 917,
        "title": "Enen no Shouboutai",
        "href": "https://www.animeforce.it/anime/enen-no-shouboutai/"
    },
    {
        "id": 919,
        "title": "Enen no Shouboutai: Ni no Shou",
        "href": "https://www.animeforce.it/anime/enen-no-shouboutai-ni-no-shou/"
    },
    {
        "id": 921,
        "title": "Enmusubi no Youko-chan",
        "href": "https://www.animeforce.it/anime/enmusubi-no-youko-chan/"
    },
    {
        "id": 923,
        "title": "Eromanga-sensei",
        "href": "https://www.animeforce.it/anime/eromanga-sensei/"
    },
    {
        "id": 925,
        "title": "Etotama: Eto Tamashii",
        "href": "https://www.animeforce.it/anime/etotama-eto-tamashii/"
    },
    {
        "id": 927,
        "title": "Eureka Seven AO",
        "href": "https://www.animeforce.it/anime/eureka-seven-ao/"
    },
    {
        "id": 929,
        "title": "Evil or Live",
        "href": "https://www.animeforce.it/anime/evil-or-live/"
    },
    {
        "id": 931,
        "title": "Ex-Arm",
        "href": "https://www.animeforce.it/anime/ex-arm/"
    },
    {
        "id": 933,
        "title": "Eyeshield 21",
        "href": "https://www.animeforce.it/anime/eyeshield-21/"
    },
    {
        "id": 935,
        "title": "Fairy Gone",
        "href": "https://www.animeforce.it/anime/fairy-gone/"
    },
    {
        "id": 937,
        "title": "Fairy Gone 2",
        "href": "https://www.animeforce.it/anime/fairy-gone-2/"
    },
    {
        "id": 939,
        "title": "Fairy Ranmaru: Anata no Kokoro Otasuke Shimasu",
        "href": "https://www.animeforce.it/anime/fairy-ranmaru-anata-no-kokoro-otasuke-shimasu/"
    },
    {
        "id": 941,
        "title": "Fairy Tail",
        "href": "https://www.animeforce.it/anime/fairy-tail/"
    },
    {
        "id": 943,
        "title": "Fairy Tail Final Series",
        "href": "https://www.animeforce.it/anime/fairy-tail-final-season/"
    },
    {
        "id": 945,
        "title": "Fairy Tail Movie 1: Houou no Miko",
        "href": "https://www.animeforce.it/anime/fairy-tail-movie-1-houou-no-miko/"
    },
    {
        "id": 947,
        "title": "Fairy Tail Movie 2: Dragon Cry",
        "href": "https://www.animeforce.it/anime/fairy-tail-movie-2-dragon-cry/"
    },
    {
        "id": 949,
        "title": "Fairy Tail S2",
        "href": "https://www.animeforce.it/anime/fairy-tail-s2/"
    },
    {
        "id": 951,
        "title": "Fantasista Doll",
        "href": "https://www.animeforce.it/anime/fantasista-doll/"
    },
    {
        "id": 953,
        "title": "Fate/Apocrypha",
        "href": "https://www.animeforce.it/anime/fateapocrypha/"
    },
    {
        "id": 955,
        "title": "Fate/Extra Last Encore",
        "href": "https://www.animeforce.it/anime/fateextra-last-encore/"
    },
    {
        "id": 957,
        "title": "Fate/Extra Last Encore – Irusterias Tendousetsu",
        "href": "https://www.animeforce.it/anime/fateextra-last-encore-irusterias-tendousetsu/"
    },
    {
        "id": 959,
        "title": "Fate/Grand Carnival",
        "href": "https://www.animeforce.it/anime/fategrand-carnival/"
    },
    {
        "id": 961,
        "title": "Fate/Grand Order: First Order",
        "href": "https://www.animeforce.it/anime/fategrand-order-first-order/"
    },
    {
        "id": 963,
        "title": "Fate/Grand Order: Himuro no Tenchi – 7-nin no Saikyou Ijin-hen",
        "href": "https://www.animeforce.it/anime/fategrand-order-himuro-no-tenchi-7-nin-no-saikyou-ijin-hen/"
    },
    {
        "id": 965,
        "title": "Fate/Grand Order: Moonlight/Lostroom",
        "href": "https://www.animeforce.it/anime/fategrand-order-moonlightlostroom/"
    },
    {
        "id": 967,
        "title": "Fate/Grand Order: Zettai Majuu Sensen Babylonia",
        "href": "https://www.animeforce.it/anime/fategrand-order-zettai-majuu-sensen-babylonia/"
    },
    {
        "id": 969,
        "title": "Fate/Kaleid Liner Prisma Illya",
        "href": "https://www.animeforce.it/anime/fatekaleid-liner-prisma-illya/"
    },
    {
        "id": 971,
        "title": "Fate/Kaleid Liner Prisma Illya 2wei Herz!",
        "href": "https://www.animeforce.it/anime/fatekaleid-liner-prisma-illya-2wei-herz/"
    },
    {
        "id": 973,
        "title": "Fate/Kaleid Liner Prisma Illya 2wei!",
        "href": "https://www.animeforce.it/anime/fatekaleid-liner-prisma-illya-2wei/"
    },
    {
        "id": 975,
        "title": "Fate/Kaleid Liner Prisma Illya 3rei!!",
        "href": "https://www.animeforce.it/anime/fatekaleid-liner-prisma-illya-3rei/"
    },
    {
        "id": 977,
        "title": "Fate/Kaleid Liner Prisma Illya: Prisma Phantasm",
        "href": "https://www.animeforce.it/anime/fatekaleid-liner-prisma-illya-prisma-phantasm/"
    },
    {
        "id": 979,
        "title": "Fate/Prototype",
        "href": "https://www.animeforce.it/anime/fateprototype/"
    },
    {
        "id": 981,
        "title": "Fate/Stay Night",
        "href": "https://www.animeforce.it/anime/fatestay-night/"
    },
    {
        "id": 983,
        "title": "Fate/Stay Night: Unlimited Blade Works",
        "href": "https://www.animeforce.it/anime/fatestay-night-unlimited-blade-works/"
    },
    {
        "id": 985,
        "title": "Fate/Stay Night: Unlimited Blade Works 2",
        "href": "https://www.animeforce.it/anime/fatestay-night-unlimited-blade-works-2/"
    },
    {
        "id": 987,
        "title": "Fate/Stay Night: Unlimited Blade Works 2 – Sunny Day",
        "href": "https://www.animeforce.it/anime/fatestay-night-unlimited-blade-works-2-sunny-day/"
    },
    {
        "id": 989,
        "title": "Fate/Stay Night: Unlimited Blade Works Movie",
        "href": "https://www.animeforce.it/anime/fatestay-night-unlimited-blade-works-movie/"
    },
    {
        "id": 991,
        "title": "Fate/Zero",
        "href": "https://www.animeforce.it/anime/fatezero/"
    },
    {
        "id": 993,
        "title": "Fight League: Gear Gadget Generators",
        "href": "https://www.animeforce.it/anime/fight-league-gear-gadget-generators/"
    },
    {
        "id": 995,
        "title": "Final Approach",
        "href": "https://www.animeforce.it/anime/final-approach/"
    },
    {
        "id": 997,
        "title": "Flip Flappers",
        "href": "https://www.animeforce.it/anime/flip-flappers/"
    },
    {
        "id": 999,
        "title": "Flying Witch",
        "href": "https://www.animeforce.it/anime/flying-witch/"
    },
    {
        "id": 1001,
        "title": "Fortune Arterial",
        "href": "https://www.animeforce.it/anime/fortune-arterial/"
    },
    {
        "id": 1003,
        "title": "Fractale",
        "href": "https://www.animeforce.it/anime/fractale/"
    },
    {
        "id": 1005,
        "title": "Fragtime",
        "href": "https://www.animeforce.it/anime/fragtime/"
    },
    {
        "id": 1007,
        "title": "Frame Arms Girl",
        "href": "https://www.animeforce.it/anime/frame-arms-girl/"
    },
    {
        "id": 1009,
        "title": "Free!",
        "href": "https://www.animeforce.it/anime/free/"
    },
    {
        "id": 1011,
        "title": "Free! Dive to the Future",
        "href": "https://www.animeforce.it/anime/free-dive-to-the-future/"
    },
    {
        "id": 1013,
        "title": "Free! Eternal Summer",
        "href": "https://www.animeforce.it/anime/free-eternal-summer/"
    },
    {
        "id": 1015,
        "title": "Freezing",
        "href": "https://www.animeforce.it/anime/freezing/"
    },
    {
        "id": 1017,
        "title": "Freezing Vibration",
        "href": "https://www.animeforce.it/anime/freezing-vibration/"
    },
    {
        "id": 1019,
        "title": "Fruits Basket 1st Season",
        "href": "https://www.animeforce.it/anime/fruits-basket-1st-season/"
    },
    {
        "id": 1021,
        "title": "Fruits Basket 2nd Season",
        "href": "https://www.animeforce.it/anime/fruits-basket-2nd-season/"
    },
    {
        "id": 1023,
        "title": "Fruits Basket: The Final",
        "href": "https://www.animeforce.it/anime/fruits-basket-the-final/"
    },
    {
        "id": 1025,
        "title": "Fudanshi Koukou Seikatsu",
        "href": "https://www.animeforce.it/anime/fudanshi-koukou-seikatsu/"
    },
    {
        "id": 1027,
        "title": "Fugou Keiji: Balance:Unlimited",
        "href": "https://www.animeforce.it/anime/fugou-keiji-balanceunlimited/"
    },
    {
        "id": 1029,
        "title": "Fukigen na Mononokean",
        "href": "https://www.animeforce.it/anime/fukigen-na-mononokean/"
    },
    {
        "id": 1031,
        "title": "Fukigen na Mononokean Tsuzuki",
        "href": "https://www.animeforce.it/anime/fukigen-na-mononokean-tsuzuki/"
    },
    {
        "id": 1033,
        "title": "Fukumenkei Noise",
        "href": "https://www.animeforce.it/anime/fukumenkei-noise/"
    },
    {
        "id": 1035,
        "title": "Full Metal Panic! Invisible Victory",
        "href": "https://www.animeforce.it/anime/full-metal-panic-invisible-victory/"
    },
    {
        "id": 1037,
        "title": "Fumetsu no Anata e",
        "href": "https://www.animeforce.it/anime/fumetsu-no-anata-e/"
    },
    {
        "id": 1039,
        "title": "Fumikiri Jikan",
        "href": "https://www.animeforce.it/anime/fumikiri-jikan/"
    },
    {
        "id": 1041,
        "title": "Fune wo Amu",
        "href": "https://www.animeforce.it/anime/fune-wo-amu/"
    },
    {
        "id": 1043,
        "title": "Fushigi na Somera-chan",
        "href": "https://www.animeforce.it/anime/fushigi-na-somera-chan/"
    },
    {
        "id": 1045,
        "title": "Futari wa Milky Holmes",
        "href": "https://www.animeforce.it/anime/futari-wa-milky-holmes/"
    },
    {
        "id": 1047,
        "title": "Fuuka",
        "href": "https://www.animeforce.it/anime/fuuka/"
    },
    {
        "id": 1049,
        "title": "Fuuun Ishin Dai Shogun",
        "href": "https://www.animeforce.it/anime/fuuun-ishin-dai-shogun/"
    },
    {
        "id": 1051,
        "title": "Ga-Rei: Zero",
        "href": "https://www.animeforce.it/anime/ga-rei-zero/"
    },
    {
        "id": 1053,
        "title": "Gabriel DropOut",
        "href": "https://www.animeforce.it/anime/gabriel-dropout/"
    },
    {
        "id": 1055,
        "title": "Gaikotsu Shotenin Honda-san",
        "href": "https://www.animeforce.it/anime/gaikotsu-shotenin-honda-san/"
    },
    {
        "id": 1057,
        "title": "Gakkou Gurashi!",
        "href": "https://www.animeforce.it/anime/gakkou-gurashi/"
    },
    {
        "id": 1059,
        "title": "Gakuen Babysitters",
        "href": "https://www.animeforce.it/anime/gakuen-babysitters/"
    },
    {
        "id": 1061,
        "title": "Gakuen Handsome",
        "href": "https://www.animeforce.it/anime/gakuen-handsome/"
    },
    {
        "id": 1063,
        "title": "Gakusen Toshi Asterisk",
        "href": "https://www.animeforce.it/anime/gakusen-toshi-asterisk/"
    },
    {
        "id": 1065,
        "title": "Gakusen Toshi Asterisk 2",
        "href": "https://www.animeforce.it/anime/gakusen-toshi-asterisk-2/"
    },
    {
        "id": 1067,
        "title": "Gal to Kyouryuu",
        "href": "https://www.animeforce.it/anime/gal-to-kyouryuu/"
    },
    {
        "id": 1069,
        "title": "Galilei Donna",
        "href": "https://www.animeforce.it/anime/galilei-donna/"
    },
    {
        "id": 1071,
        "title": "Gamers!",
        "href": "https://www.animeforce.it/anime/gamers/"
    },
    {
        "id": 1073,
        "title": "Ganbare Douki-chan",
        "href": "https://www.animeforce.it/anime/ganbare-douki-chan/"
    },
    {
        "id": 1075,
        "title": "Gangsta.",
        "href": "https://www.animeforce.it/anime/gangsta/"
    },
    {
        "id": 1077,
        "title": "Garo: Divine Flame",
        "href": "https://www.animeforce.it/anime/garo-divine-flame/"
    },
    {
        "id": 1079,
        "title": "Garo: Guren no Tsuki",
        "href": "https://www.animeforce.it/anime/garo-guren-no-tsuki/"
    },
    {
        "id": 1081,
        "title": "Garo: Honoo no Kokuin",
        "href": "https://www.animeforce.it/anime/garo-honoo-no-kokuin/"
    },
    {
        "id": 1083,
        "title": "Garo: Vanishing Line",
        "href": "https://www.animeforce.it/anime/garo-vanishing-line/"
    },
    {
        "id": 1085,
        "title": "Gatchaman Crowds",
        "href": "https://www.animeforce.it/anime/gatchaman-crowds/"
    },
    {
        "id": 1087,
        "title": "Gatchaman Crowds Insight",
        "href": "https://www.animeforce.it/anime/gatchaman-crowds-insight/"
    },
    {
        "id": 1089,
        "title": "Gate",
        "href": "https://www.animeforce.it/anime/gate/"
    },
    {
        "id": 1091,
        "title": "Gate 2",
        "href": "https://www.animeforce.it/anime/gate-2/"
    },
    {
        "id": 1093,
        "title": "Gegege no Kitarou (2018)",
        "href": "https://www.animeforce.it/anime/gegege-no-kitarou-2018-sub-ita/"
    },
    {
        "id": 1095,
        "title": "Gekidol",
        "href": "https://www.animeforce.it/anime/gekidol/"
    },
    {
        "id": 1097,
        "title": "Gekkan Shoujo Nozaki-kun",
        "href": "https://www.animeforce.it/anime/gekkan-shoujo-nozaki-kun/"
    },
    {
        "id": 1099,
        "title": "Genjitsu Shugi Yuusha no Oukoku Saikenki",
        "href": "https://www.animeforce.it/anime/genjitsu-shugi-yuusha-no-oukoku-saikenki/"
    },
    {
        "id": 1101,
        "title": "Getsuyoubi no Tawawa",
        "href": "https://www.animeforce.it/anime/getsuyoubi-no-tawawa/"
    },
    {
        "id": 1103,
        "title": "Getsuyoubi no Tawawa 2",
        "href": "https://www.animeforce.it/anime/getsuyoubi-no-tawawa-2/"
    },
    {
        "id": 1105,
        "title": "Getter Robo Arc",
        "href": "https://www.animeforce.it/anime/getter-robo-arc/"
    },
    {
        "id": 1107,
        "title": "Giant Killing",
        "href": "https://www.animeforce.it/anime/giant-killing/"
    },
    {
        "id": 1109,
        "title": "Gibiate",
        "href": "https://www.animeforce.it/anime/gibiate/"
    },
    {
        "id": 1111,
        "title": "Gift: Eternal Rainbow",
        "href": "https://www.animeforce.it/anime/gift-eternal-rainbow/"
    },
    {
        "id": 1113,
        "title": "Gin no Guardian",
        "href": "https://www.animeforce.it/anime/gin-no-guardian/"
    },
    {
        "id": 1115,
        "title": "Gin no Guardian 2",
        "href": "https://www.animeforce.it/anime/gin-no-guardian-2/"
    },
    {
        "id": 1117,
        "title": "Ginban Kaleidoscope",
        "href": "https://www.animeforce.it/anime/ginban-kaleidoscope/"
    },
    {
        "id": 1119,
        "title": "Ginga Eiyuu Densetsu: Die Neue These – Kaikou",
        "href": "https://www.animeforce.it/anime/ginga-eiyuu-densetsu-die-neue-these-kaikou/"
    },
    {
        "id": 1121,
        "title": "Gintama (2017)",
        "href": "https://www.animeforce.it/anime/gintama-2017/"
    },
    {
        "id": 1123,
        "title": "Gintama: Porori-hen",
        "href": "https://www.animeforce.it/anime/gintama-porori-hen/"
    },
    {
        "id": 1125,
        "title": "Gintama: Shirogane no Tamashii-hen",
        "href": "https://www.animeforce.it/anime/gintama-shirogane-no-tamashii-hen/"
    },
    {
        "id": 1127,
        "title": "Gintama: Shirogane no Tamashii-hen 2",
        "href": "https://www.animeforce.it/anime/gintama-shirogane-no-tamashii-hen-2/"
    },
    {
        "id": 1129,
        "title": "Girlfriend (Kari)",
        "href": "https://www.animeforce.it/anime/girlfriend-kari/"
    },
    {
        "id": 1131,
        "title": "Girlish Number",
        "href": "https://www.animeforce.it/anime/girlish-number/"
    },
    {
        "id": 1133,
        "title": "Girls und Panzer",
        "href": "https://www.animeforce.it/anime/girls-und-panzer/"
    },
    {
        "id": 1135,
        "title": "Girls und Panzer: Saishuushou",
        "href": "https://www.animeforce.it/anime/girls-und-panzer-saishuushou/"
    },
    {
        "id": 1137,
        "title": "Girly Air Force",
        "href": "https://www.animeforce.it/anime/girly-air-force/"
    },
    {
        "id": 1139,
        "title": "Given",
        "href": "https://www.animeforce.it/anime/given/"
    },
    {
        "id": 1141,
        "title": "Given Movie",
        "href": "https://www.animeforce.it/anime/given-movie/"
    },
    {
        "id": 1143,
        "title": "GJ-bu",
        "href": "https://www.animeforce.it/anime/gj-bu/"
    },
    {
        "id": 1145,
        "title": "Glass no Hana to Kowasu Sekai",
        "href": "https://www.animeforce.it/anime/glass-no-hana-to-kowasu-sekai/"
    },
    {
        "id": 1147,
        "title": "Glasslip",
        "href": "https://www.animeforce.it/anime/glasslip/"
    },
    {
        "id": 1149,
        "title": "Gleipnir",
        "href": "https://www.animeforce.it/anime/gleipnir/"
    },
    {
        "id": 1151,
        "title": "Go! Go! 575",
        "href": "https://www.animeforce.it/anime/go-go-575/"
    },
    {
        "id": 1153,
        "title": "Goblin Slayer",
        "href": "https://www.animeforce.it/anime/goblin-slayer/"
    },
    {
        "id": 1155,
        "title": "Goblin Slayer: Goblin’s Crown",
        "href": "https://www.animeforce.it/anime/goblin-slayer-goblins-crown/"
    },
    {
        "id": 1157,
        "title": "Gochuumon wa Usagi Desu ka?",
        "href": "https://www.animeforce.it/anime/gochuumon-wa-usagi-desu-ka/"
    },
    {
        "id": 1159,
        "title": "Gochuumon wa Usagi Desu ka? 2",
        "href": "https://www.animeforce.it/anime/gochuumon-wa-usagi-desu-ka-2/"
    },
    {
        "id": 1161,
        "title": "Gochuumon wa Usagi Desu ka? Bloom",
        "href": "https://www.animeforce.it/anime/gochuumon-wa-usagi-desu-ka-bloom/"
    },
    {
        "id": 1163,
        "title": "Gochuumon wa Usagi Desu ka??: Dear My Sister",
        "href": "https://www.animeforce.it/anime/gochuumon-wa-usagi-desu-ka-dear-my-sister/"
    },
    {
        "id": 1165,
        "title": "Gochuumon wa Usagi Desu ka??: Sing for You",
        "href": "https://www.animeforce.it/anime/gochuumon-wa-usagi-desu-ka-sing-for-you/"
    },
    {
        "id": 1167,
        "title": "God Eater",
        "href": "https://www.animeforce.it/anime/god-eater/"
    },
    {
        "id": 1169,
        "title": "Godzilla: S.P",
        "href": "https://www.animeforce.it/anime/godzilla-s-p/"
    },
    {
        "id": 1171,
        "title": "Gokukoku no Brynhildr",
        "href": "https://www.animeforce.it/anime/gokukoku-no-brynhildr/"
    },
    {
        "id": 1173,
        "title": "Gokushufudou",
        "href": "https://www.animeforce.it/anime/gokushufudou/"
    },
    {
        "id": 1175,
        "title": "Golden Kamuy",
        "href": "https://www.animeforce.it/anime/golden-kamuy/"
    },
    {
        "id": 1177,
        "title": "Golden Kamuy 2",
        "href": "https://www.animeforce.it/anime/golden-kamuy-2/"
    },
    {
        "id": 1179,
        "title": "Golden Kamuy 3",
        "href": "https://www.animeforce.it/anime/golden-kamuy-3/"
    },
    {
        "id": 1181,
        "title": "Golden Time",
        "href": "https://www.animeforce.it/anime/golden-time/"
    },
    {
        "id": 1183,
        "title": "Goshuushou-sama Ninomiya-kun",
        "href": "https://www.animeforce.it/anime/goshuushou-sama-ninomiya-kun/"
    },
    {
        "id": 1185,
        "title": "Gosick",
        "href": "https://www.animeforce.it/anime/gosick/"
    },
    {
        "id": 1187,
        "title": "Granbelm",
        "href": "https://www.animeforce.it/anime/granbelm/"
    },
    {
        "id": 1189,
        "title": "Granblue Fantasy The Animation",
        "href": "https://www.animeforce.it/anime/granblue-fantasy-the-animation/"
    },
    {
        "id": 1191,
        "title": "Granblue Fantasy The Animation 2",
        "href": "https://www.animeforce.it/anime/granblue-fantasy-the-animation-2/"
    },
    {
        "id": 1193,
        "title": "Grancrest Senki",
        "href": "https://www.animeforce.it/anime/grancrest-senki/"
    },
    {
        "id": 1195,
        "title": "Grand Blue",
        "href": "https://www.animeforce.it/anime/grand-blue/"
    },
    {
        "id": 1197,
        "title": "Great Pretender",
        "href": "https://www.animeforce.it/anime/great-pretender/"
    },
    {
        "id": 1199,
        "title": "Grimms Notes The Animation",
        "href": "https://www.animeforce.it/anime/grimms-notes-the-animation/"
    },
    {
        "id": 1201,
        "title": "Grisaia no Kajitsu",
        "href": "https://www.animeforce.it/anime/grisaia-no-kajitsu/"
    },
    {
        "id": 1203,
        "title": "Grisaia no Meikyuu",
        "href": "https://www.animeforce.it/anime/grisaia-no-meikyuu/"
    },
    {
        "id": 1205,
        "title": "Grisaia no Rakuen",
        "href": "https://www.animeforce.it/anime/grisaia-no-rakuen/"
    },
    {
        "id": 1207,
        "title": "Grisaia Phantom Trigger The Animation",
        "href": "https://www.animeforce.it/anime/grisaia-phantom-trigger-the-animation/"
    },
    {
        "id": 1209,
        "title": "Gugure! Kokkuri-san",
        "href": "https://www.animeforce.it/anime/gugure-kokkuri-san/"
    },
    {
        "id": 1211,
        "title": "Guilty Crown",
        "href": "https://www.animeforce.it/anime/guilty-crown/"
    },
    {
        "id": 1213,
        "title": "Gundam Build Divers",
        "href": "https://www.animeforce.it/anime/gundam-build-divers/"
    },
    {
        "id": 1215,
        "title": "Gundam Build Divers Re:Rise",
        "href": "https://www.animeforce.it/anime/gundam-build-divers-rerise/"
    },
    {
        "id": 1217,
        "title": "Gundam Build Divers Re:Rise 2",
        "href": "https://www.animeforce.it/anime/gundam-build-divers-rerise-2/"
    },
    {
        "id": 1219,
        "title": "Gundam Build Fighters",
        "href": "https://www.animeforce.it/anime/gundam-build-fighters/"
    },
    {
        "id": 1221,
        "title": "Gundam Build Fighters Try",
        "href": "https://www.animeforce.it/anime/gundam-build-fighters-try/"
    },
    {
        "id": 1223,
        "title": "Gundam: G no Reconguista",
        "href": "https://www.animeforce.it/anime/gundam-g-no-reconguista/"
    },
    {
        "id": 1225,
        "title": "Gunjou no Magmel",
        "href": "https://www.animeforce.it/anime/gunjou-no-magmel/"
    },
    {
        "id": 1227,
        "title": "Gunslinger Stratos: The Animation",
        "href": "https://www.animeforce.it/anime/gunslinger-stratos-the-animation/"
    },
    {
        "id": 1229,
        "title": "Guraburu!",
        "href": "https://www.animeforce.it/anime/guraburu/"
    },
    {
        "id": 1231,
        "title": "Gurazeni",
        "href": "https://www.animeforce.it/anime/gurazeni/"
    },
    {
        "id": 1233,
        "title": "Gurazeni 2",
        "href": "https://www.animeforce.it/anime/gurazeni-2/"
    },
    {
        "id": 1235,
        "title": "Gyakusatsu Kikan",
        "href": "https://www.animeforce.it/anime/gyakusatsu-kikan/"
    },
    {
        "id": 1237,
        "title": "Gyakuten Saiban",
        "href": "https://www.animeforce.it/anime/gyakuten-saiban/"
    },
    {
        "id": 1239,
        "title": "Gyakuten Saiban 2",
        "href": "https://www.animeforce.it/anime/gyakuten-saiban-2/"
    },
    {
        "id": 1241,
        "title": "Gyo",
        "href": "https://www.animeforce.it/anime/gyo/"
    },
    {
        "id": 1243,
        "title": "H2O: Footprints in the Sand",
        "href": "https://www.animeforce.it/anime/h2o-footprints-the-sand/"
    },
    {
        "id": 1245,
        "title": "Hachi-nan tte, Sore wa Nai deshou!",
        "href": "https://www.animeforce.it/anime/hachi-nan-tte-sore-wa-nai-deshou/"
    },
    {
        "id": 1247,
        "title": "Hachigatsu no Cinderella Nine",
        "href": "https://www.animeforce.it/anime/hachigatsu-no-cinderella-nine/"
    },
    {
        "id": 1249,
        "title": "Hacka Doll The Animation",
        "href": "https://www.animeforce.it/anime/hacka-doll-the-animation/"
    },
    {
        "id": 1251,
        "title": "Hagure Yuusha no Estetica",
        "href": "https://www.animeforce.it/anime/hagure-yusha-no-estetica/"
    },
    {
        "id": 1253,
        "title": "Hai to Gensou no Grimgar",
        "href": "https://www.animeforce.it/anime/to-gensou-no-grimgar/"
    },
    {
        "id": 1255,
        "title": "Haikyuu!!",
        "href": "https://www.animeforce.it/anime/haikyuu/"
    },
    {
        "id": 1257,
        "title": "Haikyuu!! 2",
        "href": "https://www.animeforce.it/anime/haikyuu-2/"
    },
    {
        "id": 1259,
        "title": "Haikyuu!! 3",
        "href": "https://www.animeforce.it/anime/haikyuu-3/"
    },
    {
        "id": 1261,
        "title": "Haikyuu!!: Riku vs. Kuu",
        "href": "https://www.animeforce.it/anime/haikyuu-riku-vs-kuu/"
    },
    {
        "id": 1263,
        "title": "Haikyuu!!: To the Top",
        "href": "https://www.animeforce.it/anime/haikyuu-to-the-top/"
    },
    {
        "id": 1265,
        "title": "Haikyuu!!: To the Top 2",
        "href": "https://www.animeforce.it/anime/haikyuu-to-the-top-2/"
    },
    {
        "id": 1267,
        "title": "Haiyore! Nyaruko-san",
        "href": "https://www.animeforce.it/anime/haiyore-nyaruko-san/"
    },
    {
        "id": 1269,
        "title": "Haiyore! Nyaruko-san F",
        "href": "https://www.animeforce.it/anime/haiyore-nyaruko-san-f/"
    },
    {
        "id": 1271,
        "title": "Haiyore! Nyaruko-san W",
        "href": "https://www.animeforce.it/anime/haiyore-nyaruko-san-w/"
    },
    {
        "id": 1273,
        "title": "Hajime no Ippo – New Challenger",
        "href": "https://www.animeforce.it/anime/hajime-no-ippo-new-challenger/"
    },
    {
        "id": 1275,
        "title": "Hajime no Ippo – The Fighting",
        "href": "https://www.animeforce.it/anime/hajime-no-ippo-the-fighting/"
    },
    {
        "id": 1277,
        "title": "Hajime no Ippo: The Fighting! – Rising",
        "href": "https://www.animeforce.it/anime/hajime-no-ippo-the-fighting-rising/"
    },
    {
        "id": 1279,
        "title": "Hajimete no Gal",
        "href": "https://www.animeforce.it/anime/hajimete-no-gal/"
    },
    {
        "id": 1281,
        "title": "Hakata Mentai! Pirikarako-chan",
        "href": "https://www.animeforce.it/anime/hakata-mentai-pirikarako-chan/"
    },
    {
        "id": 1283,
        "title": "Hakata Tonkotsu Ramens",
        "href": "https://www.animeforce.it/anime/hakata-tonkotsu-ramens/"
    },
    {
        "id": 1285,
        "title": "Hakkenden: Touhou Hakken Ibun",
        "href": "https://www.animeforce.it/anime/hakkenden-touhou-hakken-ibun/"
    },
    {
        "id": 1287,
        "title": "Hakkenden: Touhou Hakken Ibun 2",
        "href": "https://www.animeforce.it/anime/hakkenden-touhou-hakken-ibun-2/"
    },
    {
        "id": 1289,
        "title": "Hakubo",
        "href": "https://www.animeforce.it/anime/hakubo/"
    },
    {
        "id": 1291,
        "title": "Hakumei no Tsubasa",
        "href": "https://www.animeforce.it/anime/hakumei-no-tsubasa/"
    },
    {
        "id": 1293,
        "title": "Hakumei to Mikochi",
        "href": "https://www.animeforce.it/anime/hakumei-to-mikochi/"
    },
    {
        "id": 1295,
        "title": "Hakushaku to Yousei",
        "href": "https://www.animeforce.it/anime/hakushaku-to-yousei/"
    },
    {
        "id": 1297,
        "title": "Hakyuu Houshin Engi",
        "href": "https://www.animeforce.it/anime/hakyuu-houshin-engi/"
    },
    {
        "id": 1299,
        "title": "HAL",
        "href": "https://www.animeforce.it/anime/hal/"
    },
    {
        "id": 1301,
        "title": "Hamatora",
        "href": "https://www.animeforce.it/anime/hamatora/"
    },
    {
        "id": 1303,
        "title": "Hanamonogatari",
        "href": "https://www.animeforce.it/anime/hanamonogatari/"
    },
    {
        "id": 1305,
        "title": "Hanasaku Iroha",
        "href": "https://www.animeforce.it/anime/hanasaku-iroha/"
    },
    {
        "id": 1307,
        "title": "Hanasaku Iroha: Home Sweet Home",
        "href": "https://www.animeforce.it/anime/hanasaku-iroha-home-sweet-home/"
    },
    {
        "id": 1309,
        "title": "Hanaukyo Maid Tai",
        "href": "https://www.animeforce.it/anime/hanaukyo-maid-tai/"
    },
    {
        "id": 1311,
        "title": "Hanaukyo Maid Tai: La Verite",
        "href": "https://www.animeforce.it/anime/hanaukyo-maid-tai-la-verite/"
    },
    {
        "id": 1313,
        "title": "Hanayamata",
        "href": "https://www.animeforce.it/anime/hanayamata/"
    },
    {
        "id": 1315,
        "title": "Hanbun no Tsuki ga Noboru Sora",
        "href": "https://www.animeforce.it/anime/hanbun-no-tsuki-ga-noboru-sora/"
    },
    {
        "id": 1317,
        "title": "Hand Shakers",
        "href": "https://www.animeforce.it/anime/hand-shakers/"
    },
    {
        "id": 1319,
        "title": "Handa-kun",
        "href": "https://www.animeforce.it/anime/handa-kun/"
    },
    {
        "id": 1321,
        "title": "Hanebado!",
        "href": "https://www.animeforce.it/anime/hanebado/"
    },
    {
        "id": 1323,
        "title": "Hangyakusei Million Arthur",
        "href": "https://www.animeforce.it/anime/hangyakusei-million-arthur/"
    },
    {
        "id": 1325,
        "title": "Hangyakusei Million Arthur 2",
        "href": "https://www.animeforce.it/anime/hangyakusei-million-arthur-2/"
    },
    {
        "id": 1327,
        "title": "Hanyou no Yashahime: Sengoku Otogizoushi",
        "href": "https://www.animeforce.it/anime/hanyou-no-yashahime/"
    },
    {
        "id": 1329,
        "title": "Hanyou no Yashahime: Sengoku Otogizoushi – Ni no Shou",
        "href": "https://www.animeforce.it/anime/hanyou-no-yashahime-sengoku-otogizoushi-ni-no-shou/"
    },
    {
        "id": 1331,
        "title": "Happiness!",
        "href": "https://www.animeforce.it/anime/happiness/"
    },
    {
        "id": 1333,
        "title": "Happy Sugar Life",
        "href": "https://www.animeforce.it/anime/happy-sugar-life/"
    },
    {
        "id": 1335,
        "title": "Harmony",
        "href": "https://www.animeforce.it/anime/harmony/"
    },
    {
        "id": 1337,
        "title": "Haruchika",
        "href": "https://www.animeforce.it/anime/haruchika/"
    },
    {
        "id": 1339,
        "title": "Harukana Receive",
        "href": "https://www.animeforce.it/anime/harukana-receive/"
    },
    {
        "id": 1341,
        "title": "Hashiri Tsuzukete Yokattatte",
        "href": "https://www.animeforce.it/anime/hashiri-tsuzukete-yokattatte/"
    },
    {
        "id": 1343,
        "title": "Hataage! Kemono Michi",
        "href": "https://www.animeforce.it/anime/hataage-kemono-michi/"
    },
    {
        "id": 1345,
        "title": "Hataraku Maou-sama!",
        "href": "https://www.animeforce.it/anime/hataraku-maou-sama/"
    },
    {
        "id": 1347,
        "title": "Hataraku Saibou",
        "href": "https://www.animeforce.it/anime/hataraku-saibou/"
    },
    {
        "id": 1349,
        "title": "Hataraku Saibou 2",
        "href": "https://www.animeforce.it/anime/hataraku-saibou-2/"
    },
    {
        "id": 1351,
        "title": "Hataraku Saibou Black",
        "href": "https://www.animeforce.it/anime/hataraku-saibou-black/"
    },
    {
        "id": 1353,
        "title": "Hatena Illusion",
        "href": "https://www.animeforce.it/anime/hatena-illusion/"
    },
    {
        "id": 1355,
        "title": "Hatsukoi Limited",
        "href": "https://www.animeforce.it/anime/hatsukoi-limited/"
    },
    {
        "id": 1357,
        "title": "Hatsukoi Monster",
        "href": "https://www.animeforce.it/anime/hatsukoi-monster/"
    },
    {
        "id": 1359,
        "title": "Heavy Object",
        "href": "https://www.animeforce.it/anime/heavy-object/"
    },
    {
        "id": 1361,
        "title": "Heike Monogatari",
        "href": "https://www.animeforce.it/anime/heike-monogatari/"
    },
    {
        "id": 1363,
        "title": "Heion Sedai no Idaten-tachi",
        "href": "https://www.animeforce.it/anime/heion-sedai-no-idaten-tachi/"
    },
    {
        "id": 1365,
        "title": "Hello!! Kiniro Mosaic",
        "href": "https://www.animeforce.it/anime/hello-kiniro-mosaic/"
    },
    {
        "id": 1367,
        "title": "Hentai Ouji to Warawanai Neko",
        "href": "https://www.animeforce.it/anime/hentai-ouji-to-warawanai-neko/"
    },
    {
        "id": 1369,
        "title": "Hetalia World★Stars",
        "href": "https://www.animeforce.it/anime/hetalia-world%e2%98%85stars/"
    },
    {
        "id": 1371,
        "title": "Heya Camp△",
        "href": "https://www.animeforce.it/anime/heya-camp-%e2%96%b3/"
    },
    {
        "id": 1373,
        "title": "Hibike! Euphonium",
        "href": "https://www.animeforce.it/anime/hibike-euphonium/"
    },
    {
        "id": 1375,
        "title": "Hibike! Euphonium 2",
        "href": "https://www.animeforce.it/anime/hibike-euphonium-2/"
    },
    {
        "id": 1377,
        "title": "Hibike! Euphonium Movie 3: Chikai no Finale",
        "href": "https://www.animeforce.it/anime/hibike-euphonium-movie-3-chikai-no-finale/"
    },
    {
        "id": 1379,
        "title": "Hidan no Aria",
        "href": "https://www.animeforce.it/anime/hidan-no-aria/"
    },
    {
        "id": 1381,
        "title": "Hidan no Aria AA",
        "href": "https://www.animeforce.it/anime/hidan-no-aria-aa/"
    },
    {
        "id": 1383,
        "title": "Higashi no Eden",
        "href": "https://www.animeforce.it/anime/higashi-no-eden/"
    },
    {
        "id": 1385,
        "title": "Hige wo Soru. Soshite Joshikousei wo Hirou.",
        "href": "https://www.animeforce.it/anime/hige-wo-soru-soshite-joshikousei-wo-hirou/"
    },
    {
        "id": 1387,
        "title": "High School DxD",
        "href": "https://www.animeforce.it/anime/high-school-dxd/"
    },
    {
        "id": 1389,
        "title": "High School DxD BorN",
        "href": "https://www.animeforce.it/anime/high-school-dxd-born/"
    },
    {
        "id": 1391,
        "title": "High School DxD Hero",
        "href": "https://www.animeforce.it/anime/high-school-dxd-hero/"
    },
    {
        "id": 1393,
        "title": "High School DxD New",
        "href": "https://www.animeforce.it/anime/high-school-dxd-new/"
    },
    {
        "id": 1395,
        "title": "High School Fleet",
        "href": "https://www.animeforce.it/anime/high-school-fleet/"
    },
    {
        "id": 1397,
        "title": "High Score Girl II",
        "href": "https://www.animeforce.it/anime/high-score-girl-ii/"
    },
    {
        "id": 1399,
        "title": "Highschool of the Dead",
        "href": "https://www.animeforce.it/anime/highschool-of-the-dead/"
    },
    {
        "id": 1401,
        "title": "Higurashi no Naku Koro ni",
        "href": "https://www.animeforce.it/anime/higurashi-no-naku-koro-ni/"
    },
    {
        "id": 1403,
        "title": "Higurashi no Naku Koro ni Gou",
        "href": "https://www.animeforce.it/anime/higurashi-no-naku-koro-ni-gou/"
    },
    {
        "id": 1405,
        "title": "Higurashi no Naku Koro ni Kai",
        "href": "https://www.animeforce.it/anime/higurashi-no-naku-koro-ni-kai/"
    },
    {
        "id": 1407,
        "title": "Higurashi no Naku Koro ni Kira",
        "href": "https://www.animeforce.it/anime/higurashi-no-naku-koro-ni-kira/"
    },
    {
        "id": 1409,
        "title": "Higurashi no Naku Koro ni Rei",
        "href": "https://www.animeforce.it/anime/higurashi-no-naku-koro-ni-rei/"
    },
    {
        "id": 1411,
        "title": "Higurashi no Naku Koro ni Sotsu",
        "href": "https://www.animeforce.it/anime/higurashi-no-naku-koro-ni-sotsu/"
    },
    {
        "id": 1413,
        "title": "Hikaru no Go",
        "href": "https://www.animeforce.it/anime/hikaru-no-go/"
    },
    {
        "id": 1415,
        "title": "Himegoto",
        "href": "https://www.animeforce.it/anime/himegoto/"
    },
    {
        "id": 1417,
        "title": "Himote House",
        "href": "https://www.animeforce.it/anime/himote-house/"
    },
    {
        "id": 1419,
        "title": "Himouto! Umaru-chan",
        "href": "https://www.animeforce.it/anime/himouto-umaru-chan/"
    },
    {
        "id": 1421,
        "title": "Himouto! Umaru-chan R",
        "href": "https://www.animeforce.it/anime/himouto-umaru-chan-r/"
    },
    {
        "id": 1423,
        "title": "Hina Logi: From Luck & Logic",
        "href": "https://www.animeforce.it/anime/hina-logi-from-luck-logic/"
    },
    {
        "id": 1425,
        "title": "Hinako Note",
        "href": "https://www.animeforce.it/anime/hinako-note/"
    },
    {
        "id": 1427,
        "title": "Hinamatsuri",
        "href": "https://www.animeforce.it/anime/hinamatsuri/"
    },
    {
        "id": 1429,
        "title": "Hinomaru Zumou",
        "href": "https://www.animeforce.it/anime/hinomaru-zumou/"
    },
    {
        "id": 1431,
        "title": "Hisone to Masotan",
        "href": "https://www.animeforce.it/anime/hisone-to-masotan/"
    },
    {
        "id": 1433,
        "title": "Hitori no Shita: The Outcast",
        "href": "https://www.animeforce.it/anime/hitori-no-shita-the-outcast/"
    },
    {
        "id": 1435,
        "title": "Hitori no Shita: The Outcast 2",
        "href": "https://www.animeforce.it/anime/hitori-no-shita-the-outcast-2/"
    },
    {
        "id": 1437,
        "title": "Hitoribocchi no Marumaru Seikatsu",
        "href": "https://www.animeforce.it/anime/hitoribocchi-no-marumaru-seikatsu/"
    },
    {
        "id": 1439,
        "title": "Hitorijime My Hero",
        "href": "https://www.animeforce.it/anime/hitorijime-my-hero/"
    },
    {
        "id": 1441,
        "title": "Hitsugi no Chaika",
        "href": "https://www.animeforce.it/anime/hitsugi-no-chaika/"
    },
    {
        "id": 1443,
        "title": "Hitsugi no Chaika: Avenging Battle",
        "href": "https://www.animeforce.it/anime/hitsugi-no-chaika-avenging-battle/"
    },
    {
        "id": 1445,
        "title": "Honzuki no Gekokujou",
        "href": "https://www.animeforce.it/anime/honzuki-no-gekokujou/"
    },
    {
        "id": 1447,
        "title": "Honzuki no Gekokujou 2",
        "href": "https://www.animeforce.it/anime/honzuki-no-gekokujou-2/"
    },
    {
        "id": 1449,
        "title": "Hoozuki no Reitetsu",
        "href": "https://www.animeforce.it/anime/hoozuki-no-reitetsu/"
    },
    {
        "id": 1451,
        "title": "Hoozuki no Reitetsu 2",
        "href": "https://www.animeforce.it/anime/hoozuki-no-reitetsu-2/"
    },
    {
        "id": 1453,
        "title": "Hora, Mimi ga Mieteru yo!",
        "href": "https://www.animeforce.it/anime/hora-mimi-ga-mieteru-yo/"
    },
    {
        "id": 1455,
        "title": "Hora, Mimi ga Mieteru yo! 2",
        "href": "https://www.animeforce.it/anime/hora-mimi-ga-mieteru-yo-2/"
    },
    {
        "id": 1457,
        "title": "Hori-san to Miyamura-kun",
        "href": "https://www.animeforce.it/anime/hori-san-to-miyamura-kun/"
    },
    {
        "id": 1459,
        "title": "Horimiya",
        "href": "https://www.animeforce.it/anime/horimiya/"
    },
    {
        "id": 1461,
        "title": "Hortensia Saga",
        "href": "https://www.animeforce.it/anime/hortensia-saga/"
    },
    {
        "id": 1463,
        "title": "Hoshiai no Sora",
        "href": "https://www.animeforce.it/anime/hoshiai-no-sora/"
    },
    {
        "id": 1465,
        "title": "Hoshizora e Kakaru Hashi",
        "href": "https://www.animeforce.it/anime/hoshizora-kakaru-hashi/"
    },
    {
        "id": 1467,
        "title": "Houkago no Pleiades",
        "href": "https://www.animeforce.it/anime/houkago-no-pleiades/"
    },
    {
        "id": 1469,
        "title": "Houkago Saikoro Club",
        "href": "https://www.animeforce.it/anime/houkago-saikoro-club/"
    },
    {
        "id": 1471,
        "title": "Houkago Teibou Nisshi",
        "href": "https://www.animeforce.it/anime/houkago-teibou-nisshi/"
    },
    {
        "id": 1473,
        "title": "Hourou Musuko",
        "href": "https://www.animeforce.it/anime/hourou-musuko/"
    },
    {
        "id": 1475,
        "title": "Houseki no Kuni",
        "href": "https://www.animeforce.it/anime/houseki-no-kuni/"
    },
    {
        "id": 1477,
        "title": "Housekishou Richard-shi no Nazo Kantei",
        "href": "https://www.animeforce.it/anime/housekishou-richard-shi-no-nazo-kantei/"
    },
    {
        "id": 1479,
        "title": "Hundred",
        "href": "https://www.animeforce.it/anime/hundred/"
    },
    {
        "id": 1481,
        "title": "Hunter x Hunter (2011)",
        "href": "https://www.animeforce.it/anime/hunter-x-hunter-2011/"
    },
    {
        "id": 1483,
        "title": "Hyakka Ryouran: Samurai After",
        "href": "https://www.animeforce.it/anime/hyakka-ryouran-samurai-after/"
    },
    {
        "id": 1485,
        "title": "Hyakka Ryouran: Samurai Bride",
        "href": "https://www.animeforce.it/anime/hyakka-ryouran-samurai-bride/"
    },
    {
        "id": 1487,
        "title": "Hyakka Ryouran: Samurai Girls",
        "href": "https://www.animeforce.it/anime/hyakka-ryouran-samurai-girls/"
    },
    {
        "id": 1489,
        "title": "Hyakuren no Haou to Seiyaku no Valkyria",
        "href": "https://www.animeforce.it/anime/hyakuren-no-haou-to-seiyaku-no-valkyria/"
    },
    {
        "id": 1491,
        "title": "Hyouka",
        "href": "https://www.animeforce.it/anime/hyouka/"
    },
    {
        "id": 1493,
        "title": "Hyperdimension Neptunia The Animation",
        "href": "https://www.animeforce.it/anime/hyperdimension-neptunia-the-animation/"
    },
    {
        "id": 1495,
        "title": "Ichiban Ushiro no Daimaou",
        "href": "https://www.animeforce.it/anime/ichiban-ushiro-no-daimaou/"
    },
    {
        "id": 1497,
        "title": "Ichigo 100%",
        "href": "https://www.animeforce.it/anime/ichigo-100/"
    },
    {
        "id": 1499,
        "title": "ID:Invaded",
        "href": "https://www.animeforce.it/anime/idinvaded/"
    },
    {
        "id": 1501,
        "title": "Idol Jihen",
        "href": "https://www.animeforce.it/anime/idol-jihen/"
    },
    {
        "id": 1503,
        "title": "IDOLiSH7",
        "href": "https://www.animeforce.it/anime/idolish7/"
    },
    {
        "id": 1505,
        "title": "IDOLiSH7: Second Beat!",
        "href": "https://www.animeforce.it/anime/idolish7-second-beat/"
    },
    {
        "id": 1507,
        "title": "IDOLiSH7: Third Beat!",
        "href": "https://www.animeforce.it/anime/idolish7-third-beat/"
    },
    {
        "id": 1509,
        "title": "Idolls!",
        "href": "https://www.animeforce.it/anime/idolls/"
    },
    {
        "id": 1511,
        "title": "Idoly Pride",
        "href": "https://www.animeforce.it/anime/idoly-pride/"
    },
    {
        "id": 1513,
        "title": "Ijiranaide, Nagatoro-san",
        "href": "https://www.animeforce.it/anime/ijiranaide-nagatoro-san/"
    },
    {
        "id": 1515,
        "title": "Ikebukuro West Gate Park",
        "href": "https://www.animeforce.it/anime/ikebukuro-west-gate-park/"
    },
    {
        "id": 1517,
        "title": "Ikkitousen",
        "href": "https://www.animeforce.it/anime/ikkitousen/"
    },
    {
        "id": 1519,
        "title": "Ikkitousen: Dragon Destiny",
        "href": "https://www.animeforce.it/anime/ikkitousen-dragon-destiny/"
    },
    {
        "id": 1521,
        "title": "Ikkitousen: Extravaganza Epoch",
        "href": "https://www.animeforce.it/anime/ikkitousen-extravaganza-epoch/"
    },
    {
        "id": 1523,
        "title": "Ikkitousen: Great Guardians",
        "href": "https://www.animeforce.it/anime/ikkitousen-great-guardians/"
    },
    {
        "id": 1525,
        "title": "Ikkitousen: Shuugaku Toushi Keppuuroku",
        "href": "https://www.animeforce.it/anime/ikkitousen-shuugaku-toushi-keppuuroku-oav-episodio-1/"
    },
    {
        "id": 1527,
        "title": "Ikkitousen: Xtreme Xecutor",
        "href": "https://www.animeforce.it/anime/ikkitousen-xtreme-xecutor/"
    },
    {
        "id": 1529,
        "title": "Imouto sae Ireba Ii.",
        "href": "https://www.animeforce.it/anime/imouto-sae-ireba-ii/"
    },
    {
        "id": 1531,
        "title": "Inari, Konkon, Koi Iroha.",
        "href": "https://www.animeforce.it/anime/inari-konkon-koi-iroha/"
    },
    {
        "id": 1533,
        "title": "Inazuma Eleven: Ares no Tenbin",
        "href": "https://www.animeforce.it/anime/inazuma-eleven-ares-no-tenbin/"
    },
    {
        "id": 1535,
        "title": "Inazuma Eleven: Orion no Kokuin",
        "href": "https://www.animeforce.it/anime/inazuma-eleven-orion-no-kokuin/"
    },
    {
        "id": 1537,
        "title": "Infini-T Force",
        "href": "https://www.animeforce.it/anime/infini-t-force/"
    },
    {
        "id": 1539,
        "title": "Infinite Dendrogram",
        "href": "https://www.animeforce.it/anime/infinite-dendrogram/"
    },
    {
        "id": 1541,
        "title": "Infinite Stratos",
        "href": "https://www.animeforce.it/anime/infinite-stratos/"
    },
    {
        "id": 1543,
        "title": "Infinite Stratos 2",
        "href": "https://www.animeforce.it/anime/infinite-stratos-2/"
    },
    {
        "id": 1545,
        "title": "Ingress the Animation",
        "href": "https://www.animeforce.it/anime/ingress-the-animation/"
    },
    {
        "id": 1547,
        "title": "Initial D First Stage",
        "href": "https://www.animeforce.it/anime/initial-d-first-stage/"
    },
    {
        "id": 1549,
        "title": "Initial D Second Stage",
        "href": "https://www.animeforce.it/anime/initial-d-second-stage/"
    },
    {
        "id": 1551,
        "title": "Inou Battle wa Nichijou-kei no Naka de",
        "href": "https://www.animeforce.it/anime/inou-battle-wa-nichijou-kei-no-naka-de/"
    },
    {
        "id": 1553,
        "title": "Inu To Hasami Wa Tsukaiyou",
        "href": "https://www.animeforce.it/anime/inu-to-hasami-wa-tsukaiyou/"
    },
    {
        "id": 1555,
        "title": "Inu x Boku SS",
        "href": "https://www.animeforce.it/anime/inu-x-boku-ss/"
    },
    {
        "id": 1557,
        "title": "Inugami-san to Nekoyama-san",
        "href": "https://www.animeforce.it/anime/inugami-san-to-nekoyama-san/"
    },
    {
        "id": 1559,
        "title": "Inukami!",
        "href": "https://www.animeforce.it/anime/inukami/"
    },
    {
        "id": 1561,
        "title": "Inuyashiki",
        "href": "https://www.animeforce.it/anime/inugami-san-to-nekoyama-san-sub-ita/"
    },
    {
        "id": 1563,
        "title": "Irozuku Sekai no Ashita kara",
        "href": "https://www.animeforce.it/anime/irozuku-sekai-no-ashita-kara/"
    },
    {
        "id": 1565,
        "title": "Isekai Cheat Magician",
        "href": "https://www.animeforce.it/anime/isekai-cheat-magician/"
    },
    {
        "id": 1567,
        "title": "Isekai Izakaya: Koto Aitheria no Izakaya Nobu",
        "href": "https://www.animeforce.it/anime/isekai-izakaya-koto-aitheria-no-izakaya-nobu/"
    },
    {
        "id": 1569,
        "title": "Isekai Maou to Shoukan Shoujo no Dorei Majutsu",
        "href": "https://www.animeforce.it/anime/isekai-maou-to-shoukan-shoujo-no-dorei-majutsu/"
    },
    {
        "id": 1571,
        "title": "Isekai Maou to Shoukan Shoujo no Dorei Majutsu 2",
        "href": "https://www.animeforce.it/anime/isekai-maou-to-shoukan-shoujo-no-dorei-majutsu-2/"
    },
    {
        "id": 1573,
        "title": "Isekai no Seikishi Monogatari",
        "href": "https://www.animeforce.it/anime/isekai-no-seikishi-monogatari/"
    },
    {
        "id": 1575,
        "title": "Isekai Quartet",
        "href": "https://www.animeforce.it/anime/isekai-quartet/"
    },
    {
        "id": 1577,
        "title": "Isekai Quartet 2",
        "href": "https://www.animeforce.it/anime/isekai-quartet-2/"
    },
    {
        "id": 1579,
        "title": "Isekai Shokudou",
        "href": "https://www.animeforce.it/anime/isekai-shokudou/"
    },
    {
        "id": 1581,
        "title": "Isekai Shokudou 2",
        "href": "https://www.animeforce.it/anime/isekai-shokudou-2/"
    },
    {
        "id": 1583,
        "title": "Isekai wa Smartphone to Tomo ni.",
        "href": "https://www.animeforce.it/anime/isekai-wa-smartphone-to-tomo-ni/"
    },
    {
        "id": 1585,
        "title": "Ishuzoku Reviewers",
        "href": "https://www.animeforce.it/anime/ishuzoku-reviewers/"
    },
    {
        "id": 1587,
        "title": "Island",
        "href": "https://www.animeforce.it/anime/island/"
    },
    {
        "id": 1589,
        "title": "Isshuukan Friends",
        "href": "https://www.animeforce.it/anime/isshuukan-friends/"
    },
    {
        "id": 1591,
        "title": "Isuca",
        "href": "https://www.animeforce.it/anime/isuca/"
    },
    {
        "id": 1593,
        "title": "It’s My Life",
        "href": "https://www.animeforce.it/anime/its-my-life/"
    },
    {
        "id": 1595,
        "title": "Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu",
        "href": "https://www.animeforce.it/anime/itai-no-wa-iya-nano-de-bougyoryoku-ni-kyokufuri-shitai-to-omoimasu/"
    },
    {
        "id": 1597,
        "title": "Itazura na Kiss",
        "href": "https://www.animeforce.it/anime/itazura-na-kiss/"
    },
    {
        "id": 1599,
        "title": "Ito Junji: Collection",
        "href": "https://www.animeforce.it/anime/ito-junji-collection/"
    },
    {
        "id": 1601,
        "title": "Itsudatte Bokura no Koi wa 10 Centi Datta.",
        "href": "https://www.animeforce.it/anime/itsudatte-bokura-no-koi-wa-10-centi-datta/"
    },
    {
        "id": 1603,
        "title": "Itsuka Tenma No Kuro Usagi",
        "href": "https://www.animeforce.it/anime/itsuka-tenma-no-kuro-usagi/"
    },
    {
        "id": 1605,
        "title": "Iwa Kakeru! Sport Climbing Girls",
        "href": "https://www.animeforce.it/anime/iwa-kakeru-sport-climbing-girls/"
    },
    {
        "id": 1607,
        "title": "Ixion Saga DT",
        "href": "https://www.animeforce.it/anime/ixion-saga-dt/"
    },
    {
        "id": 1609,
        "title": "I★Chu: Halfway Through the Idol",
        "href": "https://www.animeforce.it/anime/i%e2%98%85chu-halfway-through-the-idol/"
    },
    {
        "id": 1611,
        "title": "Jahy-sama wa Kujikenai!",
        "href": "https://www.animeforce.it/anime/jahy-sama-wa-kujikenai/"
    },
    {
        "id": 1613,
        "title": "Jaku-Chara Tomozaki-kun",
        "href": "https://www.animeforce.it/anime/jaku-chara-tomozaki-kun/"
    },
    {
        "id": 1615,
        "title": "Jashin-chan Dropkick",
        "href": "https://www.animeforce.it/anime/jashin-chan-dropkick/"
    },
    {
        "id": 1617,
        "title": "Jashin-chan Dropkick 2",
        "href": "https://www.animeforce.it/anime/jashin-chan-dropkick-2/"
    },
    {
        "id": 1619,
        "title": "Jibaku Shounen Hanako-kun",
        "href": "https://www.animeforce.it/anime/jibaku-shounen-hanako-kun/"
    },
    {
        "id": 1621,
        "title": "Jigoku Shoujo: Yoi no Togi",
        "href": "https://www.animeforce.it/anime/jigoku-shoujo-yoi-no-togi/"
    },
    {
        "id": 1623,
        "title": "Jikan no Shihaisha",
        "href": "https://www.animeforce.it/anime/jikan-no-shihaisha/"
    },
    {
        "id": 1625,
        "title": "Jikken-hin Kazoku: Creatures Family Days",
        "href": "https://www.animeforce.it/anime/jikken-hin-kazoku/"
    },
    {
        "id": 1627,
        "title": "Jimihen!!: Jimiko wo Kaechau Jun Isei Kouyuu!!",
        "href": "https://www.animeforce.it/anime/jimihen-jimiko-wo-kaechau-jun-isei-kouyuu/"
    },
    {
        "id": 1629,
        "title": "Jingai-san no Yome",
        "href": "https://www.animeforce.it/anime/jingai-san-no-yome/"
    },
    {
        "id": 1631,
        "title": "Jinsei",
        "href": "https://www.animeforce.it/anime/jinsei/"
    },
    {
        "id": 1633,
        "title": "Jitsu wa Watashi wa",
        "href": "https://www.animeforce.it/anime/jitsu-wa-watashi-wa/"
    },
    {
        "id": 1635,
        "title": "JK Meshi!",
        "href": "https://www.animeforce.it/anime/jk-meshi/"
    },
    {
        "id": 1637,
        "title": "Joker Game",
        "href": "https://www.animeforce.it/anime/joker-game/"
    },
    {
        "id": 1639,
        "title": "Jormungand",
        "href": "https://www.animeforce.it/anime/jormungand/"
    },
    {
        "id": 1641,
        "title": "Jormungand: Perfect Order",
        "href": "https://www.animeforce.it/anime/jormungand-perfect-order/"
    },
    {
        "id": 1643,
        "title": "Josee to Tora to Sakana-tachi",
        "href": "https://www.animeforce.it/anime/josee-to-tora-to-sakana-tachi/"
    },
    {
        "id": 1645,
        "title": "Joshi Ochi! 2-kai kara Onnanoko ga… Futte Kita!?",
        "href": "https://www.animeforce.it/anime/joshi-ochi-2-kai-kara-onnanoko-ga-futte-kita/"
    },
    {
        "id": 1647,
        "title": "Joshikausei",
        "href": "https://www.animeforce.it/anime/joshikausei/"
    },
    {
        "id": 1649,
        "title": "Joshikousei no Mudazukai",
        "href": "https://www.animeforce.it/anime/joshikousei-no-mudazukai/"
    },
    {
        "id": 1651,
        "title": "Joukamachi no Dandelion",
        "href": "https://www.animeforce.it/anime/joukamachi-no-dandelion/"
    },
    {
        "id": 1653,
        "title": "Jouran: The Princess of Snow and Blood",
        "href": "https://www.animeforce.it/anime/jouran-the-princess-of-snow-and-blood/"
    },
    {
        "id": 1655,
        "title": "Jujutsu Kaisen",
        "href": "https://www.animeforce.it/anime/jujutsu-kaisen/"
    },
    {
        "id": 1657,
        "title": "Junjou Romantica 3",
        "href": "https://www.animeforce.it/anime/junjou-romantica-3/"
    },
    {
        "id": 1659,
        "title": "Junketsu no Maria",
        "href": "https://www.animeforce.it/anime/junketsu-no-maria/"
    },
    {
        "id": 1661,
        "title": "Just Becuase!",
        "href": "https://www.animeforce.it/anime/just-becuase/"
    },
    {
        "id": 1663,
        "title": "Juuni Taisen",
        "href": "https://www.animeforce.it/anime/juuni-taisen/"
    },
    {
        "id": 1665,
        "title": "Juuou Mujin no Fafnir",
        "href": "https://www.animeforce.it/anime/juuou-mujin-no-fafnir/"
    },
    {
        "id": 1667,
        "title": "Juushinki Pandora",
        "href": "https://www.animeforce.it/anime/juushinki-pandora/"
    },
    {
        "id": 1669,
        "title": "K",
        "href": "https://www.animeforce.it/anime/k/"
    },
    {
        "id": 1671,
        "title": "K-ON!",
        "href": "https://www.animeforce.it/anime/k-on/"
    },
    {
        "id": 1673,
        "title": "K-On! Movie",
        "href": "https://www.animeforce.it/anime/k-on-movie/"
    },
    {
        "id": 1675,
        "title": "K-ON!! (Second Season)",
        "href": "https://www.animeforce.it/anime/k-second-season/"
    },
    {
        "id": 1677,
        "title": "K: Missing Kings",
        "href": "https://www.animeforce.it/anime/k-missing-kings/"
    },
    {
        "id": 1679,
        "title": "K: Return of Kings",
        "href": "https://www.animeforce.it/anime/k-return-of-kings/"
    },
    {
        "id": 1681,
        "title": "K: Seven Stories Movie 1 R:B Blaze",
        "href": "https://www.animeforce.it/anime/k-seven-stories-movie-1-rb-blaze/"
    },
    {
        "id": 1683,
        "title": "K: Seven Stories Movie 2 Side:Blue Tenrou no Gotoku",
        "href": "https://www.animeforce.it/anime/k-seven-stories-movie-2-sideblue-tenrou-no-gotoku/"
    },
    {
        "id": 1685,
        "title": "K: Seven Stories Movie 3 Side:Green Uwagaki Sekai",
        "href": "https://www.animeforce.it/anime/k-seven-stories-movie-3-sidegreen-uwagaki-sekai/"
    },
    {
        "id": 1687,
        "title": "Kabukibu!",
        "href": "https://www.animeforce.it/anime/kabukibu/"
    },
    {
        "id": 1689,
        "title": "Kabukichou Sherlock",
        "href": "https://www.animeforce.it/anime/kabukichou-sherlock/"
    },
    {
        "id": 1691,
        "title": "Kageki Shoujo!!",
        "href": "https://www.animeforce.it/anime/kageki-shoujo/"
    },
    {
        "id": 1693,
        "title": "Kaginado",
        "href": "https://www.animeforce.it/anime/kaginado/"
    },
    {
        "id": 1695,
        "title": "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen",
        "href": "https://www.animeforce.it/anime/kaguya-sama-wa-kokuraseta/"
    },
    {
        "id": 1697,
        "title": "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen 2",
        "href": "https://www.animeforce.it/anime/kaguya-sama-wa-kokurasetai-2/"
    },
    {
        "id": 1699,
        "title": "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen OAV",
        "href": "https://www.animeforce.it/anime/kaguya-sama-wa-kokurasetai-tensai-tachi-no-renai-zunousen-oav/"
    },
    {
        "id": 1701,
        "title": "Kai Byoui Ramune",
        "href": "https://www.animeforce.it/anime/kai-byoui-ramune/"
    },
    {
        "id": 1703,
        "title": "Kaibutsu Oujo",
        "href": "https://www.animeforce.it/anime/kaibutsu-oujo/"
    },
    {
        "id": 1705,
        "title": "Kaichou wa Maid-sama!",
        "href": "https://www.animeforce.it/anime/kaichou-wa-maid-sama/"
    },
    {
        "id": 1707,
        "title": "Kaifuku Jutsushi no Yarinaoshi",
        "href": "https://www.animeforce.it/anime/kaifuku-jutsushi-no-yarinaoshi/"
    },
    {
        "id": 1709,
        "title": "Kaizoku Oujo",
        "href": "https://www.animeforce.it/anime/kaizoku-oujo/"
    },
    {
        "id": 1711,
        "title": "Kakegurui",
        "href": "https://www.animeforce.it/anime/kakegurui/"
    },
    {
        "id": 1713,
        "title": "Kakegurui XX",
        "href": "https://www.animeforce.it/anime/kakegurui-xx/"
    },
    {
        "id": 1715,
        "title": "Kakuriyo no Yadomeshi",
        "href": "https://www.animeforce.it/anime/kakuriyo-no-yadomeshi/"
    },
    {
        "id": 1717,
        "title": "Kakushigoto",
        "href": "https://www.animeforce.it/anime/kakushigoto/"
    },
    {
        "id": 1719,
        "title": "Kami nomi zo Shiru Sekai",
        "href": "https://www.animeforce.it/anime/kami-nomi-zo-shiru-sekai/"
    },
    {
        "id": 1721,
        "title": "Kami nomi zo Shiru Sekai 2",
        "href": "https://www.animeforce.it/anime/kami-nomi-zo-shiru-sekai-2/"
    },
    {
        "id": 1723,
        "title": "Kami nomi zo Shiru Sekai 3",
        "href": "https://www.animeforce.it/anime/kami-nomi-zo-shiru-sekai-3/"
    },
    {
        "id": 1725,
        "title": "Kami-tachi ni Hirowareta Otoko",
        "href": "https://www.animeforce.it/anime/kami-tachi-ni-hirowareta-otoko/"
    },
    {
        "id": 1727,
        "title": "Kamigami no Asobi",
        "href": "https://www.animeforce.it/anime/kamigami-no-asobi/"
    },
    {
        "id": 1729,
        "title": "Kamisama Dolls",
        "href": "https://www.animeforce.it/anime/kamisama-dolls/"
    },
    {
        "id": 1731,
        "title": "Kamisama Hajimemashita",
        "href": "https://www.animeforce.it/anime/kamisama-hajimemashita/"
    },
    {
        "id": 1733,
        "title": "Kamisama Hajimemashita 2",
        "href": "https://www.animeforce.it/anime/kamisama-hajimemashita-2/"
    },
    {
        "id": 1735,
        "title": "Kamisama Hajimemashita: Kako-hen",
        "href": "https://www.animeforce.it/anime/kamisama-hajimemashita-kako-hen/"
    },
    {
        "id": 1737,
        "title": "Kamisama ni Natta hi",
        "href": "https://www.animeforce.it/anime/kamisama-ni-natta-hi/"
    },
    {
        "id": 1739,
        "title": "Kamisama no Inai Nichiyoubi",
        "href": "https://www.animeforce.it/anime/kamisama-no-inai-nichiyoubi/"
    },
    {
        "id": 1741,
        "title": "Kamisama no Memochou",
        "href": "https://www.animeforce.it/anime/kamisama-no-memochou/"
    },
    {
        "id": 1743,
        "title": "Kampfer",
        "href": "https://www.animeforce.it/anime/kampfer/"
    },
    {
        "id": 1745,
        "title": "Kanamemo",
        "href": "https://www.animeforce.it/anime/kanamemo/"
    },
    {
        "id": 1747,
        "title": "Kanata no Astra",
        "href": "https://www.animeforce.it/anime/kanata-no-astra/"
    },
    {
        "id": 1749,
        "title": "Kandagawa Jet Girls",
        "href": "https://www.animeforce.it/anime/kandagawa-jet-girls/"
    },
    {
        "id": 1751,
        "title": "Kanojo ga Flag o Oraretara",
        "href": "https://www.animeforce.it/anime/kanojo-ga-flag-oraretara/"
    },
    {
        "id": 1753,
        "title": "Kanojo mo Kanojo",
        "href": "https://www.animeforce.it/anime/kanojo-mo-kanojo/"
    },
    {
        "id": 1755,
        "title": "Kanojo, Okarishimasu",
        "href": "https://www.animeforce.it/anime/kanojo-okarishimasu/"
    },
    {
        "id": 1757,
        "title": "Kanokon",
        "href": "https://www.animeforce.it/anime/kanokon/"
    },
    {
        "id": 1759,
        "title": "Kanon",
        "href": "https://www.animeforce.it/anime/kanon-2006/"
    },
    {
        "id": 1761,
        "title": "Kantai Collection",
        "href": "https://www.animeforce.it/anime/kantai-collection/"
    },
    {
        "id": 1763,
        "title": "Kara no Kyoukai 1: Vista dall’Alto",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-vista-dallalto/"
    },
    {
        "id": 1765,
        "title": "Kara no Kyoukai 2: Indagine per omicidio (Prima Parte)",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-2-indagine-omicidio/"
    },
    {
        "id": 1767,
        "title": "Kara no Kyoukai 3: Sensazione residua di dolore",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-3-sensazione-residua-dolore/"
    },
    {
        "id": 1769,
        "title": "Kara no Kyoukai 4: Il santuario vuoto",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-4-santuario-vuoto/"
    },
    {
        "id": 1771,
        "title": "Kara no Kyoukai 5: Spirale di paradosso",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-5-spirale-paradosso/"
    },
    {
        "id": 1773,
        "title": "Kara no Kyoukai 6: Registrazione dell’oblio",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-6-registrazione-delloblio/"
    },
    {
        "id": 1775,
        "title": "Kara no Kyoukai 7: Remix",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-7-remix/"
    },
    {
        "id": 1777,
        "title": "Kara no Kyoukai 8: Indagine per omicidio (Seconda Parte)",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-8-indagine-omicidio-seconda-parte/"
    },
    {
        "id": 1779,
        "title": "Kara no Kyoukai 9: Epilogo",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-9-epilogo/"
    },
    {
        "id": 1781,
        "title": "Kara no Kyoukai: Mirai Fukuin",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-mirai-fukuin/"
    },
    {
        "id": 1783,
        "title": "Kara no Kyoukai: Mirai Fukuin – Extra Chorus",
        "href": "https://www.animeforce.it/anime/kara-no-kyoukai-mirai-fukuin-extra-chorus/"
    },
    {
        "id": 1785,
        "title": "Karakai Jouzu no Takagi-san",
        "href": "https://www.animeforce.it/anime/karakai-jouzu-no-takagi-san/"
    },
    {
        "id": 1787,
        "title": "Karakai Jouzu no Takagi-san 2",
        "href": "https://www.animeforce.it/anime/karakai-jouzu-no-takagi-san-2/"
    },
    {
        "id": 1789,
        "title": "Karakuri Circus",
        "href": "https://www.animeforce.it/anime/karakuri-circus/"
    },
    {
        "id": 1791,
        "title": "Karen Senki",
        "href": "https://www.animeforce.it/anime/karen-senki/"
    },
    {
        "id": 1793,
        "title": "Karin",
        "href": "https://www.animeforce.it/anime/karin/"
    },
    {
        "id": 1795,
        "title": "Karneval",
        "href": "https://www.animeforce.it/anime/karneval/"
    },
    {
        "id": 1797,
        "title": "Katanagatari",
        "href": "https://www.animeforce.it/anime/katanagatari/"
    },
    {
        "id": 1799,
        "title": "Katsugeki/Touken Ranbu",
        "href": "https://www.animeforce.it/anime/katsugekitouken-ranbu/"
    },
    {
        "id": 1801,
        "title": "Katsute Kami Datta Kemono-tachi e",
        "href": "https://www.animeforce.it/anime/katsute-kami-datta-kemono-tachi/"
    },
    {
        "id": 1803,
        "title": "Kawaikereba Hentai demo Suki ni Natte Kuremasu ka?",
        "href": "https://www.animeforce.it/anime/kawaikereba-hentai-demo-suki-ni-natte-kuremasu-ka/"
    },
    {
        "id": 1805,
        "title": "Kaze ga Tsuyoku Fuiteiru",
        "href": "https://www.animeforce.it/anime/kaze-ga-tsuyoku-fuiteiru/"
    },
    {
        "id": 1807,
        "title": "Keijo!!!!!!!!",
        "href": "https://www.animeforce.it/anime/keijo/"
    },
    {
        "id": 1809,
        "title": "Keishichou Tokumubu Tokushu Kyouakuhan Taisakushitsu Dainanaka: Tokunana",
        "href": "https://www.animeforce.it/anime/keishichou-tokumubu-tokushu-kyouakuhan-taisakushitsu-dainanaka-tokunana/"
    },
    {
        "id": 1811,
        "title": "Kekkai Sensen",
        "href": "https://www.animeforce.it/anime/kekkai-sensen/"
    },
    {
        "id": 1813,
        "title": "Kekkai Sensen & Beyond",
        "href": "https://www.animeforce.it/anime/kekkai-sensen-beyond/"
    },
    {
        "id": 1815,
        "title": "Kemono Friends",
        "href": "https://www.animeforce.it/anime/kemono-friends/"
    },
    {
        "id": 1817,
        "title": "Kemono Friends 2",
        "href": "https://www.animeforce.it/anime/kemono-friends-2/"
    },
    {
        "id": 1819,
        "title": "Kemono Jihen",
        "href": "https://www.animeforce.it/anime/kemono-jihen/"
    },
    {
        "id": 1821,
        "title": "Kemurikusa",
        "href": "https://www.animeforce.it/anime/kemurikusa/"
    },
    {
        "id": 1823,
        "title": "Ken En Ken: Aoki Kagayaki",
        "href": "https://www.animeforce.it/anime/ken-en-ken-aoki-kagayaki/"
    },
    {
        "id": 1825,
        "title": "Kenja no Mago",
        "href": "https://www.animeforce.it/anime/kenja-no-mago/"
    },
    {
        "id": 1827,
        "title": "Kenka Banchou Otome: Girl Beats Boys",
        "href": "https://www.animeforce.it/anime/kenka-banchou-otome-girl-beats-boys/"
    },
    {
        "id": 1829,
        "title": "Kenko Zenrakei Suieibu Umisho",
        "href": "https://www.animeforce.it/anime/kenko-zenrakei-suieibu-umisho/"
    },
    {
        "id": 1831,
        "title": "Kenzen Robo Daimidaler",
        "href": "https://www.animeforce.it/anime/kenzen-robo-daimidaler/"
    },
    {
        "id": 1833,
        "title": "Keppeki Danshi! Aoyama-kun",
        "href": "https://www.animeforce.it/anime/keppeki-danshi-aoyama-kun/"
    },
    {
        "id": 1835,
        "title": "Kidou Tenshi Angelic Layer",
        "href": "https://www.animeforce.it/anime/kidou-tenshi-angelic-layer/"
    },
    {
        "id": 1837,
        "title": "Kiitarou Shounen no Youkai Enikki",
        "href": "https://www.animeforce.it/anime/kiitarou-shounen-no-youkai-enikki/"
    },
    {
        "id": 1839,
        "title": "Kill la Kill",
        "href": "https://www.animeforce.it/anime/kill-la-kill/"
    },
    {
        "id": 1841,
        "title": "Killing Bites",
        "href": "https://www.animeforce.it/anime/killing-bites/"
    },
    {
        "id": 1843,
        "title": "Kimetsu no Yaiba",
        "href": "https://www.animeforce.it/anime/kimetsu-no-yaiba/"
    },
    {
        "id": 1845,
        "title": "Kimetsu no Yaiba Movie: Mugen Ressha-hen",
        "href": "https://www.animeforce.it/anime/kimetsu-no-yaiba-movie-mugen-ressha-hen/"
    },
    {
        "id": 1847,
        "title": "Kimetsu no Yaiba: Mugen Ressha-hen",
        "href": "https://www.animeforce.it/anime/kimetsu-no-yaiba-mugen-ressha-hen/"
    },
    {
        "id": 1849,
        "title": "Kimi ga Aruji de Shitsuji ga Ore de",
        "href": "https://www.animeforce.it/anime/kimi-ga-aruji-de-shitsuji-ga-ore-de/"
    },
    {
        "id": 1851,
        "title": "Kimi ga Nozomu Eien",
        "href": "https://www.animeforce.it/anime/kimi-ga-nozomu-eien/"
    },
    {
        "id": 1853,
        "title": "Kimi ga Nozomu Eien: Next Season",
        "href": "https://www.animeforce.it/anime/kimi-ga-nozomu-eien-next-season/"
    },
    {
        "id": 1855,
        "title": "Kimi ni Todoke",
        "href": "https://www.animeforce.it/anime/kimi-ni-todoke/"
    },
    {
        "id": 1857,
        "title": "Kimi ni Todoke 2",
        "href": "https://www.animeforce.it/anime/kimi-ni-todoke-2/"
    },
    {
        "id": 1859,
        "title": "Kimi No Iru Machi",
        "href": "https://www.animeforce.it/anime/kimi-no-iru-machi/"
    },
    {
        "id": 1861,
        "title": "Kimi no Iru Machi: Tasogare Kousaten",
        "href": "https://www.animeforce.it/anime/kimi-no-iru-machi-tasogare-kousaten/"
    },
    {
        "id": 1863,
        "title": "Kimi no Suizou wo Tabetai",
        "href": "https://www.animeforce.it/anime/kimi-no-suizou-wo-tabetai/"
    },
    {
        "id": 1865,
        "title": "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen",
        "href": "https://www.animeforce.it/anime/kimi-to-boku-no-saigo-no-senjou-aruiwa-sekai-ga-hajimaru-seisen/"
    },
    {
        "id": 1867,
        "title": "KimiKiss Pure Rouge",
        "href": "https://www.animeforce.it/anime/kimikiss-pure-rouge/"
    },
    {
        "id": 1869,
        "title": "King of Prism: Shiny Seven Stars",
        "href": "https://www.animeforce.it/anime/king-of-prism-shiny-seven-stars/"
    },
    {
        "id": 1871,
        "title": "King’s Raid: Ishi wo Tsugumono-tachi",
        "href": "https://www.animeforce.it/anime/kings-raid-ishi-wo-tsugumono-tachi/"
    },
    {
        "id": 1873,
        "title": "Kingdom",
        "href": "https://www.animeforce.it/anime/kingdom/"
    },
    {
        "id": 1875,
        "title": "Kingdom 2",
        "href": "https://www.animeforce.it/anime/kingdom-2/"
    },
    {
        "id": 1877,
        "title": "Kingdom 3",
        "href": "https://www.animeforce.it/anime/kingdom-3/"
    },
    {
        "id": 1879,
        "title": "Kiniro Mosaic",
        "href": "https://www.animeforce.it/anime/kiniro-mosaic/"
    },
    {
        "id": 1881,
        "title": "Kino no Tabi: The Beautiful World – The Animated Series",
        "href": "https://www.animeforce.it/anime/kino-no-tabi-the-beautiful-world-the-animated-series/"
    },
    {
        "id": 1883,
        "title": "Kiseijuu: Sei no Kakuritsu",
        "href": "https://www.animeforce.it/anime/kiseijuu-sei-no-kakuritsu/"
    },
    {
        "id": 1885,
        "title": "Kishuku Gakkou no Juliet",
        "href": "https://www.animeforce.it/anime/kishuku-gakkou-no-juliet/"
    },
    {
        "id": 1887,
        "title": "Kiss x Sis",
        "href": "https://www.animeforce.it/anime/kiss-x-sis/"
    },
    {
        "id": 1889,
        "title": "Kiss x Sis OAV",
        "href": "https://www.animeforce.it/anime/kiss-x-sis-oav/"
    },
    {
        "id": 1891,
        "title": "Kitakubu Katsudou Kiroku",
        "href": "https://www.animeforce.it/anime/kitakubu-katsudou-kiroku/"
    },
    {
        "id": 1893,
        "title": "Kitsune no Koe",
        "href": "https://www.animeforce.it/anime/kitsune-no-koe/"
    },
    {
        "id": 1895,
        "title": "Kitsutsuki Tanteidokoro",
        "href": "https://www.animeforce.it/anime/kitsutsuki-tanteidokoro/"
    },
    {
        "id": 1897,
        "title": "Kiznaiver",
        "href": "https://www.animeforce.it/anime/kiznaiver/"
    },
    {
        "id": 1899,
        "title": "Kizumonogatari",
        "href": "https://www.animeforce.it/anime/kizumonogatari/"
    },
    {
        "id": 1901,
        "title": "Knights of Sidonia",
        "href": "https://www.animeforce.it/anime/knights-of-sidonia/"
    },
    {
        "id": 1903,
        "title": "Knights of Sidonia: Battle for Planet Nine",
        "href": "https://www.animeforce.it/anime/knights-of-sidonia-battle-for-planet-nine/"
    },
    {
        "id": 1905,
        "title": "Knight’s & Magic",
        "href": "https://www.animeforce.it/anime/knights-magic/"
    },
    {
        "id": 1907,
        "title": "Kobayashi-san Chi no Maid Dragon",
        "href": "https://www.animeforce.it/anime/kobayashi-san-no-maid-dragon/"
    },
    {
        "id": 1909,
        "title": "Kobayashi-san Chi no Maid Dragon S",
        "href": "https://www.animeforce.it/anime/kobayashi-san-chi-no-maid-dragon-s/"
    },
    {
        "id": 1911,
        "title": "Kochouki: Wakaki Nobunaga",
        "href": "https://www.animeforce.it/anime/kochouki-wakaki-nobunaga/"
    },
    {
        "id": 1913,
        "title": "Kodomo no Jikan",
        "href": "https://www.animeforce.it/anime/kodomo-no-jikan/"
    },
    {
        "id": 1915,
        "title": "Koe no Katachi",
        "href": "https://www.animeforce.it/anime/koe-no-katachi/"
    },
    {
        "id": 1917,
        "title": "Koi Koi 7",
        "href": "https://www.animeforce.it/anime/koi-koi-7/"
    },
    {
        "id": 1919,
        "title": "Koi to Producer: EVOL×LOVE",
        "href": "https://www.animeforce.it/anime/koi-to-producer-evolxlove/"
    },
    {
        "id": 1921,
        "title": "Koi to Senkyo to Chocolate",
        "href": "https://www.animeforce.it/anime/koi-to-senkyo-to-chocolate/"
    },
    {
        "id": 1923,
        "title": "Koi to Uso",
        "href": "https://www.animeforce.it/anime/koi-to-uso/"
    },
    {
        "id": 1925,
        "title": "Koi to Yobu ni wa Kimochi Warui",
        "href": "https://www.animeforce.it/anime/koi-to-yobu-ni-wa-kimochi-warui/"
    },
    {
        "id": 1927,
        "title": "Koi wa Ameagari no You ni",
        "href": "https://www.animeforce.it/anime/koi-wa-ameagari-no-you-ni/"
    },
    {
        "id": 1929,
        "title": "Koisuru Asteroid",
        "href": "https://www.animeforce.it/anime/koisuru-asteroid/"
    },
    {
        "id": 1931,
        "title": "Kokkoku",
        "href": "https://www.animeforce.it/anime/kokkoku/"
    },
    {
        "id": 1933,
        "title": "Koko wa Green Wood",
        "href": "https://www.animeforce.it/anime/koko-wa-green-wood/"
    },
    {
        "id": 1935,
        "title": "Kokoro Connect",
        "href": "https://www.animeforce.it/anime/kokoro-connect/"
    },
    {
        "id": 1937,
        "title": "Kokoro ga Sakebitagatterunda",
        "href": "https://www.animeforce.it/anime/kokoro-ga-sakebitagatterunda/"
    },
    {
        "id": 1939,
        "title": "Komi-san wa, Comyushou desu.",
        "href": "https://www.animeforce.it/anime/komi-san-wa-comyushou-desu/"
    },
    {
        "id": 1941,
        "title": "Komori-san wa Kotowarenai!",
        "href": "https://www.animeforce.it/anime/komori-san-wa-kotowarenai/"
    },
    {
        "id": 1943,
        "title": "Konbini Kareshi",
        "href": "https://www.animeforce.it/anime/konbini-kareshi/"
    },
    {
        "id": 1945,
        "title": "Kono Aozora ni Yakusoku wo: Youkoso Tsugumi Ryou e",
        "href": "https://www.animeforce.it/anime/kono-aozora-ni-yakusoku-wo-youkoso-tsugumi-ryou/"
    },
    {
        "id": 1947,
        "title": "Kono Bijutsubu ni wa Mondai ga Aru!",
        "href": "https://www.animeforce.it/anime/kono-bijutsubu-ni-wa-mondai-ga-aru/"
    },
    {
        "id": 1949,
        "title": "Kono Minikuku mo Utsukushii Sekai",
        "href": "https://www.animeforce.it/anime/kono-minikuku-mo-utsukushii-sekai/"
    },
    {
        "id": 1951,
        "title": "Kono Naka ni Hitori, Imouto ga Iru!",
        "href": "https://www.animeforce.it/anime/kono-naka-ni-hitori-imouto-ga-iru/"
    },
    {
        "id": 1953,
        "title": "Kono Oto Tomare!",
        "href": "https://www.animeforce.it/anime/kono-oto-tomare/"
    },
    {
        "id": 1955,
        "title": "Kono Oto Tomare! 2",
        "href": "https://www.animeforce.it/anime/kono-oto-tomare-2/"
    },
    {
        "id": 1957,
        "title": "Kono Subarashii Sekai ni Shukufuku wo!",
        "href": "https://www.animeforce.it/anime/kono-subarashii-sekai-ni-shukufuku-wo/"
    },
    {
        "id": 1959,
        "title": "Kono Subarashii Sekai ni Shukufuku wo! 2",
        "href": "https://www.animeforce.it/anime/kono-subarashii-sekai-ni-shukufuku-wo-2/"
    },
    {
        "id": 1961,
        "title": "Kono Subarashii Sekai ni Shukufuku wo!: Kurenai Densetsu",
        "href": "https://www.animeforce.it/anime/kono-subarashii-sekai-ni-shukufuku-wo-kurenai-densetsu/"
    },
    {
        "id": 1963,
        "title": "Kono Yo no Hate de Koi wo Utau Shoujo YU-NO",
        "href": "https://www.animeforce.it/anime/kono-yo-no-hate-de-koi-wo-utau-shoujo-yu-no/"
    },
    {
        "id": 1965,
        "title": "Konohana Kitan",
        "href": "https://www.animeforce.it/anime/konohana-kitan/"
    },
    {
        "id": 1967,
        "title": "Kore ga Watashi no Goshujinsama",
        "href": "https://www.animeforce.it/anime/kore-ga-watashi-no-goshujinsama/"
    },
    {
        "id": 1969,
        "title": "Kore Wa Zombie Desu Ka?",
        "href": "https://www.animeforce.it/anime/kore-wa-zombie-desu-ka/"
    },
    {
        "id": 1971,
        "title": "Kore Wa Zombie Desu Ka? Of The Dead",
        "href": "https://www.animeforce.it/anime/kore-wa-zombie-desu-ka-of-the-dead/"
    },
    {
        "id": 1973,
        "title": "Kotoura-san",
        "href": "https://www.animeforce.it/anime/kotoura-san/"
    },
    {
        "id": 1975,
        "title": "Koufuku Graffiti",
        "href": "https://www.animeforce.it/anime/koufuku-graffiti/"
    },
    {
        "id": 1977,
        "title": "Koukaku no Pandora",
        "href": "https://www.animeforce.it/anime/koukaku-no-pandora/"
    },
    {
        "id": 1979,
        "title": "Koutetsu Tenshi Kurumi",
        "href": "https://www.animeforce.it/anime/koutetsu-tenshi-kurumi/"
    },
    {
        "id": 1981,
        "title": "Koutetsu Tenshi Kurumi 2",
        "href": "https://www.animeforce.it/anime/koutetsu-tenshi-kurumi-2/"
    },
    {
        "id": 1983,
        "title": "Koutetsujou no Kabaneri",
        "href": "https://www.animeforce.it/anime/koutetsujou-no-kabaneri/"
    },
    {
        "id": 1985,
        "title": "Kouya no Kotobuki Hikoutai",
        "href": "https://www.animeforce.it/anime/kouya-no-kotobuki-hikoutai/"
    },
    {
        "id": 1987,
        "title": "Kowabon",
        "href": "https://www.animeforce.it/anime/kowabon/"
    },
    {
        "id": 1989,
        "title": "Koyomimonogatari",
        "href": "https://www.animeforce.it/anime/koyomimonogatari/"
    },
    {
        "id": 1991,
        "title": "Kubikiri Cycle: Aoiro Savant to Zaregototsukai",
        "href": "https://www.animeforce.it/anime/kubikiri-cycle-aoiro-savant-to-zaregototsukai/"
    },
    {
        "id": 1993,
        "title": "Kujira no Kora wa Sajou ni Utau",
        "href": "https://www.animeforce.it/anime/kujira-no-kora-wa-sajou-ni-utau/"
    },
    {
        "id": 1995,
        "title": "Kuma Kuma Kuma Bear",
        "href": "https://www.animeforce.it/anime/kuma-kuma-kuma-bear/"
    },
    {
        "id": 1997,
        "title": "Kuma Miko",
        "href": "https://www.animeforce.it/anime/kuma-miko/"
    },
    {
        "id": 1999,
        "title": "Kumo desu ga, Nani ka?",
        "href": "https://www.animeforce.it/anime/kumo-desu-ga-nani-ka/"
    },
    {
        "id": 2001,
        "title": "Kuro Gal ni Natta kara Shinyuu to shitemita.",
        "href": "https://www.animeforce.it/anime/kuro-gal-ni-natta-kara-shinyuu-to-shitemita/"
    },
    {
        "id": 2003,
        "title": "Kurokami The Animation",
        "href": "https://www.animeforce.it/anime/kurokami-the-animation/"
    },
    {
        "id": 2005,
        "title": "Kuroko no Basket",
        "href": "https://www.animeforce.it/anime/kuroko-no-basket/"
    },
    {
        "id": 2007,
        "title": "Kuroko no Basket 2",
        "href": "https://www.animeforce.it/anime/kuroko-no-basket-2/"
    },
    {
        "id": 2009,
        "title": "Kuroko no Basket 3",
        "href": "https://www.animeforce.it/anime/kuroko-no-basket-3/"
    },
    {
        "id": 2011,
        "title": "Kuroko no Basket: Last Game",
        "href": "https://www.animeforce.it/anime/kuroko-no-basket-last-game/"
    },
    {
        "id": 2013,
        "title": "Kuromukuro",
        "href": "https://www.animeforce.it/anime/kuromukuro/"
    },
    {
        "id": 2015,
        "title": "Kuroshitsuji",
        "href": "https://www.animeforce.it/anime/kuroshitsuji/"
    },
    {
        "id": 2017,
        "title": "Kuroshitsuji II",
        "href": "https://www.animeforce.it/anime/kuroshitsuji-ii/"
    },
    {
        "id": 2019,
        "title": "Kuroshitsuji: Book of Circus",
        "href": "https://www.animeforce.it/anime/kuroshitsuji-book-of-circus/"
    },
    {
        "id": 2021,
        "title": "Kuroshitsuji: Book of Murder",
        "href": "https://www.animeforce.it/anime/kuroshitsuji-book-of-murder/"
    },
    {
        "id": 2023,
        "title": "Kuroshitsuji: Book of the Atlantic",
        "href": "https://www.animeforce.it/anime/kuroshitsuji-book-of-the-atlantic/"
    },
    {
        "id": 2025,
        "title": "Kuttsukiboshi",
        "href": "https://www.animeforce.it/anime/kuttsukiboshi/"
    },
    {
        "id": 2027,
        "title": "Kuusen Madoushi Kouhosei no Kyoukan",
        "href": "https://www.animeforce.it/anime/kuusen-madoushi-kouhosei-no-kyoukan/"
    },
    {
        "id": 2029,
        "title": "Kuutei Dragons",
        "href": "https://www.animeforce.it/anime/kuutei-dragons/"
    },
    {
        "id": 2031,
        "title": "Kuzu no Honkai",
        "href": "https://www.animeforce.it/anime/kuzu-no-honkai/"
    },
    {
        "id": 2033,
        "title": "Kyochuu Rettou",
        "href": "https://www.animeforce.it/anime/kyochuu-rettou/"
    },
    {
        "id": 2035,
        "title": "Kyojinzoku no Hanayome",
        "href": "https://www.animeforce.it/anime/kyojinzoku-no-hanayome/"
    },
    {
        "id": 2037,
        "title": "Kyokou Suiri",
        "href": "https://www.animeforce.it/anime/kyokou-suiri/"
    },
    {
        "id": 2039,
        "title": "Kyoto Teramachi Sanjou no Holmes",
        "href": "https://www.animeforce.it/anime/kyoto-teramachi-sanjou-no-holmes/"
    },
    {
        "id": 2041,
        "title": "Kyou, Koi wo Hajimemasu",
        "href": "https://www.animeforce.it/anime/kyou-koi-wo-hajimemasu/"
    },
    {
        "id": 2043,
        "title": "Kyoukai no Kanata",
        "href": "https://www.animeforce.it/anime/kyoukai-no-kanata/"
    },
    {
        "id": 2045,
        "title": "Kyoukai no Kanata Movie: I’ll Be Here",
        "href": "https://www.animeforce.it/anime/kyoukai-no-kanata-movie-ill-be-here/"
    },
    {
        "id": 2047,
        "title": "Kyoukai no Rinne",
        "href": "https://www.animeforce.it/anime/kyoukai-no-rinne/"
    },
    {
        "id": 2049,
        "title": "Kyoukai no Rinne 2",
        "href": "https://www.animeforce.it/anime/kyoukai-no-rinne-2/"
    },
    {
        "id": 2051,
        "title": "Kyoukai no Rinne 3",
        "href": "https://www.animeforce.it/anime/kyoukai-no-rinne-3/"
    },
    {
        "id": 2053,
        "title": "Kyoukai Senki",
        "href": "https://www.animeforce.it/anime/kyoukai-senki/"
    },
    {
        "id": 2055,
        "title": "Kyoukaisenjou no Horizon",
        "href": "https://www.animeforce.it/anime/kyoukaisenjou-no-horizon/"
    },
    {
        "id": 2057,
        "title": "Kyoukaisenjou no Horizon II",
        "href": "https://www.animeforce.it/anime/kyoukaisenjou-no-horizon-ii/"
    },
    {
        "id": 2059,
        "title": "Kyousougiga",
        "href": "https://www.animeforce.it/anime/kyousougiga/"
    },
    {
        "id": 2061,
        "title": "Kyuuketsuki Sugu Shinu",
        "href": "https://www.animeforce.it/anime/kyuuketsuki-sugu-shinu/"
    },
    {
        "id": 2063,
        "title": "Kyuukyoku Shinka shita Full Dive RPG ga Genjitsu yori mo Kusoge Dattara",
        "href": "https://www.animeforce.it/anime/kyuukyoku-shinka-shita-full-dive-rpg-ga-genjitsu-yori-mo-kusoge-dattara/"
    },
    {
        "id": 2065,
        "title": "Ladies vs Butlers!",
        "href": "https://www.animeforce.it/anime/ladies-vs-butlers/"
    },
    {
        "id": 2067,
        "title": "Lamune",
        "href": "https://www.animeforce.it/anime/lamune/"
    },
    {
        "id": 2069,
        "title": "Lance N’ Masques",
        "href": "https://www.animeforce.it/anime/lance-n-masques/"
    },
    {
        "id": 2071,
        "title": "Lapis Re:LiGHTs",
        "href": "https://www.animeforce.it/anime/lapis-relights/"
    },
    {
        "id": 2073,
        "title": "Last Period: Owarinaki Rasen no Monogatari",
        "href": "https://www.animeforce.it/anime/last-period-owarinaki-rasen-no-monogatari/"
    },
    {
        "id": 2075,
        "title": "Le Bizzarre Avventure di JoJo",
        "href": "https://www.animeforce.it/anime/le-bizzarre-avventure-jojo/"
    },
    {
        "id": 2077,
        "title": "Le Bizzarre Avventure di JoJo: Diamond is Unbreakable",
        "href": "https://www.animeforce.it/anime/le-bizzarre-avventure-jojo-diamond-is-unbreakable/"
    },
    {
        "id": 2079,
        "title": "Le Bizzarre Avventure di JoJo: Stardust Crusaders",
        "href": "https://www.animeforce.it/anime/le-bizzarre-avventure-jojo-stardust-crusaders/"
    },
    {
        "id": 2081,
        "title": "Le Bizzarre Avventure di JoJo: Stardust Crusaders 2",
        "href": "https://www.animeforce.it/anime/le-bizzarre-avventure-jojo-stardust-crusaders-2/"
    },
    {
        "id": 2083,
        "title": "Le Bizzarre Avventure di JoJo: Vento Aureo",
        "href": "https://www.animeforce.it/anime/le-bizzarre-avventure-jojo-vento-aureo/"
    },
    {
        "id": 2085,
        "title": "Listeners",
        "href": "https://www.animeforce.it/anime/listeners/"
    },
    {
        "id": 2087,
        "title": "Little Busters!",
        "href": "https://www.animeforce.it/anime/little-busters/"
    },
    {
        "id": 2089,
        "title": "Little Busters! Refrain",
        "href": "https://www.animeforce.it/anime/little-busters-refrain/"
    },
    {
        "id": 2091,
        "title": "Little Witch Academia",
        "href": "https://www.animeforce.it/anime/little-witch-academia/"
    },
    {
        "id": 2093,
        "title": "Locodol",
        "href": "https://www.animeforce.it/anime/locodol/"
    },
    {
        "id": 2095,
        "title": "Log Horizon",
        "href": "https://www.animeforce.it/anime/log-horizon/"
    },
    {
        "id": 2097,
        "title": "Log Horizon 2",
        "href": "https://www.animeforce.it/anime/log-horizon-2/"
    },
    {
        "id": 2099,
        "title": "Log Horizon: Entaku Houkai",
        "href": "https://www.animeforce.it/anime/log-horizon-entaku-houkai/"
    },
    {
        "id": 2101,
        "title": "Long Riders!",
        "href": "https://www.animeforce.it/anime/long-riders/"
    },
    {
        "id": 2103,
        "title": "Lord El-Melloi II Sei no Jikenbo: Rail Zeppelin Grace Note",
        "href": "https://www.animeforce.it/anime/lord-el-melloi-ii-no-jikenbo-rail-zeppelin-grace-note/"
    },
    {
        "id": 2105,
        "title": "Lord of Vermilion: Guren no Ou",
        "href": "https://www.animeforce.it/anime/lord-of-vermilion-guren-no-ou/"
    },
    {
        "id": 2107,
        "title": "Lostorage Conflated Wixoss",
        "href": "https://www.animeforce.it/anime/lostorage-conflated-wixoss/"
    },
    {
        "id": 2109,
        "title": "Lostorage Incited Wixoss",
        "href": "https://www.animeforce.it/anime/lostorage-incited-wixoss/"
    },
    {
        "id": 2111,
        "title": "Love Kome: We Love Rice",
        "href": "https://www.animeforce.it/anime/love-kome-we-love-rice/"
    },
    {
        "id": 2113,
        "title": "Love Kome: We Love Rice 2",
        "href": "https://www.animeforce.it/anime/love-kome-we-love-rice-2/"
    },
    {
        "id": 2115,
        "title": "Love Lab",
        "href": "https://www.animeforce.it/anime/love-lab/"
    },
    {
        "id": 2117,
        "title": "Love Live! Nijigasaki Gakuen School Idol Doukoukai",
        "href": "https://www.animeforce.it/anime/love-live-nijigasaki-gakuen-school-idol-doukoukai/"
    },
    {
        "id": 2119,
        "title": "Love Live! School Idol Project",
        "href": "https://www.animeforce.it/anime/love-live-school-idol-project/"
    },
    {
        "id": 2121,
        "title": "Love Live! School Idol Project 2",
        "href": "https://www.animeforce.it/anime/love-live-school-idol-project-2/"
    },
    {
        "id": 2123,
        "title": "Love Live! Sunshine!!",
        "href": "https://www.animeforce.it/anime/love-live-sunshine/"
    },
    {
        "id": 2125,
        "title": "Love Live! Sunshine!! 2",
        "href": "https://www.animeforce.it/anime/love-live-sunshine-2/"
    },
    {
        "id": 2127,
        "title": "Love Live! Sunshine!! The School Idol Movie: Over the Rainbow",
        "href": "https://www.animeforce.it/anime/love-live-sunshine-the-school-idol-movie-over-the-rainbow/"
    },
    {
        "id": 2129,
        "title": "Love Live! Superstar!!",
        "href": "https://www.animeforce.it/anime/love-live-superstar/"
    },
    {
        "id": 2131,
        "title": "Love Live! The School Idol Movie",
        "href": "https://www.animeforce.it/anime/love-live-the-school-idol-movie/"
    },
    {
        "id": 2133,
        "title": "Love Stage!!",
        "href": "https://www.animeforce.it/anime/love-stage/"
    },
    {
        "id": 2135,
        "title": "Luck & Logic",
        "href": "https://www.animeforce.it/anime/luck-logic/"
    },
    {
        "id": 2137,
        "title": "Luger Code 1951",
        "href": "https://www.animeforce.it/anime/luger-code-1951/"
    },
    {
        "id": 2139,
        "title": "Lupin III: Part 5",
        "href": "https://www.animeforce.it/anime/lupin-iii-part-5/"
    },
    {
        "id": 2141,
        "title": "Lupin III: Part 6",
        "href": "https://www.animeforce.it/anime/lupin-iii-part-6/"
    },
    {
        "id": 2143,
        "title": "M3: Sono Kuroki Hagane",
        "href": "https://www.animeforce.it/anime/m3-kuroki-hagane/"
    },
    {
        "id": 2145,
        "title": "Macademi Wasshoi!",
        "href": "https://www.animeforce.it/anime/macademi-wasshoi/"
    },
    {
        "id": 2147,
        "title": "Machikado Mazoku",
        "href": "https://www.animeforce.it/anime/machikado-mazoku/"
    },
    {
        "id": 2149,
        "title": "Macross Delta",
        "href": "https://www.animeforce.it/anime/macross-delta/"
    },
    {
        "id": 2151,
        "title": "Madan no Ou to Vanadis",
        "href": "https://www.animeforce.it/anime/madan-no-ou-to-vanadis/"
    },
    {
        "id": 2153,
        "title": "Made in Abyss",
        "href": "https://www.animeforce.it/anime/made-in-abyss/"
    },
    {
        "id": 2155,
        "title": "Made in Abyss Movie 1: Tabidachi no Yoake",
        "href": "https://www.animeforce.it/anime/made-abyss-movie-1-tabidachi-no-yoake/"
    },
    {
        "id": 2157,
        "title": "Magatsu Wahrheit: Zuerst",
        "href": "https://www.animeforce.it/anime/magatsu-wahrheit-zuerst/"
    },
    {
        "id": 2159,
        "title": "Magi: Sinbad no Bouken",
        "href": "https://www.animeforce.it/anime/magi-sinbad-no-bouken/"
    },
    {
        "id": 2161,
        "title": "Magi: Sinbad no Bouken OAV",
        "href": "https://www.animeforce.it/anime/magi-sinbad-no-bouken-oav/"
    },
    {
        "id": 2163,
        "title": "Magi: The Kingdom of Magic",
        "href": "https://www.animeforce.it/anime/magi-the-kingdom-of-magic/"
    },
    {
        "id": 2165,
        "title": "Magi: The Labyrinth of Magic",
        "href": "https://www.animeforce.it/anime/magi-the-labyrinth-of-magic/"
    },
    {
        "id": 2167,
        "title": "Magia Record: Mahou Shoujo Madoka Magica Gaiden",
        "href": "https://www.animeforce.it/anime/magia-record-mahou-shoujo-madoka-magica-gaiden/"
    },
    {
        "id": 2169,
        "title": "Magia Record: Mahou Shoujo Madoka Magica Gaiden 2",
        "href": "https://www.animeforce.it/anime/magia-record-mahou-shoujo-madoka-magica-gaiden-2/"
    },
    {
        "id": 2171,
        "title": "Magic-Kyun! Renaissance",
        "href": "https://www.animeforce.it/anime/magic-kyun-renaissance/"
    },
    {
        "id": 2173,
        "title": "Mahou Sensou",
        "href": "https://www.animeforce.it/anime/mahou-sensou/"
    },
    {
        "id": 2175,
        "title": "Mahou Shoujo Ikusei Keikaku",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-ikusei-keikaku/"
    },
    {
        "id": 2177,
        "title": "Mahou Shoujo Lyrical Nanoha",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-lyrical-nanoha/"
    },
    {
        "id": 2179,
        "title": "Mahou Shoujo Lyrical Nanoha A`s",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-lyrical-nanoha-as/"
    },
    {
        "id": 2181,
        "title": "Mahou Shoujo Lyrical Nanoha StrikerS",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-lyrical-nanoha-strikers/"
    },
    {
        "id": 2183,
        "title": "Mahou Shoujo Lyrical Nanoha ViVid",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-lyrical-nanoha-vivid/"
    },
    {
        "id": 2185,
        "title": "Mahou Shoujo Nante Mou Ii Desukara",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-nante-mou-ii-desukara/"
    },
    {
        "id": 2187,
        "title": "Mahou Shoujo Nante Mou Ii Desukara 2",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-nante-mou-ii-desukara-2/"
    },
    {
        "id": 2189,
        "title": "Mahou Shoujo Ore",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-ore/"
    },
    {
        "id": 2191,
        "title": "Mahou Shoujo Site",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-site/"
    },
    {
        "id": 2193,
        "title": "Mahou Shoujo Taisen",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-taisen/"
    },
    {
        "id": 2195,
        "title": "Mahou Shoujo Tokushusen Asuka",
        "href": "https://www.animeforce.it/anime/mahou-shoujo-tokushusen-asuka/"
    },
    {
        "id": 2197,
        "title": "Mahoujin Guru Guru (2017)",
        "href": "https://www.animeforce.it/anime/mahoujin-guru-guru-2017/"
    },
    {
        "id": 2199,
        "title": "Mahouka Koukou no Rettousei",
        "href": "https://www.animeforce.it/anime/mahouka-koukou-no-rettousei/"
    },
    {
        "id": 2201,
        "title": "Mahouka Koukou no Rettousei Movie: Hoshi wo Yobu Shoujo",
        "href": "https://www.animeforce.it/anime/mahouka-koukou-no-rettousei-movie-hoshi-wo-yobu-shoujo/"
    },
    {
        "id": 2203,
        "title": "Mahouka Koukou no Rettousei: Raihousha-hen",
        "href": "https://www.animeforce.it/anime/mahouka-koukou-no-rettousei-raihousha-hen/"
    },
    {
        "id": 2205,
        "title": "Mahouka Koukou no Yuutousei",
        "href": "https://www.animeforce.it/anime/mahouka-koukou-no-yuutousei/"
    },
    {
        "id": 2207,
        "title": "Mahoutsukai no Yome",
        "href": "https://www.animeforce.it/anime/mahoutsukai-no-yome/"
    },
    {
        "id": 2209,
        "title": "Mahoutsukai no Yome: Hoshi Matsu Hito",
        "href": "https://www.animeforce.it/anime/mahoutsukai-no-yome-hoshi-matsu-hito/"
    },
    {
        "id": 2211,
        "title": "Maiko-san Chi no Makanai-san",
        "href": "https://www.animeforce.it/anime/maiko-san-chi-no-makanai-san/"
    },
    {
        "id": 2213,
        "title": "Mairimashita! Iruma-kun",
        "href": "https://www.animeforce.it/anime/mairimashita-iruma-kun/"
    },
    {
        "id": 2215,
        "title": "Mairimashita! Iruma-kun 2",
        "href": "https://www.animeforce.it/anime/mairimashita-iruma-kun-2/"
    },
    {
        "id": 2217,
        "title": "Majestic Prince",
        "href": "https://www.animeforce.it/anime/majestic-prince/"
    },
    {
        "id": 2219,
        "title": "Maji de Watashi ni Koi Shinasai!!",
        "href": "https://www.animeforce.it/anime/maji-de-watashi-ni-koi-shinasai/"
    },
    {
        "id": 2221,
        "title": "Majimoji Rurumo",
        "href": "https://www.animeforce.it/anime/majimoji-rurumo/"
    },
    {
        "id": 2223,
        "title": "Majo no Tabitabi",
        "href": "https://www.animeforce.it/anime/majo-no-tabitabi/"
    },
    {
        "id": 2225,
        "title": "Major",
        "href": "https://www.animeforce.it/anime/major/"
    },
    {
        "id": 2227,
        "title": "Major 2",
        "href": "https://www.animeforce.it/anime/major-2/"
    },
    {
        "id": 2229,
        "title": "Major 2nd",
        "href": "https://www.animeforce.it/anime/major-2nd/"
    },
    {
        "id": 2231,
        "title": "Major 2nd 2",
        "href": "https://www.animeforce.it/anime/major-2nd-2/"
    },
    {
        "id": 2233,
        "title": "Major 3",
        "href": "https://www.animeforce.it/anime/major-3/"
    },
    {
        "id": 2235,
        "title": "Major 4",
        "href": "https://www.animeforce.it/anime/major-4/"
    },
    {
        "id": 2237,
        "title": "Major 5",
        "href": "https://www.animeforce.it/anime/major-5/"
    },
    {
        "id": 2239,
        "title": "Major 6",
        "href": "https://www.animeforce.it/anime/major-6/"
    },
    {
        "id": 2241,
        "title": "Majutsushi Orphen Hagure Tabi",
        "href": "https://www.animeforce.it/anime/majutsushi-orphen-hagure-tabi/"
    },
    {
        "id": 2243,
        "title": "Majutsushi Orphen Hagure Tabi: Kimluck-hen",
        "href": "https://www.animeforce.it/anime/majutsushi-orphen-hagure-tabi-kimluck-hen/"
    },
    {
        "id": 2245,
        "title": "Makai Ouji: Devils and Realist",
        "href": "https://www.animeforce.it/anime/makai-ouji-devils-and-realist/"
    },
    {
        "id": 2247,
        "title": "Maken-ki!",
        "href": "https://www.animeforce.it/anime/maken-ki/"
    },
    {
        "id": 2249,
        "title": "Maken-ki! Two",
        "href": "https://www.animeforce.it/anime/maken-ki-two/"
    },
    {
        "id": 2251,
        "title": "Mamoru-kun ni Megami no Shukufuku wo!",
        "href": "https://www.animeforce.it/anime/mamoru-kun-ni-megami-no-shukufuku-wo/"
    },
    {
        "id": 2253,
        "title": "Manaria Friends",
        "href": "https://www.animeforce.it/anime/manaria-friends/"
    },
    {
        "id": 2255,
        "title": "Mangaka-san to Assistant-san to",
        "href": "https://www.animeforce.it/anime/mangaka-san-to-assistant-san-to/"
    },
    {
        "id": 2257,
        "title": "Manyuu Hiken-chou",
        "href": "https://www.animeforce.it/anime/manyuu-hiken-chou/"
    },
    {
        "id": 2259,
        "title": "Maou Evelogia ni Mi wo Sasage yo",
        "href": "https://www.animeforce.it/anime/maou-evelogia-ni-mi-wo-sasage-yo/"
    },
    {
        "id": 2261,
        "title": "Maou Gakuin no Futekigousha",
        "href": "https://www.animeforce.it/anime/maou-gakuin-no-futekigousha/"
    },
    {
        "id": 2263,
        "title": "Maou-sama, Retry!",
        "href": "https://www.animeforce.it/anime/maou-sama-retry/"
    },
    {
        "id": 2265,
        "title": "Maoujou de Oyasumi",
        "href": "https://www.animeforce.it/anime/maoujou-de-oyasumi/"
    },
    {
        "id": 2267,
        "title": "Maoyuu Maou Yuusha",
        "href": "https://www.animeforce.it/anime/maoyuu-maou-yuusha/"
    },
    {
        "id": 2269,
        "title": "Marchen Madchen",
        "href": "https://www.animeforce.it/anime/marchen-madchen/"
    },
    {
        "id": 2271,
        "title": "Marginal#4: Kiss Kara Tsukuru Big Bang",
        "href": "https://www.animeforce.it/anime/marginal4-kiss-kara-tsukuru-big-bang/"
    },
    {
        "id": 2273,
        "title": "Mars Red",
        "href": "https://www.animeforce.it/anime/mars-red/"
    },
    {
        "id": 2275,
        "title": "Marudase Kintarou",
        "href": "https://www.animeforce.it/anime/marudase-kintarou/"
    },
    {
        "id": 2277,
        "title": "Masamune-kun no Revenge",
        "href": "https://www.animeforce.it/anime/masamune-kun-no-revenge/"
    },
    {
        "id": 2279,
        "title": "Mashiro no Oto",
        "href": "https://www.animeforce.it/anime/mashiro-no-oto/"
    },
    {
        "id": 2281,
        "title": "Mashiro-iro Symphony",
        "href": "https://www.animeforce.it/anime/mashiro-iro-symphony/"
    },
    {
        "id": 2283,
        "title": "Masou Gakuen HxH",
        "href": "https://www.animeforce.it/anime/masou-gakuen-hxh/"
    },
    {
        "id": 2285,
        "title": "Mayo Chiki!",
        "href": "https://www.animeforce.it/anime/mayo-chiki/"
    },
    {
        "id": 2287,
        "title": "Mayoi Neko Overrun!",
        "href": "https://www.animeforce.it/anime/mayoi-neko-overrun/"
    },
    {
        "id": 2289,
        "title": "Mayoiga",
        "href": "https://www.animeforce.it/anime/mayoiga/"
    },
    {
        "id": 2291,
        "title": "Mayonaka no Occult Koumuin",
        "href": "https://www.animeforce.it/anime/mayonaka-no-occult-koumuin/"
    },
    {
        "id": 2293,
        "title": "Medaka Box",
        "href": "https://www.animeforce.it/anime/medaka-box/"
    },
    {
        "id": 2295,
        "title": "Medaka Box Abnormal",
        "href": "https://www.animeforce.it/anime/medaka-box-abnormal/"
    },
    {
        "id": 2297,
        "title": "Megalo Box",
        "href": "https://www.animeforce.it/anime/megalo-box/"
    },
    {
        "id": 2299,
        "title": "Megami-ryou no Ryoubo-kun.",
        "href": "https://www.animeforce.it/anime/megami-ryou-no-ryoubo-kun/"
    },
    {
        "id": 2301,
        "title": "Meiji Tokyo Renka",
        "href": "https://www.animeforce.it/anime/meiji-tokyo-renka/"
    },
    {
        "id": 2303,
        "title": "Meikyuu Black Company",
        "href": "https://www.animeforce.it/anime/meikyuu-black-company/"
    },
    {
        "id": 2305,
        "title": "Mekaku City Actors",
        "href": "https://www.animeforce.it/anime/mekaku-city-actors/"
    },
    {
        "id": 2307,
        "title": "Merc Storia: Mukiryoku no Shounen to Bin no Naka no Shoujo",
        "href": "https://www.animeforce.it/anime/merc-storia-mukiryoku-no-shounen-to-bin-no-naka-no-shoujo/"
    },
    {
        "id": 2309,
        "title": "Midara na Ao-chan wa Benkyou ga Dekinai",
        "href": "https://www.animeforce.it/anime/midara-na-ao-chan-wa-benkyou-ga-dekinai/"
    },
    {
        "id": 2311,
        "title": "Mieruko-chan",
        "href": "https://www.animeforce.it/anime/mieruko-chan/"
    },
    {
        "id": 2313,
        "title": "Miira no Kaikata",
        "href": "https://www.animeforce.it/anime/miira-no-kaikata/"
    },
    {
        "id": 2315,
        "title": "Mikagura Gakuen Kumikyoku",
        "href": "https://www.animeforce.it/anime/mikagura-gakuen-kumikyoku/"
    },
    {
        "id": 2317,
        "title": "Mikakunin de Shinkoukei",
        "href": "https://www.animeforce.it/anime/mikakunin-de-shinkoukei/"
    },
    {
        "id": 2319,
        "title": "Military!",
        "href": "https://www.animeforce.it/anime/military/"
    },
    {
        "id": 2321,
        "title": "Million Doll",
        "href": "https://www.animeforce.it/anime/million-doll/"
    },
    {
        "id": 2323,
        "title": "Minami Kamakura Koukou Joshi Jitensha-Bu",
        "href": "https://www.animeforce.it/anime/minami-kamakura-koukou-joshi-jitensha-bu/"
    },
    {
        "id": 2325,
        "title": "Mini Dragon",
        "href": "https://www.animeforce.it/anime/mini-dragon/"
    },
    {
        "id": 2327,
        "title": "Mini Toji",
        "href": "https://www.animeforce.it/anime/mini-toji/"
    },
    {
        "id": 2329,
        "title": "Mini Yuri",
        "href": "https://www.animeforce.it/anime/mini-yuri/"
    },
    {
        "id": 2331,
        "title": "Mirai Nikki",
        "href": "https://www.animeforce.it/anime/mirai-nikki/"
    },
    {
        "id": 2333,
        "title": "Miru Tights",
        "href": "https://www.animeforce.it/anime/miru-tights/"
    },
    {
        "id": 2335,
        "title": "Miss Monochrome",
        "href": "https://www.animeforce.it/anime/miss-monochrome/"
    },
    {
        "id": 2337,
        "title": "Miss Monochrome 2",
        "href": "https://www.animeforce.it/anime/miss-monochrome-2/"
    },
    {
        "id": 2339,
        "title": "Miss Monochrome 3",
        "href": "https://www.animeforce.it/anime/miss-monochrome-3/"
    },
    {
        "id": 2341,
        "title": "Mitsuboshi Colors",
        "href": "https://www.animeforce.it/anime/mitsuboshi-colors/"
    },
    {
        "id": 2343,
        "title": "Mix: Meisei Story",
        "href": "https://www.animeforce.it/anime/mix-meisei-story/"
    },
    {
        "id": 2345,
        "title": "MM!",
        "href": "https://www.animeforce.it/anime/mm/"
    },
    {
        "id": 2347,
        "title": "Mob Psycho 100",
        "href": "https://www.animeforce.it/anime/mob-psycho-100/"
    },
    {
        "id": 2349,
        "title": "Mob Psycho 100 II",
        "href": "https://www.animeforce.it/anime/mob-psycho-100-ii/"
    },
    {
        "id": 2351,
        "title": "Mobile Suit Gundam 00",
        "href": "https://www.animeforce.it/anime/mobile-suit-gundam-00/"
    },
    {
        "id": 2353,
        "title": "Mobile Suit Gundam 00 S2",
        "href": "https://www.animeforce.it/anime/mobile-suit-gundam-00-s2/"
    },
    {
        "id": 2355,
        "title": "Mobile Suit Gundam 00 The Movie",
        "href": "https://www.animeforce.it/anime/mobile-suit-gundam-00-the-movie/"
    },
    {
        "id": 2357,
        "title": "Mobile Suit Gundam Thunderbolt",
        "href": "https://www.animeforce.it/anime/mobile-suit-gundam-thunderbolt/"
    },
    {
        "id": 2359,
        "title": "Mobile Suit Gundam Unicorn RE:0096",
        "href": "https://www.animeforce.it/anime/mobile-suit-gundam-unicorn-re0096/"
    },
    {
        "id": 2361,
        "title": "Mobile Suit Gundam: Iron-Blooded Orphans",
        "href": "https://www.animeforce.it/anime/mobile-suit-gundam-iron-blooded-orphans/"
    },
    {
        "id": 2363,
        "title": "Mobile Suit Gundam: Iron-Blooded Orphans 2",
        "href": "https://www.animeforce.it/anime/mobile-suit-gundam-iron-blooded-orphans-2/"
    },
    {
        "id": 2365,
        "title": "Mobile Suit Gundam: The Origin – Advent of the Red Comet",
        "href": "https://www.animeforce.it/anime/mobile-suit-gundam-the-origin-advent-of-the-red-comet/"
    },
    {
        "id": 2367,
        "title": "Momo Kyun Sword",
        "href": "https://www.animeforce.it/anime/momo-kyun-sword/"
    },
    {
        "id": 2369,
        "title": "Momokuri",
        "href": "https://www.animeforce.it/anime/momokuri/"
    },
    {
        "id": 2371,
        "title": "Mondaiji-tachi ga Isekai kara Kuru Sou Desu yo?",
        "href": "https://www.animeforce.it/anime/mondaiji-tachi-ga-isekai-kara-kuru-sou-desu-yo/"
    },
    {
        "id": 2373,
        "title": "Monogatari Series: Second Season",
        "href": "https://www.animeforce.it/anime/monogatari-series-second-season/"
    },
    {
        "id": 2375,
        "title": "Monster Musume no Iru Nichijou",
        "href": "https://www.animeforce.it/anime/monster-musume-no-iru-nichijou/"
    },
    {
        "id": 2377,
        "title": "Monster Musume no Oishasan",
        "href": "https://www.animeforce.it/anime/monster-musume-no-oishasan/"
    },
    {
        "id": 2379,
        "title": "Motto To LOVE-Ru",
        "href": "https://www.animeforce.it/anime/motto-to-love-ru/"
    },
    {
        "id": 2381,
        "title": "Mou Hitotsu no Mirai wo.",
        "href": "https://www.animeforce.it/anime/mou-hitotsu-no-mirai-wo/"
    },
    {
        "id": 2383,
        "title": "Mugen no Juunin: Immortal",
        "href": "https://www.animeforce.it/anime/mugen-no-juunin-immortal/"
    },
    {
        "id": 2385,
        "title": "Muhyo to Rouji no Mahouritsu Soudan Jimusho",
        "href": "https://www.animeforce.it/anime/muhyo-to-rouji-no-mahouritsu-soudan-jimusho/"
    },
    {
        "id": 2387,
        "title": "Munou na Nana",
        "href": "https://www.animeforce.it/anime/munou-na-nana/"
    },
    {
        "id": 2389,
        "title": "Murenase! Seton Gakuen",
        "href": "https://www.animeforce.it/anime/murenase-seton-gakuen/"
    },
    {
        "id": 2391,
        "title": "Musaigen no Phantom World",
        "href": "https://www.animeforce.it/anime/musaigen-no-phantom-world/"
    },
    {
        "id": 2393,
        "title": "Musekinin Galaxy Tylor",
        "href": "https://www.animeforce.it/anime/musekinin-galaxy-tylor/"
    },
    {
        "id": 2395,
        "title": "Mushibugyou",
        "href": "https://www.animeforce.it/anime/mushibugyou/"
    },
    {
        "id": 2397,
        "title": "Mushoku Tensei: Isekai Ittara Honki Dasu",
        "href": "https://www.animeforce.it/anime/mushoku-tensei-isekai-ittara-honki-dasu/"
    },
    {
        "id": 2399,
        "title": "Mushoku Tensei: Isekai Ittara Honki Dasu 2",
        "href": "https://www.animeforce.it/anime/mushoku-tensei-isekai-ittara-honki-dasu-2/"
    },
    {
        "id": 2401,
        "title": "Muv-Luv Alternative",
        "href": "https://www.animeforce.it/anime/muv-luv-alternative/"
    },
    {
        "id": 2403,
        "title": "Muv-Luv Alternative: Total Eclipse",
        "href": "https://www.animeforce.it/anime/muv-luv-alternative-total-eclipse/"
    },
    {
        "id": 2405,
        "title": "Myself; Yourself",
        "href": "https://www.animeforce.it/anime/myself-yourself/"
    },
    {
        "id": 2407,
        "title": "Nagareboshi Lens",
        "href": "https://www.animeforce.it/anime/nagareboshi-lens/"
    },
    {
        "id": 2409,
        "title": "Nagasarete Airantou",
        "href": "https://www.animeforce.it/anime/nagasarete-airantou/"
    },
    {
        "id": 2411,
        "title": "Nagato Yuki-chan no Shoushitsu",
        "href": "https://www.animeforce.it/anime/nagato-yuki-chan-no-shoushitsu/"
    },
    {
        "id": 2413,
        "title": "Nagi no Asukara",
        "href": "https://www.animeforce.it/anime/nagi-no-asukara/"
    },
    {
        "id": 2415,
        "title": "Naisho no Tsubomi",
        "href": "https://www.animeforce.it/anime/naisho-no-tsubomi/"
    },
    {
        "id": 2417,
        "title": "Nakanohito Genome [Jikkyouchuu]",
        "href": "https://www.animeforce.it/anime/nakanohito-genome-jikkyouchuu/"
    },
    {
        "id": 2419,
        "title": "Nakitai Watashi wa Neko wo Kaburu",
        "href": "https://www.animeforce.it/anime/nakitai-watashi-wa-neko-wo-kaburu/"
    },
    {
        "id": 2421,
        "title": "Nami yo Kiitekure",
        "href": "https://www.animeforce.it/anime/nami-yo-kiitekure/"
    },
    {
        "id": 2423,
        "title": "Nana Maru San Batsu",
        "href": "https://www.animeforce.it/anime/nana-maru-san-batsu/"
    },
    {
        "id": 2425,
        "title": "Nanatsu no Bitoku",
        "href": "https://www.animeforce.it/anime/nanatsu-no-bitoku/"
    },
    {
        "id": 2427,
        "title": "Nanatsu no Taizai",
        "href": "https://www.animeforce.it/anime/nanatsu-no-taizai/"
    },
    {
        "id": 2429,
        "title": "Nanatsu no Taizai Movie 1: Tenkuu no Torawarebito",
        "href": "https://www.animeforce.it/anime/nanatsu-no-taizai-movie-1-tenkuu-no-torawarebito/"
    },
    {
        "id": 2431,
        "title": "Nanatsu no Taizai Movie 2: Hikari ni Norowareshi Mono-tachi",
        "href": "https://www.animeforce.it/anime/nanatsu-no-taizai-movie-2-hikari-ni-norowareshi-mono-tachi/"
    },
    {
        "id": 2433,
        "title": "Nanatsu no Taizai: Eiyuu-tachi wa Hashagu",
        "href": "https://www.animeforce.it/anime/nanatsu-no-taizai-eiyuu-tachi-wa-hashagu/"
    },
    {
        "id": 2435,
        "title": "Nanatsu no Taizai: Fundo no Shinpan",
        "href": "https://www.animeforce.it/anime/nanatsu-no-taizai-fundo-no-shinpan/"
    },
    {
        "id": 2437,
        "title": "Nanatsu no Taizai: Imashime no Fukkatsu",
        "href": "https://www.animeforce.it/anime/nanatsu-no-taizai-imashime-no-fukkatsu/"
    },
    {
        "id": 2439,
        "title": "Nanatsu no Taizai: Kamigami no Gekirin",
        "href": "https://www.animeforce.it/anime/nanatsu-no-taizai-kamigami-no-gekirin/"
    },
    {
        "id": 2441,
        "title": "Nanatsu no Taizai: Seisen no Shirushi",
        "href": "https://www.animeforce.it/anime/nanatsu-no-taizai-seisen-no-shirushi/"
    },
    {
        "id": 2443,
        "title": "Nanbaka",
        "href": "https://www.animeforce.it/anime/nanbaka/"
    },
    {
        "id": 2445,
        "title": "Nanbaka 2",
        "href": "https://www.animeforce.it/anime/nanbaka-2/"
    },
    {
        "id": 2447,
        "title": "Nande Koko ni Sensei ga!?",
        "href": "https://www.animeforce.it/anime/nande-koko-ni-sensei-ga/"
    },
    {
        "id": 2449,
        "title": "Narue no Sekai",
        "href": "https://www.animeforce.it/anime/narue-no-sekai/"
    },
    {
        "id": 2451,
        "title": "Naruto Shippuden",
        "href": "https://www.animeforce.it/anime/naruto-shippuden/"
    },
    {
        "id": 2453,
        "title": "Natsunagu!",
        "href": "https://www.animeforce.it/anime/natsunagu/"
    },
    {
        "id": 2455,
        "title": "Nejimaki Seirei Senki: Tenkyou no Alderamin",
        "href": "https://www.animeforce.it/anime/nejimaki-seirei-senki-tenkyou-no-alderamin/"
    },
    {
        "id": 2457,
        "title": "Nekomonogatari: Kuro",
        "href": "https://www.animeforce.it/anime/nekomonogatari-kuro/"
    },
    {
        "id": 2459,
        "title": "Nekopara",
        "href": "https://www.animeforce.it/anime/nekopara/"
    },
    {
        "id": 2461,
        "title": "Net-juu no Susume",
        "href": "https://www.animeforce.it/anime/net-juu-no-susume/"
    },
    {
        "id": 2463,
        "title": "Netoge no Yome wa Onnanoko ja Nai to Omotta?",
        "href": "https://www.animeforce.it/anime/netoge-no-yome-wa-onnanoko-ja-nai-to-omotta/"
    },
    {
        "id": 2465,
        "title": "Netsuzou TRap",
        "href": "https://www.animeforce.it/anime/netsuzou-trap/"
    },
    {
        "id": 2467,
        "title": "New Game!",
        "href": "https://www.animeforce.it/anime/new-game/"
    },
    {
        "id": 2469,
        "title": "New Game! 2",
        "href": "https://www.animeforce.it/anime/new-game-2/"
    },
    {
        "id": 2471,
        "title": "Nichijou",
        "href": "https://www.animeforce.it/anime/nichijou/"
    },
    {
        "id": 2473,
        "title": "Night Head 2041",
        "href": "https://www.animeforce.it/anime/night-head-2041/"
    },
    {
        "id": 2475,
        "title": "Nihon Chinbotsu 2020",
        "href": "https://www.animeforce.it/anime/japan-sinks-2020/"
    },
    {
        "id": 2477,
        "title": "Nil Admirari no Tenbin",
        "href": "https://www.animeforce.it/anime/nil-admirari-no-tenbin/"
    },
    {
        "id": 2479,
        "title": "Ninja Collection",
        "href": "https://www.animeforce.it/anime/ninja-collection/"
    },
    {
        "id": 2481,
        "title": "Ninja Slayer From Animation",
        "href": "https://www.animeforce.it/anime/ninja-slayer-from-animation/"
    },
    {
        "id": 2483,
        "title": "Nisekoi",
        "href": "https://www.animeforce.it/anime/nisekoi/"
    },
    {
        "id": 2485,
        "title": "Nisekoi 2",
        "href": "https://www.animeforce.it/anime/nisekoi-2/"
    },
    {
        "id": 2487,
        "title": "Nisemonogatari",
        "href": "https://www.animeforce.it/anime/nisemonogatari/"
    },
    {
        "id": 2489,
        "title": "No Game No Life",
        "href": "https://www.animeforce.it/anime/no-game-no-life/"
    },
    {
        "id": 2491,
        "title": "No Game No Life: Zero",
        "href": "https://www.animeforce.it/anime/no-game-no-life-zero/"
    },
    {
        "id": 2493,
        "title": "No Guns Life",
        "href": "https://www.animeforce.it/anime/no-guns-life/"
    },
    {
        "id": 2495,
        "title": "No Guns Life 2",
        "href": "https://www.animeforce.it/anime/no-guns-life-2/"
    },
    {
        "id": 2497,
        "title": "Noblesse",
        "href": "https://www.animeforce.it/anime/noblesse/"
    },
    {
        "id": 2499,
        "title": "Nobunaga no Shinobi",
        "href": "https://www.animeforce.it/anime/nobunaga-no-shinobi/"
    },
    {
        "id": 2501,
        "title": "Nobunaga no Shinobi: Anegawa Ishiyama-hen",
        "href": "https://www.animeforce.it/anime/nobunaga-no-shinobi-anegawa-ishiyama-hen/"
    },
    {
        "id": 2503,
        "title": "Nobunaga no Shinobi: Ise Kanegasaki-hen",
        "href": "https://www.animeforce.it/anime/nobunaga-no-shinobi-ise-kanegasaki-hen/"
    },
    {
        "id": 2505,
        "title": "Nobunaga the Fool",
        "href": "https://www.animeforce.it/anime/nobunaga-the-fool/"
    },
    {
        "id": 2507,
        "title": "Nobunaga-sensei no Osanazuma",
        "href": "https://www.animeforce.it/anime/nobunaga-sensei-no-osanazuma/"
    },
    {
        "id": 2509,
        "title": "Nobunagun",
        "href": "https://www.animeforce.it/anime/nobunagun/"
    },
    {
        "id": 2511,
        "title": "Nodame Cantabile",
        "href": "https://www.animeforce.it/anime/nodame-cantabile/"
    },
    {
        "id": 2513,
        "title": "Nodame Cantabile Finale",
        "href": "https://www.animeforce.it/anime/nodame-cantabile-finale/"
    },
    {
        "id": 2515,
        "title": "Nodame Cantabile Paris-Hen",
        "href": "https://www.animeforce.it/anime/nodame-cantabile-paris-hen/"
    },
    {
        "id": 2517,
        "title": "Nogizaka Haruka no Himitsu",
        "href": "https://www.animeforce.it/anime/nogizaka-haruka-no-himitsu/"
    },
    {
        "id": 2519,
        "title": "Nogizaka Haruka no Himitsu – Finale",
        "href": "https://www.animeforce.it/anime/nogizaka-haruka-no-himitsu-finale/"
    },
    {
        "id": 2521,
        "title": "Nogizaka Haruka no Himitsu Purezza",
        "href": "https://www.animeforce.it/anime/nogizaka-haruka-no-himitsu-purezza/"
    },
    {
        "id": 2523,
        "title": "Nomad: Megalo Box 2",
        "href": "https://www.animeforce.it/anime/nomad-megalo-box-2/"
    },
    {
        "id": 2525,
        "title": "Non Non Biyori",
        "href": "https://www.animeforce.it/anime/non-non-biyori/"
    },
    {
        "id": 2527,
        "title": "Non Non Biyori Movie: Vacation",
        "href": "https://www.animeforce.it/anime/non-non-biyori-movie-vacation/"
    },
    {
        "id": 2529,
        "title": "Non Non Biyori Nonstop",
        "href": "https://www.animeforce.it/anime/non-non-biyori-nonstop/"
    },
    {
        "id": 2531,
        "title": "Non Non Biyori Repeat",
        "href": "https://www.animeforce.it/anime/non-non-biyori-repeat/"
    },
    {
        "id": 2533,
        "title": "Nora to Oujo to Noraneko Heart",
        "href": "https://www.animeforce.it/anime/nora-to-oujo-to-noraneko-heart/"
    },
    {
        "id": 2535,
        "title": "Noragami",
        "href": "https://www.animeforce.it/anime/noragami/"
    },
    {
        "id": 2537,
        "title": "Noragami Aragoto",
        "href": "https://www.animeforce.it/anime/noragami-aragoto/"
    },
    {
        "id": 2539,
        "title": "Norn9: Norn+Nonet",
        "href": "https://www.animeforce.it/anime/norn9-nornnonet/"
    },
    {
        "id": 2541,
        "title": "NouCome",
        "href": "https://www.animeforce.it/anime/noucome/"
    },
    {
        "id": 2543,
        "title": "Nourin",
        "href": "https://www.animeforce.it/anime/nourin/"
    },
    {
        "id": 2545,
        "title": "Nozo x Kimi",
        "href": "https://www.animeforce.it/anime/nozo-x-kimi/"
    },
    {
        "id": 2547,
        "title": "Nozoki Ana",
        "href": "https://www.animeforce.it/anime/nozoki-ana/"
    },
    {
        "id": 2549,
        "title": "Null Peta",
        "href": "https://www.animeforce.it/anime/null-peta/"
    },
    {
        "id": 2551,
        "title": "number24",
        "href": "https://www.animeforce.it/anime/number24/"
    },
    {
        "id": 2553,
        "title": "Nurarihyon No Mago",
        "href": "https://www.animeforce.it/anime/nurarihyon-no-mago/"
    },
    {
        "id": 2555,
        "title": "Nurse Witch Komugi-chan R",
        "href": "https://www.animeforce.it/anime/nurse-witch-komugi-chan-r/"
    },
    {
        "id": 2557,
        "title": "Nyan Koi!",
        "href": "https://www.animeforce.it/anime/nyan-koi/"
    },
    {
        "id": 2559,
        "title": "Nyanko Days",
        "href": "https://www.animeforce.it/anime/nyanko-days/"
    },
    {
        "id": 2561,
        "title": "Occultic;Nine",
        "href": "https://www.animeforce.it/anime/occulticnine/"
    },
    {
        "id": 2563,
        "title": "Ochikobore Fruit Tart",
        "href": "https://www.animeforce.it/anime/ochikobore-fruit-tart/"
    },
    {
        "id": 2565,
        "title": "Oda Cinnamon Nobunaga",
        "href": "https://www.animeforce.it/anime/oda-cinnamon-nobunaga/"
    },
    {
        "id": 2567,
        "title": "Oda Nobuna no Yabou",
        "href": "https://www.animeforce.it/anime/oda-nobuna-no-yabou/"
    },
    {
        "id": 2569,
        "title": "Odd Taxi",
        "href": "https://www.animeforce.it/anime/odd-taxi/"
    },
    {
        "id": 2571,
        "title": "Oji-san to Marshmallow",
        "href": "https://www.animeforce.it/anime/oji-san-to-marshmallow/"
    },
    {
        "id": 2573,
        "title": "Okusama ga Seitokaichou!",
        "href": "https://www.animeforce.it/anime/okusama-ga-seitokaichou/"
    },
    {
        "id": 2575,
        "title": "Okusama ga Seitokaichou! 2",
        "href": "https://www.animeforce.it/anime/okusama-ga-seitokaichou-2/"
    },
    {
        "id": 2577,
        "title": "Omae wa Mada Gunma wo Shiranai",
        "href": "https://www.animeforce.it/anime/omae-wa-mada-gunma-wo-shiranai/"
    },
    {
        "id": 2579,
        "title": "Omamori Himari",
        "href": "https://www.animeforce.it/anime/omamori-himari/"
    },
    {
        "id": 2581,
        "title": "Omiai Aite wa Oshiego, Tsuyoki na, Mondaiji",
        "href": "https://www.animeforce.it/anime/omiai-aite-wa-oshiego-tsuyoki-na-mondaiji/"
    },
    {
        "id": 2583,
        "title": "Omoi, Omoware, Furi, Furare",
        "href": "https://www.animeforce.it/anime/omoi-omoware-furi-furare/"
    },
    {
        "id": 2585,
        "title": "One Outs",
        "href": "https://www.animeforce.it/anime/one-outs/"
    },
    {
        "id": 2587,
        "title": "One Piece",
        "href": "https://www.animeforce.it/anime/op/"
    },
    {
        "id": 2589,
        "title": "One Piece: Stampede",
        "href": "https://www.animeforce.it/anime/one-piece-stampede/"
    },
    {
        "id": 2591,
        "title": "One Punch Man",
        "href": "https://www.animeforce.it/anime/one-punch-man/"
    },
    {
        "id": 2593,
        "title": "One Punch Man 2",
        "href": "https://www.animeforce.it/anime/one-punch-man-2/"
    },
    {
        "id": 2595,
        "title": "One Room",
        "href": "https://www.animeforce.it/anime/one-room/"
    },
    {
        "id": 2597,
        "title": "One Room 2",
        "href": "https://www.animeforce.it/anime/one-room-2/"
    },
    {
        "id": 2599,
        "title": "One Room 3",
        "href": "https://www.animeforce.it/anime/one-room-3/"
    },
    {
        "id": 2601,
        "title": "Onee-chan ga Kita",
        "href": "https://www.animeforce.it/anime/onee-chan-ga-kita/"
    },
    {
        "id": 2603,
        "title": "Onegai Teacher!",
        "href": "https://www.animeforce.it/anime/onegai-teacher/"
    },
    {
        "id": 2605,
        "title": "Onegai Twins",
        "href": "https://www.animeforce.it/anime/onegai-twins/"
    },
    {
        "id": 2607,
        "title": "Ongaku Shoujo",
        "href": "https://www.animeforce.it/anime/ongaku-shoujo/"
    },
    {
        "id": 2609,
        "title": "Onihei",
        "href": "https://www.animeforce.it/anime/onihei/"
    },
    {
        "id": 2611,
        "title": "Onii-chan Dakedo Ai Sae Areba Kankeinai yo ne",
        "href": "https://www.animeforce.it/anime/onii-chan-dakedo-ai-sae-areba-kankeinai-yo-ne/"
    },
    {
        "id": 2613,
        "title": "Onsen Yousei Hakone-chan",
        "href": "https://www.animeforce.it/anime/onsen-yousei-hakone-chan/"
    },
    {
        "id": 2615,
        "title": "Ookami Kakushi",
        "href": "https://www.animeforce.it/anime/ookami-kakushi/"
    },
    {
        "id": 2617,
        "title": "Ookami Shoujo to Kuro Ouji",
        "href": "https://www.animeforce.it/anime/ookami-shoujo-to-kuro-ouji/"
    },
    {
        "id": 2619,
        "title": "Ookami-san to Shichinin no Nakama-tachi",
        "href": "https://www.animeforce.it/anime/ookami-san-to-shichinin-no-nakama-tachi/"
    },
    {
        "id": 2621,
        "title": "Ookami-san wa Taberaretai",
        "href": "https://www.animeforce.it/anime/ookami-san-wa-taberaretai/"
    },
    {
        "id": 2623,
        "title": "Ooya-san wa Shishunki!",
        "href": "https://www.animeforce.it/anime/ooya-san-wa-shishunki/"
    },
    {
        "id": 2625,
        "title": "Orange",
        "href": "https://www.animeforce.it/anime/orange/"
    },
    {
        "id": 2627,
        "title": "Ore dake Haireru Kakushi Dungeon",
        "href": "https://www.animeforce.it/anime/ore-dake-haireru-kakushi-dungeon/"
    },
    {
        "id": 2629,
        "title": "Ore ga Suki nano wa Imouto dakedo Imouto ja Nai",
        "href": "https://www.animeforce.it/anime/ore-ga-suki-nano-wa-imouto-dakedo-imouto-ja-nai/"
    },
    {
        "id": 2631,
        "title": "Ore Monogatari!!",
        "href": "https://www.animeforce.it/anime/ore-monogatari/"
    },
    {
        "id": 2633,
        "title": "Ore no Imouto ga Konnani Kawaii Wake ga Nai",
        "href": "https://www.animeforce.it/anime/ore-no-imouto-ga-konnani-kawaii-wake-ga-nai/"
    },
    {
        "id": 2635,
        "title": "Ore no Imouto ga Konnani Kawaii Wake ga Nai 2",
        "href": "https://www.animeforce.it/anime/ore-no-imouto-ga-konnani-kawaii-wake-ga-nai-2/"
    },
    {
        "id": 2637,
        "title": "Ore no Kanojo to Osananajimi ga Shuraba Sugiru",
        "href": "https://www.animeforce.it/anime/ore-no-kanojo-to-osananajimi-ga-shuraba-sugiru/"
    },
    {
        "id": 2639,
        "title": "Ore no Yubi de Midarero.: Heitengo Futarikiri no Salon de…",
        "href": "https://www.animeforce.it/anime/ore-no-yubi-de-midarero-heitengo-futarikiri-no-salon-de/"
    },
    {
        "id": 2641,
        "title": "Ore wo Suki nano wa Omae dake ka yo",
        "href": "https://www.animeforce.it/anime/ore-wo-suki-nano-wa-omae-dake-ka-yo/"
    },
    {
        "id": 2643,
        "title": "Ore, Tsushima",
        "href": "https://www.animeforce.it/anime/ore-tsushima/"
    },
    {
        "id": 2645,
        "title": "Ore, Twintails ni Narimasu",
        "href": "https://www.animeforce.it/anime/ore-twintails-ni-narimasu/"
    },
    {
        "id": 2647,
        "title": "Orenchi no Furo Jijou",
        "href": "https://www.animeforce.it/anime/orenchi-no-furo-jijou/"
    },
    {
        "id": 2649,
        "title": "Oretachi ni Tsubasa wa Nai",
        "href": "https://www.animeforce.it/anime/oretachi-ni-tsubasa-wa-nai/"
    },
    {
        "id": 2651,
        "title": "Osake wa Fuufu ni Natte Kara",
        "href": "https://www.animeforce.it/anime/osake-wa-fuufu-ni-natte-kara/"
    },
    {
        "id": 2653,
        "title": "Osananajimi ga Zettai ni Makenai Love Comedy",
        "href": "https://www.animeforce.it/anime/osananajimi-ga-zettai-ni-makenai-love-comedy/"
    },
    {
        "id": 2655,
        "title": "Oshi ga Budoukan Ittekuretara Shinu",
        "href": "https://www.animeforce.it/anime/oshi-ga-budoukan-ittekuretara-shinu/"
    },
    {
        "id": 2657,
        "title": "Oshiete! Galko-chan",
        "href": "https://www.animeforce.it/anime/oshiete-galko-chan/"
    },
    {
        "id": 2659,
        "title": "Osomatsu-san 2",
        "href": "https://www.animeforce.it/anime/osomatsu-san-2/"
    },
    {
        "id": 2661,
        "title": "Osomatsu-san 3",
        "href": "https://www.animeforce.it/anime/osomatsu-san-3/"
    },
    {
        "id": 2663,
        "title": "Otome Game no Hametsu Flag shika Nai Akuyaku Reijou ni Tensei shiteshimatta…",
        "href": "https://www.animeforce.it/anime/otome-game-no-hametsu-flag-shika-nai-akuyaku-reijou-ni-tensei-shiteshimatta/"
    },
    {
        "id": 2665,
        "title": "Otome Game no Hametsu Flag shika Nai Akuyaku Reijou ni Tensei shiteshimatta… 2",
        "href": "https://www.animeforce.it/anime/otome-game-no-hametsu-flag-shika-nai-akuyaku-reijou-ni-tensei-shiteshimatta-2/"
    },
    {
        "id": 2667,
        "title": "Otome Nadeshiko Koi Techou",
        "href": "https://www.animeforce.it/anime/otome-nadeshiko-koi-techou/"
    },
    {
        "id": 2669,
        "title": "Otome Youkai Zakuro",
        "href": "https://www.animeforce.it/anime/otome-youkai-zakuro/"
    },
    {
        "id": 2671,
        "title": "Otona no Bouguya-san",
        "href": "https://www.animeforce.it/anime/otona-no-bouguya-san/"
    },
    {
        "id": 2673,
        "title": "Otona no Bouguya-san II",
        "href": "https://www.animeforce.it/anime/otona-no-bouguya-san-ii/"
    },
    {
        "id": 2675,
        "title": "Otona nya Koi no Shikata ga Wakaranee!",
        "href": "https://www.animeforce.it/anime/otona-nya-koi-no-shikata-ga-wakaranee/"
    },
    {
        "id": 2677,
        "title": "Ousama Game The Animation",
        "href": "https://www.animeforce.it/anime/ousama-game-the-animation/"
    },
    {
        "id": 2679,
        "title": "Oushitsu Kyoushi Haine",
        "href": "https://www.animeforce.it/anime/oushitsu-kyoushi-haine/"
    },
    {
        "id": 2681,
        "title": "Outbreak Company",
        "href": "https://www.animeforce.it/anime/outbreak-company/"
    },
    {
        "id": 2683,
        "title": "Outlanders",
        "href": "https://www.animeforce.it/anime/outlanders/"
    },
    {
        "id": 2685,
        "title": "Overflow",
        "href": "https://www.animeforce.it/anime/overflow/"
    },
    {
        "id": 2687,
        "title": "Overlord",
        "href": "https://www.animeforce.it/anime/overlord/"
    },
    {
        "id": 2689,
        "title": "Overlord II",
        "href": "https://www.animeforce.it/anime/overlord-2/"
    },
    {
        "id": 2691,
        "title": "Overlord III",
        "href": "https://www.animeforce.it/anime/overlord-3/"
    },
    {
        "id": 2693,
        "title": "Owari no Seraph",
        "href": "https://www.animeforce.it/anime/owari-no-seraph/"
    },
    {
        "id": 2695,
        "title": "Owari no Seraph 2",
        "href": "https://www.animeforce.it/anime/owari-no-seraph-2/"
    },
    {
        "id": 2697,
        "title": "Owarimonogatari",
        "href": "https://www.animeforce.it/anime/owarimonogatari/"
    },
    {
        "id": 2699,
        "title": "Owarimonogatari 2",
        "href": "https://www.animeforce.it/anime/owarimonogatari-2/"
    },
    {
        "id": 2701,
        "title": "Ozmafia!!",
        "href": "https://www.animeforce.it/anime/ozmafia/"
    },
    {
        "id": 2703,
        "title": "Pan de Peace!",
        "href": "https://www.animeforce.it/anime/pan-de-peace/"
    },
    {
        "id": 2705,
        "title": "Papa datte, Shitai",
        "href": "https://www.animeforce.it/anime/papa-datte-shitai/"
    },
    {
        "id": 2707,
        "title": "Papa no Iukoto o Kikinasai!",
        "href": "https://www.animeforce.it/anime/papa-no-iukoto-kikinasai/"
    },
    {
        "id": 2709,
        "title": "Patema Inverted",
        "href": "https://www.animeforce.it/anime/patema-inverted/"
    },
    {
        "id": 2711,
        "title": "Peach Boy Riverside",
        "href": "https://www.animeforce.it/anime/peach-boy-riverside/"
    },
    {
        "id": 2713,
        "title": "Peach Girl",
        "href": "https://www.animeforce.it/anime/peach-girl/"
    },
    {
        "id": 2715,
        "title": "Persona 3 The Movie 1: Spring of Birth",
        "href": "https://www.animeforce.it/anime/persona-3-the-movie-1-spring-of-birth/"
    },
    {
        "id": 2717,
        "title": "Persona 3 The Movie 2: Midsummer Knight’s Dream",
        "href": "https://www.animeforce.it/anime/persona-3-the-movie-2-midsummer-knights-dream/"
    },
    {
        "id": 2719,
        "title": "Persona 3 The Movie 3: Falling Down",
        "href": "https://www.animeforce.it/anime/persona-3-the-movie-3-falling-down/"
    },
    {
        "id": 2721,
        "title": "Persona 4 The Animation",
        "href": "https://www.animeforce.it/anime/persona-4-the-animation/"
    },
    {
        "id": 2723,
        "title": "Persona 4 The Golden Animation",
        "href": "https://www.animeforce.it/anime/persona-4-the-golden-animation/"
    },
    {
        "id": 2725,
        "title": "Persona 5 The Animation",
        "href": "https://www.animeforce.it/anime/persona-5-the-animation/"
    },
    {
        "id": 2727,
        "title": "Pet",
        "href": "https://www.animeforce.it/anime/pet/"
    },
    {
        "id": 2729,
        "title": "Peter Grill to Kenja no Jikan",
        "href": "https://www.animeforce.it/anime/peter-grill-to-kenja-no-jikan/"
    },
    {
        "id": 2731,
        "title": "Phantasy Star Online 2: Episode Oracle",
        "href": "https://www.animeforce.it/anime/phantasy-star-online-2-episode-oracle/"
    },
    {
        "id": 2733,
        "title": "Phantasy Star Online 2: The Animation",
        "href": "https://www.animeforce.it/anime/phantasy-star-online-2-the-animation/"
    },
    {
        "id": 2735,
        "title": "Phantom in the Twilight",
        "href": "https://www.animeforce.it/anime/phantom-the-twilight/"
    },
    {
        "id": 2737,
        "title": "Phantom: Requiem for the Phantom",
        "href": "https://www.animeforce.it/anime/phantom-requiem-for-the-phantom/"
    },
    {
        "id": 2739,
        "title": "Phi Brain: Kami no Puzzle",
        "href": "https://www.animeforce.it/anime/phi-brain-kami-no-puzzle/"
    },
    {
        "id": 2741,
        "title": "Phi Brain: Kami no Puzzle – Orpheus Order-hen",
        "href": "https://www.animeforce.it/anime/phi-brain-kami-no-puzzle-orpheus-order-hen/"
    },
    {
        "id": 2743,
        "title": "Phi Brain: Kami no Puzzle – Shukuteki! Rätsel-hen",
        "href": "https://www.animeforce.it/anime/phi-brain-kami-no-puzzle-shukuteki-ratsel-hen/"
    },
    {
        "id": 2745,
        "title": "Photokano",
        "href": "https://www.animeforce.it/anime/photokano/"
    },
    {
        "id": 2747,
        "title": "Piace: Watashi no Italian",
        "href": "https://www.animeforce.it/anime/piace-watashi-no-italian/"
    },
    {
        "id": 2749,
        "title": "Piano no Mori",
        "href": "https://www.animeforce.it/anime/piano-no-mori/"
    },
    {
        "id": 2751,
        "title": "Piano no Mori 2",
        "href": "https://www.animeforce.it/anime/piano-no-mori-2/"
    },
    {
        "id": 2753,
        "title": "Ping Pong The Animation",
        "href": "https://www.animeforce.it/anime/ping-pong-the-animation/"
    },
    {
        "id": 2755,
        "title": "Planet With",
        "href": "https://www.animeforce.it/anime/planet-with/"
    },
    {
        "id": 2757,
        "title": "Planetarian: Chiisana Hoshi no Yume",
        "href": "https://www.animeforce.it/anime/planetarian-chiisana-hoshi-no-yume/"
    },
    {
        "id": 2759,
        "title": "Planetarian: Hoshi no Hito",
        "href": "https://www.animeforce.it/anime/planetarian-hoshi-no-hito/"
    },
    {
        "id": 2761,
        "title": "Plastic Memories",
        "href": "https://www.animeforce.it/anime/plastic-memories/"
    },
    {
        "id": 2763,
        "title": "Platinum End",
        "href": "https://www.animeforce.it/anime/platinum-end/"
    },
    {
        "id": 2765,
        "title": "Plunderer",
        "href": "https://www.animeforce.it/anime/plunderer/"
    },
    {
        "id": 2767,
        "title": "Pokemon (2019)",
        "href": "https://www.animeforce.it/anime/pokemon-2019/"
    },
    {
        "id": 2769,
        "title": "Pop Team Epic",
        "href": "https://www.animeforce.it/anime/pop-team-epic/"
    },
    {
        "id": 2771,
        "title": "Prince of Stride: Alternative",
        "href": "https://www.animeforce.it/anime/prince-of-stride-alternative/"
    },
    {
        "id": 2773,
        "title": "Princess Connect! Re:Dive",
        "href": "https://www.animeforce.it/anime/princess-connect-redive/"
    },
    {
        "id": 2775,
        "title": "Princess Lover",
        "href": "https://www.animeforce.it/anime/princess-lover/"
    },
    {
        "id": 2777,
        "title": "Princess Principal",
        "href": "https://www.animeforce.it/anime/princess-principal/"
    },
    {
        "id": 2779,
        "title": "Prism Ark",
        "href": "https://www.animeforce.it/anime/prism-ark/"
    },
    {
        "id": 2781,
        "title": "Prison School",
        "href": "https://www.animeforce.it/anime/prison-school/"
    },
    {
        "id": 2783,
        "title": "Psycho-Pass",
        "href": "https://www.animeforce.it/anime/psycho-pass/"
    },
    {
        "id": 2785,
        "title": "Psycho-Pass 2",
        "href": "https://www.animeforce.it/anime/psycho-pass-2/"
    },
    {
        "id": 2787,
        "title": "Psycho-Pass 3",
        "href": "https://www.animeforce.it/anime/psycho-pass-3/"
    },
    {
        "id": 2789,
        "title": "Psycho-Pass 3: First Inspector",
        "href": "https://www.animeforce.it/anime/psycho-pass-3-first-inspector/"
    },
    {
        "id": 2791,
        "title": "Psycho-Pass Movie",
        "href": "https://www.animeforce.it/anime/psycho-pass-movie/"
    },
    {
        "id": 2793,
        "title": "Psycho-Pass: Sinners of the System",
        "href": "https://www.animeforce.it/anime/psycho-pass-sinners-of-the-system/"
    },
    {
        "id": 2795,
        "title": "Punch Line",
        "href": "https://www.animeforce.it/anime/punch-line/"
    },
    {
        "id": 2797,
        "title": "Pupa",
        "href": "https://www.animeforce.it/anime/pupa/"
    },
    {
        "id": 2799,
        "title": "Puraore! Pride of Orange",
        "href": "https://www.animeforce.it/anime/puraore-pride-of-orange/"
    },
    {
        "id": 2801,
        "title": "Qualidea Code",
        "href": "https://www.animeforce.it/anime/qualidea-code/"
    },
    {
        "id": 2803,
        "title": "Quanzhi Gaoshou",
        "href": "https://www.animeforce.it/anime/quanzhi-gaoshou/"
    },
    {
        "id": 2805,
        "title": "Quanzhi Gaoshou (2018)",
        "href": "https://www.animeforce.it/anime/quanzhi-gaoshou-2018/"
    },
    {
        "id": 2807,
        "title": "Quanzhi Gaoshou 2",
        "href": "https://www.animeforce.it/anime/quanzhi-gaoshou-2/"
    },
    {
        "id": 2809,
        "title": "Queen’s Blade S1 – Rurou no Senshi",
        "href": "https://www.animeforce.it/anime/queens-blade-s1-rurou-no-senshi/"
    },
    {
        "id": 2811,
        "title": "Queen’s Blade S2 – Gyokuza o Tsugu Mono",
        "href": "https://www.animeforce.it/anime/queens-blade-s2-gyokuza-tsugu-mono/"
    },
    {
        "id": 2813,
        "title": "Queen’s Blade S3 – Rebellion",
        "href": "https://www.animeforce.it/anime/queens-blade-s3-rebellion/"
    },
    {
        "id": 2815,
        "title": "Queen’s Blade: Utsukushiki toushi-tachi OAV",
        "href": "https://www.animeforce.it/anime/queens-blade-utsukushiki-toushi-tachi-oav/"
    },
    {
        "id": 2817,
        "title": "Radiant",
        "href": "https://www.animeforce.it/anime/radiant/"
    },
    {
        "id": 2819,
        "title": "Radiant 2",
        "href": "https://www.animeforce.it/anime/radiant-2/"
    },
    {
        "id": 2821,
        "title": "Rail Romanesque",
        "href": "https://www.animeforce.it/anime/rail-romanesque/"
    },
    {
        "id": 2823,
        "title": "Rail Wars!",
        "href": "https://www.animeforce.it/anime/rail-wars/"
    },
    {
        "id": 2825,
        "title": "Rainbow Days",
        "href": "https://www.animeforce.it/anime/nijiiro-days/"
    },
    {
        "id": 2827,
        "title": "Rakudai Kishi no Cavalry",
        "href": "https://www.animeforce.it/anime/rakudai-kishi-no-cavalry/"
    },
    {
        "id": 2829,
        "title": "Rakuen Tsuihou",
        "href": "https://www.animeforce.it/anime/rakuen-tsuihou/"
    },
    {
        "id": 2831,
        "title": "Ramen Daisuki Koizumi-san",
        "href": "https://www.animeforce.it/anime/ramen-daisuki-koizumi-san/"
    },
    {
        "id": 2833,
        "title": "Ranpo Kitan: Game of Laplace",
        "href": "https://www.animeforce.it/anime/ranpo-kitan-game-of-laplace/"
    },
    {
        "id": 2835,
        "title": "Re-Kan!",
        "href": "https://www.animeforce.it/anime/re-kan/"
    },
    {
        "id": 2837,
        "title": "Re-Main",
        "href": "https://www.animeforce.it/anime/re-main/"
    },
    {
        "id": 2839,
        "title": "Re: Hamatora",
        "href": "https://www.animeforce.it/anime/re-hamatora/"
    },
    {
        "id": 2841,
        "title": "Re:Creators",
        "href": "https://www.animeforce.it/anime/recreators/"
    },
    {
        "id": 2843,
        "title": "Re:Zero Kara Hajimeru Isekai Seikatsu",
        "href": "https://www.animeforce.it/anime/rezero-kara-hajimeru-isekai-seikatsu/"
    },
    {
        "id": 2845,
        "title": "Re:Zero Kara Hajimeru Isekai Seikatsu – Hyouketsu no Kizuna",
        "href": "https://www.animeforce.it/anime/rezero-kara-hajimeru-isekai-seikatsu-hyouketsu-no-kizuna/"
    },
    {
        "id": 2847,
        "title": "Re:Zero Kara Hajimeru Isekai Seikatsu – Memory Snow",
        "href": "https://www.animeforce.it/anime/rezero-kara-hajimeru-isekai-seikatsu-memory-snow/"
    },
    {
        "id": 2849,
        "title": "Re:Zero Kara Hajimeru Isekai Seikatsu 2",
        "href": "https://www.animeforce.it/anime/rezero-kara-hajimeru-isekai-seikatsu-2/"
    },
    {
        "id": 2851,
        "title": "Re:Zero Kara Hajimeru Isekai Seikatsu: Shin Henshuu-ban",
        "href": "https://www.animeforce.it/anime/rezero-kara-hajimeru-isekai-seikatsu-shin-henshuu-ban/"
    },
    {
        "id": 2853,
        "title": "Rec",
        "href": "https://www.animeforce.it/anime/rec/"
    },
    {
        "id": 2855,
        "title": "Recorder to Randoseru Do",
        "href": "https://www.animeforce.it/anime/recorder-to-randoseru-do/"
    },
    {
        "id": 2857,
        "title": "Recorder to Randoseru Mi",
        "href": "https://www.animeforce.it/anime/recorder-to-randoseru-mi/"
    },
    {
        "id": 2859,
        "title": "Recorder to Randoseru Re",
        "href": "https://www.animeforce.it/anime/recorder-to-randoseru-re/"
    },
    {
        "id": 2861,
        "title": "Red Data Girl",
        "href": "https://www.animeforce.it/anime/red-data-girl/"
    },
    {
        "id": 2863,
        "title": "Refrain Blue",
        "href": "https://www.animeforce.it/anime/refrain-blue/"
    },
    {
        "id": 2865,
        "title": "Regalia: The Three Sacred Stars",
        "href": "https://www.animeforce.it/anime/regalia-the-three-sacred-stars/"
    },
    {
        "id": 2867,
        "title": "Reikenzan: Eichi e no Shikaku",
        "href": "https://www.animeforce.it/anime/reikenzan-eichi-no-shikaku/"
    },
    {
        "id": 2869,
        "title": "Reikenzan: Hoshikuzu-tachi no Utage",
        "href": "https://www.animeforce.it/anime/reikenzan-hoshikuzu-tachi-no-utage/"
    },
    {
        "id": 2871,
        "title": "Release the Spyce",
        "href": "https://www.animeforce.it/anime/release-the-spyce/"
    },
    {
        "id": 2873,
        "title": "ReLIFE",
        "href": "https://www.animeforce.it/anime/relife/"
    },
    {
        "id": 2875,
        "title": "ReLIFE: Kanketsu-hen",
        "href": "https://www.animeforce.it/anime/relife-kanketsu-hen/"
    },
    {
        "id": 2877,
        "title": "Renai Boukun",
        "href": "https://www.animeforce.it/anime/renai-boukun/"
    },
    {
        "id": 2879,
        "title": "Rental Magica",
        "href": "https://www.animeforce.it/anime/rental-magica/"
    },
    {
        "id": 2881,
        "title": "RErideD: Tokigoe no Derrida",
        "href": "https://www.animeforce.it/anime/rerided-tokigoe-no-derrida/"
    },
    {
        "id": 2883,
        "title": "Revisions",
        "href": "https://www.animeforce.it/anime/revisions/"
    },
    {
        "id": 2885,
        "title": "Rewrite",
        "href": "https://www.animeforce.it/anime/rewrite/"
    },
    {
        "id": 2887,
        "title": "Rewrite 2",
        "href": "https://www.animeforce.it/anime/rewrite-2/"
    },
    {
        "id": 2889,
        "title": "Rifle Is Beautiful",
        "href": "https://www.animeforce.it/anime/rifle-is-beautiful-sub-ita/"
    },
    {
        "id": 2891,
        "title": "Rikei ga Koi ni Ochita no de Shoumei shitemita.",
        "href": "https://www.animeforce.it/anime/rikei-ga-koi-ni-ochita-no-de-shoumei-shitemita/"
    },
    {
        "id": 2893,
        "title": "Ristorante Paradiso",
        "href": "https://www.animeforce.it/anime/ristorante-paradiso/"
    },
    {
        "id": 2895,
        "title": "Ro-Kyu-Bu!",
        "href": "https://www.animeforce.it/anime/ro-kyu-bu/"
    },
    {
        "id": 2897,
        "title": "Ro-Kyu-Bu! SS",
        "href": "https://www.animeforce.it/anime/ro-kyu-bu-ss/"
    },
    {
        "id": 2899,
        "title": "RoboMasters The Animated Series",
        "href": "https://www.animeforce.it/anime/robomasters-the-animated-series/"
    },
    {
        "id": 2901,
        "title": "Robot Girls Z",
        "href": "https://www.animeforce.it/anime/robot-girls-z/"
    },
    {
        "id": 2903,
        "title": "Robot Girls Z Plus",
        "href": "https://www.animeforce.it/anime/robot-girls-z-plus/"
    },
    {
        "id": 2905,
        "title": "Robotics;Notes",
        "href": "https://www.animeforce.it/anime/roboticsnotes/"
    },
    {
        "id": 2907,
        "title": "Rokka no Yuusha",
        "href": "https://www.animeforce.it/anime/rokka-no-yuusha/"
    },
    {
        "id": 2909,
        "title": "Rokudenashi Majutsu Koushi to Akashic Records",
        "href": "https://www.animeforce.it/anime/rokudenashi-majutsu-koushi-to-akashic-records/"
    },
    {
        "id": 2911,
        "title": "Rokuhoudou Yotsuiro Biyori",
        "href": "https://www.animeforce.it/anime/rokuhoudou-yotsuiro-biyori/"
    },
    {
        "id": 2913,
        "title": "Rokujouma no Shinryakusha!?",
        "href": "https://www.animeforce.it/anime/rokujouma-no-shinryakusha/"
    },
    {
        "id": 2915,
        "title": "Room Mate",
        "href": "https://www.animeforce.it/anime/room-mate/"
    },
    {
        "id": 2917,
        "title": "Rosario to Vampire",
        "href": "https://www.animeforce.it/anime/rosario-to-vampire/"
    },
    {
        "id": 2919,
        "title": "Rosario to Vampire Capu2",
        "href": "https://www.animeforce.it/anime/rosario-to-vampire-capu2/"
    },
    {
        "id": 2921,
        "title": "Rozen Maiden (2013)",
        "href": "https://www.animeforce.it/anime/rozen-maiden-2013/"
    },
    {
        "id": 2923,
        "title": "Runway de Waratte",
        "href": "https://www.animeforce.it/anime/runway-de-waratte/"
    },
    {
        "id": 2925,
        "title": "Ryuugajou Nanana no Maizoukin",
        "href": "https://www.animeforce.it/anime/ryuugajou-nanana-no-maizoukin/"
    },
    {
        "id": 2927,
        "title": "Ryuuou no Oshigoto!",
        "href": "https://www.animeforce.it/anime/ryuuou-no-oshigoto/"
    },
    {
        "id": 2929,
        "title": "Sabagebu!",
        "href": "https://www.animeforce.it/anime/sabagebu/"
    },
    {
        "id": 2931,
        "title": "Saenai Heroine no Sodatekata",
        "href": "https://www.animeforce.it/anime/saenai-heroine-no-sodatekata/"
    },
    {
        "id": 2933,
        "title": "Saenai Heroine no Sodatekata Fine",
        "href": "https://www.animeforce.it/anime/saenai-heroine-no-sodatekata-fine/"
    },
    {
        "id": 2935,
        "title": "Saenai Heroine no Sodatekata Flat",
        "href": "https://www.animeforce.it/anime/saenai-heroine-no-sodatekata-flat/"
    },
    {
        "id": 2937,
        "title": "Sagrada Reset",
        "href": "https://www.animeforce.it/anime/sagrada-reset/"
    },
    {
        "id": 2939,
        "title": "Saihate no Paladin",
        "href": "https://www.animeforce.it/anime/saihate-no-paladin/"
    },
    {
        "id": 2941,
        "title": "Saijaku Muhai no Bahamut",
        "href": "https://www.animeforce.it/anime/saijaku-muhai-no-bahamut/"
    },
    {
        "id": 2943,
        "title": "Saiki Kusuo no Psi Nan",
        "href": "https://www.animeforce.it/anime/saiki-kusuo-no-psi-nan/"
    },
    {
        "id": 2945,
        "title": "Saiki Kusuo no Psi Nan 2",
        "href": "https://www.animeforce.it/anime/saiki-kusuo-no-psi-nan-2/"
    },
    {
        "id": 2947,
        "title": "Saiki Kusuo no Psi Nan: Shidou-Hen",
        "href": "https://www.animeforce.it/anime/saiki-kusuo-no-psi-nan-shidou-hen/"
    },
    {
        "id": 2949,
        "title": "Saikin, Imouto no Yousu ga Chotto Okashiinda ga.",
        "href": "https://www.animeforce.it/anime/saikin-imouto-no-yousu-ga-chotto-okashiinda-ga/"
    },
    {
        "id": 2951,
        "title": "Sailor Moon Crystal",
        "href": "https://www.animeforce.it/anime/sailor-moon-crystal/"
    },
    {
        "id": 2953,
        "title": "Sailor Moon Crystal 3",
        "href": "https://www.animeforce.it/anime/sailor-moon-crystal-3/"
    },
    {
        "id": 2955,
        "title": "Sailor Moon Eternal",
        "href": "https://www.animeforce.it/anime/sailor-moon-eternal/"
    },
    {
        "id": 2957,
        "title": "Saint Seiya Omega",
        "href": "https://www.animeforce.it/anime/saint-seiya-omega/"
    },
    {
        "id": 2959,
        "title": "Saint Seiya: Saintia Shou",
        "href": "https://www.animeforce.it/anime/saint-seiya-saintia-shou/"
    },
    {
        "id": 2961,
        "title": "Saishuu Heiki Kanojo",
        "href": "https://www.animeforce.it/anime/saishuu-heiki-kanojo/"
    },
    {
        "id": 2963,
        "title": "Saishuu Shiken Kujira",
        "href": "https://www.animeforce.it/anime/saishuu-shiken-kujira/"
    },
    {
        "id": 2965,
        "title": "Saiyuki Reload Blast",
        "href": "https://www.animeforce.it/anime/saiyuki-reload-blast/"
    },
    {
        "id": 2967,
        "title": "Sakamichi no Apollon",
        "href": "https://www.animeforce.it/anime/sakamichi-no-apollon/"
    },
    {
        "id": 2969,
        "title": "Sakamoto desu ga?",
        "href": "https://www.animeforce.it/anime/sakamoto-desu-ga/"
    },
    {
        "id": 2971,
        "title": "Sakugan",
        "href": "https://www.animeforce.it/anime/sakugan/"
    },
    {
        "id": 2973,
        "title": "Sakura Quest",
        "href": "https://www.animeforce.it/anime/sakura-quest/"
    },
    {
        "id": 2975,
        "title": "Sakura Trick",
        "href": "https://www.animeforce.it/anime/sakura-trick/"
    },
    {
        "id": 2977,
        "title": "Sakurako-san no Ashimoto ni wa Shitai ga Umatteiru",
        "href": "https://www.animeforce.it/anime/sakurako-san-no-ashimoto-ni-wa-shitai-ga-umatteiru/"
    },
    {
        "id": 2979,
        "title": "Sakurasou No Pet Na Kanojo",
        "href": "https://www.animeforce.it/anime/sakurasou-no-pet-na-kanojo/"
    },
    {
        "id": 2981,
        "title": "Sankaku Mado no Sotogawa wa Yoru",
        "href": "https://www.animeforce.it/anime/sankaku-mado-no-sotogawa-wa-yoru/"
    },
    {
        "id": 2983,
        "title": "Sankarea",
        "href": "https://www.animeforce.it/anime/sankarea/"
    },
    {
        "id": 2985,
        "title": "Sanrio Danshi",
        "href": "https://www.animeforce.it/anime/sanrio-danshi/"
    },
    {
        "id": 2987,
        "title": "Sansha Sanyou",
        "href": "https://www.animeforce.it/anime/sansha-sanyou/"
    },
    {
        "id": 2989,
        "title": "Sarazanmai",
        "href": "https://www.animeforce.it/anime/sarazanmai/"
    },
    {
        "id": 2991,
        "title": "Saredo Tsumibito wa Ryuu to Odoru",
        "href": "https://www.animeforce.it/anime/saredo-tsumibito-wa-ryuu-to-odoru/"
    },
    {
        "id": 2993,
        "title": "Sasameki Koto",
        "href": "https://www.animeforce.it/anime/sasameki-koto/"
    },
    {
        "id": 2995,
        "title": "[email protected]",
        "href": "https://www.animeforce.it/anime/sasami-sanganbaranai/"
    },
    {
        "id": 2997,
        "title": "Satsuriku no Tenshi",
        "href": "https://www.animeforce.it/anime/satsuriku-no-tenshi/"
    },
    {
        "id": 2999,
        "title": "Sayonara no Asa ni Yakusoku no Hana wo Kazarou",
        "href": "https://www.animeforce.it/anime/sayonara-no-asa-ni-yakusoku-no-hana-wo-kazarou/"
    },
    {
        "id": 3001,
        "title": "Sayonara Watashi no Cramer",
        "href": "https://www.animeforce.it/anime/sayonara-watashi-no-cramer/"
    },
    {
        "id": 3003,
        "title": "Scarlet Nexus",
        "href": "https://www.animeforce.it/anime/scarlet-nexus/"
    },
    {
        "id": 3005,
        "title": "School Days",
        "href": "https://www.animeforce.it/anime/school-days/"
    },
    {
        "id": 3007,
        "title": "Schoolgirl Strikers: Animation Channel",
        "href": "https://www.animeforce.it/anime/schoolgirl-strikers-animation-channel/"
    },
    {
        "id": 3009,
        "title": "Schwarzesmarken",
        "href": "https://www.animeforce.it/anime/schwarzesmarken/"
    },
    {
        "id": 3011,
        "title": "Seihou Tenshi Angel Links",
        "href": "https://www.animeforce.it/anime/seihou-tenshi-angel-links/"
    },
    {
        "id": 3013,
        "title": "Seijo no Maryoku wa Bannou Desu",
        "href": "https://www.animeforce.it/anime/seijo-no-maryoku-wa-bannou-desu/"
    },
    {
        "id": 3015,
        "title": "Seikaisuru Kado",
        "href": "https://www.animeforce.it/anime/seikaisuru-kado/"
    },
    {
        "id": 3017,
        "title": "Seiken Tsukai no World Break",
        "href": "https://www.animeforce.it/anime/seiken-tsukai-no-world-break/"
    },
    {
        "id": 3019,
        "title": "Seikoku no Dragonar",
        "href": "https://www.animeforce.it/anime/seikoku-no-dragonar/"
    },
    {
        "id": 3021,
        "title": "Seikon no Qwaser",
        "href": "https://www.animeforce.it/anime/seikon-no-qwaser/"
    },
    {
        "id": 3023,
        "title": "Seikon no Qwaser 2",
        "href": "https://www.animeforce.it/anime/seikon-no-qwaser-2/"
    },
    {
        "id": 3025,
        "title": "Seirei Gensouki",
        "href": "https://www.animeforce.it/anime/seirei-gensouki/"
    },
    {
        "id": 3027,
        "title": "Seirei Tsukai no Blade Dance",
        "href": "https://www.animeforce.it/anime/seirei-tsukai-no-blade-dance/"
    },
    {
        "id": 3029,
        "title": "Seiren",
        "href": "https://www.animeforce.it/anime/seiren/"
    },
    {
        "id": 3031,
        "title": "Seisen Cerberus",
        "href": "https://www.animeforce.it/anime/seisen-cerberus/"
    },
    {
        "id": 3033,
        "title": "Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai",
        "href": "https://www.animeforce.it/anime/seishun-buta-yarou-wa-bunny-girl-senpai-no-yume-wo-minai/"
    },
    {
        "id": 3035,
        "title": "Seishun Buta Yarou wa Yumemiru Shoujo no Yume wo Minai",
        "href": "https://www.animeforce.it/anime/seishun-buta-yarou-wa-yumemiru-shoujo-no-yume-wo-minai/"
    },
    {
        "id": 3037,
        "title": "Seitokai no Ichizon",
        "href": "https://www.animeforce.it/anime/seitokai-no-ichizon/"
    },
    {
        "id": 3039,
        "title": "Seitokai no Ichizon Lv 2",
        "href": "https://www.animeforce.it/anime/seitokai-no-ichizon-lv-2/"
    },
    {
        "id": 3041,
        "title": "Seitokai Yakuindomo",
        "href": "https://www.animeforce.it/anime/seitokai-yakuindomo/"
    },
    {
        "id": 3043,
        "title": "Seitokai Yakuindomo 2",
        "href": "https://www.animeforce.it/anime/seitokai-yakuindomo-2/"
    },
    {
        "id": 3045,
        "title": "Seitokai Yakuindomo Movie",
        "href": "https://www.animeforce.it/anime/seitokai-yakuindomo-movie/"
    },
    {
        "id": 3047,
        "title": "Sekai de Ichiban Tsuyoku Naritai!",
        "href": "https://www.animeforce.it/anime/sekai-de-ichiban-tsuyoku-naritai/"
    },
    {
        "id": 3049,
        "title": "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
        "href": "https://www.animeforce.it/anime/sekai-saikou-no-ansatsusha-isekai-kizoku-ni-tensei-suru/"
    },
    {
        "id": 3051,
        "title": "Sekai Seifuku: Bouryaku no Zvezda",
        "href": "https://www.animeforce.it/anime/sekai-seifuku-bouryaku-no-zvezda/"
    },
    {
        "id": 3053,
        "title": "Sekirei",
        "href": "https://www.animeforce.it/anime/sekirei/"
    },
    {
        "id": 3055,
        "title": "Sekirei: Pure Engagement",
        "href": "https://www.animeforce.it/anime/sekirei-pure-engagement/"
    },
    {
        "id": 3057,
        "title": "Sekkou Boys",
        "href": "https://www.animeforce.it/anime/sekkou-boys/"
    },
    {
        "id": 3059,
        "title": "Selector Infected Wixoss",
        "href": "https://www.animeforce.it/anime/selector-infected-wixoss/"
    },
    {
        "id": 3061,
        "title": "Selector Spread Wixoss",
        "href": "https://www.animeforce.it/anime/selector-spread-wixoss/"
    },
    {
        "id": 3063,
        "title": "Sengoku Basara 2",
        "href": "https://www.animeforce.it/anime/sengoku-basara-2/"
    },
    {
        "id": 3065,
        "title": "Sengoku Basara: Judge End",
        "href": "https://www.animeforce.it/anime/sengoku-basara-judge-end/"
    },
    {
        "id": 3067,
        "title": "Sengoku Musou",
        "href": "https://www.animeforce.it/anime/sengoku-musou/"
    },
    {
        "id": 3069,
        "title": "Sengoku Night Blood",
        "href": "https://www.animeforce.it/anime/sengoku-night-blood/"
    },
    {
        "id": 3071,
        "title": "Senjuushi",
        "href": "https://www.animeforce.it/anime/senjuushi/"
    },
    {
        "id": 3073,
        "title": "Senki Zesshou Symphogear",
        "href": "https://www.animeforce.it/anime/senki-zesshou-symphogear/"
    },
    {
        "id": 3075,
        "title": "Senki Zesshou Symphogear AXZ",
        "href": "https://www.animeforce.it/anime/senki-zesshou-symphogear-axz/"
    },
    {
        "id": 3077,
        "title": "Senki Zesshou Symphogear G",
        "href": "https://www.animeforce.it/anime/senki-zesshou-symphogear-g/"
    },
    {
        "id": 3079,
        "title": "Senki Zesshou Symphogear GX",
        "href": "https://www.animeforce.it/anime/senki-zesshou-symphogear-gx/"
    },
    {
        "id": 3081,
        "title": "Senki Zesshou Symphogear XV",
        "href": "https://www.animeforce.it/anime/senki-zesshou-symphogear-xv/"
    },
    {
        "id": 3083,
        "title": "Senpai ga Uzai Kouhai no Hanashi",
        "href": "https://www.animeforce.it/anime/senpai-ga-uzai-kouhai-no-hanashi/"
    },
    {
        "id": 3085,
        "title": "Senran Kagura",
        "href": "https://www.animeforce.it/anime/saenai-heroine-no-sodatekata-flat-sub-ita/"
    },
    {
        "id": 3087,
        "title": "Senran Kagura Shinovi Master – Tokyo Youma-hen",
        "href": "https://www.animeforce.it/anime/senran-kagura-shinovi-master-tokyo-youma-hen/"
    },
    {
        "id": 3089,
        "title": "Senryuu Shoujo",
        "href": "https://www.animeforce.it/anime/senryuu-shoujo/"
    },
    {
        "id": 3091,
        "title": "Sentouin, Hakenshimasu!",
        "href": "https://www.animeforce.it/anime/sentouin-hakenshimasu/"
    },
    {
        "id": 3093,
        "title": "Senyoku no Sigrdrifa",
        "href": "https://www.animeforce.it/anime/senyoku-no-sigrdrifa/"
    },
    {
        "id": 3095,
        "title": "Senyuu",
        "href": "https://www.animeforce.it/anime/senyuu/"
    },
    {
        "id": 3097,
        "title": "Senyuu 2",
        "href": "https://www.animeforce.it/anime/senyuu-2/"
    },
    {
        "id": 3099,
        "title": "Servamp",
        "href": "https://www.animeforce.it/anime/servamp/"
    },
    {
        "id": 3101,
        "title": "Servant X Service",
        "href": "https://www.animeforce.it/anime/servant-x-service/"
    },
    {
        "id": 3103,
        "title": "Seto no Hanayome",
        "href": "https://www.animeforce.it/anime/seto-no-hanayome/"
    },
    {
        "id": 3105,
        "title": "Seven Knights Revolution: Eiyuu no Keishousha",
        "href": "https://www.animeforce.it/anime/seven-knights-revolution-eiyuu-no-keishousha/"
    },
    {
        "id": 3107,
        "title": "Sewayaki Kitsune no Senko-san",
        "href": "https://www.animeforce.it/anime/sewayaki-kitsune-no-senko-san/"
    },
    {
        "id": 3109,
        "title": "Shachou, Battle no Jikan Desu!",
        "href": "https://www.animeforce.it/anime/shachou-battle-no-jikan-desu/"
    },
    {
        "id": 3111,
        "title": "Shadows House",
        "href": "https://www.animeforce.it/anime/shadows-house/"
    },
    {
        "id": 3113,
        "title": "Shadowverse",
        "href": "https://www.animeforce.it/anime/shadowverse/"
    },
    {
        "id": 3115,
        "title": "Shakugan No Shana",
        "href": "https://www.animeforce.it/anime/shakugan-no-shana/"
    },
    {
        "id": 3117,
        "title": "Shakugan No Shana II (Second)",
        "href": "https://www.animeforce.it/anime/shakugan-no-shana-ii-second/"
    },
    {
        "id": 3119,
        "title": "Shakugan No Shana III (Final)",
        "href": "https://www.animeforce.it/anime/shakugan-no-shana-iii-final/"
    },
    {
        "id": 3121,
        "title": "Shakugan No Shana Movie",
        "href": "https://www.animeforce.it/anime/shakugan-no-shana-movie/"
    },
    {
        "id": 3123,
        "title": "Shakugan No Shana S",
        "href": "https://www.animeforce.it/anime/shakugan-no-shana-s/"
    },
    {
        "id": 3125,
        "title": "Shakunetsu Kabaddi",
        "href": "https://www.animeforce.it/anime/shakunetsu-kabaddi/"
    },
    {
        "id": 3127,
        "title": "Shakunetsu no Takkyuu Musume",
        "href": "https://www.animeforce.it/anime/shakunetsu-no-takkyuu-musume/"
    },
    {
        "id": 3129,
        "title": "Shaman King (2021)",
        "href": "https://www.animeforce.it/anime/shaman-king-2021/"
    },
    {
        "id": 3131,
        "title": "Shichisei no Subaru",
        "href": "https://www.animeforce.it/anime/shichisei-no-subaru/"
    },
    {
        "id": 3133,
        "title": "Shigatsu wa Kimi no Uso",
        "href": "https://www.animeforce.it/anime/shigatsu-wa-kimi-no-uso/"
    },
    {
        "id": 3135,
        "title": "Shijou saikyou no deshi Kenichi",
        "href": "https://www.animeforce.it/anime/shijou-saikyou-no-deshi-kenichi/"
    },
    {
        "id": 3137,
        "title": "Shiki",
        "href": "https://www.animeforce.it/anime/shiki/"
    },
    {
        "id": 3139,
        "title": "Shimoneta to Iu Gainen ga Sonzai Shinai Taikutsu na Sekai",
        "href": "https://www.animeforce.it/anime/shimoneta-to-iu-gainen-ga-sonzai-shinai-taikutsu-na-sekai/"
    },
    {
        "id": 3141,
        "title": "Shin Chuuka Ichiban!",
        "href": "https://www.animeforce.it/anime/shin-chuuka-ichiban/"
    },
    {
        "id": 3143,
        "title": "Shin Chuuka Ichiban! 2",
        "href": "https://www.animeforce.it/anime/shin-chuuka-ichiban-2/"
    },
    {
        "id": 3145,
        "title": "Shin no Nakama ja Nai to Yuusha no Party wo Oidasareta node, Henkyou de Slow Life suru Koto ni Shimashita",
        "href": "https://www.animeforce.it/anime/shin-no-nakama-ja-nai-to-yuusha-no-party-wo-oidasareta-node-henkyou-de-slow-life-suru-koto-ni-shimashita/"
    },
    {
        "id": 3147,
        "title": "Shin Sakura Taisen the Animation",
        "href": "https://www.animeforce.it/anime/shin-sakura-taisen-the-animation/"
    },
    {
        "id": 3149,
        "title": "Shinchou Yuusha: Kono Yuusha ga Ore Tueee Kuse ni Shinchou Sugiru",
        "href": "https://www.animeforce.it/anime/shinchou-yuusha-kono-yuusha-ga-ore-tueee-kuse-ni-shinchou-sugiru/"
    },
    {
        "id": 3151,
        "title": "Shingeki no Bahamut: Genesis",
        "href": "https://www.animeforce.it/anime/shingeki-no-bahamut-genesis/"
    },
    {
        "id": 3153,
        "title": "Shingeki no Bahamut: Virgin Soul",
        "href": "https://www.animeforce.it/anime/shingeki-no-bahamut-virgin-soul/"
    },
    {
        "id": 3155,
        "title": "Shingeki no Kyojin",
        "href": "https://www.animeforce.it/anime/shingeki-no-kyojin/"
    },
    {
        "id": 3157,
        "title": "Shingeki no Kyojin 2",
        "href": "https://www.animeforce.it/anime/shingeki-no-kyojin-2/"
    },
    {
        "id": 3159,
        "title": "Shingeki no Kyojin 3",
        "href": "https://www.animeforce.it/anime/shingeki-no-kyojin-3/"
    },
    {
        "id": 3161,
        "title": "Shingeki no Kyojin OAV",
        "href": "https://www.animeforce.it/anime/shingeki-no-kyojin-oav/"
    },
    {
        "id": 3163,
        "title": "Shingeki no Kyojin: Chronicle",
        "href": "https://www.animeforce.it/anime/shingeki-no-kyojin-chronicle/"
    },
    {
        "id": 3165,
        "title": "Shingeki no Kyojin: The Final Season",
        "href": "https://www.animeforce.it/anime/shingeki-no-kyojin-the-final-season/"
    },
    {
        "id": 3167,
        "title": "Shingeki! Kyojin Chuugakkou",
        "href": "https://www.animeforce.it/anime/shingeki-kyojin-chuugakkou/"
    },
    {
        "id": 3169,
        "title": "Shingetsutan Tsukihime",
        "href": "https://www.animeforce.it/anime/shingetsutan-tsukihime/"
    },
    {
        "id": 3171,
        "title": "Shinigami Bocchan to Kuro Maid",
        "href": "https://www.animeforce.it/anime/shinigami-bocchan-to-kuro-maid/"
    },
    {
        "id": 3173,
        "title": "Shining Hearts: Shiawase no Pan",
        "href": "https://www.animeforce.it/anime/shining-hearts-shiawase-no-pan/"
    },
    {
        "id": 3175,
        "title": "Shinka no Mi: Shiranai Uchi ni Kachigumi Jinsei",
        "href": "https://www.animeforce.it/anime/shinka-no-mi-shiranai-uchi-ni-kachigumi-jinsei/"
    },
    {
        "id": 3177,
        "title": "Shinkyoku Soukai Polyphonica",
        "href": "https://www.animeforce.it/anime/shinkyoku-soukai-polyphonica/"
    },
    {
        "id": 3179,
        "title": "Shinkyoku Soukai Polyphonica Crimson S",
        "href": "https://www.animeforce.it/anime/shinkyoku-soukai-polyphonica-crimson-s/"
    },
    {
        "id": 3181,
        "title": "Shinmai Maou no Testament",
        "href": "https://www.animeforce.it/anime/shinmai-maou-no-testament/"
    },
    {
        "id": 3183,
        "title": "Shinmai Maou no Testament Burst",
        "href": "https://www.animeforce.it/anime/shinmai-maou-no-testament-burst/"
    },
    {
        "id": 3185,
        "title": "Shinmai Maou no Testament Departures",
        "href": "https://www.animeforce.it/anime/shinmai-maou-no-testament-departures/"
    },
    {
        "id": 3187,
        "title": "Shinryaku! Ika Musume",
        "href": "https://www.animeforce.it/anime/shinryaku-ika-musume/"
    },
    {
        "id": 3189,
        "title": "Shinryaku!? Ika Musume Season 2",
        "href": "https://www.animeforce.it/anime/shinryaku-ika-musume-season-2/"
    },
    {
        "id": 3191,
        "title": "Shinsekai Yori",
        "href": "https://www.animeforce.it/anime/shinsekai-yori/"
    },
    {
        "id": 3193,
        "title": "Shinya! Tensai Bakabon",
        "href": "https://www.animeforce.it/anime/shinya-tensai-bakabon/"
    },
    {
        "id": 3195,
        "title": "Shirobako",
        "href": "https://www.animeforce.it/anime/shirobako/"
    },
    {
        "id": 3197,
        "title": "Shirogane no Ishi: Argevollen",
        "href": "https://www.animeforce.it/anime/shirogane-no-ishi-argevollen/"
    },
    {
        "id": 3199,
        "title": "Shiroi Suna no Aquatope",
        "href": "https://www.animeforce.it/anime/shiroi-suna-no-aquatope/"
    },
    {
        "id": 3201,
        "title": "Shironeko Project: Zero Chronicle",
        "href": "https://www.animeforce.it/anime/shironeko-project-zero-chronicle/"
    },
    {
        "id": 3203,
        "title": "Shokugeki no Souma",
        "href": "https://www.animeforce.it/anime/shokugeki-no-souma/"
    },
    {
        "id": 3205,
        "title": "Shokugeki no Souma: Gou no Sara",
        "href": "https://www.animeforce.it/anime/shokugeki-no-souma-gou-no-sara/"
    },
    {
        "id": 3207,
        "title": "Shokugeki no Souma: Ni no Sara",
        "href": "https://www.animeforce.it/anime/shokugeki-no-souma-ni-no-sara/"
    },
    {
        "id": 3209,
        "title": "Shokugeki no Souma: San no Sara",
        "href": "https://www.animeforce.it/anime/shokugeki-no-souma-san-no-sara/"
    },
    {
        "id": 3211,
        "title": "Shokugeki no Souma: San no Sara – Tootsuki Ressha-hen",
        "href": "https://www.animeforce.it/anime/shokugeki-no-souma-san-no-sara-tootsuki-ressha-hen/"
    },
    {
        "id": 3213,
        "title": "Shokugeki no Souma: Shin no Sara",
        "href": "https://www.animeforce.it/anime/shokugeki-no-souma-shin-no-sara/"
    },
    {
        "id": 3215,
        "title": "Shomin Sample",
        "href": "https://www.animeforce.it/anime/shomin-sample/"
    },
    {
        "id": 3217,
        "title": "Shoujo Kageki Revue Starlight",
        "href": "https://www.animeforce.it/anime/shoujo-kageki-revue-starlight/"
    },
    {
        "id": 3219,
        "title": "Shoujo Shuumatsu Ryokou",
        "href": "https://www.animeforce.it/anime/shoujo-shuumatsu-ryokou/"
    },
    {
        "id": 3221,
        "title": "Shoujo-tachi wa Kouya wo Mezasu",
        "href": "https://www.animeforce.it/anime/shoujo-tachi-wa-kouya-wo-mezasu/"
    },
    {
        "id": 3223,
        "title": "Shoukoku no Altair",
        "href": "https://www.animeforce.it/anime/shoukoku-no-altair/"
    },
    {
        "id": 3225,
        "title": "Shoumetsu Toshi",
        "href": "https://www.animeforce.it/anime/shoumetsu-toshi/"
    },
    {
        "id": 3227,
        "title": "Shounen Maid",
        "href": "https://www.animeforce.it/anime/shounen-maid/"
    },
    {
        "id": 3229,
        "title": "Shouwa Genroku Rakugo Shinjuu",
        "href": "https://www.animeforce.it/anime/shouwa-genroku-rakugo-shinjuu/"
    },
    {
        "id": 3231,
        "title": "Shouwa Genroku Rakugo Shinjuu: Sukeroku Futatabi-hen",
        "href": "https://www.animeforce.it/anime/shouwa-genroku-rakugo-shinjuu-sukeroku-futatabi-hen/"
    },
    {
        "id": 3233,
        "title": "Shuffle",
        "href": "https://www.animeforce.it/anime/shuffle/"
    },
    {
        "id": 3235,
        "title": "Shuudengo, Capsule Hotel de, Joushi ni Binetsu Tsutawaru Yoru.",
        "href": "https://www.animeforce.it/anime/shuudengo-capsule-hotel-de-joushi-ni-binetsu-tsutawaru-yoru/"
    },
    {
        "id": 3237,
        "title": "Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?",
        "href": "https://www.animeforce.it/anime/shuumatsu-nani-shitemasu-ka-isogashii-desu-ka-sukutte-moratte-ii-desu-ka/"
    },
    {
        "id": 3239,
        "title": "Shuumatsu no Izetta",
        "href": "https://www.animeforce.it/anime/shuumatsu-no-izetta/"
    },
    {
        "id": 3241,
        "title": "Shuumatsu no Walküre",
        "href": "https://www.animeforce.it/anime/shuumatsu-no-walkure/"
    },
    {
        "id": 3243,
        "title": "Sin: Nanatsu no Taizai",
        "href": "https://www.animeforce.it/anime/sin-nanatsu-no-taizai/"
    },
    {
        "id": 3245,
        "title": "SK8 the Infinity",
        "href": "https://www.animeforce.it/anime/sk8-the-infinity/"
    },
    {
        "id": 3247,
        "title": "Skate-Leading☆Stars",
        "href": "https://www.animeforce.it/anime/skate-leading-stars/"
    },
    {
        "id": 3249,
        "title": "Skip Beat!",
        "href": "https://www.animeforce.it/anime/skip-beat/"
    },
    {
        "id": 3251,
        "title": "Skirt no Naka wa Kedamono Deshita",
        "href": "https://www.animeforce.it/anime/skirt-no-naka-wa-kedamono-deshita/"
    },
    {
        "id": 3253,
        "title": "Slime Taoshite 300-nen, Shiranai Uchi ni Level Max ni Nattemashita",
        "href": "https://www.animeforce.it/anime/slime-taoshite-300-nen-shiranai-uchi-ni-level-max-ni-nattemashita/"
    },
    {
        "id": 3255,
        "title": "Slow Start",
        "href": "https://www.animeforce.it/anime/slow-start/"
    },
    {
        "id": 3257,
        "title": "Sola",
        "href": "https://www.animeforce.it/anime/sola/"
    },
    {
        "id": 3259,
        "title": "Somali to Mori no Kamisama",
        "href": "https://www.animeforce.it/anime/somali-to-mori-no-kamisama/"
    },
    {
        "id": 3261,
        "title": "SoniAni: Super Sonico The Animation",
        "href": "https://www.animeforce.it/anime/soniani-super-sonico-the-animation/"
    },
    {
        "id": 3263,
        "title": "Sonny Boy",
        "href": "https://www.animeforce.it/anime/sonny-boy/"
    },
    {
        "id": 3265,
        "title": "Sono Toki, Kanojo wa.",
        "href": "https://www.animeforce.it/anime/toki-kanojo-wa/"
    },
    {
        "id": 3267,
        "title": "Sora no Manimani",
        "href": "https://www.animeforce.it/anime/sora-no-manimani/"
    },
    {
        "id": 3269,
        "title": "Sora no Method",
        "href": "https://www.animeforce.it/anime/sora-no-method/"
    },
    {
        "id": 3271,
        "title": "Sora No Otoshimono",
        "href": "https://www.animeforce.it/anime/sora-no-otoshimono/"
    },
    {
        "id": 3273,
        "title": "Sora No Otoshimono Final: Eternal My Master",
        "href": "https://www.animeforce.it/anime/sora-no-otoshimono-final-eternal-my-master/"
    },
    {
        "id": 3275,
        "title": "Sora No Otoshimono Forte",
        "href": "https://www.animeforce.it/anime/sora-no-otoshimono-forte/"
    },
    {
        "id": 3277,
        "title": "Sora No Otoshimono: The Angeloid of Clockwork",
        "href": "https://www.animeforce.it/anime/sora-no-otoshimono-the-angeloid-of-clockwork/"
    },
    {
        "id": 3279,
        "title": "Sora to Umi no Aida",
        "href": "https://www.animeforce.it/anime/sora-to-umi-no-aida/"
    },
    {
        "id": 3281,
        "title": "Sora yori mo Tooi Basho",
        "href": "https://www.animeforce.it/anime/sora-yori-mo-tooi-basho/"
    },
    {
        "id": 3283,
        "title": "Sore dake ga Neck",
        "href": "https://www.animeforce.it/anime/sore-dake-ga-neck/"
    },
    {
        "id": 3285,
        "title": "Soredemo Sekai wa Utsukushii",
        "href": "https://www.animeforce.it/anime/soredemo-sekai-wa-utsukushii/"
    },
    {
        "id": 3287,
        "title": "Soukou Musume Senki",
        "href": "https://www.animeforce.it/anime/soukou-musume-senki/"
    },
    {
        "id": 3289,
        "title": "Soukyuu no Fafner: Dead Agressor",
        "href": "https://www.animeforce.it/anime/soukyuu-no-fafner-dead-agressor/"
    },
    {
        "id": 3291,
        "title": "Soukyuu no Fafner: Dead Agressor – Exodus",
        "href": "https://www.animeforce.it/anime/soukyuu-no-fafner-dead-agressor-exodus/"
    },
    {
        "id": 3293,
        "title": "Soukyuu no Fafner: Dead Agressor – Exodus 2",
        "href": "https://www.animeforce.it/anime/soukyuu-no-fafner-dead-agressor-exodus-2/"
    },
    {
        "id": 3295,
        "title": "Soukyuu no Fafner: Dead Agressor – Heaven and Earth",
        "href": "https://www.animeforce.it/anime/soukyuu-no-fafner-dead-agressor-heaven-and-earth/"
    },
    {
        "id": 3297,
        "title": "Soul Buster",
        "href": "https://www.animeforce.it/anime/soul-buster/"
    },
    {
        "id": 3299,
        "title": "Soul Eater",
        "href": "https://www.animeforce.it/anime/soul-eater/"
    },
    {
        "id": 3301,
        "title": "Soul Eater Not!",
        "href": "https://www.animeforce.it/anime/soul-eater-not/"
    },
    {
        "id": 3303,
        "title": "Sounan Desu ka?",
        "href": "https://www.animeforce.it/anime/sounan-desu-ka/"
    },
    {
        "id": 3305,
        "title": "Souryo to Majiwaru Shikiyoku no Yoru ni… (TV)",
        "href": "https://www.animeforce.it/anime/souryo-to-majiwaru-shikiyoku-no-yoru-ni-tv/"
    },
    {
        "id": 3307,
        "title": "Souryo to Majiwaru Shikiyoku no Yoru ni… (Web)+18",
        "href": "https://www.animeforce.it/anime/souryo-to-majiwaru-shikiyoku-no-yoru-ni-web-18-sub-ita/"
    },
    {
        "id": 3309,
        "title": "Sousei no Onmyouji",
        "href": "https://www.animeforce.it/anime/sousei-no-onmyouji/"
    },
    {
        "id": 3311,
        "title": "Soushin Shoujo Matoi",
        "href": "https://www.animeforce.it/anime/soushin-shoujo-matoi/"
    },
    {
        "id": 3313,
        "title": "Souten no Ken: Regenesis 2",
        "href": "https://www.animeforce.it/anime/souten-no-ken-regenesis-2/"
    },
    {
        "id": 3315,
        "title": "Space Dandy",
        "href": "https://www.animeforce.it/anime/space-dandy/"
    },
    {
        "id": 3317,
        "title": "Space Dandy 2",
        "href": "https://www.animeforce.it/anime/space-dandy-2/"
    },
    {
        "id": 3319,
        "title": "Spice and Wolf",
        "href": "https://www.animeforce.it/anime/spice-and-wolf/"
    },
    {
        "id": 3321,
        "title": "Spice and Wolf 2",
        "href": "https://www.animeforce.it/anime/spice-and-wolf-2/"
    },
    {
        "id": 3323,
        "title": "Spiritpact",
        "href": "https://www.animeforce.it/anime/spiritpact/"
    },
    {
        "id": 3325,
        "title": "Spiritpact: Yomi no Chigiri",
        "href": "https://www.animeforce.it/anime/spiritpact-yomi-no-chigiri/"
    },
    {
        "id": 3327,
        "title": "SSSS.Dynazenon",
        "href": "https://www.animeforce.it/anime/ssss-dynazenon/"
    },
    {
        "id": 3329,
        "title": "SSSS.Gridman",
        "href": "https://www.animeforce.it/anime/ssss-gridman/"
    },
    {
        "id": 3331,
        "title": "Stand My Heroes: Piece of Truth",
        "href": "https://www.animeforce.it/anime/stand-my-heroes-piece-of-truth/"
    },
    {
        "id": 3333,
        "title": "Star Driver: Kagayaki no Takuto",
        "href": "https://www.animeforce.it/anime/star-driver-kagayaki-no-takuto/"
    },
    {
        "id": 3335,
        "title": "Starmyu",
        "href": "https://www.animeforce.it/anime/starmyu/"
    },
    {
        "id": 3337,
        "title": "Starmyu 2",
        "href": "https://www.animeforce.it/anime/starmyu-2/"
    },
    {
        "id": 3339,
        "title": "Starmyu 3",
        "href": "https://www.animeforce.it/anime/starmyu-3/"
    },
    {
        "id": 3341,
        "title": "Steins;Gate",
        "href": "https://www.animeforce.it/anime/steinsgate/"
    },
    {
        "id": 3343,
        "title": "Steins;Gate 0",
        "href": "https://www.animeforce.it/anime/steinsgate-0/"
    },
    {
        "id": 3345,
        "title": "Steins;Gate Movie: Fuka Ryouiki no Déjà vu",
        "href": "https://www.animeforce.it/anime/steinsgate-movie-fuka-ryouiki-no-deja-vu/"
    },
    {
        "id": 3347,
        "title": "Stella Jogakuin Koutou-ka C3-bu",
        "href": "https://www.animeforce.it/anime/stella-jogakuin-koutou-ka-c3-bu/"
    },
    {
        "id": 3349,
        "title": "Stella no Mahou",
        "href": "https://www.animeforce.it/anime/stella-no-mahou/"
    },
    {
        "id": 3351,
        "title": "Strange+",
        "href": "https://www.animeforce.it/anime/strange/"
    },
    {
        "id": 3353,
        "title": "Strange+ 2",
        "href": "https://www.animeforce.it/anime/strange-2/"
    },
    {
        "id": 3355,
        "title": "Strike the Blood",
        "href": "https://www.animeforce.it/anime/strike-the-blood/"
    },
    {
        "id": 3357,
        "title": "Strike the Blood II",
        "href": "https://www.animeforce.it/anime/strike-the-blood-ii/"
    },
    {
        "id": 3359,
        "title": "Strike the Blood III",
        "href": "https://www.animeforce.it/anime/strike-the-blood-iii/"
    },
    {
        "id": 3361,
        "title": "Strike the Blood IV",
        "href": "https://www.animeforce.it/anime/strike-the-blood-iv/"
    },
    {
        "id": 3363,
        "title": "Strike the Blood: Kieta Seisou-hen",
        "href": "https://www.animeforce.it/anime/strike-the-blood-kieta-seisou-hen/"
    },
    {
        "id": 3365,
        "title": "Strike Witches: Road to Berlin",
        "href": "https://www.animeforce.it/anime/strike-witches-road-to-berlin/"
    },
    {
        "id": 3367,
        "title": "Subarashiki Kono Sekai The Animation",
        "href": "https://www.animeforce.it/anime/subarashiki-kono-sekai-the-animation/"
    },
    {
        "id": 3369,
        "title": "Subete ga F ni Naru",
        "href": "https://www.animeforce.it/anime/subete-ga-f-ni-naru/"
    },
    {
        "id": 3371,
        "title": "Suisei no Gargantia",
        "href": "https://www.animeforce.it/anime/suisei-no-gargantia/"
    },
    {
        "id": 3373,
        "title": "Suisei no Gargantia: Meguru Kouro, Haruka",
        "href": "https://www.animeforce.it/anime/suisei-no-gargantia-meguru-kouro-haruka/"
    },
    {
        "id": 3375,
        "title": "Sukitte li na yo",
        "href": "https://www.animeforce.it/anime/sukitte-li-na-yo/"
    },
    {
        "id": 3377,
        "title": "Sumomomo Momomo: Chijou Saikyou no Yome",
        "href": "https://www.animeforce.it/anime/sumomomo-momomo-chijou-saikyou-no-yome/"
    },
    {
        "id": 3379,
        "title": "Sunoharasou no Kanrinin-san",
        "href": "https://www.animeforce.it/anime/sunoharasou-no-kanrinin-san/"
    },
    {
        "id": 3381,
        "title": "Super Cub",
        "href": "https://www.animeforce.it/anime/super-cub/"
    },
    {
        "id": 3383,
        "title": "Super Dragon Ball Heroes",
        "href": "https://www.animeforce.it/anime/super-dragon-ball-heroes/"
    },
    {
        "id": 3385,
        "title": "Super Lovers",
        "href": "https://www.animeforce.it/anime/super-lovers/"
    },
    {
        "id": 3387,
        "title": "Super Lovers 2",
        "href": "https://www.animeforce.it/anime/super-lovers-2/"
    },
    {
        "id": 3389,
        "title": "Suzuka",
        "href": "https://www.animeforce.it/anime/suzuka/"
    },
    {
        "id": 3391,
        "title": "Sword Art Online",
        "href": "https://www.animeforce.it/anime/sword-art-online/"
    },
    {
        "id": 3393,
        "title": "Sword Art Online Alternative: Gun Gale Online",
        "href": "https://www.animeforce.it/anime/sword-art-online-alternative-gun-gale-online/"
    },
    {
        "id": 3395,
        "title": "Sword Art Online II",
        "href": "https://www.animeforce.it/anime/sword-art-online-ii/"
    },
    {
        "id": 3397,
        "title": "Sword Art Online: Alicization",
        "href": "https://www.animeforce.it/anime/sword-art-online-alicization/"
    },
    {
        "id": 3399,
        "title": "Sword Art Online: Alicization – War of Underworld",
        "href": "https://www.animeforce.it/anime/sword-art-online-alicization-war-of-underworld/"
    },
    {
        "id": 3401,
        "title": "Sword Art Online: Alicization – War of Underworld 2",
        "href": "https://www.animeforce.it/anime/sword-art-online-alicization-war-of-underworld-2/"
    },
    {
        "id": 3403,
        "title": "Sword Art Online: Ordinal Scale",
        "href": "https://www.animeforce.it/anime/sword-art-online-ordinal-scale/"
    },
    {
        "id": 3405,
        "title": "Ta ga Tame no Alchemist",
        "href": "https://www.animeforce.it/anime/ta-ga-tame-no-alchemist/"
    },
    {
        "id": 3407,
        "title": "Taboo Tattoo",
        "href": "https://www.animeforce.it/anime/taboo-tattoo/"
    },
    {
        "id": 3409,
        "title": "Tachibanakan to Lie Angle",
        "href": "https://www.animeforce.it/anime/tachibanakan-to-lie-angle/"
    },
    {
        "id": 3411,
        "title": "Tada-kun wa Koi wo Shinai",
        "href": "https://www.animeforce.it/anime/tada-kun-wa-koi-wo-shinai/"
    },
    {
        "id": 3413,
        "title": "Taifuu no Noruda",
        "href": "https://www.animeforce.it/anime/taifuu-no-noruda/"
    },
    {
        "id": 3415,
        "title": "Taimadou Gakuen 35 Shiken Shoutai",
        "href": "https://www.animeforce.it/anime/taimadou-gakuen-35-shiken-shoutai/"
    },
    {
        "id": 3417,
        "title": "Taishou Chicchai-san",
        "href": "https://www.animeforce.it/anime/taishou-chicchai-san/"
    },
    {
        "id": 3419,
        "title": "Taishou Otome Otogibanashi",
        "href": "https://www.animeforce.it/anime/taishou-otome-otogibanashi/"
    },
    {
        "id": 3421,
        "title": "Taiso Samurai",
        "href": "https://www.animeforce.it/anime/taiso-samurai/"
    },
    {
        "id": 3423,
        "title": "Takanashi Rikka Kai: Chuunibyou demo Koi ga Shitai! Movie",
        "href": "https://www.animeforce.it/anime/takanashi-rikka-kai-chuunibyou-demo-koi-ga-shitai-movie/"
    },
    {
        "id": 3425,
        "title": "Takt Op. Destiny",
        "href": "https://www.animeforce.it/anime/takt-op-destiny/"
    },
    {
        "id": 3427,
        "title": "Takunomi.",
        "href": "https://www.animeforce.it/anime/takunomi/"
    },
    {
        "id": 3429,
        "title": "Tales of the Abyss",
        "href": "https://www.animeforce.it/anime/tales-of-the-abyss/"
    },
    {
        "id": 3431,
        "title": "Tales of Zestiria the X",
        "href": "https://www.animeforce.it/anime/tales-of-zestiria-the-x/"
    },
    {
        "id": 3433,
        "title": "Tales of Zestiria: Doushi no Yoake",
        "href": "https://www.animeforce.it/anime/tales-of-zestiria-doushi-no-yoake/"
    },
    {
        "id": 3435,
        "title": "Tamako Market",
        "href": "https://www.animeforce.it/anime/tamako-market/"
    },
    {
        "id": 3437,
        "title": "Tamayomi",
        "href": "https://www.animeforce.it/anime/tamayomi/"
    },
    {
        "id": 3439,
        "title": "Tamayura",
        "href": "https://www.animeforce.it/anime/tamayura/"
    },
    {
        "id": 3441,
        "title": "Tamayura: Hitotose",
        "href": "https://www.animeforce.it/anime/tamayura-hitotose/"
    },
    {
        "id": 3443,
        "title": "Tamayura: More Aggressive",
        "href": "https://www.animeforce.it/anime/tamayura-more-aggressive/"
    },
    {
        "id": 3445,
        "title": "Tanaka-kun wa Itsumo Kedaruge",
        "href": "https://www.animeforce.it/anime/tanaka-kun-wa-itsumo-kedaruge/"
    },
    {
        "id": 3447,
        "title": "Tantei Kageki Milky Holmes TD",
        "href": "https://www.animeforce.it/anime/tantei-kageki-milky-holmes-td/"
    },
    {
        "id": 3449,
        "title": "Tantei Opera Milky Holmes",
        "href": "https://www.animeforce.it/anime/tantei-opera-milky-holmes/"
    },
    {
        "id": 3451,
        "title": "Tantei Opera Milky Holmes Dai 2 Maku",
        "href": "https://www.animeforce.it/anime/tantei-opera-milky-holmes-dai-2-maku/"
    },
    {
        "id": 3453,
        "title": "Tantei Team KZ Jiken Note",
        "href": "https://www.animeforce.it/anime/tantei-team-kz-jiken-note/"
    },
    {
        "id": 3455,
        "title": "Tantei wa Mou, Shindeiru.",
        "href": "https://www.animeforce.it/anime/tantei-wa-mou-shindeiru/"
    },
    {
        "id": 3457,
        "title": "Tari Tari",
        "href": "https://www.animeforce.it/anime/tari-tari/"
    },
    {
        "id": 3459,
        "title": "Tasogare Otome x Amnesia",
        "href": "https://www.animeforce.it/anime/tasogare-otome-x-amnesia/"
    },
    {
        "id": 3461,
        "title": "Tate no Yuusha no Nariagari",
        "href": "https://www.animeforce.it/anime/tate-no-yuusha-no-nariagari/"
    },
    {
        "id": 3463,
        "title": "Tatoeba Last Dungeon Mae no Mura no Shounen ga Joban no Machi de Kurasu Youna Monogatari",
        "href": "https://www.animeforce.it/anime/tatoeba-last-dungeon-mae-no-mura-no-shounen-ga-joban-no-machi-de-kurasu-youna-monogatari/"
    },
    {
        "id": 3465,
        "title": "Tayutama: Kiss on My Deity",
        "href": "https://www.animeforce.it/anime/tayutama-kiss-on-my-deity/"
    },
    {
        "id": 3467,
        "title": "Tears to Tiara",
        "href": "https://www.animeforce.it/anime/tears-to-tiara/"
    },
    {
        "id": 3469,
        "title": "Tejina-senpai",
        "href": "https://www.animeforce.it/anime/tejina-senpai/"
    },
    {
        "id": 3471,
        "title": "Telepathy Shoujo Ran",
        "href": "https://www.animeforce.it/anime/telepathy-shoujo-ran/"
    },
    {
        "id": 3473,
        "title": "Tenchi Muyo! GXP",
        "href": "https://www.animeforce.it/anime/tenchi-muyo-gxp/"
    },
    {
        "id": 3475,
        "title": "Tenchi Souzou Design-bu",
        "href": "https://www.animeforce.it/anime/tenchi-souzou-design-bu/"
    },
    {
        "id": 3477,
        "title": "Tenrou: Sirius the Jaeger",
        "href": "https://www.animeforce.it/anime/tenrou-sirius-the-jaeger/"
    },
    {
        "id": 3479,
        "title": "Tensei Shitara Slime Datta Ken",
        "href": "https://www.animeforce.it/anime/tensei-shitara-slime-datta-ken/"
    },
    {
        "id": 3481,
        "title": "Tensei Shitara Slime Datta Ken 2",
        "href": "https://www.animeforce.it/anime/tensei-shitara-slime-datta-ken-2/"
    },
    {
        "id": 3483,
        "title": "Tenshi no 3P!",
        "href": "https://www.animeforce.it/anime/tenshi-no-3p/"
    },
    {
        "id": 3485,
        "title": "Tensura Nikki: Tensei Shitara Slime Datta Ken",
        "href": "https://www.animeforce.it/anime/tensura-nikki-tensei-shitara-slime-datta-ken/"
    },
    {
        "id": 3487,
        "title": "Terra Formars",
        "href": "https://www.animeforce.it/anime/terra-formars/"
    },
    {
        "id": 3489,
        "title": "Terra Formars: Bugs2 2599",
        "href": "https://www.animeforce.it/anime/terra-formars-bugs2-2599/"
    },
    {
        "id": 3491,
        "title": "Terra Formars: Revenge",
        "href": "https://www.animeforce.it/anime/terra-formars-revenge/"
    },
    {
        "id": 3493,
        "title": "The God of High School",
        "href": "https://www.animeforce.it/anime/the-god-of-high-school/"
    },
    {
        "id": 3495,
        "title": "The [email protected]",
        "href": "https://www.animeforce.it/anime/the-idolmster/"
    },
    {
        "id": 3497,
        "title": "The [email protected]: Shiny Festa",
        "href": "https://www.animeforce.it/anime/the-idolmster-shiny-festa/"
    },
    {
        "id": 3499,
        "title": "The Legend of the Legendary Heroes",
        "href": "https://www.animeforce.it/anime/the-legend-of-the-legendary-heroes/"
    },
    {
        "id": 3501,
        "title": "The Reflection Wave One",
        "href": "https://www.animeforce.it/anime/the-reflection-wave-one/"
    },
    {
        "id": 3503,
        "title": "The Rolling Girls",
        "href": "https://www.animeforce.it/anime/the-rolling-girls/"
    },
    {
        "id": 3505,
        "title": "The Sacred Blacksmith",
        "href": "https://www.animeforce.it/anime/the-sacred-blacksmith/"
    },
    {
        "id": 3507,
        "title": "The Unlimited – Hyoubu Kyousuke",
        "href": "https://www.animeforce.it/anime/the-unlimited-hyoubu-kyousuke/"
    },
    {
        "id": 3509,
        "title": "Tiger Mask W",
        "href": "https://www.animeforce.it/anime/tiger-mask-w/"
    },
    {
        "id": 3511,
        "title": "Time Travel Shoujo",
        "href": "https://www.animeforce.it/anime/time-travel-shoujo/"
    },
    {
        "id": 3513,
        "title": "To Be Hero",
        "href": "https://www.animeforce.it/anime/to-be-hero/"
    },
    {
        "id": 3515,
        "title": "To Be Heroine",
        "href": "https://www.animeforce.it/anime/to-be-heroine/"
    },
    {
        "id": 3517,
        "title": "To LOVE-Ru",
        "href": "https://www.animeforce.it/anime/to-love-ru/"
    },
    {
        "id": 3519,
        "title": "To LOVE-Ru Darkness",
        "href": "https://www.animeforce.it/anime/to-love-ru-darkness/"
    },
    {
        "id": 3521,
        "title": "To LOVE-Ru Darkness 2",
        "href": "https://www.animeforce.it/anime/to-love-ru-darkness-2/"
    },
    {
        "id": 3523,
        "title": "Toaru Hikuushi e no Koiuta",
        "href": "https://www.animeforce.it/anime/toaru-hikuushi-no-koiuta/"
    },
    {
        "id": 3525,
        "title": "Toaru Kagaku no Accelerator",
        "href": "https://www.animeforce.it/anime/toaru-kagaku-no-accelerator/"
    },
    {
        "id": 3527,
        "title": "Toaru Kagaku no Railgun",
        "href": "https://www.animeforce.it/anime/toaru-kagaku-no-railgun/"
    },
    {
        "id": 3529,
        "title": "Toaru Kagaku no Railgun S",
        "href": "https://www.animeforce.it/anime/toaru-kagaku-no-railgun-s/"
    },
    {
        "id": 3531,
        "title": "Toaru Kagaku no Railgun T",
        "href": "https://www.animeforce.it/anime/toaru-kagaku-no-railgun-t/"
    },
    {
        "id": 3533,
        "title": "Toaru Majutsu no Index",
        "href": "https://www.animeforce.it/anime/toaru-majutsu-no-index/"
    },
    {
        "id": 3535,
        "title": "Toaru Majutsu no Index II",
        "href": "https://www.animeforce.it/anime/toaru-majutsu-no-index-ii/"
    },
    {
        "id": 3537,
        "title": "Toaru Majutsu no Index III",
        "href": "https://www.animeforce.it/anime/toaru-majutsu-no-index-iii/"
    },
    {
        "id": 3539,
        "title": "Togainu no Chi",
        "href": "https://www.animeforce.it/anime/togainu-no-chi/"
    },
    {
        "id": 3541,
        "title": "Toji no Miko",
        "href": "https://www.animeforce.it/anime/toji-no-miko/"
    },
    {
        "id": 3543,
        "title": "Toji no Miko: Kizamishi Issen no Tomoshibi",
        "href": "https://www.animeforce.it/anime/toji-no-miko-kizamishi-issen-no-tomoshibi/"
    },
    {
        "id": 3545,
        "title": "Tokyo ESP",
        "href": "https://www.animeforce.it/anime/tokyo-esp/"
    },
    {
        "id": 3547,
        "title": "Tokyo Ghoul",
        "href": "https://www.animeforce.it/anime/tokyo-ghoul/"
    },
    {
        "id": 3549,
        "title": "Tokyo Ghoul √A",
        "href": "https://www.animeforce.it/anime/tokyo-ghoul-%e2%88%9aa/"
    },
    {
        "id": 3551,
        "title": "Tokyo Ghoul: Jack",
        "href": "https://www.animeforce.it/anime/tokyo-ghoul-jack/"
    },
    {
        "id": 3553,
        "title": "Tokyo Ghoul: Pinto",
        "href": "https://www.animeforce.it/anime/tokyo-ghoul-pinto/"
    },
    {
        "id": 3555,
        "title": "Tokyo Ghoul:re",
        "href": "https://www.animeforce.it/anime/tokyo-ghoulre/"
    },
    {
        "id": 3557,
        "title": "Tokyo Ghoul:re 2",
        "href": "https://www.animeforce.it/anime/tokyo-ghoulre-2/"
    },
    {
        "id": 3559,
        "title": "Tokyo Ravens",
        "href": "https://www.animeforce.it/anime/tokyo-ravens/"
    },
    {
        "id": 3561,
        "title": "Tokyo Revengers",
        "href": "https://www.animeforce.it/anime/tokyo-revengers/"
    },
    {
        "id": 3563,
        "title": "Tonagura!",
        "href": "https://www.animeforce.it/anime/tonagura/"
    },
    {
        "id": 3565,
        "title": "Tonari no Kaibutsu-kun",
        "href": "https://www.animeforce.it/anime/tonari-no-kaibutsu-kun/"
    },
    {
        "id": 3567,
        "title": "Tonari no Kyuuketsuki-san",
        "href": "https://www.animeforce.it/anime/tonari-no-kyuuketsuki-san/"
    },
    {
        "id": 3569,
        "title": "Tonari no Seki-kun",
        "href": "https://www.animeforce.it/anime/tonari-no-seki-kun/"
    },
    {
        "id": 3571,
        "title": "Tonikaku Kawaii",
        "href": "https://www.animeforce.it/anime/tonikaku-kawaii/"
    },
    {
        "id": 3573,
        "title": "Tonkatsu DJ",
        "href": "https://www.animeforce.it/anime/tonkatsu-dj/"
    },
    {
        "id": 3575,
        "title": "Toriko",
        "href": "https://www.animeforce.it/anime/toriko/"
    },
    {
        "id": 3577,
        "title": "Toshokan Sensou",
        "href": "https://www.animeforce.it/anime/toshokan-sensou/"
    },
    {
        "id": 3579,
        "title": "Touhai Densetsu Akagi: Yami ni Maiorita Tensai",
        "href": "https://www.animeforce.it/anime/touhai-densetsu-akagi-yami-ni-maiorita-tensai/"
    },
    {
        "id": 3581,
        "title": "Touken Ranbu: Hanamaru",
        "href": "https://www.animeforce.it/anime/touken-ranbu-hanamaru/"
    },
    {
        "id": 3583,
        "title": "Tower of God",
        "href": "https://www.animeforce.it/anime/tower-of-god/"
    },
    {
        "id": 3585,
        "title": "Triage X",
        "href": "https://www.animeforce.it/anime/triage-x/"
    },
    {
        "id": 3587,
        "title": "Trickster: Edogawa Ranpo “Shounen Tanteidan” yori",
        "href": "https://www.animeforce.it/anime/trickster-edogawa-ranpo-shounen-tanteidan-yori/"
    },
    {
        "id": 3589,
        "title": "Trinity Seven",
        "href": "https://www.animeforce.it/anime/trinity-seven/"
    },
    {
        "id": 3591,
        "title": "True Tears",
        "href": "https://www.animeforce.it/anime/true-tears-sub-ita/"
    },
    {
        "id": 3593,
        "title": "Try Knights",
        "href": "https://www.animeforce.it/anime/try-knights/"
    },
    {
        "id": 3595,
        "title": "Tsugu Tsugumomo",
        "href": "https://www.animeforce.it/anime/tsugu-tsugumomo/"
    },
    {
        "id": 3597,
        "title": "Tsugumomo",
        "href": "https://www.animeforce.it/anime/tsugumomo/"
    },
    {
        "id": 3599,
        "title": "Tsuki ga Kirei",
        "href": "https://www.animeforce.it/anime/tsuki-ga-kirei/"
    },
    {
        "id": 3601,
        "title": "Tsuki ga Michibiku Isekai Douchuu",
        "href": "https://www.animeforce.it/anime/tsuki-ga-michibiku-isekai-douchuu/"
    },
    {
        "id": 3603,
        "title": "Tsuki to Laika to Nosferatu",
        "href": "https://www.animeforce.it/anime/tsuki-to-laika-to-nosferatu/"
    },
    {
        "id": 3605,
        "title": "Tsuki wa Higashi ni Hi wa Nishi ni: Operation Sanctuary",
        "href": "https://www.animeforce.it/anime/tsuki-wa-higashi-ni-hi-wa-nishi-ni-operation-sanctuary/"
    },
    {
        "id": 3607,
        "title": "Tsukimonogatari",
        "href": "https://www.animeforce.it/anime/tsukimonogatari/"
    },
    {
        "id": 3609,
        "title": "Tsukipro The Animation",
        "href": "https://www.animeforce.it/anime/tsukipro-the-animation/"
    },
    {
        "id": 3611,
        "title": "Tsukiuta. The Animation",
        "href": "https://www.animeforce.it/anime/tsukiuta-the-animation/"
    },
    {
        "id": 3613,
        "title": "Tsukiuta. The Animation 2",
        "href": "https://www.animeforce.it/anime/tsukiuta-the-animation-2/"
    },
    {
        "id": 3615,
        "title": "Tsukumogami Kashimasu",
        "href": "https://www.animeforce.it/anime/tsukumogami-kashimasu/"
    },
    {
        "id": 3617,
        "title": "Tsurezure Children",
        "href": "https://www.animeforce.it/anime/tsurezure-children/"
    },
    {
        "id": 3619,
        "title": "Tsurune: Kazemai Koukou Kyuudoubu",
        "href": "https://www.animeforce.it/anime/tsurune-kazemai-koukou-kyuudoubu/"
    },
    {
        "id": 3621,
        "title": "Tsuujou Kougeki ga Zentai Kougeki de Ni-kai Kougeki no Okaasan wa Suki Desu ka?",
        "href": "https://www.animeforce.it/anime/tsuujou-kougeki-ga-zentai-kougeki-de-ni-kai-kougeki-no-okaasan-wa-suki-desu-ka/"
    },
    {
        "id": 3623,
        "title": "Tsuyokiss Cool x Sweet",
        "href": "https://www.animeforce.it/anime/tsuyokiss-cool-x-sweet/"
    },
    {
        "id": 3625,
        "title": "Twin Angel Break",
        "href": "https://www.animeforce.it/anime/twin-angel-break/"
    },
    {
        "id": 3627,
        "title": "Two Car",
        "href": "https://www.animeforce.it/anime/two-car/"
    },
    {
        "id": 3629,
        "title": "Uchi no Ko no Tame Naraba, Ore wa Moshikashitara Maou mo Taoseru Kamo Shirenai",
        "href": "https://www.animeforce.it/anime/uchi-no-ko-no-tame-naraba-ore-wa-moshikashitara-maou-mo-taoseru-kamo-shirenai/"
    },
    {
        "id": 3631,
        "title": "Uchi no Maid ga Uzasugiru!",
        "href": "https://www.animeforce.it/anime/uchi-no-maid-ga-uzasugiru/"
    },
    {
        "id": 3633,
        "title": "Uchouten Kazoku",
        "href": "https://www.animeforce.it/anime/uchouten-kazoku/"
    },
    {
        "id": 3635,
        "title": "Uchouten Kazoku 2",
        "href": "https://www.animeforce.it/anime/uchouten-kazoku-2/"
    },
    {
        "id": 3637,
        "title": "Uchuu Patrol Luluco",
        "href": "https://www.animeforce.it/anime/uchuu-patrol-luluco/"
    },
    {
        "id": 3639,
        "title": "Uchuu Senkan Tiramisu",
        "href": "https://www.animeforce.it/anime/uchuu-senkan-tiramisu/"
    },
    {
        "id": 3641,
        "title": "Uchuu Senkan Tiramisu 2",
        "href": "https://www.animeforce.it/anime/uchuu-senkan-tiramisu-2/"
    },
    {
        "id": 3643,
        "title": "Udon no Kuni no Kiniro Kemari",
        "href": "https://www.animeforce.it/anime/udon-no-kuni-no-kiniro-kemari/"
    },
    {
        "id": 3645,
        "title": "Ueno-san wa Bukiyou",
        "href": "https://www.animeforce.it/anime/ueno-san-wa-bukiyou/"
    },
    {
        "id": 3647,
        "title": "Ulysses: Jeanne d’Arc to Renkin no Kishi",
        "href": "https://www.animeforce.it/anime/ulysses-jeanne-darc-to-renkin-no-kishi/"
    },
    {
        "id": 3649,
        "title": "Uma Musume: Pretty Derby",
        "href": "https://www.animeforce.it/anime/uma-musume-pretty-derby/"
    },
    {
        "id": 3651,
        "title": "Uma Musume: Pretty Derby 2",
        "href": "https://www.animeforce.it/anime/uma-musume-pretty-derby-2/"
    },
    {
        "id": 3653,
        "title": "Umayon",
        "href": "https://www.animeforce.it/anime/umayon/"
    },
    {
        "id": 3655,
        "title": "Umibe no Étranger",
        "href": "https://www.animeforce.it/anime/umibe-no-etranger/"
    },
    {
        "id": 3657,
        "title": "Un-Go",
        "href": "https://www.animeforce.it/anime/un-go/"
    },
    {
        "id": 3659,
        "title": "Unbreakable Machine-Doll",
        "href": "https://www.animeforce.it/anime/unbreakable-machine-doll/"
    },
    {
        "id": 3661,
        "title": "Upotte",
        "href": "https://www.animeforce.it/anime/upotte/"
    },
    {
        "id": 3663,
        "title": "UQ Holder! Mahou Sensei Negima! 2",
        "href": "https://www.animeforce.it/anime/uq-holder-mahou-sensei-negima-2/"
    },
    {
        "id": 3665,
        "title": "Urahara",
        "href": "https://www.animeforce.it/anime/urahara/"
    },
    {
        "id": 3667,
        "title": "Uramichi Oniisan",
        "href": "https://www.animeforce.it/anime/uramichi-oniisan/"
    },
    {
        "id": 3669,
        "title": "Urara Meirochou",
        "href": "https://www.animeforce.it/anime/urara-meirochou/"
    },
    {
        "id": 3671,
        "title": "Urasekai Picnic",
        "href": "https://www.animeforce.it/anime/urasekai-picnic/"
    },
    {
        "id": 3673,
        "title": "Urashimasakatasen no Nichijou",
        "href": "https://www.animeforce.it/anime/urashimasakatasen-no-nichijou/"
    },
    {
        "id": 3675,
        "title": "Urawa no Usagi-chan",
        "href": "https://www.animeforce.it/anime/urawa-no-usagi-chan/"
    },
    {
        "id": 3677,
        "title": "Usagi Drop",
        "href": "https://www.animeforce.it/anime/usagi-drop/"
    },
    {
        "id": 3679,
        "title": "Ushinawareta Mirai o Motomete",
        "href": "https://www.animeforce.it/anime/ushinawareta-mirai-motomete/"
    },
    {
        "id": 3681,
        "title": "Ushinawareta Mirai wo Motomete",
        "href": "https://www.animeforce.it/anime/ushinawareta-mirai-wo-motomete/"
    },
    {
        "id": 3683,
        "title": "Ushio to Tora",
        "href": "https://www.animeforce.it/anime/ushio-to-tora/"
    },
    {
        "id": 3685,
        "title": "Ushio to Tora 2",
        "href": "https://www.animeforce.it/anime/ushio-to-tora-2/"
    },
    {
        "id": 3687,
        "title": "Uta no Prince-sama: Maji Love 1000%",
        "href": "https://www.animeforce.it/anime/uta-no-prince-sama-maji-love-1000/"
    },
    {
        "id": 3689,
        "title": "Uta no Prince-sama: Maji Love 2000%",
        "href": "https://www.animeforce.it/anime/uta-no-prince-sama-maji-love-2000/"
    },
    {
        "id": 3691,
        "title": "Uta no Prince-sama: Maji Love Legend Star",
        "href": "https://www.animeforce.it/anime/uta-no-prince-sama-maji-love-legend-star/"
    },
    {
        "id": 3693,
        "title": "Uta no Prince-sama: Maji Love Revolutions",
        "href": "https://www.animeforce.it/anime/uta-no-prince-sama-maji-love-revolutions/"
    },
    {
        "id": 3695,
        "title": "Utawarerumono: Itsuwari no Kamen",
        "href": "https://www.animeforce.it/anime/utawarerumono-itsuwari-no-kamen/"
    },
    {
        "id": 3697,
        "title": "Uzaki-chan wa Asobitai!",
        "href": "https://www.animeforce.it/anime/uzaki-chan-wa-asobitai/"
    },
    {
        "id": 3699,
        "title": "Val x Love",
        "href": "https://www.animeforce.it/anime/val-x-love/"
    },
    {
        "id": 3701,
        "title": "Valkyrie Drive: Mermaid",
        "href": "https://www.animeforce.it/anime/valkyrie-drive-mermaid/"
    },
    {
        "id": 3703,
        "title": "Valvrave the Liberator",
        "href": "https://www.animeforce.it/anime/valvrave-the-liberator/"
    },
    {
        "id": 3705,
        "title": "Vampire Holmes",
        "href": "https://www.animeforce.it/anime/vampire-holmes/"
    },
    {
        "id": 3707,
        "title": "Vanitas no Carte",
        "href": "https://www.animeforce.it/anime/vanitas-no-carte/"
    },
    {
        "id": 3709,
        "title": "Vatican Kiseki Chousakan",
        "href": "https://www.animeforce.it/anime/vatican-kiseki-chousakan/"
    },
    {
        "id": 3711,
        "title": "Vinland Saga",
        "href": "https://www.animeforce.it/anime/vinland-saga/"
    },
    {
        "id": 3713,
        "title": "Violet Evergarden",
        "href": "https://www.animeforce.it/anime/violet-evergarden/"
    },
    {
        "id": 3715,
        "title": "Violet Evergarden Gaiden: Eien to Jidou Shuki Ningyou",
        "href": "https://www.animeforce.it/anime/violet-evergarden-gaiden-eien-to-jidou-shuki-ningyou/"
    },
    {
        "id": 3717,
        "title": "Violet Evergarden Movie",
        "href": "https://www.animeforce.it/anime/violet-evergarden-movie/"
    },
    {
        "id": 3719,
        "title": "Visual Prison",
        "href": "https://www.animeforce.it/anime/visual-prison/"
    },
    {
        "id": 3721,
        "title": "ViVid Strike",
        "href": "https://www.animeforce.it/anime/vivid-strike/"
    },
    {
        "id": 3723,
        "title": "Vividred Operation",
        "href": "https://www.animeforce.it/anime/vividred-operation/"
    },
    {
        "id": 3725,
        "title": "Vivy: Fluorite Eye’s Song",
        "href": "https://www.animeforce.it/anime/vivy-fluorite-eyes-song/"
    },
    {
        "id": 3727,
        "title": "Vlad Love",
        "href": "https://www.animeforce.it/anime/vlad-love/"
    },
    {
        "id": 3729,
        "title": "W’z",
        "href": "https://www.animeforce.it/anime/wz/"
    },
    {
        "id": 3731,
        "title": "W: Wish",
        "href": "https://www.animeforce.it/anime/w-wish/"
    },
    {
        "id": 3733,
        "title": "Wagamama High Spec",
        "href": "https://www.animeforce.it/anime/wagamama-high-spec/"
    },
    {
        "id": 3735,
        "title": "Wakaba Girl",
        "href": "https://www.animeforce.it/anime/wakaba-girl/"
    },
    {
        "id": 3737,
        "title": "Wakako-zake",
        "href": "https://www.animeforce.it/anime/wakako-zake/"
    },
    {
        "id": 3739,
        "title": "Wake Up Girls! Shin Shou",
        "href": "https://www.animeforce.it/anime/wake-girls-shin-shou/"
    },
    {
        "id": 3741,
        "title": "Wake Up, Girls!",
        "href": "https://www.animeforce.it/anime/wake-up-girls/"
    },
    {
        "id": 3743,
        "title": "Wake Up, Girls! Shichinin no Idol",
        "href": "https://www.animeforce.it/anime/wake-girls-shichinin-no-idol/"
    },
    {
        "id": 3745,
        "title": "Walkure Romanze",
        "href": "https://www.animeforce.it/anime/walkure-romanze/"
    },
    {
        "id": 3747,
        "title": "Warau Salesman New",
        "href": "https://www.animeforce.it/anime/warau-salesman-new/"
    },
    {
        "id": 3749,
        "title": "WataMote",
        "href": "https://www.animeforce.it/anime/watamote/"
    },
    {
        "id": 3751,
        "title": "Watashi ga Motete Dousunda",
        "href": "https://www.animeforce.it/anime/watashi-ga-motete-dousunda/"
    },
    {
        "id": 3753,
        "title": "Watashi ni Tenshi ga Maiorita!",
        "href": "https://www.animeforce.it/anime/watashi-ni-tenshi-ga-maiorita/"
    },
    {
        "id": 3755,
        "title": "Watashi, Nouryoku wa Heikinchi de tte Itta yo ne!",
        "href": "https://www.animeforce.it/anime/watashi-nouryoku-wa-heikinchi-de-tte-itta-yo-ne/"
    },
    {
        "id": 3757,
        "title": "Wave!! Surfing Yappe!!",
        "href": "https://www.animeforce.it/anime/wave-surfing-yappe/"
    },
    {
        "id": 3759,
        "title": "White Album",
        "href": "https://www.animeforce.it/anime/white-album/"
    },
    {
        "id": 3761,
        "title": "White Album 2",
        "href": "https://www.animeforce.it/anime/white-album-2/"
    },
    {
        "id": 3763,
        "title": "White Album 2: Shiawase no Mukougawa",
        "href": "https://www.animeforce.it/anime/white-album-2-shiawase-no-mukougawa/"
    },
    {
        "id": 3765,
        "title": "Winter Garden",
        "href": "https://www.animeforce.it/anime/winter-garden/"
    },
    {
        "id": 3767,
        "title": "Witch Craft Works",
        "href": "https://www.animeforce.it/anime/witch-craft-works/"
    },
    {
        "id": 3769,
        "title": "WIXOSS Diva(A)Live",
        "href": "https://www.animeforce.it/anime/wixoss-divaalive/"
    },
    {
        "id": 3771,
        "title": "Wizard Barristers: Benmashi Cecil",
        "href": "https://www.animeforce.it/anime/wizard-barristers-benmashi-cecil/"
    },
    {
        "id": 3773,
        "title": "Wonder Egg Priority",
        "href": "https://www.animeforce.it/anime/wonder-egg-priority/"
    },
    {
        "id": 3775,
        "title": "Wonderful Days",
        "href": "https://www.animeforce.it/anime/wonderful-days/"
    },
    {
        "id": 3777,
        "title": "Working!!",
        "href": "https://www.animeforce.it/anime/working/"
    },
    {
        "id": 3779,
        "title": "Working!! 2",
        "href": "https://www.animeforce.it/anime/working-2/"
    },
    {
        "id": 3781,
        "title": "Working!! 3",
        "href": "https://www.animeforce.it/anime/working-3/"
    },
    {
        "id": 3783,
        "title": "World Trigger",
        "href": "https://www.animeforce.it/anime/world-trigger/"
    },
    {
        "id": 3785,
        "title": "World Trigger 2",
        "href": "https://www.animeforce.it/anime/world-trigger-2/"
    },
    {
        "id": 3787,
        "title": "World Trigger 3",
        "href": "https://www.animeforce.it/anime/world-trigger-3/"
    },
    {
        "id": 3789,
        "title": "Wotaku ni Koi wa Muzukashii",
        "href": "https://www.animeforce.it/anime/wotaku-ni-koi-wa-muzukashii/"
    },
    {
        "id": 3791,
        "title": "WWW.Working!!",
        "href": "https://www.animeforce.it/anime/www-working/"
    },
    {
        "id": 3793,
        "title": "Xian Wang de Richang Shenghuo",
        "href": "https://www.animeforce.it/anime/xian-wang-de-richang-shenghuo/"
    },
    {
        "id": 3795,
        "title": "XL Joushi.",
        "href": "https://www.animeforce.it/anime/xl-joushi/"
    },
    {
        "id": 3797,
        "title": "Yagate Kimi ni Naru",
        "href": "https://www.animeforce.it/anime/yagate-kimi-ni-naru/"
    },
    {
        "id": 3799,
        "title": "Yahari Ore no Seishun Love Come wa Machigatteiru.",
        "href": "https://www.animeforce.it/anime/yahari-ore-no-seishun-love-wa-machigatteiru/"
    },
    {
        "id": 3801,
        "title": "Yahari Ore no Seishun Love Come wa Machigatteiru. Zoku",
        "href": "https://www.animeforce.it/anime/yahari-ore-no-seishun-love-wa-machigatteiru-zoku/"
    },
    {
        "id": 3803,
        "title": "Yahari Ore no Seishun Love Comedy wa Machigatteiru. Kan",
        "href": "https://www.animeforce.it/anime/yahari-ore-no-seishun-love-comedy-wa-machigatteiru-kan/"
    },
    {
        "id": 3805,
        "title": "Yakunara Mug Cup mo",
        "href": "https://www.animeforce.it/anime/yakunara-mug-cup-mo/"
    },
    {
        "id": 3807,
        "title": "Yakunara Mug Cup mo: Niban Gama",
        "href": "https://www.animeforce.it/anime/yakunara-mug-cup-mo-niban-gama/"
    },
    {
        "id": 3809,
        "title": "Yakusoku no Nanaya Matsuri",
        "href": "https://www.animeforce.it/anime/yakusoku-no-nanaya-matsuri/"
    },
    {
        "id": 3811,
        "title": "Yakusoku no Neverland",
        "href": "https://www.animeforce.it/anime/yakusoku-no-neverland/"
    },
    {
        "id": 3813,
        "title": "Yakusoku no Neverland 2",
        "href": "https://www.animeforce.it/anime/yakusoku-no-neverland-2/"
    },
    {
        "id": 3815,
        "title": "Yama no Susume",
        "href": "https://www.animeforce.it/anime/yama-no-susume/"
    },
    {
        "id": 3817,
        "title": "Yama no Susume 2",
        "href": "https://www.animeforce.it/anime/yama-no-susume-2/"
    },
    {
        "id": 3819,
        "title": "Yama no Susume 3",
        "href": "https://www.animeforce.it/anime/yama-no-susume-3/"
    },
    {
        "id": 3821,
        "title": "Yamada-kun to 7-nin no Majo",
        "href": "https://www.animeforce.it/anime/yamada-kun-to-7-nin-no-majo/"
    },
    {
        "id": 3823,
        "title": "Yasuke",
        "href": "https://www.animeforce.it/anime/yasuke/"
    },
    {
        "id": 3825,
        "title": "Yatogame-chan Kansatsu Nikki",
        "href": "https://www.animeforce.it/anime/yatogame-chan-kansatsu-nikki/"
    },
    {
        "id": 3827,
        "title": "Yatogame-chan Kansatsu Nikki 2",
        "href": "https://www.animeforce.it/anime/yatogame-chan-kansatsu-nikki-2/"
    },
    {
        "id": 3829,
        "title": "Yatogame-chan Kansatsu Nikki 3",
        "href": "https://www.animeforce.it/anime/yatogame-chan-kansatsu-nikki-sansatsume/"
    },
    {
        "id": 3831,
        "title": "Yesterday wo Utatte",
        "href": "https://www.animeforce.it/anime/yesterday-wo-utatte/"
    },
    {
        "id": 3833,
        "title": "Yoku Wakaru Gendai Mahou",
        "href": "https://www.animeforce.it/anime/yoku-wakaru-gendai-mahou/"
    },
    {
        "id": 3835,
        "title": "Yoru no Yatterman",
        "href": "https://www.animeforce.it/anime/yoru-no-yatterman/"
    },
    {
        "id": 3837,
        "title": "Yosuga no Sora",
        "href": "https://www.animeforce.it/anime/yosuga-no-sora/"
    },
    {
        "id": 3839,
        "title": "Yotsunoha",
        "href": "https://www.animeforce.it/anime/yotsunoha/"
    },
    {
        "id": 3841,
        "title": "Youjo Senki",
        "href": "https://www.animeforce.it/anime/youjo-senki/"
    },
    {
        "id": 3843,
        "title": "Youkai Apartment no Yuuga na Nichijou",
        "href": "https://www.animeforce.it/anime/youkai-apartment-no-yuuga-na-nichijou/"
    },
    {
        "id": 3845,
        "title": "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu",
        "href": "https://www.animeforce.it/anime/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu/"
    },
    {
        "id": 3847,
        "title": "Young Black Jack",
        "href": "https://www.animeforce.it/anime/young-black-jack/"
    },
    {
        "id": 3849,
        "title": "Yowamushi Pedal",
        "href": "https://www.animeforce.it/anime/yowamushi-pedal/"
    },
    {
        "id": 3851,
        "title": "Yowamushi Pedal: Glory Line",
        "href": "https://www.animeforce.it/anime/yowamushi-pedal-glory-line/"
    },
    {
        "id": 3853,
        "title": "Yowamushi Pedal: Grande Road",
        "href": "https://www.animeforce.it/anime/yowamushi-pedal-grande-road/"
    },
    {
        "id": 3855,
        "title": "Yowamushi Pedal: New Generation",
        "href": "https://www.animeforce.it/anime/yowamushi-pedal-new-generation/"
    },
    {
        "id": 3857,
        "title": "Yozakura Quartet",
        "href": "https://www.animeforce.it/anime/yozakura-quartet/"
    },
    {
        "id": 3859,
        "title": "Yozakura Quartet: Hana no Uta",
        "href": "https://www.animeforce.it/anime/yozakura-quartet-hana-no-uta/"
    },
    {
        "id": 3861,
        "title": "Yozakura Quartet: Hoshi no Umi",
        "href": "https://www.animeforce.it/anime/yozakura-quartet-hoshi-no-umi/"
    },
    {
        "id": 3863,
        "title": "Yu-Gi-Oh! Sevens",
        "href": "https://www.animeforce.it/anime/yu-gi-oh-sevens/"
    },
    {
        "id": 3865,
        "title": "Yu-Sibu",
        "href": "https://www.animeforce.it/anime/yu-sibu/"
    },
    {
        "id": 3867,
        "title": "Yubisaki kara Honki no Netsujou 2: Koibito wa Shouboushi",
        "href": "https://www.animeforce.it/anime/yubisaki-kara-honki-no-netsujou-2-koibito-wa-shouboushi/"
    },
    {
        "id": 3869,
        "title": "Yubisaki kara Honki no Netsujou: Osananajimi wa Shouboushi",
        "href": "https://www.animeforce.it/anime/yubisaki-kara-honki-no-netsujou-osananajimi-wa-shouboushi/"
    },
    {
        "id": 3871,
        "title": "Yume Oukoku to Nemureru 100 Nin no Ouji-sama",
        "href": "https://www.animeforce.it/anime/yume-oukoku-to-nemureru-100-nin-no-ouji-sama/"
    },
    {
        "id": 3873,
        "title": "Yumekui Merry",
        "href": "https://www.animeforce.it/anime/yumekui-merry/"
    },
    {
        "id": 3875,
        "title": "Yumeria",
        "href": "https://www.animeforce.it/anime/yumeria/"
    },
    {
        "id": 3877,
        "title": "Yuragi-sou no Yuuna-san",
        "href": "https://www.animeforce.it/anime/yuragi-sou-no-yuuna-san/"
    },
    {
        "id": 3879,
        "title": "Yuri Kuma Arashi",
        "href": "https://www.animeforce.it/anime/yuri-kuma-arashi/"
    },
    {
        "id": 3881,
        "title": "Yuri!!! on Ice",
        "href": "https://www.animeforce.it/anime/yuri-on-ice/"
    },
    {
        "id": 3883,
        "title": "Yuru Camp",
        "href": "https://www.animeforce.it/anime/yuru-camp/"
    },
    {
        "id": 3885,
        "title": "Yuru Camp 2",
        "href": "https://www.animeforce.it/anime/yuru-camp-2/"
    },
    {
        "id": 3887,
        "title": "Yuru Yuri",
        "href": "https://www.animeforce.it/anime/yuru-yuri/"
    },
    {
        "id": 3889,
        "title": "Yuru Yuri 2",
        "href": "https://www.animeforce.it/anime/yuru-yuri-2/"
    },
    {
        "id": 3891,
        "title": "Yuru Yuri San☆Hai!",
        "href": "https://www.animeforce.it/anime/yuru-yuri-san%e2%98%86hai/"
    },
    {
        "id": 3893,
        "title": "Yuru Yuri Ten",
        "href": "https://www.animeforce.it/anime/yuru-yuri-ten/"
    },
    {
        "id": 3895,
        "title": "Yuuki Yuuna wa Yuusha de Aru",
        "href": "https://www.animeforce.it/anime/yuuki-yuuna-wa-yuusha-de-aru/"
    },
    {
        "id": 3897,
        "title": "Yuuki Yuuna wa Yuusha de Aru: Dai Mankai no Shou",
        "href": "https://www.animeforce.it/anime/yuuki-yuuna-wa-yuusha-de-aru-dai-mankai-no-shou/"
    },
    {
        "id": 3899,
        "title": "Yuuki Yuuna wa Yuusha de Aru: Washio Sumi no Shou",
        "href": "https://www.animeforce.it/anime/yuuki-yuuna-wa-yuusha-de-aru-washio-sumi-no-shou/"
    },
    {
        "id": 3901,
        "title": "Yuuki Yuuna wa Yuusha de Aru: Yuusha no Shou",
        "href": "https://www.animeforce.it/anime/yuuki-yuuna-wa-yuusha-de-aru-yuusha-no-shou/"
    },
    {
        "id": 3903,
        "title": "Yuukoku no Moriarty",
        "href": "https://www.animeforce.it/anime/yuukoku-no-moriarty/"
    },
    {
        "id": 3905,
        "title": "Yuukoku no Moriarty 2",
        "href": "https://www.animeforce.it/anime/yuukoku-no-moriarty-2/"
    },
    {
        "id": 3907,
        "title": "Z/X: Code Reunion",
        "href": "https://www.animeforce.it/anime/zx-code-reunion/"
    },
    {
        "id": 3909,
        "title": "Z/X: Ignition",
        "href": "https://www.animeforce.it/anime/zx-ignition/"
    },
    {
        "id": 3911,
        "title": "Zankyou no Terror",
        "href": "https://www.animeforce.it/anime/zankyou-no-terror/"
    },
    {
        "id": 3913,
        "title": "Zashiki Warashi no Tatami-chan",
        "href": "https://www.animeforce.it/anime/zashiki-warashi-no-tatami-chan/"
    },
    {
        "id": 3915,
        "title": "Zenonzard: The Animation",
        "href": "https://www.animeforce.it/anime/zenonzard-the-animation/"
    },
    {
        "id": 3917,
        "title": "Zero Kara Hajimeru Mahou no Sho",
        "href": "https://www.animeforce.it/anime/zero-kara-hajimeru-mahou-no-sho/"
    },
    {
        "id": 3919,
        "title": "Zero no Tsukaima",
        "href": "https://www.animeforce.it/anime/zero-no-tsukaima/"
    },
    {
        "id": 3921,
        "title": "Zero no Tsukaima F",
        "href": "https://www.animeforce.it/anime/zero-no-tsukaima-final/"
    },
    {
        "id": 3923,
        "title": "Zero no Tsukaima: Futatsuki no Kishi",
        "href": "https://www.animeforce.it/anime/zero-no-tsukaima-futatsuki-no-kishi/"
    },
    {
        "id": 3925,
        "title": "Zero no Tsukaima: Princesses no Rondo",
        "href": "https://www.animeforce.it/anime/zero-no-tsukaima-princess-no-rondo/"
    },
    {
        "id": 3927,
        "title": "Zetman",
        "href": "https://www.animeforce.it/anime/zetman/"
    },
    {
        "id": 3929,
        "title": "Zetsuen no Tempest",
        "href": "https://www.animeforce.it/anime/zetsuen-no-tempest/"
    },
    {
        "id": 3931,
        "title": "Zettai Junpaku: Mahou Shoujo",
        "href": "https://www.animeforce.it/anime/zettai-junpaku-mahou-shoujo/"
    },
    {
        "id": 3933,
        "title": "Zoku Touken Ranbu: Hanamaru",
        "href": "https://www.animeforce.it/anime/zoku-touken-ranbu-hanamaru/"
    },
    {
        "id": 3935,
        "title": "Zombie Loan",
        "href": "https://www.animeforce.it/anime/zombie-loan/"
    },
    {
        "id": 3937,
        "title": "Zombieland Saga",
        "href": "https://www.animeforce.it/anime/zombieland-saga/"
    },
    {
        "id": 3939,
        "title": "Zombieland Saga: Revenge",
        "href": "https://www.animeforce.it/anime/zombieland-saga-revenge/"
    },
    {
        "id": 3941,
        "title": "009 Re:Cyborg",
        "href": "https://www.animeforce.it/anime/009-recyborg/"
    },
    {
        "id": 3943,
        "title": "009-1",
        "href": "https://www.animeforce.it/anime/009-1/"
    },
    {
        "id": 3945,
        "title": "07-Ghost",
        "href": "https://www.animeforce.it/anime/07-ghost/"
    },
    {
        "id": 3947,
        "title": "100-man no Inochi no Ue ni Ore wa Tatteiru",
        "href": "https://www.animeforce.it/anime/100-man-no-inochi-no-ue-ni-ore-wa-tatteiru/"
    },
    {
        "id": 3949,
        "title": "100-man no Inochi no Ue ni Ore wa Tatteiru 2",
        "href": "https://www.animeforce.it/anime/100-man-no-inochi-no-ue-ni-ore-wa-tatteiru-2/"
    },
    {
        "id": 3951,
        "title": "11Eyes",
        "href": "https://www.animeforce.it/anime/11eyes/"
    },
    {
        "id": 3953,
        "title": "12-Sai. Chiccha na Mune no Tokimeki",
        "href": "https://www.animeforce.it/anime/12-sai-chiccha-na-mune-no-tokimeki/"
    },
    {
        "id": 3955,
        "title": "12-Sai. Chiccha na Mune no Tokimeki 2",
        "href": "https://www.animeforce.it/anime/12-sai-chiccha-na-mune-no-tokimeki-2/"
    },
    {
        "id": 3957,
        "title": "18if",
        "href": "https://www.animeforce.it/anime/18if/"
    },
    {
        "id": 3959,
        "title": "2.43: Seiin Koukou Danshi Volley-bu",
        "href": "https://www.animeforce.it/anime/2-43-seiin-koukou-danshi-volley-bu/"
    },
    {
        "id": 3961,
        "title": "22/7",
        "href": "https://www.animeforce.it/anime/227/"
    },
    {
        "id": 3963,
        "title": "25-sai no Joshikousei",
        "href": "https://www.animeforce.it/anime/25-sai-no-joshikousei/"
    },
    {
        "id": 3965,
        "title": "3-gatsu no Lion",
        "href": "https://www.animeforce.it/anime/3-gatsu-no-lion/"
    },
    {
        "id": 3967,
        "title": "3-gatsu no Lion 2",
        "href": "https://www.animeforce.it/anime/3-gatsu-no-lion-2/"
    },
    {
        "id": 3969,
        "title": "30-sai no Hoken Taiiku",
        "href": "https://www.animeforce.it/anime/30-sai-no-hoken-taiiku/"
    },
    {
        "id": 3971,
        "title": "3D Kanojo: Real Girl",
        "href": "https://www.animeforce.it/anime/3d-kanojo-real-girl/"
    },
    {
        "id": 3973,
        "title": "3D Kanojo: Real Girl 2",
        "href": "https://www.animeforce.it/anime/3d-kanojo-real-girl-2/"
    },
    {
        "id": 3975,
        "title": "5-toubun no Hanayome",
        "href": "https://www.animeforce.it/anime/5-toubun-no-hanayome/"
    },
    {
        "id": 3977,
        "title": "5-toubun no Hanayome 2",
        "href": "https://www.animeforce.it/anime/5-toubun-no-hanayome-2/"
    },
    {
        "id": 3979,
        "title": "6 Lovers",
        "href": "https://www.animeforce.it/anime/6-lovers/"
    },
    {
        "id": 3981,
        "title": "86: Eighty Six",
        "href": "https://www.animeforce.it/anime/86-eighty-six/"
    },
    {
        "id": 3983,
        "title": "86: Eighty Six 2",
        "href": "https://www.animeforce.it/anime/86-eighty-six-2/"
    },
    {
        "id": 3985,
        "title": "91 Days",
        "href": "https://www.animeforce.it/anime/91-days/"
    }
];

/*animelist.forEach(anime =>{
    axios.get(anime.href)
        .then((response) => {
            const page = response.data;
            const $ = cheerio.load(page);
            $('.m-2 a').each((i, el) => {
                const episode = $(el).text();
                const url=$(el).attr('href');
                details.push(
                    {
                        episode,
                        url
                    })
                console.log(details)
            });
        })
})*/

app.get('/animelist', function (req, res) {
    axios.get("https://www.animeforce.it/lista-anime/")
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html, {decodeEntities: false});
            $('#az-slider a', html).each(function (index) {
                const title = $(this).text();
                const href = $(this).attr('href');
                const id = index + 1;
                if (!href.includes('#')) {
                    animelist.push({
                        id,
                        title,
                        href
                    })
                } else {

                }
            })
            res.json(animelist)
        }).catch((err) => {
        console.log(err)
    });
});

app.get('/animelist/:animeName', async (req, res) => {
    const param = req.params.animeName.trim().toLowerCase()
    const ids = animelist.filter(anime => anime.title.trim().toLowerCase().replace(/\s/g, '').includes(param))
    try {
        axios.get(ids[0].href)
            .then((response) => {
                const page = response.data;
                const $ = cheerio.load(page);
                $('.m-2 a').each((i, el) => {
                    const episode = $(el).text();
                    const url = $(el).attr('href');
                    if (url.includes('http' || 'https') && /^\d+$/.test(episode)) {
                        details.push(
                            {
                                episode,
                                url
                            })
                    } else {

                    }
                })
                res.json(details)
                details = []
            }).catch((err) => {
            console.log(err)
        })
    } catch (e) {
        console.log("Error")
    }
});

app.listen(PORT, () => console.log("Server Listen to port " + PORT));