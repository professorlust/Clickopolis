class Civilization {
  civName: string;

  leaderName: string;
  leaderTraits: string[];
  leaderTraitsMax: number;

  location: string;

  happiness: number;
  anger: number;
  health: number;
  pollution: number;
  influence: number;
  legacy: number;

  population: number;
  populationGrowthCost: number;
  populationReal: number;

  achievements: number;

  cash: number;
  cashPM: number;

  goldenAges: number;
  goldenAgeProgress: number;
  goldenAgeGoal: number;
  goldenAgeMult: number;

  research: number;
  researchPM: number;
  researchCost: number;
  researchingTechs: string;


  conquestedCivs: Civilization[];

  constructor(civName:string, leaderName:string, location:string) {
    this.civName = civName;
    this.leaderName = leaderName;
    this.location = location;

    this.leaderTraits = [];
    this.leaderTraitsMax = 3;

    this.happiness = 15;
    this.anger = 1;
    this.health = 25;
    this.pollution = 1;
    this.influence = 0;
    this.legacy = 0;

    this.achievements = 0;

    this.goldenAgeProgress = 0;
    this.goldenAgeGoal = 100000;

    this.population = 1;
    this.populationGrowthCost = 10;
    this.populationReal = 1000;

    this.cash = 0;
    this.cashPM = 0;

    this.research = 0;
    this.researchPM = 0;
    this.researchCost = 10;
    this.researchingTechs = 'none';
  }




}

export = Civilization;
