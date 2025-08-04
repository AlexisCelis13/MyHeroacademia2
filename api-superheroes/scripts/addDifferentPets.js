import mongoose from 'mongoose';
import '../db.js';

const MONGO_URI = 'mongodb+srv://alexcelischi123:NWV90DuaFVM0X0SG@apijs.04sz8by.mongodb.net/?retryWrites=true&w=majority&appName=Apijs';

// Definir el esquema para poder usar el modelo
const petSchema = new mongoose.Schema({
  id: Number,
  name: String,
  alias: String,
  city: String,
  team: String,
  adoptedBy: Number,
  felicidad: { type: Number, default: 100 },
  hambre: { type: Number, default: 0 },
  enfermedad: { type: String, default: null },
  itemsCustom: { type: [String], default: [] },
  viva: { type: Boolean, default: true },
  historial: { type: [String], default: [] },
  vida: { type: Number, default: 100 },
  enfermoDesde: { type: Number, default: null },
  recuperandoDesde: { type: Number, default: null },
  decaimientoDesde: { type: Number, default: null }
});

const Pet = mongoose.model('Pet', petSchema);

// Lista de mascotas diferentes
const mascotas = [
  { name: "Luna", alias: "Gato Lunar", city: "Nueva York", team: "Mascotas Domésticas" },
  { name: "Thor", alias: "Perro del Trueno", city: "Asgard", team: "Mascotas Domésticas" },
  { name: "Shadow", alias: "Gato Sombra", city: "Gotham", team: "Mascotas Domésticas" },
  { name: "Rocket", alias: "Mapache Espacial", city: "Knowhere", team: "Guardianes" },
  { name: "Groot", alias: "Árbol Viviente", city: "Planeta X", team: "Guardianes" },
  { name: "Falcon", alias: "Halcón Mascota", city: "Washington D.C.", team: "Mascotas Domésticas" },
  { name: "Black Panther", alias: "Pantera Negra", city: "Wakanda", team: "Mascotas Salvajes" },
  { name: "Spider-Cat", alias: "Gato Araña", city: "Nueva York", team: "Spider-Verse" },
  { name: "Iron Dog", alias: "Perro de Hierro", city: "Malibu", team: "Mascotas Domésticas" },
  { name: "Captain Cat", alias: "Gato Capitán", city: "Brooklyn", team: "Mascotas Domésticas" },
  { name: "Hulk Bunny", alias: "Conejo Verde", city: "Nueva York", team: "Mascotas Domésticas" },
  { name: "Widow Spider", alias: "Araña Viuda", city: "Moscú", team: "Mascotas Salvajes" },
  { name: "Hawkeye Owl", alias: "Búho Halcón", city: "Iowa", team: "Mascotas Salvajes" },
  { name: "Strange Cat", alias: "Gato Místico", city: "Nueva York", team: "Mascotas Místicas" },
  { name: "Witch Cat", alias: "Gato Bruja", city: "Sokovia", team: "Mascotas Místicas" },
  { name: "Vision Bird", alias: "Pájaro Visión", city: "Nueva York", team: "Mascotas Tecnológicas" },
  { name: "Winter Dog", alias: "Perro Invernal", city: "Brooklyn", team: "Mascotas Domésticas" },
  { name: "Ant-Cat", alias: "Gato Hormiga", city: "San Francisco", team: "Mascotas Domésticas" },
  { name: "Wasp Bee", alias: "Abeja Avispa", city: "San Francisco", team: "Mascotas Salvajes" },
  { name: "Marvel Cat", alias: "Gato Marvel", city: "Los Angeles", team: "Mascotas Domésticas" },
  { name: "Gwen Cat", alias: "Gato Gwen", city: "Nueva York", team: "Spider-Verse" },
  { name: "Miles Dog", alias: "Perro Miles", city: "Brooklyn", team: "Spider-Verse" },
  { name: "Venom Snake", alias: "Serpiente Veneno", city: "San Francisco", team: "Mascotas Salvajes" },
  { name: "Deadpool Pig", alias: "Cerdo Mercenario", city: "Nueva York", team: "Mascotas Domésticas" },
  { name: "Wolverine Wolf", alias: "Lobo Wolverine", city: "Alberta", team: "Mascotas Salvajes" },
  { name: "Cyclops Cat", alias: "Gato Ciclope", city: "Nueva York", team: "X-Mascotas" },
  { name: "Phoenix Bird", alias: "Ave Fénix", city: "Nueva York", team: "X-Mascotas" },
  { name: "Storm Bird", alias: "Ave Tormenta", city: "Nueva York", team: "X-Mascotas" },
  { name: "Nightcrawler Cat", alias: "Gato Nocturno", city: "Alemania", team: "X-Mascotas" },
  { name: "Colossus Bear", alias: "Oso de Acero", city: "Rusia", team: "X-Mascotas" },
  { name: "Rogue Cat", alias: "Gato Ladrón", city: "Mississippi", team: "X-Mascotas" },
  { name: "Gambit Cat", alias: "Gato Cajún", city: "Nueva Orleans", team: "X-Mascotas" },
  { name: "Beast Gorilla", alias: "Gorila Genio", city: "Nueva York", team: "X-Mascotas" },
  { name: "Iceman Penguin", alias: "Pingüino de Hielo", city: "Nueva York", team: "X-Mascotas" },
  { name: "Angel Bird", alias: "Ave Arcángel", city: "Nueva York", team: "X-Mascotas" },
  { name: "Psylocke Cat", alias: "Gato Telepata", city: "Londres", team: "X-Mascotas" },
  { name: "Jubilee Firefly", alias: "Luciérnaga", city: "Beverly Hills", team: "X-Mascotas" },
  { name: "Kitty Cat", alias: "Gato Sombra", city: "Illinois", team: "X-Mascotas" },
  { name: "Emma Cat", alias: "Gato Reina", city: "Boston", team: "X-Mascotas" },
  { name: "Magneto Wolf", alias: "Lobo Magnético", city: "Polonia", team: "Hermandad" },
  { name: "Mystique Chameleon", alias: "Camaleón", city: "Alemania", team: "Hermandad" },
  { name: "Sabretooth Tiger", alias: "Tigre Diente", city: "Alberta", team: "Hermandad" },
  { name: "Juggernaut Rhino", alias: "Rinoceronte", city: "Nueva York", team: "Hermandad" },
  { name: "Toad Frog", alias: "Rana Sapo", city: "Nueva York", team: "Hermandad" },
  { name: "Blob Sloth", alias: "Perezoso", city: "Nueva York", team: "Hermandad" },
  { name: "Pyro Salamander", alias: "Salamandra", city: "Australia", team: "Hermandad" },
  { name: "Avalanche Mole", alias: "Topo Terremoto", city: "Italia", team: "Hermandad" },
  { name: "Destiny Owl", alias: "Búho Vidente", city: "Austria", team: "Hermandad" },
  { name: "Quicksilver Cheetah", alias: "Guepardo Veloz", city: "Sokovia", team: "Hermandad" },
  { name: "Polaris Fox", alias: "Zorra Polar", city: "Sokovia", team: "Hermandad" },
  { name: "Daredevil Bat", alias: "Murciélago Ciego", city: "Nueva York", team: "Defenders" },
  { name: "Luke Cage Bear", alias: "Oso Poderoso", city: "Harlem", team: "Defenders" },
  { name: "Iron Fist Panda", alias: "Panda de Hierro", city: "K'un-L'un", team: "Defenders" },
  { name: "Jessica Bird", alias: "Ave Azul", city: "Nueva York", team: "Defenders" },
  { name: "Punisher Wolf", alias: "Lobo Castigador", city: "Nueva York", team: "Independiente" },
  { name: "Ghost Horse", alias: "Caballo Fantasma", city: "Los Angeles", team: "Independiente" },
  { name: "Blade Bat", alias: "Murciélago Vampiro", city: "Londres", team: "Independiente" },
  { name: "Moon Wolf", alias: "Lobo Lunar", city: "Chicago", team: "Independiente" },
  { name: "Silver Dolphin", alias: "Delfín Plateado", city: "Zenn-La", team: "Independiente" },
  { name: "Galactus Whale", alias: "Ballena Devoradora", city: "Cosmos", team: "Independiente" },
  { name: "Thanos Titan", alias: "Titán Loco", city: "Titán", team: "Independiente" },
  { name: "Loki Fox", alias: "Zorra del Engaño", city: "Asgard", team: "Independiente" },
  { name: "Ultron Robot", alias: "Robot Androide", city: "Nueva York", team: "Independiente" },
  { name: "Red Skull Vulture", alias: "Buitre Rojo", city: "Alemania", team: "Hydra" },
  { name: "Baron Zemo Wolf", alias: "Lobo Barón", city: "Sokovia", team: "Hydra" },
  { name: "Crossbones Skeleton", alias: "Esqueleto Cruzado", city: "Nueva York", team: "Hydra" },
  { name: "Taskmaster Chameleon", alias: "Camaleón Maestro", city: "Nueva York", team: "Independiente" },
  { name: "Bullseye Eagle", alias: "Águila Ojo", city: "Nueva York", team: "Independiente" },
  { name: "Kingpin Elephant", alias: "Elefante Rey", city: "Nueva York", team: "Independiente" },
  { name: "Green Goblin Bat", alias: "Murciélago Verde", city: "Nueva York", team: "Independiente" },
  { name: "Doctor Octopus", alias: "Pulpo Doctor", city: "Nueva York", team: "Independiente" },
  { name: "Sandman Scorpion", alias: "Escorpión de Arena", city: "Nueva York", team: "Independiente" },
  { name: "Electro Eel", alias: "Anguila Eléctrica", city: "Nueva York", team: "Independiente" },
  { name: "Vulture Bird", alias: "Ave Buitre", city: "Nueva York", team: "Independiente" },
  { name: "Mysterio Jellyfish", alias: "Medusa Misterio", city: "Nueva York", team: "Independiente" },
  { name: "Kraven Lion", alias: "León Cazador", city: "Rusia", team: "Independiente" },
  { name: "Lizard Reptile", alias: "Reptil Lagarto", city: "Nueva York", team: "Independiente" },
  { name: "Rhino Animal", alias: "Rinoceronte", city: "Nueva York", team: "Independiente" },
  { name: "Scorpion Arachnid", alias: "Araña Escorpión", city: "Nueva York", team: "Independiente" },
  { name: "Shocker Mole", alias: "Topo Impacto", city: "Nueva York", team: "Independiente" },
  { name: "Chameleon Lizard", alias: "Lagarto Camaleón", city: "Rusia", team: "Independiente" },
  { name: "Hobgoblin Bat", alias: "Murciélago Naranja", city: "Nueva York", team: "Independiente" },
  { name: "Carnage Spider", alias: "Araña Carnicería", city: "Nueva York", team: "Independiente" },
  { name: "Morbius Bat", alias: "Murciélago Vampiro", city: "Nueva York", team: "Independiente" },
  { name: "Man-Wolf Wolf", alias: "Lobo Hombre", city: "Nueva York", team: "Independiente" },
  { name: "Toxin Slime", alias: "Baba Tóxica", city: "Nueva York", team: "Independiente" },
  { name: "Anti-Venom Snake", alias: "Serpiente Anti-Veneno", city: "Nueva York", team: "Independiente" },
  { name: "Scream Banshee", alias: "Banshee Grito", city: "Nueva York", team: "Independiente" },
  { name: "Lasher Whip", alias: "Látigo Viviente", city: "Nueva York", team: "Independiente" },
  { name: "Phage Virus", alias: "Virus Fago", city: "Nueva York", team: "Independiente" },
  { name: "Riot Mob", alias: "Multitud Motín", city: "Nueva York", team: "Independiente" },
  { name: "Agony Pain", alias: "Dolor Agonía", city: "Nueva York", team: "Independiente" },
  { name: "She-Venom Spider", alias: "Araña Veneno", city: "Nueva York", team: "Independiente" },
  { name: "Spider-Woman Arachnid", alias: "Araña Mujer", city: "Londres", team: "Independiente" },
  { name: "Spider-Girl Spider", alias: "Araña Chica", city: "Nueva York", team: "Independiente" },
  { name: "Spider-Man 2099 Arachnid", alias: "Araña del Futuro", city: "Nueva York 2099", team: "Independiente" },
  { name: "Spider-Man Noir Spider", alias: "Araña Negra", city: "Nueva York 1933", team: "Independiente" },
  { name: "Spider-Ham Pig", alias: "Cerdo Araña", city: "Nueva York", team: "Independiente" },
  { name: "Spider-Man India Arachnid", alias: "Araña de la India", city: "Mumbai", team: "Independiente" },
  { name: "Spider-Man UK Arachnid", alias: "Araña del Reino Unido", city: "Londres", team: "Independiente" },
  { name: "Spider-Man Japan Arachnid", alias: "Araña de Japón", city: "Tokio", team: "Independiente" },
  { name: "Spider-Man France Arachnid", alias: "L'Araignée", city: "París", team: "Independiente" },
  { name: "Spider-Man Germany Arachnid", alias: "Die Spinne", city: "Berlín", team: "Independiente" },
  { name: "Spider-Man Italy Arachnid", alias: "Il Ragno", city: "Roma", team: "Independiente" },
  { name: "Spider-Man Spain Arachnid", alias: "La Araña", city: "Madrid", team: "Independiente" },
  { name: "Spider-Man Brazil Arachnid", alias: "A Aranha", city: "São Paulo", team: "Independiente" },
  { name: "Spider-Man Mexico Arachnid", alias: "La Araña", city: "Ciudad de México", team: "Independiente" },
  { name: "Spider-Man Argentina Arachnid", alias: "La Araña", city: "Buenos Aires", team: "Independiente" },
  { name: "Spider-Man Chile Arachnid", alias: "La Araña", city: "Santiago", team: "Independiente" },
  { name: "Spider-Man Peru Arachnid", alias: "La Araña", city: "Lima", team: "Independiente" },
  { name: "Spider-Man Colombia Arachnid", alias: "La Araña", city: "Bogotá", team: "Independiente" },
  { name: "Spider-Man Venezuela Arachnid", alias: "La Araña", city: "Caracas", team: "Independiente" },
  { name: "Spider-Man Ecuador Arachnid", alias: "La Araña", city: "Quito", team: "Independiente" },
  { name: "Spider-Man Bolivia Arachnid", alias: "La Araña", city: "La Paz", team: "Independiente" },
  { name: "Spider-Man Paraguay Arachnid", alias: "La Araña", city: "Asunción", team: "Independiente" },
  { name: "Spider-Man Uruguay Arachnid", alias: "La Araña", city: "Montevideo", team: "Independiente" },
  { name: "Spider-Man Costa Rica Arachnid", alias: "La Araña", city: "San José", team: "Independiente" },
  { name: "Spider-Man Panama Arachnid", alias: "La Araña", city: "Ciudad de Panamá", team: "Independiente" },
  { name: "Spider-Man Nicaragua Arachnid", alias: "La Araña", city: "Managua", team: "Independiente" },
  { name: "Spider-Man Honduras Arachnid", alias: "La Araña", city: "Tegucigalpa", team: "Independiente" },
  { name: "Spider-Man El Salvador Arachnid", alias: "La Araña", city: "San Salvador", team: "Independiente" },
  { name: "Spider-Man Guatemala Arachnid", alias: "La Araña", city: "Ciudad de Guatemala", team: "Independiente" },
  { name: "Spider-Man Belize Arachnid", alias: "La Araña", city: "Belmopán", team: "Independiente" },
  { name: "Spider-Man Cuba Arachnid", alias: "La Araña", city: "La Habana", team: "Independiente" },
  { name: "Spider-Man Jamaica Arachnid", alias: "La Araña", city: "Kingston", team: "Independiente" },
  { name: "Spider-Man Haiti Arachnid", alias: "La Araña", city: "Puerto Príncipe", team: "Independiente" },
  { name: "Spider-Man Dominican Republic Arachnid", alias: "La Araña", city: "Santo Domingo", team: "Independiente" },
  { name: "Spider-Man Puerto Rico Arachnid", alias: "La Araña", city: "San Juan", team: "Independiente" },
  { name: "Spider-Man Bahamas Arachnid", alias: "La Araña", city: "Nassau", team: "Independiente" },
  { name: "Spider-Man Trinidad Arachnid", alias: "La Araña", city: "Puerto España", team: "Independiente" },
  { name: "Spider-Man Barbados Arachnid", alias: "La Araña", city: "Bridgetown", team: "Independiente" },
  { name: "Spider-Man Grenada Arachnid", alias: "La Araña", city: "Saint George's", team: "Independiente" },
  { name: "Spider-Man Saint Lucia Arachnid", alias: "La Araña", city: "Castries", team: "Independiente" },
  { name: "Spider-Man Saint Vincent Arachnid", alias: "La Araña", city: "Kingstown", team: "Independiente" },
  { name: "Spider-Man Antigua Arachnid", alias: "La Araña", city: "Saint John's", team: "Independiente" },
  { name: "Spider-Man Dominica Arachnid", alias: "La Araña", city: "Roseau", team: "Independiente" },
  { name: "Spider-Man Saint Kitts Arachnid", alias: "La Araña", city: "Basseterre", team: "Independiente" },
  { name: "Spider-Man Nevis Arachnid", alias: "La Araña", city: "Charlestown", team: "Independiente" },
  { name: "Spider-Man Anguilla Arachnid", alias: "La Araña", city: "The Valley", team: "Independiente" },
  { name: "Spider-Man Montserrat Arachnid", alias: "La Araña", city: "Plymouth", team: "Independiente" },
  { name: "Spider-Man British Virgin Islands Arachnid", alias: "La Araña", city: "Road Town", team: "Independiente" },
  { name: "Spider-Man US Virgin Islands Arachnid", alias: "La Araña", city: "Charlotte Amalie", team: "Independiente" },
  { name: "Spider-Man Cayman Islands Arachnid", alias: "La Araña", city: "George Town", team: "Independiente" },
  { name: "Spider-Man Turks Arachnid", alias: "La Araña", city: "Cockburn Town", team: "Independiente" },
  { name: "Spider-Man Caicos Arachnid", alias: "La Araña", city: "Cockburn Town", team: "Independiente" },
  { name: "Spider-Man Aruba Arachnid", alias: "La Araña", city: "Oranjestad", team: "Independiente" },
  { name: "Spider-Man Curacao Arachnid", alias: "La Araña", city: "Willemstad", team: "Independiente" },
  { name: "Spider-Man Bonaire Arachnid", alias: "La Araña", city: "Kralendijk", team: "Independiente" },
  { name: "Spider-Man Sint Maarten Arachnid", alias: "La Araña", city: "Philipsburg", team: "Independiente" },
  { name: "Spider-Man Sint Eustatius Arachnid", alias: "La Araña", city: "Oranjestad", team: "Independiente" },
  { name: "Spider-Man Saba Arachnid", alias: "La Araña", city: "The Bottom", team: "Independiente" },
  { name: "Spider-Man French Guiana Arachnid", alias: "La Araña", city: "Cayenne", team: "Independiente" },
  { name: "Spider-Man Suriname Arachnid", alias: "La Araña", city: "Paramaribo", team: "Independiente" },
  { name: "Spider-Man Guyana Arachnid", alias: "La Araña", city: "Georgetown", team: "Independiente" },
  { name: "Spider-Man Falkland Islands Arachnid", alias: "La Araña", city: "Stanley", team: "Independiente" },
  { name: "Spider-Man South Georgia Arachnid", alias: "La Araña", city: "Grytviken", team: "Independiente" },
  { name: "Spider-Man South Sandwich Islands Arachnid", alias: "La Araña", city: "Grytviken", team: "Independiente" },
  { name: "Spider-Man Bouvet Island Arachnid", alias: "La Araña", city: "Bouvet Island", team: "Independiente" },
  { name: "Spider-Man Heard Island Arachnid", alias: "La Araña", city: "Heard Island", team: "Independiente" },
  { name: "Spider-Man McDonald Islands Arachnid", alias: "La Araña", city: "McDonald Islands", team: "Independiente" },
  { name: "Spider-Man French Southern Territories Arachnid", alias: "La Araña", city: "Port-aux-Français", team: "Independiente" },
  { name: "Spider-Man British Indian Ocean Territory Arachnid", alias: "La Araña", city: "Diego Garcia", team: "Independiente" },
  { name: "Spider-Man Christmas Island Arachnid", alias: "La Araña", city: "Flying Fish Cove", team: "Independiente" },
  { name: "Spider-Man Cocos Islands Arachnid", alias: "La Araña", city: "West Island", team: "Independiente" },
  { name: "Spider-Man Norfolk Island Arachnid", alias: "La Araña", city: "Kingston", team: "Independiente" },
  { name: "Spider-Man Pitcairn Islands Arachnid", alias: "La Araña", city: "Adamstown", team: "Independiente" },
  { name: "Spider-Man Tokelau Arachnid", alias: "La Araña", city: "Atafu", team: "Independiente" },
  { name: "Spider-Man Niue Arachnid", alias: "La Araña", city: "Alofi", team: "Independiente" },
  { name: "Spider-Man Cook Islands Arachnid", alias: "La Araña", city: "Avarua", team: "Independiente" },
  { name: "Spider-Man American Samoa Arachnid", alias: "La Araña", city: "Pago Pago", team: "Independiente" },
  { name: "Spider-Man Samoa Arachnid", alias: "La Araña", city: "Apia", team: "Independiente" },
  { name: "Spider-Man Tonga Arachnid", alias: "La Araña", city: "Nuku'alofa", team: "Independiente" },
  { name: "Spider-Man Fiji Arachnid", alias: "La Araña", city: "Suva", team: "Independiente" },
  { name: "Spider-Man Vanuatu Arachnid", alias: "La Araña", city: "Port Vila", team: "Independiente" },
  { name: "Spider-Man New Caledonia Arachnid", alias: "La Araña", city: "Nouméa", team: "Independiente" },
  { name: "Spider-Man Solomon Islands Arachnid", alias: "La Araña", city: "Honiara", team: "Independiente" },
  { name: "Spider-Man Papua New Guinea Arachnid", alias: "La Araña", city: "Port Moresby", team: "Independiente" },
  { name: "Spider-Man Australia Arachnid", alias: "La Araña", city: "Canberra", team: "Independiente" },
  { name: "Spider-Man New Zealand Arachnid", alias: "La Araña", city: "Wellington", team: "Independiente" },
  { name: "Spider-Man Micronesia Arachnid", alias: "La Araña", city: "Palikir", team: "Independiente" },
  { name: "Spider-Man Marshall Islands Arachnid", alias: "La Araña", city: "Majuro", team: "Independiente" },
  { name: "Spider-Man Palau Arachnid", alias: "La Araña", city: "Ngerulmud", team: "Independiente" },
  { name: "Spider-Man Northern Mariana Islands Arachnid", alias: "La Araña", city: "Saipan", team: "Independiente" },
  { name: "Spider-Man Guam Arachnid", alias: "La Araña", city: "Hagåtña", team: "Independiente" },
  { name: "Spider-Man Hawaii Arachnid", alias: "La Araña", city: "Honolulu", team: "Independiente" },
  { name: "Spider-Man Alaska Arachnid", alias: "La Araña", city: "Juneau", team: "Independiente" },
  { name: "Spider-Man California Arachnid", alias: "La Araña", city: "Sacramento", team: "Independiente" },
  { name: "Spider-Man Oregon Arachnid", alias: "La Araña", city: "Salem", team: "Independiente" },
  { name: "Spider-Man Washington Arachnid", alias: "La Araña", city: "Olympia", team: "Independiente" },
  { name: "Spider-Man Idaho Arachnid", alias: "La Araña", city: "Boise", team: "Independiente" },
  { name: "Spider-Man Montana Arachnid", alias: "La Araña", city: "Helena", team: "Independiente" },
  { name: "Spider-Man Wyoming Arachnid", alias: "La Araña", city: "Cheyenne", team: "Independiente" },
  { name: "Spider-Man Colorado Arachnid", alias: "La Araña", city: "Denver", team: "Independiente" },
  { name: "Spider-Man Utah Arachnid", alias: "La Araña", city: "Salt Lake City", team: "Independiente" },
  { name: "Spider-Man Arizona Arachnid", alias: "La Araña", city: "Phoenix", team: "Independiente" },
  { name: "Spider-Man New Mexico Arachnid", alias: "La Araña", city: "Santa Fe", team: "Independiente" },
  { name: "Spider-Man Texas Arachnid", alias: "La Araña", city: "Austin", team: "Independiente" },
  { name: "Spider-Man Oklahoma Arachnid", alias: "La Araña", city: "Oklahoma City", team: "Independiente" },
  { name: "Spider-Man Kansas Arachnid", alias: "La Araña", city: "Topeka", team: "Independiente" },
  { name: "Spider-Man Nebraska Arachnid", alias: "La Araña", city: "Lincoln", team: "Independiente" },
  { name: "Spider-Man South Dakota Arachnid", alias: "La Araña", city: "Pierre", team: "Independiente" },
  { name: "Spider-Man North Dakota Arachnid", alias: "La Araña", city: "Bismarck", team: "Independiente" },
  { name: "Spider-Man Minnesota Arachnid", alias: "La Araña", city: "Saint Paul", team: "Independiente" },
  { name: "Spider-Man Iowa Arachnid", alias: "La Araña", city: "Des Moines", team: "Independiente" },
  { name: "Spider-Man Missouri Arachnid", alias: "La Araña", city: "Jefferson City", team: "Independiente" },
  { name: "Spider-Man Arkansas Arachnid", alias: "La Araña", city: "Little Rock", team: "Independiente" },
  { name: "Spider-Man Louisiana Arachnid", alias: "La Araña", city: "Baton Rouge", team: "Independiente" },
  { name: "Spider-Man Mississippi Arachnid", alias: "La Araña", city: "Jackson", team: "Independiente" },
  { name: "Spider-Man Alabama Arachnid", alias: "La Araña", city: "Montgomery", team: "Independiente" },
  { name: "Spider-Man Georgia Arachnid", alias: "La Araña", city: "Atlanta", team: "Independiente" },
  { name: "Spider-Man Florida Arachnid", alias: "La Araña", city: "Tallahassee", team: "Independiente" },
  { name: "Spider-Man South Carolina Arachnid", alias: "La Araña", city: "Columbia", team: "Independiente" },
  { name: "Spider-Man North Carolina Arachnid", alias: "La Araña", city: "Raleigh", team: "Independiente" },
  { name: "Spider-Man Tennessee Arachnid", alias: "La Araña", city: "Nashville", team: "Independiente" },
  { name: "Spider-Man Kentucky Arachnid", alias: "La Araña", city: "Frankfort", team: "Independiente" },
  { name: "Spider-Man Virginia Arachnid", alias: "La Araña", city: "Richmond", team: "Independiente" },
  { name: "Spider-Man West Virginia Arachnid", alias: "La Araña", city: "Charleston", team: "Independiente" },
  { name: "Spider-Man Maryland Arachnid", alias: "La Araña", city: "Annapolis", team: "Independiente" },
  { name: "Spider-Man Delaware Arachnid", alias: "La Araña", city: "Dover", team: "Independiente" },
  { name: "Spider-Man New Jersey Arachnid", alias: "La Araña", city: "Trenton", team: "Independiente" },
  { name: "Spider-Man Pennsylvania Arachnid", alias: "La Araña", city: "Harrisburg", team: "Independiente" },
  { name: "Spider-Man New York Arachnid", alias: "La Araña", city: "Albany", team: "Independiente" },
  { name: "Spider-Man Connecticut Arachnid", alias: "La Araña", city: "Hartford", team: "Independiente" },
  { name: "Spider-Man Rhode Island Arachnid", alias: "La Araña", city: "Providence", team: "Independiente" },
  { name: "Spider-Man Massachusetts Arachnid", alias: "La Araña", city: "Boston", team: "Independiente" },
  { name: "Spider-Man Vermont Arachnid", alias: "La Araña", city: "Montpelier", team: "Independiente" },
  { name: "Spider-Man New Hampshire Arachnid", alias: "La Araña", city: "Concord", team: "Independiente" },
  { name: "Spider-Man Maine Arachnid", alias: "La Araña", city: "Augusta", team: "Independiente" },
  { name: "Spider-Man Michigan Arachnid", alias: "La Araña", city: "Lansing", team: "Independiente" },
  { name: "Spider-Man Wisconsin Arachnid", alias: "La Araña", city: "Madison", team: "Independiente" },
  { name: "Spider-Man Illinois Arachnid", alias: "La Araña", city: "Springfield", team: "Independiente" },
  { name: "Spider-Man Indiana Arachnid", alias: "La Araña", city: "Indianapolis", team: "Independiente" },
  { name: "Spider-Man Ohio Arachnid", alias: "La Araña", city: "Columbus", team: "Independiente" },
  { name: "Spider-Man Nevada Arachnid", alias: "La Araña", city: "Carson City", team: "Independiente" }
];

async function addDifferentPets() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('🔗 Conectado a MongoDB Atlas');

    console.log('\n=== PASO 1: ELIMINANDO DUPLICADOS EXISTENTES ===');
    
    // Obtener todas las mascotas existentes
    const existingPets = await Pet.find();
    console.log(`Total de mascotas existentes: ${existingPets.length}`);

    // Agrupar por nombre para encontrar duplicados
    const petsByName = {};
    existingPets.forEach(pet => {
      if (!petsByName[pet.name]) {
        petsByName[pet.name] = [];
      }
      petsByName[pet.name].push(pet);
    });

    // Eliminar duplicados (mantener solo el primero)
    let totalRemoved = 0;
    for (const [name, petList] of Object.entries(petsByName)) {
      if (petList.length > 1) {
        console.log(`🗑️  Eliminando ${petList.length - 1} duplicados de "${name}"`);
        
        // Eliminar todos excepto el primero
        for (let i = 1; i < petList.length; i++) {
          await Pet.deleteOne({ _id: petList[i]._id });
          totalRemoved++;
        }
      }
    }

    if (totalRemoved > 0) {
      console.log(`✅ Eliminadas ${totalRemoved} mascotas duplicadas`);
    } else {
      console.log('✅ No se encontraron duplicados para eliminar');
    }

    console.log('\n=== PASO 2: AGREGANDO NUEVAS MASCOTAS ===');
    
    // Obtener el último ID para continuar la numeración
    const lastPet = await Pet.findOne().sort({ id: -1 });
    let nextId = lastPet ? lastPet.id + 1 : 1;
    
    let addedCount = 0;
    const existingNames = new Set();
    
    // Obtener nombres existentes para evitar duplicados
    const existingPetsAfterCleanup = await Pet.find();
    existingPetsAfterCleanup.forEach(pet => {
      existingNames.add(pet.name.toLowerCase());
    });

    // Agregar nuevas mascotas
    for (const pet of mascotas) {
      // Verificar si el nombre ya existe (case insensitive)
      if (!existingNames.has(pet.name.toLowerCase())) {
        try {
          const newPet = new Pet({
            id: nextId++,
            name: pet.name,
            alias: pet.alias,
            city: pet.city,
            team: pet.team,
            adoptedBy: null, // No adoptada inicialmente
            felicidad: 100,
            hambre: 0,
            enfermedad: null,
            itemsCustom: [],
            viva: true,
            historial: [],
            vida: 100,
            enfermoDesde: null,
            recuperandoDesde: null,
            decaimientoDesde: null
          });
          
          await newPet.save();
          existingNames.add(pet.name.toLowerCase());
          addedCount++;
          
          console.log(`✅ Agregada: ${pet.name} - ${pet.alias}`);
        } catch (error) {
          console.error(`❌ Error agregando ${pet.name}:`, error.message);
        }
      } else {
        console.log(`⏭️  Saltando ${pet.name} (ya existe)`);
      }
    }

    console.log(`\n🎉 ¡Proceso completado!`);
    console.log(`📊 Estadísticas:`);
    console.log(`   - Mascotas duplicadas eliminadas: ${totalRemoved}`);
    console.log(`   - Nuevas mascotas agregadas: ${addedCount}`);
    
    const finalCount = await Pet.countDocuments();
    console.log(`   - Total de mascotas en la base de datos: ${finalCount}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

addDifferentPets(); 