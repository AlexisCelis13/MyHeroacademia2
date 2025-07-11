class Pet {
  constructor(id, name, alias, city, team, adoptedBy = null) {
    this.id = id;
    this.name = name;
    this.alias = alias;
    this.city = city;
    this.team = team;
    this.adoptedBy = adoptedBy;
  }
}

export default Pet; 