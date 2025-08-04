import mongoose from 'mongoose';
import '../db.js';

const MONGO_URI = 'mongodb+srv://alexcelischi123:NWV90DuaFVM0X0SG@apijs.04sz8by.mongodb.net/?retryWrites=true&w=majority&appName=Apijs';

// Definir el esquema para poder usar el modelo
const heroSchema = new mongoose.Schema({
  id: Number,
  name: String,
  alias: String,
  city: String,
  team: String
});

const Hero = mongoose.model('Hero', heroSchema);

// Lista de superhéroes diferentes
const superheroes = [
  { name: "Spider-Man", alias: "El Hombre Araña", city: "Nueva York", team: "Los Vengadores" },
  { name: "Iron Man", alias: "El Hombre de Hierro", city: "Malibu", team: "Los Vengadores" },
  { name: "Captain America", alias: "El Capitán América", city: "Brooklyn", team: "Los Vengadores" },
  { name: "Thor", alias: "El Dios del Trueno", city: "Asgard", team: "Los Vengadores" },
  { name: "Hulk", alias: "La Masa Verde", city: "Nueva York", team: "Los Vengadores" },
  { name: "Black Widow", alias: "La Viuda Negra", city: "Moscú", team: "Los Vengadores" },
  { name: "Hawkeye", alias: "Ojo de Halcón", city: "Iowa", team: "Los Vengadores" },
  { name: "Black Panther", alias: "La Pantera Negra", city: "Wakanda", team: "Los Vengadores" },
  { name: "Doctor Strange", alias: "El Hechicero Supremo", city: "Nueva York", team: "Los Vengadores" },
  { name: "Scarlet Witch", alias: "La Bruja Escarlata", city: "Sokovia", team: "Los Vengadores" },
  { name: "Vision", alias: "La Visión", city: "Nueva York", team: "Los Vengadores" },
  { name: "Falcon", alias: "El Halcón", city: "Washington D.C.", team: "Los Vengadores" },
  { name: "Winter Soldier", alias: "El Soldado del Invierno", city: "Brooklyn", team: "Los Vengadores" },
  { name: "Ant-Man", alias: "El Hombre Hormiga", city: "San Francisco", team: "Los Vengadores" },
  { name: "Wasp", alias: "La Avispa", city: "San Francisco", team: "Los Vengadores" },
  { name: "Captain Marvel", alias: "La Capitana Marvel", city: "Los Angeles", team: "Los Vengadores" },
  { name: "Spider-Gwen", alias: "Spider-Woman", city: "Nueva York", team: "Spider-Verse" },
  { name: "Miles Morales", alias: "Spider-Man", city: "Brooklyn", team: "Spider-Verse" },
  { name: "Venom", alias: "El Simbionte", city: "San Francisco", team: "Independiente" },
  { name: "Deadpool", alias: "El Mercenario Bocazas", city: "Nueva York", team: "X-Force" },
  { name: "Wolverine", alias: "El Lobo", city: "Alberta", team: "X-Men" },
  { name: "Cyclops", alias: "El Líder", city: "Nueva York", team: "X-Men" },
  { name: "Jean Grey", alias: "La Fénix", city: "Nueva York", team: "X-Men" },
  { name: "Storm", alias: "La Diosa del Clima", city: "Nueva York", team: "X-Men" },
  { name: "Nightcrawler", alias: "El Demonio Azul", city: "Alemania", team: "X-Men" },
  { name: "Colossus", alias: "El Gigante de Acero", city: "Rusia", team: "X-Men" },
  { name: "Rogue", alias: "La Ladrona", city: "Mississippi", team: "X-Men" },
  { name: "Gambit", alias: "El Cajún", city: "Nueva Orleans", team: "X-Men" },
  { name: "Beast", alias: "El Genio Azul", city: "Nueva York", team: "X-Men" },
  { name: "Iceman", alias: "El Hombre de Hielo", city: "Nueva York", team: "X-Men" },
  { name: "Angel", alias: "El Arcángel", city: "Nueva York", team: "X-Men" },
  { name: "Psylocke", alias: "La Telepata", city: "Londres", team: "X-Men" },
  { name: "Jubilee", alias: "La Pirotecnica", city: "Beverly Hills", team: "X-Men" },
  { name: "Kitty Pryde", alias: "La Sombra", city: "Illinois", team: "X-Men" },
  { name: "Emma Frost", alias: "La Reina Blanca", city: "Boston", team: "X-Men" },
  { name: "Magneto", alias: "El Maestro del Magnetismo", city: "Polonia", team: "Hermandad" },
  { name: "Mystique", alias: "La Cambiaformas", city: "Alemania", team: "Hermandad" },
  { name: "Sabretooth", alias: "El Diente de Sable", city: "Alberta", team: "Hermandad" },
  { name: "Juggernaut", alias: "El Imparable", city: "Nueva York", team: "Hermandad" },
  { name: "Toad", alias: "El Sapo", city: "Nueva York", team: "Hermandad" },
  { name: "Blob", alias: "La Masa", city: "Nueva York", team: "Hermandad" },
  { name: "Pyro", alias: "El Pirómano", city: "Australia", team: "Hermandad" },
  { name: "Avalanche", alias: "El Terremoto", city: "Italia", team: "Hermandad" },
  { name: "Destiny", alias: "La Vidente", city: "Austria", team: "Hermandad" },
  { name: "Quicksilver", alias: "El Velocista", city: "Sokovia", team: "Hermandad" },
  { name: "Polaris", alias: "La Hija de Magneto", city: "Sokovia", team: "Hermandad" },
  { name: "Toad", alias: "El Sapo", city: "Nueva York", team: "Hermandad" },
  { name: "Blob", alias: "La Masa", city: "Nueva York", team: "Hermandad" },
  { name: "Pyro", alias: "El Pirómano", city: "Australia", team: "Hermandad" },
  { name: "Avalanche", alias: "El Terremoto", city: "Italia", team: "Hermandad" },
  { name: "Destiny", alias: "La Vidente", city: "Austria", team: "Hermandad" },
  { name: "Quicksilver", alias: "El Velocista", city: "Sokovia", team: "Hermandad" },
  { name: "Polaris", alias: "La Hija de Magneto", city: "Sokovia", team: "Hermandad" },
  { name: "Daredevil", alias: "El Hombre Sin Miedo", city: "Nueva York", team: "Defenders" },
  { name: "Luke Cage", alias: "Power Man", city: "Harlem", team: "Defenders" },
  { name: "Iron Fist", alias: "El Puño de Hierro", city: "K'un-L'un", team: "Defenders" },
  { name: "Jessica Jones", alias: "La Pájaro Azul", city: "Nueva York", team: "Defenders" },
  { name: "Punisher", alias: "El Castigador", city: "Nueva York", team: "Independiente" },
  { name: "Ghost Rider", alias: "El Jinete Fantasma", city: "Los Angeles", team: "Independiente" },
  { name: "Blade", alias: "El Cazador de Vampiros", city: "Londres", team: "Independiente" },
  { name: "Moon Knight", alias: "El Caballero Luna", city: "Chicago", team: "Independiente" },
  { name: "Silver Surfer", alias: "El Surfista Plateado", city: "Zenn-La", team: "Independiente" },
  { name: "Galactus", alias: "El Devorador de Mundos", city: "Cosmos", team: "Independiente" },
  { name: "Thanos", alias: "El Titán Loco", city: "Titán", team: "Independiente" },
  { name: "Loki", alias: "El Dios del Engaño", city: "Asgard", team: "Independiente" },
  { name: "Ultron", alias: "El Androide", city: "Nueva York", team: "Independiente" },
  { name: "Red Skull", alias: "La Calavera Roja", city: "Alemania", team: "Hydra" },
  { name: "Baron Zemo", alias: "El Barón", city: "Sokovia", team: "Hydra" },
  { name: "Crossbones", alias: "Los Huesos Cruzados", city: "Nueva York", team: "Hydra" },
  { name: "Taskmaster", alias: "El Maestro de Tareas", city: "Nueva York", team: "Independiente" },
  { name: "Bullseye", alias: "El Ojo de Toro", city: "Nueva York", team: "Independiente" },
  { name: "Kingpin", alias: "El Rey del Crimen", city: "Nueva York", team: "Independiente" },
  { name: "Green Goblin", alias: "El Duende Verde", city: "Nueva York", team: "Independiente" },
  { name: "Doctor Octopus", alias: "El Pulpo", city: "Nueva York", team: "Independiente" },
  { name: "Sandman", alias: "El Hombre de Arena", city: "Nueva York", team: "Independiente" },
  { name: "Electro", alias: "El Electro", city: "Nueva York", team: "Independiente" },
  { name: "Vulture", alias: "El Buitre", city: "Nueva York", team: "Independiente" },
  { name: "Mysterio", alias: "El Misterio", city: "Nueva York", team: "Independiente" },
  { name: "Kraven", alias: "El Cazador", city: "Rusia", team: "Independiente" },
  { name: "Lizard", alias: "El Lagarto", city: "Nueva York", team: "Independiente" },
  { name: "Rhino", alias: "El Rinoceronte", city: "Nueva York", team: "Independiente" },
  { name: "Scorpion", alias: "El Escorpión", city: "Nueva York", team: "Independiente" },
  { name: "Shocker", alias: "El Impacto", city: "Nueva York", team: "Independiente" },
  { name: "Chameleon", alias: "El Camaleón", city: "Rusia", team: "Independiente" },
  { name: "Hobgoblin", alias: "El Duende Naranja", city: "Nueva York", team: "Independiente" },
  { name: "Carnage", alias: "La Carnicería", city: "Nueva York", team: "Independiente" },
  { name: "Morbius", alias: "El Vampiro Viviente", city: "Nueva York", team: "Independiente" },
  { name: "Man-Wolf", alias: "El Hombre Lobo", city: "Nueva York", team: "Independiente" },
  { name: "Toxin", alias: "La Toxina", city: "Nueva York", team: "Independiente" },
  { name: "Anti-Venom", alias: "El Anti-Veneno", city: "Nueva York", team: "Independiente" },
  { name: "Scream", alias: "El Grito", city: "Nueva York", team: "Independiente" },
  { name: "Lasher", alias: "El Látigo", city: "Nueva York", team: "Independiente" },
  { name: "Phage", alias: "El Fago", city: "Nueva York", team: "Independiente" },
  { name: "Riot", alias: "El Motín", city: "Nueva York", team: "Independiente" },
  { name: "Agony", alias: "La Agonía", city: "Nueva York", team: "Independiente" },
  { name: "She-Venom", alias: "La Veneno", city: "Nueva York", team: "Independiente" },
  { name: "Spider-Woman", alias: "La Mujer Araña", city: "Londres", team: "Independiente" },
  { name: "Spider-Girl", alias: "La Chica Araña", city: "Nueva York", team: "Independiente" },
  { name: "Spider-Man 2099", alias: "El Hombre Araña del Futuro", city: "Nueva York 2099", team: "Independiente" },
  { name: "Spider-Man Noir", alias: "El Hombre Araña Negro", city: "Nueva York 1933", team: "Independiente" },
  { name: "Spider-Ham", alias: "El Cerdo Araña", city: "Nueva York", team: "Independiente" },
  { name: "Spider-Man India", alias: "El Hombre Araña de la India", city: "Mumbai", team: "Independiente" },
  { name: "Spider-Man UK", alias: "El Hombre Araña del Reino Unido", city: "Londres", team: "Independiente" },
  { name: "Spider-Man Japan", alias: "El Hombre Araña de Japón", city: "Tokio", team: "Independiente" },
  { name: "Spider-Man France", alias: "L'Homme Araignée", city: "París", team: "Independiente" },
  { name: "Spider-Man Germany", alias: "Der Spinnenmann", city: "Berlín", team: "Independiente" },
  { name: "Spider-Man Italy", alias: "L'Uomo Ragno", city: "Roma", team: "Independiente" },
  { name: "Spider-Man Spain", alias: "El Hombre Araña", city: "Madrid", team: "Independiente" },
  { name: "Spider-Man Brazil", alias: "O Homem-Aranha", city: "São Paulo", team: "Independiente" },
  { name: "Spider-Man Mexico", alias: "El Hombre Araña", city: "Ciudad de México", team: "Independiente" },
  { name: "Spider-Man Argentina", alias: "El Hombre Araña", city: "Buenos Aires", team: "Independiente" },
  { name: "Spider-Man Chile", alias: "El Hombre Araña", city: "Santiago", team: "Independiente" },
  { name: "Spider-Man Peru", alias: "El Hombre Araña", city: "Lima", team: "Independiente" },
  { name: "Spider-Man Colombia", alias: "El Hombre Araña", city: "Bogotá", team: "Independiente" },
  { name: "Spider-Man Venezuela", alias: "El Hombre Araña", city: "Caracas", team: "Independiente" },
  { name: "Spider-Man Ecuador", alias: "El Hombre Araña", city: "Quito", team: "Independiente" },
  { name: "Spider-Man Bolivia", alias: "El Hombre Araña", city: "La Paz", team: "Independiente" },
  { name: "Spider-Man Paraguay", alias: "El Hombre Araña", city: "Asunción", team: "Independiente" },
  { name: "Spider-Man Uruguay", alias: "El Hombre Araña", city: "Montevideo", team: "Independiente" },
  { name: "Spider-Man Costa Rica", alias: "El Hombre Araña", city: "San José", team: "Independiente" },
  { name: "Spider-Man Panama", alias: "El Hombre Araña", city: "Ciudad de Panamá", team: "Independiente" },
  { name: "Spider-Man Nicaragua", alias: "El Hombre Araña", city: "Managua", team: "Independiente" },
  { name: "Spider-Man Honduras", alias: "El Hombre Araña", city: "Tegucigalpa", team: "Independiente" },
  { name: "Spider-Man El Salvador", alias: "El Hombre Araña", city: "San Salvador", team: "Independiente" },
  { name: "Spider-Man Guatemala", alias: "El Hombre Araña", city: "Ciudad de Guatemala", team: "Independiente" },
  { name: "Spider-Man Belize", alias: "El Hombre Araña", city: "Belmopán", team: "Independiente" },
  { name: "Spider-Man Cuba", alias: "El Hombre Araña", city: "La Habana", team: "Independiente" },
  { name: "Spider-Man Jamaica", alias: "El Hombre Araña", city: "Kingston", team: "Independiente" },
  { name: "Spider-Man Haiti", alias: "El Hombre Araña", city: "Puerto Príncipe", team: "Independiente" },
  { name: "Spider-Man Dominican Republic", alias: "El Hombre Araña", city: "Santo Domingo", team: "Independiente" },
  { name: "Spider-Man Puerto Rico", alias: "El Hombre Araña", city: "San Juan", team: "Independiente" },
  { name: "Spider-Man Bahamas", alias: "El Hombre Araña", city: "Nassau", team: "Independiente" },
  { name: "Spider-Man Trinidad", alias: "El Hombre Araña", city: "Puerto España", team: "Independiente" },
  { name: "Spider-Man Barbados", alias: "El Hombre Araña", city: "Bridgetown", team: "Independiente" },
  { name: "Spider-Man Grenada", alias: "El Hombre Araña", city: "Saint George's", team: "Independiente" },
  { name: "Spider-Man Saint Lucia", alias: "El Hombre Araña", city: "Castries", team: "Independiente" },
  { name: "Spider-Man Saint Vincent", alias: "El Hombre Araña", city: "Kingstown", team: "Independiente" },
  { name: "Spider-Man Antigua", alias: "El Hombre Araña", city: "Saint John's", team: "Independiente" },
  { name: "Spider-Man Dominica", alias: "El Hombre Araña", city: "Roseau", team: "Independiente" },
  { name: "Spider-Man Saint Kitts", alias: "El Hombre Araña", city: "Basseterre", team: "Independiente" },
  { name: "Spider-Man Nevis", alias: "El Hombre Araña", city: "Charlestown", team: "Independiente" },
  { name: "Spider-Man Anguilla", alias: "El Hombre Araña", city: "The Valley", team: "Independiente" },
  { name: "Spider-Man Montserrat", alias: "El Hombre Araña", city: "Plymouth", team: "Independiente" },
  { name: "Spider-Man British Virgin Islands", alias: "El Hombre Araña", city: "Road Town", team: "Independiente" },
  { name: "Spider-Man US Virgin Islands", alias: "El Hombre Araña", city: "Charlotte Amalie", team: "Independiente" },
  { name: "Spider-Man Cayman Islands", alias: "El Hombre Araña", city: "George Town", team: "Independiente" },
  { name: "Spider-Man Turks", alias: "El Hombre Araña", city: "Cockburn Town", team: "Independiente" },
  { name: "Spider-Man Caicos", alias: "El Hombre Araña", city: "Cockburn Town", team: "Independiente" },
  { name: "Spider-Man Aruba", alias: "El Hombre Araña", city: "Oranjestad", team: "Independiente" },
  { name: "Spider-Man Curacao", alias: "El Hombre Araña", city: "Willemstad", team: "Independiente" },
  { name: "Spider-Man Bonaire", alias: "El Hombre Araña", city: "Kralendijk", team: "Independiente" },
  { name: "Spider-Man Sint Maarten", alias: "El Hombre Araña", city: "Philipsburg", team: "Independiente" },
  { name: "Spider-Man Sint Eustatius", alias: "El Hombre Araña", city: "Oranjestad", team: "Independiente" },
  { name: "Spider-Man Saba", alias: "El Hombre Araña", city: "The Bottom", team: "Independiente" },
  { name: "Spider-Man French Guiana", alias: "El Hombre Araña", city: "Cayenne", team: "Independiente" },
  { name: "Spider-Man Suriname", alias: "El Hombre Araña", city: "Paramaribo", team: "Independiente" },
  { name: "Spider-Man Guyana", alias: "El Hombre Araña", city: "Georgetown", team: "Independiente" },
  { name: "Spider-Man Falkland Islands", alias: "El Hombre Araña", city: "Stanley", team: "Independiente" },
  { name: "Spider-Man South Georgia", alias: "El Hombre Araña", city: "Grytviken", team: "Independiente" },
  { name: "Spider-Man South Sandwich Islands", alias: "El Hombre Araña", city: "Grytviken", team: "Independiente" },
  { name: "Spider-Man Bouvet Island", alias: "El Hombre Araña", city: "Bouvet Island", team: "Independiente" },
  { name: "Spider-Man Heard Island", alias: "El Hombre Araña", city: "Heard Island", team: "Independiente" },
  { name: "Spider-Man McDonald Islands", alias: "El Hombre Araña", city: "McDonald Islands", team: "Independiente" },
  { name: "Spider-Man French Southern Territories", alias: "El Hombre Araña", city: "Port-aux-Français", team: "Independiente" },
  { name: "Spider-Man British Indian Ocean Territory", alias: "El Hombre Araña", city: "Diego Garcia", team: "Independiente" },
  { name: "Spider-Man Christmas Island", alias: "El Hombre Araña", city: "Flying Fish Cove", team: "Independiente" },
  { name: "Spider-Man Cocos Islands", alias: "El Hombre Araña", city: "West Island", team: "Independiente" },
  { name: "Spider-Man Norfolk Island", alias: "El Hombre Araña", city: "Kingston", team: "Independiente" },
  { name: "Spider-Man Pitcairn Islands", alias: "El Hombre Araña", city: "Adamstown", team: "Independiente" },
  { name: "Spider-Man Tokelau", alias: "El Hombre Araña", city: "Atafu", team: "Independiente" },
  { name: "Spider-Man Niue", alias: "El Hombre Araña", city: "Alofi", team: "Independiente" },
  { name: "Spider-Man Cook Islands", alias: "El Hombre Araña", city: "Avarua", team: "Independiente" },
  { name: "Spider-Man American Samoa", alias: "El Hombre Araña", city: "Pago Pago", team: "Independiente" },
  { name: "Spider-Man Samoa", alias: "El Hombre Araña", city: "Apia", team: "Independiente" },
  { name: "Spider-Man Tonga", alias: "El Hombre Araña", city: "Nuku'alofa", team: "Independiente" },
  { name: "Spider-Man Fiji", alias: "El Hombre Araña", city: "Suva", team: "Independiente" },
  { name: "Spider-Man Vanuatu", alias: "El Hombre Araña", city: "Port Vila", team: "Independiente" },
  { name: "Spider-Man New Caledonia", alias: "El Hombre Araña", city: "Nouméa", team: "Independiente" },
  { name: "Spider-Man Solomon Islands", alias: "El Hombre Araña", city: "Honiara", team: "Independiente" },
  { name: "Spider-Man Papua New Guinea", alias: "El Hombre Araña", city: "Port Moresby", team: "Independiente" },
  { name: "Spider-Man Australia", alias: "El Hombre Araña", city: "Canberra", team: "Independiente" },
  { name: "Spider-Man New Zealand", alias: "El Hombre Araña", city: "Wellington", team: "Independiente" },
  { name: "Spider-Man Micronesia", alias: "El Hombre Araña", city: "Palikir", team: "Independiente" },
  { name: "Spider-Man Marshall Islands", alias: "El Hombre Araña", city: "Majuro", team: "Independiente" },
  { name: "Spider-Man Palau", alias: "El Hombre Araña", city: "Ngerulmud", team: "Independiente" },
  { name: "Spider-Man Northern Mariana Islands", alias: "El Hombre Araña", city: "Saipan", team: "Independiente" },
  { name: "Spider-Man Guam", alias: "El Hombre Araña", city: "Hagåtña", team: "Independiente" },
  { name: "Spider-Man Hawaii", alias: "El Hombre Araña", city: "Honolulu", team: "Independiente" },
  { name: "Spider-Man Alaska", alias: "El Hombre Araña", city: "Juneau", team: "Independiente" },
  { name: "Spider-Man California", alias: "El Hombre Araña", city: "Sacramento", team: "Independiente" },
  { name: "Spider-Man Oregon", alias: "El Hombre Araña", city: "Salem", team: "Independiente" },
  { name: "Spider-Man Washington", alias: "El Hombre Araña", city: "Olympia", team: "Independiente" },
  { name: "Spider-Man Idaho", alias: "El Hombre Araña", city: "Boise", team: "Independiente" },
  { name: "Spider-Man Montana", alias: "El Hombre Araña", city: "Helena", team: "Independiente" },
  { name: "Spider-Man Wyoming", alias: "El Hombre Araña", city: "Cheyenne", team: "Independiente" },
  { name: "Spider-Man Colorado", alias: "El Hombre Araña", city: "Denver", team: "Independiente" },
  { name: "Spider-Man Utah", alias: "El Hombre Araña", city: "Salt Lake City", team: "Independiente" },
  { name: "Spider-Man Arizona", alias: "El Hombre Araña", city: "Phoenix", team: "Independiente" },
  { name: "Spider-Man New Mexico", alias: "El Hombre Araña", city: "Santa Fe", team: "Independiente" },
  { name: "Spider-Man Texas", alias: "El Hombre Araña", city: "Austin", team: "Independiente" },
  { name: "Spider-Man Oklahoma", alias: "El Hombre Araña", city: "Oklahoma City", team: "Independiente" },
  { name: "Spider-Man Kansas", alias: "El Hombre Araña", city: "Topeka", team: "Independiente" },
  { name: "Spider-Man Nebraska", alias: "El Hombre Araña", city: "Lincoln", team: "Independiente" },
  { name: "Spider-Man South Dakota", alias: "El Hombre Araña", city: "Pierre", team: "Independiente" },
  { name: "Spider-Man North Dakota", alias: "El Hombre Araña", city: "Bismarck", team: "Independiente" },
  { name: "Spider-Man Minnesota", alias: "El Hombre Araña", city: "Saint Paul", team: "Independiente" },
  { name: "Spider-Man Iowa", alias: "El Hombre Araña", city: "Des Moines", team: "Independiente" },
  { name: "Spider-Man Missouri", alias: "El Hombre Araña", city: "Jefferson City", team: "Independiente" },
  { name: "Spider-Man Arkansas", alias: "El Hombre Araña", city: "Little Rock", team: "Independiente" },
  { name: "Spider-Man Louisiana", alias: "El Hombre Araña", city: "Baton Rouge", team: "Independiente" },
  { name: "Spider-Man Mississippi", alias: "El Hombre Araña", city: "Jackson", team: "Independiente" },
  { name: "Spider-Man Alabama", alias: "El Hombre Araña", city: "Montgomery", team: "Independiente" },
  { name: "Spider-Man Georgia", alias: "El Hombre Araña", city: "Atlanta", team: "Independiente" },
  { name: "Spider-Man Florida", alias: "El Hombre Araña", city: "Tallahassee", team: "Independiente" },
  { name: "Spider-Man South Carolina", alias: "El Hombre Araña", city: "Columbia", team: "Independiente" },
  { name: "Spider-Man North Carolina", alias: "El Hombre Araña", city: "Raleigh", team: "Independiente" },
  { name: "Spider-Man Tennessee", alias: "El Hombre Araña", city: "Nashville", team: "Independiente" },
  { name: "Spider-Man Kentucky", alias: "El Hombre Araña", city: "Frankfort", team: "Independiente" },
  { name: "Spider-Man Virginia", alias: "El Hombre Araña", city: "Richmond", team: "Independiente" },
  { name: "Spider-Man West Virginia", alias: "El Hombre Araña", city: "Charleston", team: "Independiente" },
  { name: "Spider-Man Maryland", alias: "El Hombre Araña", city: "Annapolis", team: "Independiente" },
  { name: "Spider-Man Delaware", alias: "El Hombre Araña", city: "Dover", team: "Independiente" },
  { name: "Spider-Man New Jersey", alias: "El Hombre Araña", city: "Trenton", team: "Independiente" },
  { name: "Spider-Man Pennsylvania", alias: "El Hombre Araña", city: "Harrisburg", team: "Independiente" },
  { name: "Spider-Man New York", alias: "El Hombre Araña", city: "Albany", team: "Independiente" },
  { name: "Spider-Man Connecticut", alias: "El Hombre Araña", city: "Hartford", team: "Independiente" },
  { name: "Spider-Man Rhode Island", alias: "El Hombre Araña", city: "Providence", team: "Independiente" },
  { name: "Spider-Man Massachusetts", alias: "El Hombre Araña", city: "Boston", team: "Independiente" },
  { name: "Spider-Man Vermont", alias: "El Hombre Araña", city: "Montpelier", team: "Independiente" },
  { name: "Spider-Man New Hampshire", alias: "El Hombre Araña", city: "Concord", team: "Independiente" },
  { name: "Spider-Man Maine", alias: "El Hombre Araña", city: "Augusta", team: "Independiente" },
  { name: "Spider-Man Michigan", alias: "El Hombre Araña", city: "Lansing", team: "Independiente" },
  { name: "Spider-Man Wisconsin", alias: "El Hombre Araña", city: "Madison", team: "Independiente" },
  { name: "Spider-Man Illinois", alias: "El Hombre Araña", city: "Springfield", team: "Independiente" },
  { name: "Spider-Man Indiana", alias: "El Hombre Araña", city: "Indianapolis", team: "Independiente" },
  { name: "Spider-Man Ohio", alias: "El Hombre Araña", city: "Columbus", team: "Independiente" },
  { name: "Spider-Man Nevada", alias: "El Hombre Araña", city: "Carson City", team: "Independiente" }
];

async function addDifferentHeroes() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('🔗 Conectado a MongoDB Atlas');

    console.log('\n=== PASO 1: ELIMINANDO DUPLICADOS EXISTENTES ===');
    
    // Obtener todos los héroes existentes
    const existingHeroes = await Hero.find();
    console.log(`Total de héroes existentes: ${existingHeroes.length}`);

    // Agrupar por nombre para encontrar duplicados
    const heroesByName = {};
    existingHeroes.forEach(hero => {
      if (!heroesByName[hero.name]) {
        heroesByName[hero.name] = [];
      }
      heroesByName[hero.name].push(hero);
    });

    // Eliminar duplicados (mantener solo el primero)
    let totalRemoved = 0;
    for (const [name, heroList] of Object.entries(heroesByName)) {
      if (heroList.length > 1) {
        console.log(`🗑️  Eliminando ${heroList.length - 1} duplicados de "${name}"`);
        
        // Eliminar todos excepto el primero
        for (let i = 1; i < heroList.length; i++) {
          await Hero.deleteOne({ _id: heroList[i]._id });
          totalRemoved++;
        }
      }
    }

    if (totalRemoved > 0) {
      console.log(`✅ Eliminados ${totalRemoved} héroes duplicados`);
    } else {
      console.log('✅ No se encontraron duplicados para eliminar');
    }

    console.log('\n=== PASO 2: AGREGANDO NUEVOS SUPERHÉROES ===');
    
    // Obtener el último ID para continuar la numeración
    const lastHero = await Hero.findOne().sort({ id: -1 });
    let nextId = lastHero ? lastHero.id + 1 : 1;
    
    let addedCount = 0;
    const existingNames = new Set();
    
    // Obtener nombres existentes para evitar duplicados
    const existingHeroesAfterCleanup = await Hero.find();
    existingHeroesAfterCleanup.forEach(hero => {
      existingNames.add(hero.name.toLowerCase());
    });

    // Agregar nuevos superhéroes
    for (const hero of superheroes) {
      // Verificar si el nombre ya existe (case insensitive)
      if (!existingNames.has(hero.name.toLowerCase())) {
        try {
          const newHero = new Hero({
            id: nextId++,
            name: hero.name,
            alias: hero.alias,
            city: hero.city,
            team: hero.team
          });
          
          await newHero.save();
          existingNames.add(hero.name.toLowerCase());
          addedCount++;
          
          console.log(`✅ Agregado: ${hero.name} - ${hero.alias}`);
        } catch (error) {
          console.error(`❌ Error agregando ${hero.name}:`, error.message);
        }
      } else {
        console.log(`⏭️  Saltando ${hero.name} (ya existe)`);
      }
    }

    console.log(`\n🎉 ¡Proceso completado!`);
    console.log(`📊 Estadísticas:`);
    console.log(`   - Héroes duplicados eliminados: ${totalRemoved}`);
    console.log(`   - Nuevos héroes agregados: ${addedCount}`);
    
    const finalCount = await Hero.countDocuments();
    console.log(`   - Total de héroes en la base de datos: ${finalCount}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

addDifferentHeroes(); 