class Pet {
  constructor(id, name, alias, city, team, adoptedBy = null, felicidad = 100, hambre = 0, enfermedad = null, itemsCustom = [], viva = true, historial = [], vida = 100, enfermoDesde = null, recuperandoDesde = null, decaimientoDesde = null) {
    this.id = id;
    this.name = name;
    this.alias = alias;
    this.city = city;
    this.team = team;
    this.adoptedBy = adoptedBy;
    this.felicidad = felicidad; // 0-100
    this.hambre = hambre; // 0-100
    this.enfermedad = enfermedad; // null o string
    this.itemsCustom = itemsCustom; // array de strings
    this.viva = viva; // true/false
    this.historial = historial; // array de strings (opcional)
    this.vida = vida; // 0-100
    this.enfermoDesde = enfermoDesde; // timestamp o null
    this.recuperandoDesde = recuperandoDesde; // timestamp o null
    this.decaimientoDesde = decaimientoDesde; // timestamp o null
  }
}

export default Pet; 