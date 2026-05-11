import { useState, useEffect, useRef } from "react";

const CONTINENTS = ["Wszystkie","Europa","Azja","Ameryka Północna","Ameryka Południowa","Afryka","Australia i Oceania"];

const CONTINENT_BOUNDS = {
  "Wszystkie": [[80,-170],[-60,180]],
  "Europa": [[71,-25],[34,45]],
  "Azja": [[75,25],[-10,180]],
  "Ameryka Północna": [[83,-170],[7,-52]],
  "Ameryka Południowa": [[13,-82],[-56,-34]],
  "Afryka": [[37,-18],[-35,52]],
  "Australia i Oceania": [[10,110],[-50,180]],
};

const CONTINENT_COLORS = {
  "Europa": "#4f86c6",
  "Azja": "#e85d4a",
  "Ameryka Północna": "#2ca87f",
  "Ameryka Południowa": "#f0a500",
  "Afryka": "#9b5de5",
  "Australia i Oceania": "#f15bb5",
};

const COUNTRIES = [
  {name:"Polska",capital:"Warszawa",continent:"Europa",lat:52.2,lng:21.0,flag:"🇵🇱"},
  {name:"Niemcy",capital:"Berlin",continent:"Europa",lat:52.5,lng:13.4,flag:"🇩🇪"},
  {name:"Francja",capital:"Paryż",continent:"Europa",lat:48.9,lng:2.3,flag:"🇫🇷"},
  {name:"Wielka Brytania",capital:"Londyn",continent:"Europa",lat:51.5,lng:-0.1,flag:"🇬🇧"},
  {name:"Włochy",capital:"Rzym",continent:"Europa",lat:41.9,lng:12.5,flag:"🇮🇹"},
  {name:"Hiszpania",capital:"Madryt",continent:"Europa",lat:40.4,lng:-3.7,flag:"🇪🇸"},
  {name:"Portugalia",capital:"Lizbona",continent:"Europa",lat:38.7,lng:-9.1,flag:"🇵🇹"},
  {name:"Holandia",capital:"Amsterdam",continent:"Europa",lat:52.4,lng:4.9,flag:"🇳🇱"},
  {name:"Belgia",capital:"Bruksela",continent:"Europa",lat:50.8,lng:4.4,flag:"🇧🇪"},
  {name:"Szwajcaria",capital:"Berno",continent:"Europa",lat:46.9,lng:7.5,flag:"🇨🇭"},
  {name:"Austria",capital:"Wiedeń",continent:"Europa",lat:48.2,lng:16.4,flag:"🇦🇹"},
  {name:"Szwecja",capital:"Sztokholm",continent:"Europa",lat:59.3,lng:18.1,flag:"🇸🇪"},
  {name:"Norwegia",capital:"Oslo",continent:"Europa",lat:59.9,lng:10.7,flag:"🇳🇴"},
  {name:"Dania",capital:"Kopenhaga",continent:"Europa",lat:55.7,lng:12.6,flag:"🇩🇰"},
  {name:"Finlandia",capital:"Helsinki",continent:"Europa",lat:60.2,lng:24.9,flag:"🇫🇮"},
  {name:"Islandia",capital:"Reykjavík",continent:"Europa",lat:64.1,lng:-21.9,flag:"🇮🇸"},
  {name:"Irlandia",capital:"Dublin",continent:"Europa",lat:53.3,lng:-6.3,flag:"🇮🇪"},
  {name:"Czechy",capital:"Praga",continent:"Europa",lat:50.1,lng:14.4,flag:"🇨🇿"},
  {name:"Słowacja",capital:"Bratysława",continent:"Europa",lat:48.1,lng:17.1,flag:"🇸🇰"},
  {name:"Węgry",capital:"Budapeszt",continent:"Europa",lat:47.5,lng:19.0,flag:"🇭🇺"},
  {name:"Rumunia",capital:"Bukareszt",continent:"Europa",lat:44.4,lng:26.1,flag:"🇷🇴"},
  {name:"Bułgaria",capital:"Sofia",continent:"Europa",lat:42.7,lng:23.3,flag:"🇧🇬"},
  {name:"Grecja",capital:"Ateny",continent:"Europa",lat:37.97,lng:23.73,flag:"🇬🇷"},
  {name:"Serbia",capital:"Belgrad",continent:"Europa",lat:44.8,lng:20.5,flag:"🇷🇸"},
  {name:"Chorwacja",capital:"Zagrzeb",continent:"Europa",lat:45.8,lng:16.0,flag:"🇭🇷"},
  {name:"Słowenia",capital:"Lublana",continent:"Europa",lat:46.1,lng:14.5,flag:"🇸🇮"},
  {name:"Bośnia i Hercegowina",capital:"Sarajewo",continent:"Europa",lat:43.8,lng:18.4,flag:"🇧🇦"},
  {name:"Czarnogóra",capital:"Podgorica",continent:"Europa",lat:42.4,lng:19.3,flag:"🇲🇪"},
  {name:"Albania",capital:"Tirana",continent:"Europa",lat:41.3,lng:19.8,flag:"🇦🇱"},
  {name:"Macedonia Północna",capital:"Skopje",continent:"Europa",lat:42.0,lng:21.4,flag:"🇲🇰"},
  {name:"Kosowo",capital:"Prisztina",continent:"Europa",lat:42.7,lng:21.2,flag:"🇽🇰"},
  {name:"Ukraina",capital:"Kijów",continent:"Europa",lat:50.4,lng:30.5,flag:"🇺🇦"},
  {name:"Białoruś",capital:"Mińsk",continent:"Europa",lat:53.9,lng:27.6,flag:"🇧🇾"},
  {name:"Mołdawia",capital:"Kiszyniów",continent:"Europa",lat:47.0,lng:28.9,flag:"🇲🇩"},
  {name:"Litwa",capital:"Wilno",continent:"Europa",lat:54.7,lng:25.3,flag:"🇱🇹"},
  {name:"Łotwa",capital:"Ryga",continent:"Europa",lat:56.9,lng:24.1,flag:"🇱🇻"},
  {name:"Estonia",capital:"Tallinn",continent:"Europa",lat:59.4,lng:24.7,flag:"🇪🇪"},
  {name:"Luksemburg",capital:"Luksemburg",continent:"Europa",lat:49.6,lng:6.1,flag:"🇱🇺"},
  {name:"Malta",capital:"Valletta",continent:"Europa",lat:35.9,lng:14.5,flag:"🇲🇹"},
  {name:"Cypr",capital:"Nikozja",continent:"Europa",lat:35.2,lng:33.4,flag:"🇨🇾"},
  {name:"Andora",capital:"Andora la Vella",continent:"Europa",lat:42.5,lng:1.5,flag:"🇦🇩"},
  {name:"Monako",capital:"Monako",continent:"Europa",lat:43.7,lng:7.4,flag:"🇲🇨"},
  {name:"San Marino",capital:"San Marino",continent:"Europa",lat:43.9,lng:12.5,flag:"🇸🇲"},
  {name:"Liechtenstein",capital:"Vaduz",continent:"Europa",lat:47.1,lng:9.5,flag:"🇱🇮"},
  {name:"Watykan",capital:"Watykan",continent:"Europa",lat:41.9,lng:12.46,flag:"🇻🇦"},
  {name:"Rosja",capital:"Moskwa",continent:"Azja",lat:55.8,lng:37.6,flag:"🇷🇺"},
  {name:"Chiny",capital:"Pekin",continent:"Azja",lat:39.9,lng:116.4,flag:"🇨🇳"},
  {name:"Japonia",capital:"Tokio",continent:"Azja",lat:35.7,lng:139.7,flag:"🇯🇵"},
  {name:"Korea Południowa",capital:"Seul",continent:"Azja",lat:37.6,lng:127.0,flag:"🇰🇷"},
  {name:"Korea Północna",capital:"Pjongjang",continent:"Azja",lat:39.0,lng:125.8,flag:"🇰🇵"},
  {name:"Indie",capital:"Nowe Delhi",continent:"Azja",lat:28.6,lng:77.2,flag:"🇮🇳"},
  {name:"Pakistan",capital:"Islamabad",continent:"Azja",lat:33.7,lng:73.1,flag:"🇵🇰"},
  {name:"Bangladesz",capital:"Dhaka",continent:"Azja",lat:23.7,lng:90.4,flag:"🇧🇩"},
  {name:"Sri Lanka",capital:"Sri Dżajawardenepura Kotte",continent:"Azja",lat:6.9,lng:79.9,flag:"🇱🇰"},
  {name:"Nepal",capital:"Katmandu",continent:"Azja",lat:27.7,lng:85.3,flag:"🇳🇵"},
  {name:"Bhutan",capital:"Thimphu",continent:"Azja",lat:27.5,lng:89.6,flag:"🇧🇹"},
  {name:"Afganistan",capital:"Kabul",continent:"Azja",lat:34.5,lng:69.2,flag:"🇦🇫"},
  {name:"Iran",capital:"Teheran",continent:"Azja",lat:35.7,lng:51.4,flag:"🇮🇷"},
  {name:"Irak",capital:"Bagdad",continent:"Azja",lat:33.3,lng:44.4,flag:"🇮🇶"},
  {name:"Syria",capital:"Damaszek",continent:"Azja",lat:33.5,lng:36.3,flag:"🇸🇾"},
  {name:"Liban",capital:"Bejrut",continent:"Azja",lat:33.9,lng:35.5,flag:"🇱🇧"},
  {name:"Izrael",capital:"Jerozolima",continent:"Azja",lat:31.8,lng:35.2,flag:"🇮🇱"},
  {name:"Jordania",capital:"Amman",continent:"Azja",lat:31.9,lng:35.9,flag:"🇯🇴"},
  {name:"Arabia Saudyjska",capital:"Rijad",continent:"Azja",lat:24.7,lng:46.7,flag:"🇸🇦"},
  {name:"Jemen",capital:"Sana",continent:"Azja",lat:15.4,lng:44.2,flag:"🇾🇪"},
  {name:"Oman",capital:"Maskat",continent:"Azja",lat:23.6,lng:58.6,flag:"🇴🇲"},
  {name:"Zjednoczone Emiraty Arabskie",capital:"Abu Zabi",continent:"Azja",lat:24.5,lng:54.4,flag:"🇦🇪"},
  {name:"Katar",capital:"Doha",continent:"Azja",lat:25.3,lng:51.5,flag:"🇶🇦"},
  {name:"Bahrajn",capital:"Manama",continent:"Azja",lat:26.2,lng:50.6,flag:"🇧🇭"},
  {name:"Kuwejt",capital:"Kuwejt",continent:"Azja",lat:29.4,lng:47.9,flag:"🇰🇼"},
  {name:"Turcja",capital:"Ankara",continent:"Azja",lat:39.9,lng:32.9,flag:"🇹🇷"},
  {name:"Gruzja",capital:"Tbilisi",continent:"Azja",lat:41.7,lng:44.8,flag:"🇬🇪"},
  {name:"Armenia",capital:"Erywań",continent:"Azja",lat:40.2,lng:44.5,flag:"🇦🇲"},
  {name:"Azerbejdżan",capital:"Baku",continent:"Azja",lat:40.4,lng:49.9,flag:"🇦🇿"},
  {name:"Kazachstan",capital:"Astana",continent:"Azja",lat:51.2,lng:71.5,flag:"🇰🇿"},
  {name:"Uzbekistan",capital:"Taszkent",continent:"Azja",lat:41.3,lng:69.3,flag:"🇺🇿"},
  {name:"Turkmenistan",capital:"Aszchabad",continent:"Azja",lat:37.9,lng:58.4,flag:"🇹🇲"},
  {name:"Kirgistan",capital:"Biszkek",continent:"Azja",lat:42.9,lng:74.6,flag:"🇰🇬"},
  {name:"Tadżykistan",capital:"Duszanbe",continent:"Azja",lat:38.6,lng:68.8,flag:"🇹🇯"},
  {name:"Mongolia",capital:"Ułan Bator",continent:"Azja",lat:47.9,lng:106.9,flag:"🇲🇳"},
  {name:"Tajlandia",capital:"Bangkok",continent:"Azja",lat:13.8,lng:100.5,flag:"🇹🇭"},
  {name:"Wietnam",capital:"Hanoi",continent:"Azja",lat:21.0,lng:105.8,flag:"🇻🇳"},
  {name:"Kambodża",capital:"Phnom Penh",continent:"Azja",lat:11.6,lng:104.9,flag:"🇰🇭"},
  {name:"Laos",capital:"Wientian",continent:"Azja",lat:17.9,lng:102.6,flag:"🇱🇦"},
  {name:"Myanmar",capital:"Naypyidaw",continent:"Azja",lat:19.8,lng:96.2,flag:"🇲🇲"},
  {name:"Malezja",capital:"Kuala Lumpur",continent:"Azja",lat:3.1,lng:101.7,flag:"🇲🇾"},
  {name:"Singapur",capital:"Singapur",continent:"Azja",lat:1.3,lng:103.8,flag:"🇸🇬"},
  {name:"Indonezja",capital:"Dżakarta",continent:"Azja",lat:-6.2,lng:106.8,flag:"🇮🇩"},
  {name:"Filipiny",capital:"Manila",continent:"Azja",lat:14.6,lng:121.0,flag:"🇵🇭"},
  {name:"Brunei",capital:"Bandar Seri Begawan",continent:"Azja",lat:4.9,lng:115.0,flag:"🇧🇳"},
  {name:"Timor Wschodni",capital:"Dili",continent:"Azja",lat:-8.6,lng:125.6,flag:"🇹🇱"},
  {name:"Tajwan",capital:"Tajpej",continent:"Azja",lat:25.0,lng:121.5,flag:"🇹🇼"},
  {name:"Maldywy",capital:"Male",continent:"Azja",lat:4.2,lng:73.5,flag:"🇲🇻"},
  {name:"Stany Zjednoczone",capital:"Waszyngton",continent:"Ameryka Północna",lat:38.9,lng:-77.0,flag:"🇺🇸"},
  {name:"Kanada",capital:"Ottawa",continent:"Ameryka Północna",lat:45.4,lng:-75.7,flag:"🇨🇦"},
  {name:"Meksyk",capital:"Meksyk",continent:"Ameryka Północna",lat:19.4,lng:-99.1,flag:"🇲🇽"},
  {name:"Gwatemala",capital:"Gwatemala",continent:"Ameryka Północna",lat:14.6,lng:-90.5,flag:"🇬🇹"},
  {name:"Belize",capital:"Belmopan",continent:"Ameryka Północna",lat:17.3,lng:-88.8,flag:"🇧🇿"},
  {name:"Honduras",capital:"Tegucigalpa",continent:"Ameryka Północna",lat:14.1,lng:-87.2,flag:"🇭🇳"},
  {name:"Salwador",capital:"San Salvador",continent:"Ameryka Północna",lat:13.7,lng:-89.2,flag:"🇸🇻"},
  {name:"Nikaragua",capital:"Managua",continent:"Ameryka Północna",lat:12.1,lng:-86.3,flag:"🇳🇮"},
  {name:"Kostaryka",capital:"San José",continent:"Ameryka Północna",lat:9.9,lng:-84.1,flag:"🇨🇷"},
  {name:"Panama",capital:"Panama",continent:"Ameryka Północna",lat:9.0,lng:-79.5,flag:"🇵🇦"},
  {name:"Kuba",capital:"Hawana",continent:"Ameryka Północna",lat:23.1,lng:-82.4,flag:"🇨🇺"},
  {name:"Jamajka",capital:"Kingston",continent:"Ameryka Północna",lat:18.0,lng:-76.8,flag:"🇯🇲"},
  {name:"Haiti",capital:"Port-au-Prince",continent:"Ameryka Północna",lat:18.5,lng:-72.3,flag:"🇭🇹"},
  {name:"Dominikana",capital:"Santo Domingo",continent:"Ameryka Północna",lat:18.5,lng:-69.9,flag:"🇩🇴"},
  {name:"Trynidad i Tobago",capital:"Port-of-Spain",continent:"Ameryka Północna",lat:10.7,lng:-61.5,flag:"🇹🇹"},
  {name:"Barbados",capital:"Bridgetown",continent:"Ameryka Północna",lat:13.1,lng:-59.6,flag:"🇧🇧"},
  {name:"Saint Lucia",capital:"Castries",continent:"Ameryka Północna",lat:14.0,lng:-61.0,flag:"🇱🇨"},
  {name:"Grenada",capital:"Saint George's",continent:"Ameryka Północna",lat:12.1,lng:-61.7,flag:"🇬🇩"},
  {name:"Saint Vincent i Grenadyny",capital:"Kingstown",continent:"Ameryka Północna",lat:13.2,lng:-61.2,flag:"🇻🇨"},
  {name:"Antigua i Barbuda",capital:"Saint John's",continent:"Ameryka Północna",lat:17.1,lng:-61.8,flag:"🇦🇬"},
  {name:"Saint Kitts i Nevis",capital:"Basseterre",continent:"Ameryka Północna",lat:17.3,lng:-62.7,flag:"🇰🇳"},
  {name:"Dominika",capital:"Roseau",continent:"Ameryka Północna",lat:15.3,lng:-61.4,flag:"🇩🇲"},
  {name:"Bahamy",capital:"Nassau",continent:"Ameryka Północna",lat:25.1,lng:-77.3,flag:"🇧🇸"},
  {name:"Brazylia",capital:"Brasília",continent:"Ameryka Południowa",lat:-15.8,lng:-47.9,flag:"🇧🇷"},
  {name:"Argentyna",capital:"Buenos Aires",continent:"Ameryka Południowa",lat:-34.6,lng:-58.4,flag:"🇦🇷"},
  {name:"Chile",capital:"Santiago",continent:"Ameryka Południowa",lat:-33.5,lng:-70.7,flag:"🇨🇱"},
  {name:"Peru",capital:"Lima",continent:"Ameryka Południowa",lat:-12.0,lng:-77.0,flag:"🇵🇪"},
  {name:"Kolumbia",capital:"Bogota",continent:"Ameryka Południowa",lat:4.7,lng:-74.1,flag:"🇨🇴"},
  {name:"Wenezuela",capital:"Caracas",continent:"Ameryka Południowa",lat:10.5,lng:-66.9,flag:"🇻🇪"},
  {name:"Ekwador",capital:"Quito",continent:"Ameryka Południowa",lat:-0.2,lng:-78.5,flag:"🇪🇨"},
  {name:"Boliwia",capital:"Sucre",continent:"Ameryka Południowa",lat:-19.0,lng:-65.3,flag:"🇧🇴"},
  {name:"Paragwaj",capital:"Asunción",continent:"Ameryka Południowa",lat:-25.3,lng:-57.6,flag:"🇵🇾"},
  {name:"Urugwaj",capital:"Montevideo",continent:"Ameryka Południowa",lat:-34.9,lng:-56.2,flag:"🇺🇾"},
  {name:"Gujana",capital:"Georgetown",continent:"Ameryka Południowa",lat:6.8,lng:-58.2,flag:"🇬🇾"},
  {name:"Surinam",capital:"Paramaribo",continent:"Ameryka Południowa",lat:5.9,lng:-55.2,flag:"🇸🇷"},
  {name:"Maroko",capital:"Rabat",continent:"Afryka",lat:34.0,lng:-6.8,flag:"🇲🇦"},
  {name:"Algieria",capital:"Algier",continent:"Afryka",lat:36.7,lng:3.1,flag:"🇩🇿"},
  {name:"Tunezja",capital:"Tunis",continent:"Afryka",lat:36.8,lng:10.2,flag:"🇹🇳"},
  {name:"Libia",capital:"Trypolis",continent:"Afryka",lat:32.9,lng:13.2,flag:"🇱🇾"},
  {name:"Egipt",capital:"Kair",continent:"Afryka",lat:30.1,lng:31.2,flag:"🇪🇬"},
  {name:"Sudan",capital:"Chartum",continent:"Afryka",lat:15.6,lng:32.5,flag:"🇸🇩"},
  {name:"Sudan Południowy",capital:"Dżuba",continent:"Afryka",lat:4.9,lng:31.6,flag:"🇸🇸"},
  {name:"Etiopia",capital:"Addis Abeba",continent:"Afryka",lat:9.0,lng:38.7,flag:"🇪🇹"},
  {name:"Erytrea",capital:"Asmara",continent:"Afryka",lat:15.3,lng:38.9,flag:"🇪🇷"},
  {name:"Dżibuti",capital:"Dżibuti",continent:"Afryka",lat:11.6,lng:43.1,flag:"🇩🇯"},
  {name:"Somalia",capital:"Mogadiszu",continent:"Afryka",lat:2.0,lng:45.3,flag:"🇸🇴"},
  {name:"Kenia",capital:"Nairobi",continent:"Afryka",lat:-1.3,lng:36.8,flag:"🇰🇪"},
  {name:"Tanzania",capital:"Dodoma",continent:"Afryka",lat:-6.2,lng:35.7,flag:"🇹🇿"},
  {name:"Uganda",capital:"Kampala",continent:"Afryka",lat:0.3,lng:32.6,flag:"🇺🇬"},
  {name:"Rwanda",capital:"Kigali",continent:"Afryka",lat:-1.9,lng:30.1,flag:"🇷🇼"},
  {name:"Burundi",capital:"Gitega",continent:"Afryka",lat:-3.4,lng:29.9,flag:"🇧🇮"},
  {name:"Demokratyczna Republika Konga",capital:"Kinszasa",continent:"Afryka",lat:-4.3,lng:15.3,flag:"🇨🇩"},
  {name:"Kongo",capital:"Brazzaville",continent:"Afryka",lat:-4.3,lng:15.4,flag:"🇨🇬"},
  {name:"Gabon",capital:"Libreville",continent:"Afryka",lat:0.4,lng:9.5,flag:"🇬🇦"},
  {name:"Kamerun",capital:"Jaunde",continent:"Afryka",lat:3.9,lng:11.5,flag:"🇨🇲"},
  {name:"Nigeria",capital:"Abudża",continent:"Afryka",lat:9.1,lng:7.5,flag:"🇳🇬"},
  {name:"Niger",capital:"Niamej",continent:"Afryka",lat:13.5,lng:2.1,flag:"🇳🇪"},
  {name:"Mali",capital:"Bamako",continent:"Afryka",lat:12.6,lng:-8.0,flag:"🇲🇱"},
  {name:"Mauretania",capital:"Nawakszut",continent:"Afryka",lat:18.1,lng:-15.9,flag:"🇲🇷"},
  {name:"Senegal",capital:"Dakar",continent:"Afryka",lat:14.7,lng:-17.4,flag:"🇸🇳"},
  {name:"Gambia",capital:"Bandżul",continent:"Afryka",lat:13.5,lng:-16.6,flag:"🇬🇲"},
  {name:"Gwinea Bissau",capital:"Bissau",continent:"Afryka",lat:11.9,lng:-15.6,flag:"🇬🇼"},
  {name:"Gwinea",capital:"Conakry",continent:"Afryka",lat:9.5,lng:-13.7,flag:"🇬🇳"},
  {name:"Sierra Leone",capital:"Freetown",continent:"Afryka",lat:8.5,lng:-13.2,flag:"🇸🇱"},
  {name:"Liberia",capital:"Monrovia",continent:"Afryka",lat:6.3,lng:-10.8,flag:"🇱🇷"},
  {name:"Wybrzeże Kości Słoniowej",capital:"Jamusukro",continent:"Afryka",lat:6.8,lng:-5.3,flag:"🇨🇮"},
  {name:"Ghana",capital:"Akra",continent:"Afryka",lat:5.6,lng:-0.2,flag:"🇬🇭"},
  {name:"Togo",capital:"Lomé",continent:"Afryka",lat:6.1,lng:1.2,flag:"🇹🇬"},
  {name:"Benin",capital:"Porto-Novo",continent:"Afryka",lat:6.4,lng:2.4,flag:"🇧🇯"},
  {name:"Burkina Faso",capital:"Wagadugu",continent:"Afryka",lat:12.4,lng:-1.5,flag:"🇧🇫"},
  {name:"Czad",capital:"Ndżamena",continent:"Afryka",lat:12.1,lng:15.1,flag:"🇹🇩"},
  {name:"Republika Środkowoafrykańska",capital:"Bangi",continent:"Afryka",lat:4.4,lng:18.6,flag:"🇨🇫"},
  {name:"Gwinea Równikowa",capital:"Malabo",continent:"Afryka",lat:3.8,lng:8.8,flag:"🇬🇶"},
  {name:"Angola",capital:"Luanda",continent:"Afryka",lat:-8.8,lng:13.2,flag:"🇦🇴"},
  {name:"Zambia",capital:"Lusaka",continent:"Afryka",lat:-15.4,lng:28.3,flag:"🇿🇲"},
  {name:"Zimbabwe",capital:"Harare",continent:"Afryka",lat:-17.8,lng:31.0,flag:"🇿🇼"},
  {name:"Mozambik",capital:"Maputo",continent:"Afryka",lat:-25.9,lng:32.6,flag:"🇲🇿"},
  {name:"Malawi",capital:"Lilongwe",continent:"Afryka",lat:-13.9,lng:33.8,flag:"🇲🇼"},
  {name:"Madagaskar",capital:"Antananarywa",continent:"Afryka",lat:-18.9,lng:47.5,flag:"🇲🇬"},
  {name:"Komory",capital:"Moroni",continent:"Afryka",lat:-11.7,lng:43.3,flag:"🇰🇲"},
  {name:"Mauritius",capital:"Port Louis",continent:"Afryka",lat:-20.2,lng:57.5,flag:"🇲🇺"},
  {name:"Seszele",capital:"Victoria",continent:"Afryka",lat:-4.6,lng:55.5,flag:"🇸🇨"},
  {name:"Namibia",capital:"Windhoek",continent:"Afryka",lat:-22.6,lng:17.1,flag:"🇳🇦"},
  {name:"Botswana",capital:"Gaborone",continent:"Afryka",lat:-24.7,lng:25.9,flag:"🇧🇼"},
  {name:"Republika Południowej Afryki",capital:"Pretoria",continent:"Afryka",lat:-25.7,lng:28.2,flag:"🇿🇦"},
  {name:"Lesotho",capital:"Maseru",continent:"Afryka",lat:-29.3,lng:27.5,flag:"🇱🇸"},
  {name:"Eswatini",capital:"Mbabane",continent:"Afryka",lat:-26.3,lng:31.1,flag:"🇸🇿"},
  {name:"Kabo Verde",capital:"Praia",continent:"Afryka",lat:15.0,lng:-23.5,flag:"🇨🇻"},
  {name:"Wyspy Świętego Tomasza i Książęca",capital:"São Tomé",continent:"Afryka",lat:0.3,lng:6.7,flag:"🇸🇹"},
  {name:"Australia",capital:"Canberra",continent:"Australia i Oceania",lat:-35.3,lng:149.1,flag:"🇦🇺"},
  {name:"Nowa Zelandia",capital:"Wellington",continent:"Australia i Oceania",lat:-41.3,lng:174.8,flag:"🇳🇿"},
  {name:"Papua Nowa Gwinea",capital:"Port Moresby",continent:"Australia i Oceania",lat:-9.5,lng:147.2,flag:"🇵🇬"},
  {name:"Fidżi",capital:"Suwa",continent:"Australia i Oceania",lat:-18.1,lng:178.4,flag:"🇫🇯"},
  {name:"Wyspy Salomona",capital:"Honiara",continent:"Australia i Oceania",lat:-9.4,lng:160.0,flag:"🇸🇧"},
  {name:"Vanuatu",capital:"Port Vila",continent:"Australia i Oceania",lat:-17.7,lng:168.3,flag:"🇻🇺"},
  {name:"Samoa",capital:"Apia",continent:"Australia i Oceania",lat:-13.8,lng:-172.0,flag:"🇼🇸"},
  {name:"Tonga",capital:"Nuku'alofa",continent:"Australia i Oceania",lat:-21.1,lng:-175.2,flag:"🇹🇴"},
  {name:"Kiribati",capital:"Tarawa",continent:"Australia i Oceania",lat:1.3,lng:173.0,flag:"🇰🇮"},
  {name:"Mikronezja",capital:"Palikir",continent:"Australia i Oceania",lat:6.9,lng:158.2,flag:"🇫🇲"},
  {name:"Wyspy Marshalla",capital:"Majuro",continent:"Australia i Oceania",lat:7.1,lng:171.4,flag:"🇲🇭"},
  {name:"Nauru",capital:"Yaren",continent:"Australia i Oceania",lat:-0.5,lng:166.9,flag:"🇳🇷"},
  {name:"Palau",capital:"Ngerulmud",continent:"Australia i Oceania",lat:7.5,lng:134.6,flag:"🇵🇼"},
  {name:"Tuvalu",capital:"Funafuti",continent:"Australia i Oceania",lat:-8.5,lng:179.2,flag:"🇹🇻"},
];

const MODES = { LEARN:"learn", MAP_LEARN:"map_learn", MAP_QUIZ:"map_quiz", QUIZ_CAPITAL:"quiz_capital", QUIZ_COUNTRY:"quiz_country", QUIZ_FLAG:"quiz_flag" };

function normalize(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
}
function shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function getWrongs(correct, key) {
  return shuffle(COUNTRIES.filter(c=>c[key]!==correct[key])).slice(0,3).map(c=>c[key]);
}

// ===== LEARN MAP POPUP (shows info) =====
function LearnPopup({ country, onClose }) {
  const accentColor = CONTINENT_COLORS[country.continent] || "#4f86c6";
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={{background:"#111c35",borderRadius:"20px",padding:"2rem",maxWidth:"360px",width:"100%",border:`1.5px solid ${accentColor}55`,position:"relative",animation:"popIn 0.22s ease",textAlign:"center"}}>
        <button onClick={onClose} style={{position:"absolute",top:"12px",right:"12px",background:"none",border:"none",color:"#556677",fontSize:"1.2rem",cursor:"pointer"}}>✕</button>
        <div style={{fontSize:"5rem",lineHeight:1.1,marginBottom:"12px"}}>{country.flag}</div>
        <h2 style={{color:"#e0eeff",margin:"0 0 6px",fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.4rem"}}>{country.name}</h2>
        <div style={{color:accentColor,fontSize:"0.75rem",background:accentColor+"22",display:"inline-block",padding:"3px 12px",borderRadius:"10px",fontWeight:500,marginBottom:"16px"}}>{country.continent}</div>
        <div style={{background:"#0a0f1e",borderRadius:"12px",padding:"14px 20px",border:"1px solid #1a2740"}}>
          <div style={{color:"#3a5070",fontSize:"0.72rem",marginBottom:"4px"}}>🏛️ STOLICA</div>
          <div style={{color:"#e0eeff",fontSize:"1.2rem",fontWeight:600}}>{country.capital}</div>
        </div>
        <button onClick={onClose} style={{marginTop:"16px",padding:"10px 28px",background:accentColor,color:"#fff",border:"none",borderRadius:"10px",fontFamily:"inherit",fontSize:"0.9rem",fontWeight:600,cursor:"pointer"}}>Zamknij</button>
      </div>
    </div>
  );
}

// ===== QUIZ MAP POPUP (names hidden, type to answer) =====
function QuizPopup({ country, onClose, onResult }) {
  const [nameVal, setNameVal] = useState("");
  const [capVal, setCapVal] = useState("");
  const [result, setResult] = useState(null);
  const ref1 = useRef(null);
  useEffect(() => { setTimeout(()=>ref1.current?.focus(), 80); }, []);

  function check() {
    const nOk = normalize(nameVal)===normalize(country.name);
    const cOk = normalize(capVal)===normalize(country.capital);
    setResult({nOk,cOk});
    onResult && onResult(nOk && cOk);
  }

  const accentColor = CONTINENT_COLORS[country.continent] || "#4f86c6";

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={{background:"#111c35",borderRadius:"20px",padding:"2rem",maxWidth:"400px",width:"100%",border:`1.5px solid ${accentColor}44`,position:"relative",animation:"popIn 0.22s ease"}}>
        <button onClick={onClose} style={{position:"absolute",top:"12px",right:"12px",background:"none",border:"none",color:"#556677",fontSize:"1.2rem",cursor:"pointer"}}>✕</button>

        {/* Hidden identity — show only flag + continent hint */}
        <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
          <div style={{fontSize:"4.5rem",lineHeight:1.1,marginBottom:"10px"}}>{country.flag}</div>
          <div style={{color:"#3a5070",fontSize:"0.78rem",marginBottom:"6px"}}>Kontynent:</div>
          <div style={{color:accentColor,background:accentColor+"22",display:"inline-block",padding:"3px 14px",borderRadius:"10px",fontWeight:500,fontSize:"0.78rem"}}>{country.continent}</div>
        </div>

        {result ? (
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"2.8rem",margin:"0 0 1rem"}}>{result.nOk&&result.cOk?"🏆":result.nOk||result.cOk?"🎓":"📖"}</div>
            <div style={{marginBottom:"1.2rem",display:"flex",flexDirection:"column",gap:"8px"}}>
              <div style={{background:result.nOk?"#0a220e":"#220a0a",borderRadius:"12px",padding:"12px 16px",border:`1px solid ${result.nOk?"#2ca87f44":"#e85d4a44"}`}}>
                <div style={{fontSize:"0.7rem",color:"#3a5070",marginBottom:"3px"}}>PAŃSTWO</div>
                <div style={{color:result.nOk?"#2ca87f":"#e85d4a",fontWeight:700,fontSize:"1rem"}}>{result.nOk?"✓":"✗"} {country.name}</div>
              </div>
              <div style={{background:result.cOk?"#0a220e":"#220a0a",borderRadius:"12px",padding:"12px 16px",border:`1px solid ${result.cOk?"#2ca87f44":"#e85d4a44"}`}}>
                <div style={{fontSize:"0.7rem",color:"#3a5070",marginBottom:"3px"}}>STOLICA</div>
                <div style={{color:result.cOk?"#2ca87f":"#e85d4a",fontWeight:700,fontSize:"1rem"}}>{result.cOk?"✓":"✗"} {country.capital}</div>
              </div>
            </div>
            <button onClick={onClose} style={{padding:"10px 28px",background:accentColor,color:"#fff",border:"none",borderRadius:"10px",fontFamily:"inherit",fontSize:"0.9rem",fontWeight:600,cursor:"pointer"}}>Następny kraj →</button>
          </div>
        ) : (
          <>
            <p style={{color:"#3a5070",textAlign:"center",margin:"0 0 1.2rem",fontSize:"0.82rem"}}>
              🔍 Kliknąłeś nieznane miejsce — wpisz nazwę państwa i jego stolicę
            </p>
            <label style={{display:"block",color:"#5577aa",fontSize:"0.72rem",marginBottom:"5px",letterSpacing:"0.05em"}}>🗺️ NAZWA PAŃSTWA</label>
            <input ref={ref1} value={nameVal} onChange={e=>setNameVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()}
              placeholder="Wpisz nazwę państwa..."
              style={{width:"100%",padding:"10px 14px",borderRadius:"10px",border:"1.5px solid #1e2d44",background:"#0a0f1e",color:"#e0e8f0",fontFamily:"inherit",fontSize:"0.9rem",marginBottom:"12px",boxSizing:"border-box"}}
            />
            <label style={{display:"block",color:"#5577aa",fontSize:"0.72rem",marginBottom:"5px",letterSpacing:"0.05em"}}>🏛️ STOLICA</label>
            <input value={capVal} onChange={e=>setCapVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()}
              placeholder="Wpisz stolicę..."
              style={{width:"100%",padding:"10px 14px",borderRadius:"10px",border:"1.5px solid #1e2d44",background:"#0a0f1e",color:"#e0e8f0",fontFamily:"inherit",fontSize:"0.9rem",marginBottom:"1.5rem",boxSizing:"border-box"}}
            />
            <button onClick={check} style={{width:"100%",padding:"12px",background:accentColor,color:"#fff",border:"none",borderRadius:"12px",fontFamily:"inherit",fontSize:"1rem",fontWeight:600,cursor:"pointer"}}>Sprawdź ✓</button>
          </>
        )}
      </div>
    </div>
  );
}

// ===== LEAFLET MAP =====
function LeafletMap({ continent, onCountryClick, completed, quizMode }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const getVisible = (cont) => cont==="Wszystkie" ? COUNTRIES : COUNTRIES.filter(c=>c.continent===cont);

  useEffect(() => {
    const existingLink = document.getElementById("leaflet-css");
    if (!existingLink) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    if (window.L) { initMap(); return; }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.onload = initMap;
    document.head.appendChild(s);
  }, []);

  function initMap() {
    if (!containerRef.current || mapRef.current) return;
    const L = window.L;
    const map = L.map(containerRef.current, { center:[20,10], zoom:2, minZoom:1, maxZoom:10 });
    // NOWE - wklej zamiast:
    if (quizMode) {
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",{
        attribution:"© OpenStreetMap © CARTO", subdomains:"abcd", maxZoom:19
      }).addTo(map);
    } else {
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{
        attribution:"© OpenStreetMap © CARTO", subdomains:"abcd", maxZoom:19
      }).addTo(map);
    }
    mapRef.current = map;
    redrawMarkers(map, getVisible(continent), quizMode, completed);
    fitView(map, continent);
  }

  function makeIcon(color, size, pulse=false) {
    return window.L.divIcon({
      className:"",
      html:`<div style="background:${color};width:${size}px;height:${size}px;border-radius:50%;border:2px solid rgba(255,255,255,${pulse?0.9:0.6});cursor:pointer;box-shadow:0 0 ${pulse?8:5}px ${color}${pulse?"cc":"88"};transition:all 0.2s;"></div>`,
      iconSize:[size,size], iconAnchor:[size/2,size/2]
    });
  }

  function redrawMarkers(map, countries, isQuiz, doneSet) {
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];
    countries.forEach(c => {
      const done = doneSet && doneSet.has(c.name);
      let col, size;
      if (done) { col="#2ca87f"; size=11; }
      else if (isQuiz) { col="#e85d4a"; size=10; }
      else { col=CONTINENT_COLORS[c.continent]||"#4f86c6"; size=10; }

      const marker = window.L.marker([c.lat,c.lng],{icon:makeIcon(col, size, isQuiz && !done)})
        .addTo(map)
        .on("click",()=>onCountryClick(c));

      // In learn mode show name tooltip; in quiz mode show "?" 
      if (isQuiz && !done) {
        marker.bindTooltip(`❓ ???`,{permanent:false,direction:"top",offset:[0,-8],className:"geo-tt geo-tt-quiz"});
      } else {
        marker.bindTooltip(`<b>${c.flag} ${c.name}</b><br><span style="color:#8899bb;font-size:11px">🏛️ ${c.capital}</span>`,{permanent:false,direction:"top",offset:[0,-8],className:"geo-tt"});
      }

      markersRef.current.push(marker);
    });
  }

  function fitView(map, cont) {
    const b = CONTINENT_BOUNDS[cont]||CONTINENT_BOUNDS["Wszystkie"];
    map.fitBounds(b,{padding:[20,20],animate:true,duration:0.7});
  }

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.L) return;
    redrawMarkers(map, getVisible(continent), quizMode, completed);
    fitView(map, continent);
  }, [continent, completed, quizMode]);

  return (
    <div style={{position:"relative",width:"100%",height:"520px",borderRadius:"16px",overflow:"hidden",border:`1.5px solid ${quizMode?"#e85d4a44":"#1e2d44"}`}}>
      <div ref={containerRef} style={{width:"100%",height:"100%"}} />
      <style>{`
        .geo-tt{background:#111c35!important;border:1px solid #4f86c6!important;color:#d0e0ff!important;font-family:'Lexend',sans-serif;font-size:12px;padding:6px 12px;border-radius:8px;white-space:nowrap;line-height:1.6}
        .geo-tt-quiz{border-color:#e85d4a!important;color:#f0a500!important;font-size:14px;font-weight:700}
        .geo-tt::before{display:none}
        .leaflet-control-zoom a{background:#111c35!important;color:#d0e0ff!important;border-color:#1e2d44!important}
        .leaflet-control-zoom a:hover{background:#1a2a44!important}
      `}</style>
    </div>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [continent, setContinent] = useState("Wszystkie");
  const [mode, setMode] = useState(MODES.LEARN);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // Quiz state
  const [quizOrder, setQuizOrder] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState({correct:0,wrong:0});
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Map state
  const [mapPopup, setMapPopup] = useState(null);
  const [mapDone, setMapDone] = useState(new Set());
  const [mapScore, setMapScore] = useState({c:0,t:0});

  const pool = COUNTRIES.filter(c=>continent==="Wszystkie"||c.continent===continent);
  const filtered = pool.filter(c=>search===""||c.name.toLowerCase().includes(search.toLowerCase())||c.capital.toLowerCase().includes(search.toLowerCase()));
  const isQuizMode = [MODES.QUIZ_CAPITAL,MODES.QUIZ_COUNTRY,MODES.QUIZ_FLAG].includes(mode);
  const isMapMode = mode===MODES.MAP_LEARN || mode===MODES.MAP_QUIZ;

  useEffect(()=>{ if(isQuizMode) startQuiz(); },[mode,continent]);

  // Reset map state on mode/continent change
  useEffect(()=>{ if(isMapMode){ setMapDone(new Set()); setMapScore({c:0,t:0}); } },[mode,continent]);

  function startQuiz() {
    const s = shuffle(pool);
    setQuizOrder(s); setQuizIndex(0); setAnswer(null);
    setScore({correct:0,wrong:0}); setShowResult(false);
    setStreak(0); setMaxStreak(0);
    if(s[0]) genOpts(s[0],mode);
  }

  function genOpts(cur, m) {
    const key = m===MODES.QUIZ_CAPITAL?"capital":m===MODES.QUIZ_COUNTRY?"name":"flag";
    setOptions(shuffle([cur[key],...getWrongs(cur,key)]));
  }

  function handleAnswer(opt) {
    if(answer!==null) return;
    const cur = quizOrder[quizIndex];
    const correct = mode===MODES.QUIZ_CAPITAL?cur.capital:mode===MODES.QUIZ_COUNTRY?cur.name:cur.flag;
    const ok = opt===correct;
    setAnswer(opt);
    const ns = ok?streak+1:0;
    setStreak(ns); setMaxStreak(m=>Math.max(m,ns));
    setScore(s=>({correct:s.correct+(ok?1:0),wrong:s.wrong+(ok?0:1)}));
    setTimeout(()=>{
      const ni = quizIndex+1;
      if(ni>=quizOrder.length){ setShowResult(true); }
      else { setQuizIndex(ni); setAnswer(null); genOpts(quizOrder[ni],mode); }
    },1200);
  }

  function handleMapResult(ok) {
    setMapScore(s=>({c:s.c+(ok?1:0),t:s.t+1}));
    if(ok&&mapPopup) setMapDone(prev=>new Set([...prev,mapPopup.name]));
  }

  function handleMapClick(country) {
    setMapPopup(country);
  }

  const cur = quizOrder[quizIndex];
  const progress = quizOrder.length>0?(quizIndex/quizOrder.length)*100:0;
  const mapQuizMode = mode===MODES.MAP_QUIZ;
  const totalInPool = pool.length;
  const mapPct = mapScore.t>0 ? Math.round(mapScore.c/mapScore.t*100) : 0;

  const tabs = [
    {key:MODES.LEARN, label:"📚 Przeglądaj"},
    {key:"map_group", label:"🗺️ Mapa", isGroup:true, children:[
      {key:MODES.MAP_LEARN, label:"📖 Nauka"},
      {key:MODES.MAP_QUIZ, label:"🎯 Quiz"},
    ]},
    {key:MODES.QUIZ_CAPITAL, label:"🏙️ Stolice"},
    {key:MODES.QUIZ_COUNTRY, label:"🌐 Kraje"},
    {key:MODES.QUIZ_FLAG, label:"🚩 Flagi"},
  ];

  return (
    <div style={{fontFamily:"'Lexend',sans-serif",minHeight:"100vh",background:"#080e1a"}}>
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet"/>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#0c1628 0%,#111c35 100%)",padding:"1rem 1.5rem",borderBottom:"1px solid #1a2740",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.8rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <span style={{fontSize:"2.2rem"}}>🌍</span>
          <div>
            <h1 style={{margin:0,fontSize:"1.4rem",fontWeight:700,color:"#e0eeff",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:"-0.5px"}}>GeoMaestro</h1>
            <p style={{margin:0,fontSize:"0.68rem",color:"#3a5070"}}>Interaktywna nauka geografii świata</p>
          </div>
        </div>
        <div style={{display:"flex",gap:"5px",flexWrap:"wrap",alignItems:"center"}}>
          {/* Przeglądaj */}
          <button onClick={()=>setMode(MODES.LEARN)} style={{padding:"6px 13px",borderRadius:"18px",border:"none",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,fontFamily:"inherit",background:mode===MODES.LEARN?"#4f86c6":"rgba(255,255,255,0.07)",color:mode===MODES.LEARN?"#fff":"#6699bb",transition:"all 0.18s"}}>📚 Przeglądaj</button>

          {/* Mapa group */}
          <div style={{display:"flex",background:"rgba(255,255,255,0.05)",borderRadius:"20px",border:`1px solid ${isMapMode?"#4f86c644":"transparent"}`,overflow:"hidden"}}>
            <button onClick={()=>setMode(MODES.MAP_LEARN)} style={{padding:"6px 12px",border:"none",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,fontFamily:"inherit",background:mode===MODES.MAP_LEARN?"#4f86c6":"transparent",color:mode===MODES.MAP_LEARN?"#fff":"#6699bb",transition:"all 0.18s",borderRight:"1px solid rgba(255,255,255,0.08)"}}>📖 Mapa nauki</button>
            <button onClick={()=>setMode(MODES.MAP_QUIZ)} style={{padding:"6px 12px",border:"none",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,fontFamily:"inherit",background:mode===MODES.MAP_QUIZ?"#e85d4a":"transparent",color:mode===MODES.MAP_QUIZ?"#fff":"#6699bb",transition:"all 0.18s"}}>🎯 Mapa quiz</button>
          </div>

          <button onClick={()=>setMode(MODES.QUIZ_CAPITAL)} style={{padding:"6px 13px",borderRadius:"18px",border:"none",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,fontFamily:"inherit",background:mode===MODES.QUIZ_CAPITAL?"#4f86c6":"rgba(255,255,255,0.07)",color:mode===MODES.QUIZ_CAPITAL?"#fff":"#6699bb",transition:"all 0.18s"}}>🏙️ Stolice</button>
          <button onClick={()=>setMode(MODES.QUIZ_COUNTRY)} style={{padding:"6px 13px",borderRadius:"18px",border:"none",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,fontFamily:"inherit",background:mode===MODES.QUIZ_COUNTRY?"#4f86c6":"rgba(255,255,255,0.07)",color:mode===MODES.QUIZ_COUNTRY?"#fff":"#6699bb",transition:"all 0.18s"}}>🌐 Kraje</button>
          <button onClick={()=>setMode(MODES.QUIZ_FLAG)} style={{padding:"6px 13px",borderRadius:"18px",border:"none",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,fontFamily:"inherit",background:mode===MODES.QUIZ_FLAG?"#4f86c6":"rgba(255,255,255,0.07)",color:mode===MODES.QUIZ_FLAG?"#fff":"#6699bb",transition:"all 0.18s"}}>🚩 Flagi</button>
        </div>
      </div>

      {/* CONTINENT FILTER */}
      <div style={{background:"#0c1628",padding:"0.55rem 1.5rem",display:"flex",gap:"6px",flexWrap:"wrap",borderBottom:"1px solid #1a2740",alignItems:"center"}}>
        {CONTINENTS.map(c=>{
          const col = CONTINENT_COLORS[c]||"#4f86c6";
          const active = continent===c;
          return (
            <button key={c} onClick={()=>setContinent(c)} style={{padding:"4px 11px",borderRadius:"13px",border:`1.5px solid ${active?col:"transparent"}`,background:active?col+"22":"rgba(255,255,255,0.04)",color:active?col:"#3a5070",cursor:"pointer",fontSize:"0.72rem",fontWeight:500,fontFamily:"inherit",whiteSpace:"nowrap",transition:"all 0.18s"}}>{c}</button>
          );
        })}
        <span style={{marginLeft:"auto",fontSize:"0.7rem",color:"#223344"}}>{pool.length} państw</span>
        {isMapMode && mapScore.t>0 && (
          <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
            <span style={{fontSize:"0.72rem",color:"#2ca87f",fontWeight:500}}>✓ {mapScore.c}</span>
            <span style={{fontSize:"0.72rem",color:"#e85d4a",fontWeight:500}}>✗ {mapScore.t-mapScore.c}</span>
            <span style={{fontSize:"0.72rem",color:"#3a5070"}}>{mapPct}%</span>
          </div>
        )}
      </div>

      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"1.2rem 1rem"}}>

        {/* MAP MODES */}
        {isMapMode && (
          <div>
            {/* Mode banner */}
            <div style={{marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                {mapQuizMode ? (
                  <div style={{background:"#e85d4a22",border:"1px solid #e85d4a44",borderRadius:"10px",padding:"8px 14px",display:"flex",alignItems:"center",gap:"8px"}}>
                    <span style={{fontSize:"1.1rem"}}>🎯</span>
                    <div>
                      <div style={{color:"#e85d4a",fontWeight:600,fontSize:"0.82rem"}}>Tryb Quiz — nazwy ukryte</div>
                      <div style={{color:"#3a5070",fontSize:"0.7rem"}}>Klikaj w czerwone kropki i wpisz nazwę + stolicę</div>
                    </div>
                  </div>
                ) : (
                  <div style={{background:"#4f86c622",border:"1px solid #4f86c644",borderRadius:"10px",padding:"8px 14px",display:"flex",alignItems:"center",gap:"8px"}}>
                    <span style={{fontSize:"1.1rem"}}>📖</span>
                    <div>
                      <div style={{color:"#4f86c6",fontWeight:600,fontSize:"0.82rem"}}>Tryb Nauki — nazwy widoczne</div>
                      <div style={{color:"#3a5070",fontSize:"0.7rem"}}>Najedź lub kliknij kropkę aby zobaczyć szczegóły</div>
                    </div>
                  </div>
                )}
              </div>
              <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
                {mapScore.t>0 && <>
                  <div style={{background:"#0a220e",border:"1px solid #2ca87f33",borderRadius:"8px",padding:"6px 12px",textAlign:"center"}}>
                    <div style={{color:"#2ca87f",fontWeight:700,fontSize:"1rem"}}>{mapScore.c}</div>
                    <div style={{color:"#3a5070",fontSize:"0.6rem"}}>poprawnych</div>
                  </div>
                  <div style={{background:"#220a0a",border:"1px solid #e85d4a33",borderRadius:"8px",padding:"6px 12px",textAlign:"center"}}>
                    <div style={{color:"#e85d4a",fontWeight:700,fontSize:"1rem"}}>{mapScore.t-mapScore.c}</div>
                    <div style={{color:"#3a5070",fontSize:"0.6rem"}}>błędów</div>
                  </div>
                  <div style={{background:"#0a0f1e",border:"1px solid #1a2740",borderRadius:"8px",padding:"6px 12px",textAlign:"center"}}>
                    <div style={{color:"#4f86c6",fontWeight:700,fontSize:"1rem"}}>{mapDone.size}/{totalInPool}</div>
                    <div style={{color:"#3a5070",fontSize:"0.6rem"}}>ukończonych</div>
                  </div>
                  <button onClick={()=>{setMapDone(new Set());setMapScore({c:0,t:0});}} style={{background:"rgba(255,255,255,0.05)",border:"1px solid #1a2740",color:"#556677",padding:"6px 12px",borderRadius:"8px",fontSize:"0.72rem",cursor:"pointer",fontFamily:"inherit"}}>Reset</button>
                </>}
              </div>
            </div>

            {/* Progress bar for quiz mode */}
            {mapQuizMode && mapScore.t>0 && (
              <div style={{marginBottom:"10px",height:"4px",background:"#0c1628",borderRadius:"2px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${(mapDone.size/totalInPool)*100}%`,background:"linear-gradient(90deg,#e85d4a,#2ca87f)",borderRadius:"2px",transition:"width 0.4s"}}/>
              </div>
            )}

            {/* Legend */}
            <div style={{display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"10px",alignItems:"center"}}>
              {!mapQuizMode && Object.entries(CONTINENT_COLORS).map(([k,v])=>(
                <div key={k} style={{display:"flex",alignItems:"center",gap:"4px"}}>
                  <div style={{width:"8px",height:"8px",borderRadius:"50%",background:v}}/>
                  <span style={{fontSize:"0.63rem",color:"#3a5070"}}>{k}</span>
                </div>
              ))}
              {mapQuizMode && <div style={{display:"flex",alignItems:"center",gap:"4px"}}>
                <div style={{width:"9px",height:"9px",borderRadius:"50%",background:"#e85d4a",boxShadow:"0 0 5px #e85d4a88"}}/>
                <span style={{fontSize:"0.65rem",color:"#e85d4a"}}>Nieodgadnięte</span>
              </div>}
              <div style={{display:"flex",alignItems:"center",gap:"4px"}}>
                <div style={{width:"9px",height:"9px",borderRadius:"50%",background:"#2ca87f",boxShadow:"0 0 5px #2ca87f88"}}/>
                <span style={{fontSize:"0.65rem",color:"#2ca87f"}}>Poprawnie zgadnięte ✓</span>
              </div>
            </div>

            <LeafletMap
              continent={continent}
              onCountryClick={handleMapClick}
              completed={mapDone}
              quizMode={mapQuizMode}
            />

            {/* Completion message */}
            {mapQuizMode && mapDone.size===totalInPool && totalInPool>0 && (
              <div style={{marginTop:"16px",background:"linear-gradient(135deg,#0a220e,#0f2a1a)",border:"1.5px solid #2ca87f55",borderRadius:"16px",padding:"1.5rem",textAlign:"center"}}>
                <div style={{fontSize:"3rem",marginBottom:"8px"}}>🏆</div>
                <div style={{color:"#2ca87f",fontWeight:700,fontSize:"1.1rem",marginBottom:"4px"}}>Ukończyłeś wszystkie państwa!</div>
                <div style={{color:"#3a5070",fontSize:"0.82rem",marginBottom:"12px"}}>Wynik: {mapScore.c}/{mapScore.t} ({mapPct}% poprawnych)</div>
                <button onClick={()=>{setMapDone(new Set());setMapScore({c:0,t:0});}} style={{padding:"10px 24px",background:"#2ca87f",color:"#fff",border:"none",borderRadius:"10px",fontFamily:"inherit",fontSize:"0.9rem",fontWeight:600,cursor:"pointer"}}>Zagraj ponownie 🔄</button>
              </div>
            )}
          </div>
        )}

        {/* LEARN MODE */}
        {mode===MODES.LEARN && (
          <>
            <div style={{marginBottom:"1rem"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Szukaj kraju lub stolicy..."
                style={{width:"100%",padding:"10px 16px",borderRadius:"10px",border:"1.5px solid #1a2740",fontSize:"0.88rem",background:"#0c1628",color:"#d0e0ff",fontFamily:"inherit",boxSizing:"border-box"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:"9px"}}>
              {filtered.map(c=>(
                <div key={c.name+c.continent} onClick={()=>setSelected(selected?.name===c.name?null:c)}
                  style={{background:selected?.name===c.name?"#162040":"#0c1628",borderRadius:"12px",padding:"11px 13px",cursor:"pointer",border:`1.5px solid ${selected?.name===c.name?(CONTINENT_COLORS[c.continent]||"#4f86c6"):"#1a2740"}`,transition:"all 0.18s",display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{fontSize:"1.7rem",lineHeight:1}}>{c.flag}</div>
                  <div>
                    <div style={{fontWeight:600,fontSize:"0.82rem",color:"#c0d5f0"}}>{c.name}</div>
                    <div style={{fontSize:"0.72rem",color:"#3a5070",marginTop:"2px"}}>🏛️ {c.capital}</div>
                    <div style={{fontSize:"0.62rem",marginTop:"4px",display:"inline-block",padding:"2px 7px",borderRadius:"8px",background:(CONTINENT_COLORS[c.continent]||"#4f86c6")+"20",color:CONTINENT_COLORS[c.continent]||"#4f86c6"}}>{c.continent}</div>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length===0&&<div style={{textAlign:"center",color:"#223344",padding:"3rem"}}>Brak wyników</div>}
          </>
        )}

        {/* QUIZ MODES */}
        {isQuizMode && (showResult ? (
          <div style={{maxWidth:"460px",margin:"2rem auto",background:"#0c1628",borderRadius:"20px",padding:"2.5rem",textAlign:"center",border:"1.5px solid #1a2740"}}>
            <div style={{fontSize:"4rem",marginBottom:"1rem"}}>{score.correct/quizOrder.length>=0.8?"🏆":score.correct/quizOrder.length>=0.5?"🎓":"📖"}</div>
            <h2 style={{color:"#d0e0ff",margin:"0 0 0.5rem",fontFamily:"'Space Grotesk',sans-serif"}}>Wynik końcowy</h2>
            <div style={{fontSize:"3rem",fontWeight:700,color:"#4f86c6",margin:"0.5rem 0"}}>{score.correct}/{quizOrder.length}</div>
            <div style={{color:"#3a5070",marginBottom:"1.5rem"}}>{Math.round(score.correct/quizOrder.length*100)}% poprawnych</div>
            <div style={{display:"flex",gap:"10px",justifyContent:"center",marginBottom:"1.5rem"}}>
              {[{l:"poprawnych",v:score.correct,c:"#2ca87f"},{l:"błędów",v:score.wrong,c:"#e85d4a"},{l:"max seria",v:maxStreak,c:"#f0a500"}].map(x=>(
                <div key={x.l} style={{background:"#080e1a",borderRadius:"10px",padding:"10px 14px"}}>
                  <div style={{color:x.c,fontSize:"1.4rem",fontWeight:700}}>{x.v}</div>
                  <div style={{color:"#223344",fontSize:"0.68rem"}}>{x.l}</div>
                </div>
              ))}
            </div>
            <button onClick={startQuiz} style={{padding:"11px 30px",background:"#4f86c6",color:"#fff",border:"none",borderRadius:"10px",fontSize:"0.95rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Zagraj ponownie 🔄</button>
          </div>
        ) : cur ? (
          <div style={{maxWidth:"540px",margin:"0 auto"}}>
            <div style={{marginBottom:"1.2rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                <span style={{color:"#3a5070",fontSize:"0.78rem"}}>{quizIndex+1} / {quizOrder.length}</span>
                <div style={{display:"flex",gap:"10px"}}>
                  {streak>=2&&<span style={{color:"#f0a500",fontSize:"0.78rem"}}>🔥 {streak}</span>}
                  <span style={{color:"#2ca87f",fontSize:"0.78rem"}}>✓ {score.correct}</span>
                  <span style={{color:"#e85d4a",fontSize:"0.78rem"}}>✗ {score.wrong}</span>
                </div>
              </div>
              <div style={{height:"5px",background:"#0c1628",borderRadius:"3px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#4f86c6,#2ca87f)",borderRadius:"3px",transition:"width 0.3s"}}/>
              </div>
            </div>
            <div style={{background:"#0c1628",borderRadius:"16px",padding:"1.8rem",border:"1.5px solid #1a2740",textAlign:"center",marginBottom:"1.2rem"}}>
              {mode===MODES.QUIZ_CAPITAL&&<>
                <div style={{fontSize:"3rem",marginBottom:"0.5rem"}}>{cur.flag}</div>
                <p style={{color:"#3a5070",fontSize:"0.82rem",margin:"0 0 0.5rem"}}>Jaka jest stolica państwa?</p>
                <h2 style={{color:"#d0e0ff",fontSize:"1.5rem",margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{cur.name}</h2>
              </>}
              {mode===MODES.QUIZ_COUNTRY&&<>
                <p style={{color:"#3a5070",fontSize:"0.82rem",margin:"0 0 0.8rem"}}>Jakiego państwa to stolica?</p>
                <h2 style={{color:"#4f86c6",fontSize:"1.9rem",margin:"0 0 0.4rem",fontFamily:"'Space Grotesk',sans-serif"}}>{cur.capital}</h2>
                <div style={{fontSize:"0.72rem",color:"#223344"}}>{cur.continent}</div>
              </>}
              {mode===MODES.QUIZ_FLAG&&<>
                <div style={{fontSize:"5rem",lineHeight:1.2,margin:"0.4rem 0 0.8rem"}}>{cur.flag}</div>
                <p style={{color:"#3a5070",fontSize:"0.82rem",margin:0}}>Czyja to flaga?</p>
              </>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"9px"}}>
              {options.map(opt=>{
                const ca = mode===MODES.QUIZ_CAPITAL?cur.capital:mode===MODES.QUIZ_COUNTRY?cur.name:cur.flag;
                let bg="#0c1628",border="#1a2740",col="#c0d5f0";
                if(answer!==null){
                  if(opt===ca){bg="#091a0c";border="#2ca87f";col="#2ca87f";}
                  else if(opt===answer){bg="#1a0909";border="#e85d4a";col="#e85d4a";}
                  else{bg="#060c18";border="#0e1a2e";col="#223344";}
                }
                return <button key={opt} onClick={()=>handleAnswer(opt)} style={{padding:"13px 10px",borderRadius:"12px",border:`1.5px solid ${border}`,background:bg,color:col,fontFamily:"inherit",fontSize:"0.85rem",fontWeight:500,cursor:answer!==null?"default":"pointer",textAlign:"center",transition:"all 0.2s",lineHeight:1.3}}>{opt}</button>;
              })}
            </div>
            {answer!==null&&(
              <div style={{marginTop:"1rem",textAlign:"center",fontSize:"0.82rem"}}>
                {answer===(mode===MODES.QUIZ_CAPITAL?cur.capital:mode===MODES.QUIZ_COUNTRY?cur.name:cur.flag)
                  ?<span style={{color:"#2ca87f"}}>✓ Brawo! {streak>=3?"🔥".repeat(Math.min(streak,5)):""}</span>
                  :<span style={{color:"#e85d4a"}}>✗ Poprawna: <b style={{color:"#d0e0ff"}}>{mode===MODES.QUIZ_CAPITAL?cur.capital:mode===MODES.QUIZ_COUNTRY?cur.name:cur.flag}</b></span>
                }
              </div>
            )}
          </div>
        ) : null)}
      </div>

      {/* POPUPS */}
      {mapPopup && mode===MODES.MAP_LEARN && (
        <LearnPopup country={mapPopup} onClose={()=>setMapPopup(null)} />
      )}
      {mapPopup && mode===MODES.MAP_QUIZ && (
        <QuizPopup country={mapPopup} onClose={()=>setMapPopup(null)} onResult={handleMapResult} />
      )}

      <style>{`
        @keyframes popIn{from{opacity:0;transform:scale(0.9) translateY(12px)}to{opacity:1;transform:none}}
        *{box-sizing:border-box}
        input:focus{outline:none;border-color:#4f86c6!important}
      `}</style>
    </div>
  );
}
