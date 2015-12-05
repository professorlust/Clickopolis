var game = {
  achievements: [

  ],
  // Ancient, Classical, Medieval, Renaissance, Industrial, Modern, Atomic, Information, Future
  era: "Ancient",
  eraNum: 1,
  year: 0,
  resets: 0,
  advisor: ["Money is accumulated through your population, including any multipliers. It updates incrementally. Merchants, financial buildings, and trade increase your money. Use money to purchase buildings and get ahead militarily!", "You advance into the next era when you've accumulated all the technologies of your current era.", "Nonclick resources are accumulated over time through clicking food and production and their per second gains.", "Horses are an important early era resource because they let you build better militaries.", "Don't neglect your military defenses! Prop them up with walls, castles, forts and other means!", "Buildings may become costly production-wise with each new addition, but they are always the same purchase price.", "You may need a great deal of farmers early on. Fret not, as crop technology advances, you'll need fewer citizens to be agrarians.", "Not only do unemployed citizens eat food without working, they also penalize your research growth!","Increasing your population is almost always beneficial. Just be wary of starving your people or increasing pollution too much.", "Assigning artists leads to increased Culture, as well as an increased chance for a Great Work of Art--which boosts your Culture and Happiness.", "An unhealthy population grow much slower than a healthy one.", "Don't neglect your Faith! It provides amazing boosts that last through resets."],
  advisorModern: [],
  adviceCurrent: "",
  purchaseMode: false,
  totalTime: 0,
  settings: {
    noteCounter: 0,
  },
  flags: {
    can_purchase_tech: false,
    just_purchased_tech: false,
    entered_ancient_era: true,
    entered_classical_era: false,
    entered_medieval_era: false,
    entered_renaissance_era: false,
    entered_enlightenment_era: false,

  },
  empire: {
    pop: 1,
    popUnemployed: 0,
    popCostBase: 10,
    popCostMult: 1.35,
    name: "Emmatopia",
    leaderName: "Emma",
    cash: 0,
    cashPM: 0,
    cashMult: 1,
    land: 1000,
    health: 25,
    pollution: 1,
    mood: "content",
    happiness: 15,
    anger: 1,
    goldenAge: false,
    goldenAgePoints: 0,
    goldenAgeTotal: 0
  },
  military: {
    strength: 10,
    strengthMod: 1,
    defense: 10,
    defenseMod: 1,
    soldiers: {
      total: 0,
      assigned: 0,
      army: [
        {
          name: "Foot Soldiers",
          num: 0,
          strength: 5,
          defense: 3
        },
        {
          name: "Archers",
          num: 0,
          strength: 3,
          defense: 8
        }
      ]
    }
  },
  citizens: {
    farmers: {
      num: 0,
      ps: 1.2,
      pc: .5,

    },
    miners: {
      num: 0,
      ps: .5,
      pc: .5,
    },
    woodcutters: {
      num: 0,
      ps: .5,
      pc: .5
    },
    soldiers: {
      num: 0
    },
    clerics: {
      num: 0,
      pm: 1,
    },
    artists: {
      num: 0,
      pm: 1,
      gw: .001,
    },
    engineers: {
      num: 0,
      ps: 1.5,
      pc: 4
    },
    merchants: {
      num: 0,
      pm: 10
    },
    scientists: {
      num: 0,
      pm: 5
    },
    strippers: {
      happiness: 5,
      pollution: 1
    }

  },
  resources: {
    food: {
      total: 0,
      ps: 0,
      pc: 1,
      max: 1000
    },
    prod: {
      total: 0,
      ps: 0,
      pc: 1,
      max: 2000
    },
    fish: {
      total: 0,
      mult: 1,
      healthBonus: .5,
      unlocked: false
    },
    horse: {
      total: 0,
      mult: 1,
      unlocked: false
    },
    banana: {
      total: 0,
      mult: 1,
      unlocked: false
    },
    ivory: 0,
    iron: {
      total: 0,
      mult: 1,
      unlocked: false
    },
    spices: {
      total: 0,
      mult: 1,
      unlocked: false
    },
    stone: {
      total: 0,
      mult: 1,
      unlocked: false
    },
    gold: {
      total: 0,
      mult: 1,
      unlocked: false
    },
    gems: {
      total: 0,
      mult: 1,
      unlocked: false
    },
    coal: 0,
    oil: 0,
    uranium: 0
  },

  totalClicks: 0,

  tech: {
    research: 0,
    researchBase: 0.2,
    researchTotal: 0,
    researchFromBuildings: 0,
    cost: 1,
    costMult: 1.85,
    totalTechs: 0,
    techs: [
      {
        name: "Animal Husbandry",
        era: "Ancient",
        description: "Unlocks horses; improves Farmers by 15%.",
        effects: ["Unlocks <img src='img/horse.png' /> resource.", "Improves Farmers by 15%", "Reveals Horseback Riding technology."],
        flavor: "NO, it is not what you think it is.",
        visible: true,
        unlocked: false,
        activated: false,
      },
      {
        name: "Archery",
        era: "Ancient",
        description: "Can assign soldiers as Archers.",
        effects: ["Can assign Soldiers as Archers.", "+3 <img src='img/defense.png' />"],
        flavor: "Bow and arrow, hitting bone and marrow.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Fishing",
        era: "Ancient",
        description: "Unlocks fish.",
        effects: ["Unlocks <img src='img/fish.png' /> resource.", "Reveals <em>(with Engineering)</em> Shipbuilding technology."],
        flavor: "Just make sure to use a Super Rod.",
        visible: true,
        unlocked: false,
        activated: false,
      },
      {
        name: "Mining",
        era: "Ancient",
        description: "Can assign Miners. Can build Quarry.",
        effects: ["Can assign Miners.", "Unlocks <img src='img/stone.png' />, <img src='img/gold.png' />, <img src='img/gem.png' /> resources.","Can build Quarry.", "Reveals Iron Working technology."],
        flavor: "(Still not safe for minors).",
        visible: true,
        unlocked: false,
        activated: false,
      },
      {
        name: "Mysticism",
        era: "Ancient",
        description: "Unlocks faith. Can assign Clerics. Can build Temple.",
        effects: ["Unlocks Faith.", "Can assign Clerics.", "Can build Temple.", "Can build Stonehenge Wonder", "Reveals <em>(with Writing and Trading)</em> Philosophy technology."],
        flavor: "Mysterious gods bring riches, temples, and a couple blood sacrifices.",
        visible: true,
        unlocked: false,
        activated: false,
      },
      {
        name: "Pottery",
        era: "Ancient",
        description: "Unlocks culture. Can assign Artists. Can build Granary.",
        effects: ["Unlocks Culture", "Can assign Artists", "Can build Granary.", "Can build The Great Pyramids Wonder", "Reveals Trading technology.", "Reveals Calendar technology.", "Reveals Poetics technology."],
        flavor: "Does not come with a Pottery Barn discount.",
        visible: true,
        unlocked: false,
        activated: false,
      },
      {
        name: "Trading",
        era: "Ancient",
        description: "Unlocks bartering. Can assign Merchants.",
        effects: ["Unlocks Bartering Economic System.", "Can assign Merchants.", "Reveals <em>(with Mysticism and Writing)</em> Philosophy technology."],
        flavor: "[Description needed]",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Woodworking",
        era: "Ancient",
        description: "Can assign Woodcutters.",
        effects: ["Unlocks <img src='img/spices.png' /> resource.", "Can assign Woodcutters.", "Reveals Writing technology."],
        flavor: "TIMBER!!!",
        visible: true,
        unlocked: false,
        activated: false,
      },
      {
        name: "Writing",
        era: "Ancient",
        description: "Unlocks diplomatic relations. Can build Library.",
        effects: ["Unlocks Diplomatic Relations.", "Can build Library.", "Reveals <em>(with Mysticism and Trading)</em> Philosophy technology.", "Reveals Mathematics technology."],
        flavor: "Allows poorly written fanfiction in Information era.",
        visible: false,
        unlocked: false,
        activated: false,
      },
      {
        name: "Construction",
        era: "Classical",
        description: "Improves Archers. Can build Walls.",
        effects: ["Improves Defense of Archers by 25%", "Can build Walls.", "Reveals <em>(with Construction)</em> Engineering technology."],
        flavor: " ",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Engineering",
        era: "Classical",
        description: "Unlocks new buildings. Can assign Engineers.",
        effects: ["Can assign Engineers.", "Can build Aqueducts.", "Reveals Irrigation technology.", "Reveals <em>(with Fishing)</em> Shipbuilding technology."],
        flavor: " ",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Horseback Riding",
        era: "Classical",
        description: "Can assign soldiers as Cavalry.",
        effects: ["Can assign Soldiers as Cavalry.", "Can build Stable."],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Iron Working",
        era: "Classical",
        description: "Can assign soldiers as Spearmen.",
        effects: ["Can assign Soldiers as Spearmen.", "Reveals Metal Casting technology.", "Reveals <em>(with Construction)</em> Engineering technology."],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Irrigation",
        era: "Classical",
        description: "Improves Farmers by 100%.",
        effects: ["+2k Max <img src='img/food.png' /> for discovering this technology.", "Improves Farmers by 100%", "Reveals Three-Field Crop Rotation technology."],
        flavor: "",
        visible: false,
        unlocked: false,
        activated:  false
      },
      {
        name: "Mathematics",
        era: "Classical",
        description: "Unlocks several new buildings.",
        flavor: "I've got 9.94987437^2 problems, but exponentiation ain't one.",
        effects: ["Unlocks new buildings??", "Reveals Construction technology."],
        visible: false,
        unlocked: false,
        activated: false,
      },
      {
        name: "Philosophy",
        era: "Classical",
        description: "Can build Colleges. Can assign Scientist.",
        effects: ["Can build Forums.", "Can assign Scientists."],
        flavor: " ",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Poetics",
        era: "Classical",
        description: "Improves Artists by 100%. Can build Ampitheatre.",
        effects: ["Improves Artists by 100%", "Can build Ampitheatre.", "Reveals Civility technology."],
        flavor: " ",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Shipbuilding",
        era: "Classical",
        description: "",
        effects: ["+2k Max <img src='img/production.png' /> for discovering this technology.", "Can build Harbor.", "Can assign Soldiers as Navy."],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Calendar",
        era: "Classical",
        description: "",
        effects: ["Can assign Citizens as Strippers", "Can build Plantation."],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Civility",
        era: "Medieval",
        description: "???",
        effects: ["Allows the hiring of Mercenaries."],
        flavor: "Also, improves your manners.",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Education",
        era: "Medieval",
        description: "Can build Public Schools.",
        effects: ["Can build Colleges."],
        flavor: "We don't need no education!...well, maybe we do.",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Gunpowder",
        era: "Medieval",
        description: "",
        effects: ["Can assign Soldiers as Riflers.", "Unemployed Citizens are automatically conscripted as Militia.", "Increases <img src='img/strength.png' /> by 25%"],
        flavor: "It's like shooting techs in a tech tree.",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Machinery",
        era: "Medieval",
        description: "Improves Engineers by 25%.",
        effects: ["Improves Engineers by 25%", "Increases <img src='img/defense.png' /> by 25%"],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Metal Casting",
        era: "Medieval",
        description: "Improves Miners by 100%",
        effects: ["Improves Miners by 100%."],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Milling & Paper",
        era: "Medieval",
        description: "",
        effects: ["Can build Watermill.", "Can build Lumbermill.", "Can build Papermill."],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Oil Paint",
        era: "Medieval",
        description: "",
        effects: ["Doubles Great Wonder generation of Artists"],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Physics",
        era: "Medieval",
        description: "",
        effects: [],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Steel",
        era: "Medieval",
        description: "",
        effects: [],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Theology",
        era: "Medieval",
        description: "",
        effects: ["Improves Clerics by 150%"],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },
      {
        name: "Three Field Crop Rotation",
        era: "Medieval",
        description: "",
        effects: ["Improves Farmers by 100%", "-10% Growth Cost."],
        flavor: "The most potent rotation of all.",
        visible: false,
        unlocked: false,
        activated: false
      },

      {
        name: "Printing Press",
        era: "Renaissance",
        description: "",
        effects: [""],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      },

      {
        name: "Data Science",
        era: "Information",
        description: " jhh",
        effects: ["Unlocks new information in the Stats panel."],
        flavor: "",
        visible: false,
        unlocked: false,
        activated: false
      }
    ],
  },

  culture: {
    total: 0,
    pm: 0,
    greatWorks: 0,
    mult: 1,
    upgrades: [
      {
        name: "Code of Honor",
        type: "military",
        img: "strength",
        cost: 5,
        effect: "+2 Soldier Strength.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Brutish Bounty",
        type: "military",
        img: "strength",
        cost: 10,
        effect: "+1 Culture per Victory.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Warrior Culture",
        type: "military",
        img: "strength",
        cost: 15,
        effect: "Warriors provide +1 Culture.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Tactical Expertise",
        type: "military",
        img: "strength",
        cost: 35,
        effect: "1 free General.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Code of Honor II",
        type: "military",
        img: "strength",
        cost: 55,
        effect: "+10 Solider Strength.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Odyssean Legacy",
        type: "military",
        img: "strength",
        cost: 100,
        effect: "+5 Culture per General.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Art of War",
        type: "military",
        img: "strength",
        cost: 250,
        effect: "+1 Strength per Artist.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Defend the Nation",
        type: "military",
        img: "strength",
        cost: 345,
        effect: "25% of Defense converted into Culture.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Military-Industrial Complex",
        type: "military",
        img: "strength",
        cost: 580,
        effect: "Can sign Military Contracts.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Code of Honor III",
        type: "military",
        img: "strength",
        cost: 870,
        effect: "+25 Soldier Strength.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Quest for Truth",
        type: "research",
        img: "research",
        cost: 5,
        effect: "+1 Science",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Popular Knowledge",
        type: "research",
        img: "research",
        cost: 25,
        effect: "+1 Science per 4 Citizens",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Socratic Method",
        type: "research",
        img: "research",
        cost: 45,
        effect: "+1 Science per College",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Symposium",
        type: "research",
        img: "research",
        cost: 45,
        effect: "+1 Science per Forum",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Humanities",
        type: "research",
        img: "research",
        cost: 160,
        effect: "+10% Science, +10% Culture",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Scientific Method",
        type: "research",
        img: "research",
        cost: 470,
        effect: "+50% Science from Scientists",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Theory of Evolution",
        type: "research",
        img: "research",
        cost: 540,
        effect: "+1k Science per New Era",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Quest for Truth II",
        type: "research",
        img: "research",
        cost: 700,
        effect: "+100 Science",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Genome Project",
        type: "research",
        img: "research",
        cost: 1570,
        effect: "+1 Science per Citizen",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Neural Networks",
        type: "research",
        img: "research",
        cost: 1680,
        effect: "+100% Science from Supercomputer Cluster",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Merchant Culture",
        type: "economy",
        img: "coin",
        cost: 60,
        effect: "+$5, +1 Culture per Merchant.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Fiat Currency",
        type: "economy",
        img: "coin",
        cost: 250,
        effect: "+10% Cash PM.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Mindless Consumption",
        type: "economy",
        img: "coin",
        cost: 285,
        effect: "Citizens produce twice the Cash, but eat twice the food.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Art Market",
        type: "economy",
        img: "coin",
        cost: 1300,
        effect: "Can sell Great Works for ridiculous sums.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Noble Statesmen",
        type: "diplomatic",
        img: "deal",
        cost: 8,
        effect: "+5 approval from all Nations.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Embassies Abroad",
        type: "diplomatic",
        img: "deal",
        cost: 15,
        effect: "Can set up Embassies in other Nations.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Proxenos",
        type: "diplomatic",
        img: "deal",
        cost: 35,
        effect: "???",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Honorous Tributes",
        type: "diplomatic",
        img: "deal",
        cost: 50,
        effect: "Can give Nations gifts to earn favor.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Legates",
        type: "diplomatic",
        img: "deal",
        cost: 70,
        effect: "+1 happiness per Nation known.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Noble Statesmen II",
        type: "diplomatic",
        img: "deal",
        cost: 80,
        effect: "+10 approval from all Nations.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Apocrisiarius",
        type: "diplomatic",
        img: "deal",
        cost: 199,
        effect: "-5% Cost for Cultural Diplomacy Upgrades.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Diplomatic Immunity",
        type: "diplomatic",
        img: "deal",
        cost: 250,
        effect: "Diplomats rarely mess up on missions.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Vassalge",
        type: "diplomatic",
        img: "deal",
        cost: 400,
        effect: "Can absorb weaker Nations through War.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Smooth Barbarian",
        type: "diplomatic",
        img: "deal",
        cost: 550,
        effect: "-50% anger from demanding tribute.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Noble Statesmen III",
        type: "diplomatic",
        img: "deal",
        cost: 800,
        effect: "+15 approval from all Nations.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Diplomatic Marriage",
        type: "diplomatic",
        img: "deal",
        cost: 850,
        effect: "Can absorb weaker Nations that are in your constant good favor.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Just to Piss Them Off",
        type: "diplomatic",
        img: "deal",
        cost: 1200,
        effect: "Doubles anger from insults. Allows more clever insults.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Soft Power",
        type: "diplomatic",
        img: "deal",
        cost: 1350,
        effect: "Can avoid wars with Diplomatic Talks.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Nuclear Diplomacy",
        type: "diplomatic",
        img: "deal",
        cost: 1550,
        effect: "Can stil build, but can't use, Nuclear Weapons.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Devoted Followers",
        type: "faith",
        img: "faith-alt",
        cost: 5,
        effect: "-10% Pantheon cost.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Visiting Shaman",
        type: "faith",
        img: "faith-alt",
        cost: 17,
        effect: "Provides 1 Free Cleric.",
        visible: true,
        unlocked: false,
        activated: false
      },
      {
        name: "Healing Medicine",
        type: "faith",
        img: "faith-alt",
        cost: 35,
        effect: "+1 Health per Cleric.",
        visible: true,
        unlocked: false,
        activated: false
      }

    ]
  },

  faith: {
    total: 0,
    pm: 0,
    upgrades: [
      {
        name: "Goddess of the Halibut",
        level: "Pantheon",
        costMult: 1,
        effect: "Converts half your <img src='img/fish.png' /> into <img src='img/faith.png' />PM."
      },
      {
        name: "Spirit of the Spices",
        level: "Pantheon",
        costMult: 1,
        effect: "+1% <img src='img/faith.png' /> per <img src='img/spices.png' /> (max 25%)."
      },
      {
        name: "Benevelont Muses",
        level: "Pantheon",
        costMult: 1,
        effect: "+.5 <img src='img/faith.png' /> PM for each Artist you have."
      },
      {
        name: "God of War",
        level: "Pantheon",
        costMult: 1,
        effect: "+15% <img src='img/strength.png' />."
      },
      {
        name: "Satyr's Charm",
        level: "Pantheon",
        costMult: 1,
        effect: "+1% <img src='img/happy.png' /> per <img src='img/horse.png' /> (max 25%)."
      },
      {
        name: "Golden Calf",
        level: "Pantheon",
        costMult: 1,
        effect: "+1 <img src='img/faith.png' /> PM per <img src='img/gold.png' /> resource."
      },
      {
        name: "Fertility Goddess",
        level: "Pantheon",
        costMult: 1,
        effect: "+10 <img src='img/food.png' /> PC."
      },
      {
        name: "Protective Spirits",
        level: "Pantheon",
        costMult: 1,
        effect: "+30% <img src='img/defense.png' />."
      },
      {
        name: "Stone Circles",
        level: "Pantheon",
        costMult: 1,
        effect: "+.2 <img src='img/faith.png' /> PM per Quarry."
      },
      {
        name: "Lord of the Flies",
        level: "Pantheon",
        costMult: 1,
        effect: "+1 <img src='img/happy.png' /> per 4 <img src='img/pollution.png' />"
      },
      {
        name: "The Furies",
        level: "Pantheon",
        costMult: 1,
        effect: "+10 <img src='img/faith.png'/> when you declare war.",
      },
      {
        name: "The Fates",
        level: "Pantheon",
        costMult: 1,
        effect: "Increases chance of good events."
      },
      {
        name: "Doggy Cult",
        level: "Pantheon",
        costMult: 1,
        effect: "Converts all <img src='img/horse.png' /> into Chihuahuas."
      },
      {
        name: "Spaghetti Monster",
        level: "Pantheon",
        costMult: 1,
        effect: "+1 Spaghetti resource."
      },
      {
        name: "Monotheism",
        level: "Belief",
        costMult: 25,
        effect: "+3 <img src='img/faith.png' /> PM per Cleric."
      },
      {
        name: "Reincarnation",
        level: "Belief",
        costMult: 25,
        effect: "+15 <img src='img/faith.png' /> PM per Restart."
      },
      {
        name: "Nirvana",
        level: "Belief",
        costMult: 25,
        effect: "25% of <img src='img/faith.png' /> PM converted into <img src='img/happy.png' />"
      },
      {
        name: "Polytheism",
        level: "Belief",
        costMult: 25,
        effect: "+.1 <img src='img/faith.png' /> from all Citizens."
      },

      {
        name: "Purgatory",
        level: "Dogma",
        costMult: 125,
        effect: "+25 <img src='img/faith.png' /> amidst indecisive wars."
      },
      {
        name: "Pilgrimage",
        level: "Dogma",
        costMult: 125,
        effect: "+5 Free Citizens"
      },
      {
        name: "Virgin Birth",
        level: "Dogma",
        costMult: 125,
        effect: "Retain 80% of <img src='img/food.png' /> after growth."
      },
      {
        name: "Ressurection",
        level: "Dogma",
        costMult: 125,
        effect: "Retain Max <img src='img/food.png' /> after Reset."
      },
      {
        name: "Avatar",
        level: "Dogma",
        costMult: 125,
        effect: "+100 <img src='img/strength.png' /> per Reset."
      },
      {
        name: "Just War",
        level: "Dogma",
        costMult: 125,
        effect: "+25% <img src='img/strength.png'/> when fighting a war you did not declare."
      }
    ]
  },

  nations: [
    {
      name: "Ulundo",
      img: 5,
      mood: "neutral",
      moodNum: 50,
      strength: 15,
      defense: 25,
      description: "Ulundo is a mountainous nation with a temperate climate and disposition. Their people are largely secluded from the world and are very privy to fights.",
      env1: "Mountain",
      env2: "Temperate",
      personality: "peaceful",
      color: "#C1D4CC",
      met: true,
    },
    {
      name: "Emporia",
      img: 3,
      mood: "neutral",
      moodNum: 50,
      strength: 11,
      defense: 8,
      description: "A small village that broke off from Ulundo less than a decade ago. It is weak, but stronly nationalistic. Its people take pride in their mulberry pie.",
      env1: "Plains",
      env2: "Temperate",
      personality: "peaceful",
      color: "#C2AC11",
      met: false,
    },
    {
      name: "Gradince",
      img: 12,
      mood: "furious",
      moodNum: 0,
      strength: 25,
      defense: 12,
      description: "A small city-state on the open plains. It is quick to anger.",
      env1: "Plains",
      env2: "Temperate",
      personality: "peaceful",
      color: "#EDCD64",
      met: false,
    },
    // {
    //   name: "Cajolia",
    //   img: 6,
    //   mood: "neutral",
    //   moodNum: 50,
    //   description: "Cajolia is a nation nested inside a tropical rainforest known for its barbaric atrocities.",
    //   color: "#90D4BC",
    //   met: true
    // },
    // {
    //   name: "Macchias",
    //   img: 4,
    //   mood: "neutral",
    //   moodNum: 50,
    //   description: "",
    //   color: "#9114BC",
    //   met: false,
    //
    // },
    {
      name: "Arendale",
      img: 15,
      mood: "content",
      moodNum: 80,
      strength: 40,
      defense: 85,
      description: "A coastal nation bordering the mountains. It is breezy and endures harsh winters, but its people are quite amiable.",
      env1: "Mountain",
      env2: "Coastal",
      personality: "friendly",
      color: "skyblue",
      met: false
    },
    {
      name: "Calloway",
      img: 10,
      mood: "neutral",
      moodNum: 50,
      strength: 28,
      defense: 63,
      description: "A moderately small nation known for its thriving oceanic economy.",
      env1: "Ocean",
      env2: "",
      personality: "amiable",
      color: "periwinkle",
      met: false
    },
    {
      name: "Mukthos",
      img: 8,
      mood: "angry",
      moodNum: 40,
      strength: 66,
      defense: 42,
      description: "A nation built upon swampy, humid land. Its inhabitants are known to be rude and demanding.",
      env1: "Swamp",
      env2: "Humid",
      personality: "aggressive",
      color: "lightgreen",
      met: false
    },
    {
      name: "Arcadia",
      img: 8,
      mood: "joyous",
      moodNum: 99,
      strength: 80,
      defense: 80,
      description: "A mythical land. No confirmation of it exists.",
      env1: "Temperate",
      env2: "Forest",
      personality: "amiable",
      color: "pink",
      met: false
    },
    {
      name: "Vatua",
      img: 14,
      mood: "happy",
      moodNum: 75,
      strength: 74,
      defense: 64,
      description: "An island nation populated by peoples escaping religious persecution.",
      env1: "Ocean",
      env2: "Tropical",
      personality: "friendly",
      color: "skyblue",
      met: false
    }
  ],

  buildings: [
    {
      name: "Hut",
      num: 0,
      numApplied: 0,
      prod: 15,
      cost: 150,
      misc: null,
      misc2: null,
      effect: "+1 <img src='img/happy.png' />",
      description: "A small mudhut. Air conditioning would be nice.",
      visible: true,
    },
    {
      name: "Granary",
      num: 0,
      numApplied: 0,
      prod: 30,
      cost: 400,
      misc: null,
      misc2: null,
      effect: "+200 Max <img title='food' src='img/food.png' />",
      description: "A granary for storing food for the winter.",
      visible: false
    },
    {
      name: "Quarry",
      num: 0,
      numApplied: 0,
      prod: 40,
      cost: 600,
      misc: null,
      misc2: null,
      effect: "+100 Max <img title='production' src='img/production.png' />",
      description: "Stones are, um, very pretty.",
      visible: false
    },
    {
      name: "Barracks",
      num: 0,
      numApplied: 0,
      prod: 115,
      cost: 1200,
      misc: null,
      misc2: null,
      effect: "+1 Unit <img src='img/strength.png' />",
      description: "A nice and comfy place for your soldiers to kick it.",
      visible: true
    },
    {
      name: "Temple",
      num: 0,
      numApplied: 0,
      prod: 125,
      cost: 1300,
      misc: "10 <img title='Spices' src='img/spices.png' />",
      misc2: null,
      effect: "+1 <img title='faith' src='img/faith.png' />/min",
      description: "A gorgeous temple. Smells very nice.",
      visible: false,
    },
    {
      name: "Library",
      num: 0,
      numApplied: 0,
      prod: 210,
      cost: 2100,
      misc: "2 <img title='Stone' src='img/stone.png'/>",
      misc2: null,
      effect: "+5 <img title='Research Points' src='img/research.png' />/min",
      description: "Borrow a book. Bring back $80 fine.",
      visible: false
    },
    {
      name: "Asclepieia",
      num: 0,
      numApplied: 0,
      prod: 180,
      cost: 1800,
      misc: null,
      misc: null,
      effect: "+2 <img src='img/health.png' />",
      description: "An ancient building aimed at healing your people.",
      visible: true
    },
    {
      name: "Walls",
      num: 0,
      numApplied: 0,
      prod: 250,
      cost: 2500,
      misc: null,
      misc2: null,
      effect: "+5 <img title='Defense' src='img/defense.png'/>",
      description: "Keeps out invaders and vaccuum salesmen.",
      visible: false
    },
    {
      name: "Aqueduct",
      num: 0,
      numApplied: 0,
      prod: 225,
      cost: 2250,
      misc: null,
      misc2: null,
      effect: "Carries over 50% of <img title='food' src='img/food.png' /> when you grow your population.",
      description: "It's literally just a pile of stones.",
      visible: false
    },

    {
      name: "Ampitheatre",
      num: 0,
      numApplied: 0,
      prod: 350,
      cost: 3500,
      misc: null,
      misc2: null,
      effect: "+1 <img title='culture' src='img/culture.png'/>/min",
      description: "Sick of all the drama? Come here!",
      visible: false
    },
    {
      name: "Monastery",
      num: 0,
      numApplied: 1,
      prod: 645,
      cost: 7000,
      misc: "1 <img title='spices' src='img/spices.png'/>",
      misc2: null,
      effect: "+3 <img title='faith' src='img/faith.png'/>/min, +1 <img title='happiness' src='img/happy.png'/>",
      description: "Requires Temple. Ommmmm...",
      visible: false,
    },
    {
      name: "Market",
      num: 0,
      numApplied: 0,
      prod: 800,
      cost: 5000,
      misc: null,
      misc2: null,
      effect: "+200 <img src='img/coin.png'/>/min",
      description: "A rich market to sell Magikarp.",
      visible: false
    },
    {
      name: "Forum",
      num: 0,
      numApplied: 0,
      prod: 20000,
      cost: 500000,
      misc: null,
      misc2: null,
      effect: "",
      description: "",
      visible: false
    },
    {
      name: "Colosseum",
      num: 0,
      numApplied: 0,
      prod: 500,
      cost: 4200,
      misc: null,
      misc2: null,
      effect: "+3 <img src='img/happy.png' />",
      description: "A roaring stadium where losers are eaten by lions.",
      visible: false
    },
    {
      name: "Harbor",
      num: 0,
      numApplied: 0,
      prod: 455,
      cost: 3600,
      misc: null,
      misc2: null,
      effect: "Increases <img src='img/fish.png' /> Generation",
      description: "A sunset harbor where all the cool kids hang out.",
      visible: false
    },
    {
      name: "Castle",
      num: 0,
      numApplied: 0,
      prod: 655,
      cost: 5320,
      misc: null,
      misc2: null,
      effect: "+100 <img title='Defense' src='img/defense.png' />",
      description: "A mighty castle fit for a king.",
      visible: false
    },
    {
      name: "College",
      num: 0,
      numApplied: 0,
      prod: 980,
      cost: 10000,
      misc: null,
      misc2: null,
      effect: "+10 <img title='Research Points' src='img/research.png' />/min",
      description: "Requires 5 Libraries.",
      visible: false
    },
    {
      name: "Workshop",
      num: 0,
      numApplied: 0,
      prod: 1020,
      cost: 5000,
      misc: null,
      misc2: null,
      effect: "+5 <img src='img/production.png' />PS, +500 Max <img src='img/production.png' />",
      description: "Hammering iron is our specialty!",
      visible: false
    },
    {
      name: "Hospital",
      num: 0,
      numApplied: 0,
      prod: 3000,
      cost: 8000,
      misc: null,
      misc2: null,
      effect: "+10 <img title='health' src='img/health.png'/>",
      description: "Break a leg out there! We'll fix it.",
      visible: false
    },
  ],

  wonders: [
    // NOTE: Times are listed in seconds, not milliseconds!
    {
      name: "Stonehenge",
      img: "stone-henge",
      time: 60,
      required: "10 <img title='stone' src='img/stone.png' />",
      effect: "+3 <img src='img/faith.png' /> PM",
      description: "Let's leave some rocks here to confuse future generations.",
      visible: false,
      built: false,
      progress: false,
      active: false
    },
    {
      name: "The Great Pyramids",
      img: "great-pyramids",
      time: 145,
      required: "Requires 25 <img src='img/stone.png' />",
      effect: "+1 Free Engineer.",
      description: "It'd probably build faster if we had aliens in this game.",
      visible: true,
      built: false,
      progress: false,
      active: false
    },
    {
      name: "Moai Statues",
      img: "moai-statues",
      time: 360,
      required: "Requires 3 Quarries",
      effect: "???",
      description: "Also known as the NeedNoseJobs Statues.",
      visible: true,
      built: false,
      progress: false,
      active: false,
    },
    {
      name: "Parthenon",
      img: "parthenon",
      time: 450,
      required: " ",
      effect: "",
      description: "",
      visible: true,
      built: false,
      progress: false,
      active: false,
    },
    {
      name: "The Great Wall",
      img: "great-wall",
      time: 495,
      required: "3 Walls",
      effect: "+100% <img src='img/defense.png' />",
      description: "Keeps out EVEN telemarketers.",
      visible: true,
      built: false,
      progress: false,
      active: false,
    },
    {
      name: "Great Colloseum",
      img: "great-colloseum",
      time: 515,
      required: "4 Colloseums",
      effect: "+10 <img src='img/happy.png' />",
      description: " ",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Ruiguagta Pagoda",
      img: "light-pagoda",
      time: 1020,
      required: "",
      effect: "",
      description: "",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Chichen Itza",
      img: "chichen-itza",
      time: 1320,
      required: "",
      effect: "",
      description: "",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Angkor Wat",
      img: "angkor-wat",
      time: 1500,
      required: "",
      effect: "",
      description: "",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Big Ben",
      img: "big-ben",
      time: 2220,
      required: "5hrs of playtime",
      effect: "-10% Wonder Construction Time",
      description: "A very large clock that tells a very large time.",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Statue of Liberty",
      img: "statue-of-liberty",
      time: 2000,
      required: "No prerequisites.",
      effect: "+20% <img src='img/production.png' />",
      description: "A beacon of liberty for immigrants ashore.",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Eiffel Tower",
      img: "eiffel-tower",
      time: 1800,
      required: "50 <img src='img/culture.png' /> PM",
      effect: "+50% <img src='img/culture.png' /> PM",
      description: "A gorgeous tower made of pure iron.",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Cristo Redentor",
      img: "cristo-redentor",
      time: 2100,
      required: "No prerequisites",
      effect: "+50% <img src='img/faith.png' /> PM",
      description: "An Art Deco statue of Christ atop a mountain.",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Golden Gate Bridge",
      img: "golden-gate-bridge",
      time: 2500,
      required: "Requires 350 <img src='img/iron.png' />",
      effect: "+1 Free Engineer.",
      description: "A wondrous bridge known for its gold...er, red paint.",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Mansuade",
      img: "mansuade",
      time: 2300,
      required: "Requires Autocracy",
      effect: "Eliminates Revolutions.",
      description: "A glorious statue of two leaders.",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "Sydney Opera House",
      img: "sydney-opera-house",
      time: 2770,
      required: " ",
      effect: "",
      description: "",
      visible: true,
      built: false,
      progress: true,
      active: false,
    },
    {
      name: "The Louvre",
      img: "the-louvre",
      time: 2860,
      required: "Requires 15 Great Works",
      effect: "+10% <img src='img/culture.png'> from Great Works.",
      description: "",
      visible: true,
      built: false,
      progress: false,
      active: false,
    }

  ],

  init: function() {
    //for (var i = 0; i < game.tech.techs.length; i++) { game.tech.techs[i].visible = true; }
    for (var i = 0; i < game.wonders.length; i++) { game.wonders[i].visible = false; }

    var choose = function(arr) {
      return arr[Math.floor(Math.random()*arr.length)];
    }
    var abbrNum = function(number, decPlaces) {
        // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10,decPlaces);

        // Enumerate number abbreviations
        var abbrev = [ "k", "m", "b", "t" ];

        // Go through the array backwards, so we do the largest first
        for (var i=abbrev.length-1; i>=0; i--) {

            // Convert array index to "1000", "1000000", etc
            var size = Math.pow(10,(i+1)*3);

            // If the number is bigger or equal do the abbreviation
            if(size <= number) {
                 // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                 // This gives us nice rounding to a particular decimal place.
                 number = Math.round(number*decPlaces/size)/decPlaces;

                 // Handle special case where we round up to the next abbreviation
                 if((number == 1000) && (i < abbrev.length - 1)) {
                     number = 1;
                     i++;
                 }

                 // Add the letter for the abbreviation
                 number += abbrev[i];

                 // We are done... stop
                 break;
            }
        }

        return number;
    };

    //$("body").text(abbrNum(1000000000, 2));

    var setEra = function(era) {
      $(".overlay").html('');
      var eraMarker = $('.era-marker');

      eraMarker.text(game.era + " era");

      $('.overlay').removeClass(game.era).removeClass('hidden');
      $('body').removeClass(game.era);

      game.era = era;
      game.eraNum *= 2;


      $(".overlay").append("<h1>Welcome to the " + game.era + " Era!</h1><p>Click anywhere to continue.</p>");
      if (game.era == "Classical") {
        $(".overlay").append("<p>+10 <img src='img/production.png' /> PC</p>");
      }
      $(".overlay").addClass(game.era).removeClass("hidden");
      $("body").addClass(game.era);
      eraMarker.text(game.era + " era");

    };
    setEra(game.era);
    $(".overlay").click(function(){
      $(this).addClass("hidden");
    });

    var postNames = function() {
      var civName = $('.civ-name');
      var leaderName = $('.leader-name');
      civName.text(game.empire.name);
      leaderName.text(game.empire.leaderName);
    };
    postNames();
    $('.civ-name').keypress(function(){
      var k = $(this).text();
      game.empire.name = k;
      postNames();
    });

    var advisorText = function() {
      var n = game.advisor.length;
      var x = n * Math.random();
      var y = x.toFixed(0);
      game.adviceCurrent = game.advisor[y - 1];
    };
    advisorText();


    var index = 0;
    var note = function(msg, ms, type) {
      ms = typeof ms !== 'undefined' ?  ms : 5000;
      type = typeof type !== 'undefined' ? type : 'default';
      var typePost = "Game Notification";
      switch (type) {
        case 'tech-note':
          typePost = "Technology";
          break;
        case 'diplomacy-r':
          typePost = "Diplomatic Relations";
          break;
      }

      var msgHTML = "<p>" + game.year + " AC: " + msg + "</p>";
      (game.settings.noteCounter < 10) ? game.settings.noteCounter += 1 : game.settings.noteCounter = 0;

      $(".log-text").prepend(msgHTML);

      $("body").append("<div class='note note-" + game.settings.noteCounter + " " + type + "'><div class='note-type'>" + typePost + "</div><div class='note-text'>" + msgHTML + "</div><div class='close-note' data-close-n='" + game.settings.noteCounter + "'><img title='close' src='img/x.png' /></div></div>")



      //$("#note-" + game.settings.noteCounter).css("height", (10 + (game.settings.noteCounter * 2)) + "rem");
      //$("#note-" + game.settings.noteCounter).css("z-index", (1001 + game.settings.noteCounter));
      setTimeout(function(){
        //$(".note").addClass('vanish', 'hidden');
      }, ms);

      // $(".note").click(function(){
      //   $(this).css("height", "90%");
      // });
      $(".close-note").click(function(){
        var n = $(this).attr('data-close-n');
        var el = $(".note-" + n);
        el.remove();
        game.settings.noteCounter = 0;
      });

      // for (i = 0; i < 10; i++) {
      //   $(".note-" + i + " .close-note").click(function(){
      //     $(".note-" + i).addClass('vanish', 'hidden');
      //   })
      // }
      // $(".close-note").click(function(){
      //   $(".note").addClass('vanish', 'hidden');
      // });
    };
    note("Started a new game.");

    // setInterval(function(){
    //   note("What's up?", 1000);
    // }, 2000);


    var healthPercentCalc = function() {
      var percent = game.empire.health / (game.empire.health + game.empire.pollution)
      var percent = (percent * 100).toFixed(0) + "%";
      return percent;
    };

    var moodCalc = function() {
      var percent = (game.empire.happiness / (game.empire.happiness + game.empire.anger)) * 100;
      var mood = "Content";
      var title = $(".leader-title");
      console.log(percent);
      if (percent < 100) { mood = "Joyous"; title.text("Immaculate"); }
      if (percent < 95) { mood = "Happy"; title.text("Great"); }
      if (percent < 80) { mood = "Content"; title.text("Good"); }
      if (percent < 60) { mood = "Neutral"; title.text("Okay"); }
      if (percent < 40) { mood = "Angry"; title.text("The Awful"); }
      if (percent < 30) { mood = "Furious"; title.text("Terrible"); }
      if (percent < 20) { mood = "Angry"; }
      var percentString = percent + '%';
      $('.mood-meter').css("background", "linear-gradient(to right, yellow " + percentString + ", red " + percentString + ", red)").attr('title', percentString);
      $('.mood-img').attr('src', 'img/' + mood + '.png');
      $('.mood').attr('class', 'mood hint--top').addClass(mood);
      game.empire.mood = mood;
      return mood;
    };

    var time = function(d) {
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    };

    var updateResources = function() {

      $('.food-total').text(abbrNum(game.resources.food.total.toFixed(0), 2));
      $('.food-ps').text(abbrNum((game.resources.food.ps - (game.empire.pop - 1)).toFixed(1), 2));
      $('.food-pc').text(abbrNum(game.resources.food.pc.toFixed(1), 2));
      $('.food-max').text(abbrNum(game.resources.food.max, 2));
      //(game.resources.food.ps < 0) ? $('.food-ps').addClass('red-text') : $('.food-ps').removeClass('red-text');

      $('.prod-total').text(abbrNum(game.resources.prod.total.toFixed(0), 2));
      $('.prod-ps').text(abbrNum(game.resources.prod.ps.toFixed(1), 2));
      $('.prod-pc').text(abbrNum(game.resources.prod.pc.toFixed(1), 2));
      $('.prod-max').text(abbrNum(game.resources.prod.max, 2));

      $('.fish-total').text(abbrNum(game.resources.fish.total, 2));
      $('.horse-total').text(abbrNum(game.resources.horse.total, 2));
      $('.stone-total').text(abbrNum(game.resources.stone.total, 2));
      $('.spices-total').text(abbrNum(game.resources.spices.total, 2));

      $('.pop-text').text(game.empire.pop);
      $('.pop-cost-mult').text(game.empire.popCostMult.toFixed(3));

      $('.total-cash').text(abbrNum(game.empire.cash.toFixed(1), 2));
      $('.cash-PM').text("$" + game.empire.cashPM.toFixed(2));
      $('.cash-PM-formatted').text((game.empire.cashPM > 0 ? "+" : "") + abbrNum(game.empire.cashPM.toFixed(0), 2));
      (game.empire.cashPM < 0) ? $('.cash-PM-formatted').addClass('red-text') : $('.cash-PM-formatted').removeClass('red-text');
      (game.empire.cash < 0) ? $('.total-cash').addClass('red-text') : $('.total-cash').removeClass('red-text');

      $('.health').text(abbrNum(game.empire.health));
      $('.pollution').text(abbrNum(game.empire.pollution));
      $('.health-percent').text(healthPercentCalc());

      $('.happiness').text(game.empire.happiness);
      $('.anger').text(game.empire.anger);
      $('.mood-string').text(moodCalc());

      $('.farmer-ps').text(game.citizens.farmers.ps);
      $('.farmer-pc').text(game.citizens.farmers.pc);
      $('.miner-ps').text(game.citizens.miners.ps);
      $('.miner-pc').text(game.citizens.miners.pc);

      $(".soldier-assign input").attr('max', game.citizens.soldiers.num);
      $('[data-job-total="soldier"]').text(game.citizens.soldiers.num);
      $('.soldiers-assigned').text(game.military.soldiers.assigned);
      $('.strength').text(game.military.strength);
      $('.defense').text(game.military.defense);

      $('.land-total').text(abbrNum(game.empire.land, 2));

      $('.total-clicks').text(abbrNum(game.totalClicks, 2));

      $('.advisor-text').text(game.adviceCurrent);

      $('.research-points').text(abbrNum(game.tech.research.toFixed(1), 2));

      $('.faith-total').text(abbrNum(Math.floor(game.faith.total), 2));
      $('.faith-PM').text(game.faith.pm);

      $('.culture-total').text(abbrNum(Math.floor(game.culture.total), 2));
      $('.great-works-total').text(abbrNum(game.culture.greatWorks.toFixed(0), 2));
      $('.culture-PM').text(game.culture.pm);

      $('.total-time').text(time(game.totalTime));

    };

    updateResources();




    $('[data-button]').click(function(){
      var type = $(this).attr('data-button');


      if (type == "food") {
        game.resources.food.total += game.resources.food.pc;
        if (game.resources.fish.unlocked) {
          var fishRand = Math.random();
          if ((game.resources.fish.mult / 100) > fishRand) {

            game.resources.fish.total += 1;
            game.empire.health += game.resources.fish.healthBonus;
            note("One of your citizens caught fish! (+1 <img src='img/fish.png' />)");
          }
        }
        if (game.resources.horse.unlocked) {
          var horseRand = Math.random();
          if ((game.resources.horse.mult / 200) > horseRand) {
            game.resources.horse.total += 1;
            note("One of your farmers bred a prize horse! (+1 <img src='img/horse.png' />)");
          }
        }
      }
      if (type == "prod") {
        game.resources.prod.total += game.resources.prod.pc;
        if (game.tech.techs[3].unlocked && game.citizens.miners.num > 0) {
          var stoneRand = Math.random();
          if ((game.resources.stone.mult / (100 - game.citizens.miners.num)) > stoneRand) {
            game.resources.stone.total += 1;
            note("One of your miners found a massive ore deposit! (+1 <img src='img/stone.png' />)");
          }
        }
      }
      if (type == "pop") {
        populationGrow();
      }
      if (type == "purchase-mode") {
        purchaseMode();
      }
      if (type == "nation") {
        console.log("Nation clicked!");
        nationPanel();
      }

      game.totalClicks += 1;

      setMax();
      checkPop();
      updateResources();
    });

    var setMax = function() {
      if (game.resources.food.total > game.resources.food.max) {
        game.resources.food.total = game.resources.food.max;
      }
      if (game.resources.food.total < 0) {
        game.resources.food.total = 0;
      }
      if (game.resources.prod.total > game.resources.prod.max) {
        game.resources.prod.total = game.resources.prod.max;
      }
      if (game.resources.prod.total < 0) {
        game.resources.prod.total = 0;
      }
    };

    var checkPop = function() {
      if (game.resources.food.total >= game.empire.popCostBase) {
        $("#popButton").removeClass('disabled');
        return true;
      } else {
        $("#popButton").addClass('disabled');
      }
    };

    var checkTech = function(a, b) {
      for (var i = a; i == b; i++) {
        var checkResult = true;
        if (game.tech.techs[i].unlocked == true) {
          checkResult *= true;
        } else {
          checkResult *= false;
        }
      }
      return checkResult;
    };

    setInterval(function(){
      game.totalTime += 1;

      game.resources.prod.total += game.resources.prod.ps;
      game.resources.food.total += game.resources.food.ps;

      game.resources.food.total -= game.empire.pop - 1;



      if (game.resources.fish.unlocked) {
        var fishRand = Math.random();
        if ((game.resources.fish.mult / 1000) > fishRand) {

          game.resources.fish.total += 1;
          game.empire.health += game.resources.fish.healthBonus;
          note("One of your citizens caught fish! (+1 <img src='img/fish.png' />)");
        }
      }

      if (game.resources.horse.unlocked) {
        var horseRand = Math.random();
        if ((game.resources.horse.mult / 2000) > horseRand) {
          game.resources.horse.total += 1;
          note("One of your farmers bred a prize horse! (+1 <img src='img/horse.png' />)");
        }
      }

      if (game.tech.techs[3].unlocked && game.citizens.miners.num > 0) {
        var stoneRand = Math.random();
        if ((game.resources.stone.mult / (100 - game.citizens.miners.num)) > stoneRand) {
          game.resources.stone.total += 1;
          note("One of your miners found a massive ore deposit! (+1 <img src='img/stone.png' />)");
        }
      }

      (game.tech.research > game.tech.cost) ? $('.tech').addClass('attention') : $('.tech').removeClass('attention');




      setMax();
      checkPop();
      updateCulture();
      updateMoney();
      updateFaith();
      updateResearch();
      //updateStrength();
      updateResources();
      setBuildings();


    }, 1000);

    // per 30 seconds
    setInterval(function() {

      if (game.tech.research > game.tech.cost && !game.flags.can_purchase_tech) {
        note("You have enough Research Points to purchase a new <a href='#technologies'>Technology</a>!", 10000, "tech-note");
        can_purchase_tech = true;
      }



      newEvent(game.era);
      advisorText();


    }, 30000);

    // per minute
    setInterval(function(){

      if (game.citizens.woodcutters.num > 0) {
        game.resources.spices.total += game.citizens.woodcutters.num;
      }

      updateYear();
    }, 60000);

    var newEvent = function(era) {
      var r = Math.floor(Math.random() * 100);

      if (r == 1) {
        note("One of your citizens caught a deadly illness. RIP " + choose(["Tom", "Brad", "Cara", "Bob", "Jill", "Nikki"]) + ". (+1 <img src='img/pollution.png' />)", 10000);
        game.empire.pollution += 1;
      }

      if (r == 2) {
        if (game.citizens.scientists.num > 0) {
          note("One of your Scientists discovered a cure to a deadly illness! (+3 <img src='img/health.png' />)", 10000);
          game.empire.health += 3;
        } else {
          note("One of your Citizens discovered a way to stave off deadly illness! (+1 <img src='img/health.png' />)", 10000);
          game.empire.health += 1;
        }

      }

      if (r == 3) {
        if (game.empire.pop > 1) {
          var rx = Math.floor(Math.random() * 100);
          var rx2 = Math.floor(Math.random() * 100);
          var vc = (game.military.defense + rx) - (12 + rx2);
          if (vc > 0) {
            note("One of your Citizens was killed by a " + choose(["Wolf", "Bear", "Lion", "Hyena", "Rabid Chihuahua"]) + "! (-1 <img src='img/citizens.png' />)", 10000);
          } else {
            note("One of your Citizens was threatened by a " + choose(["Wolf", "Bear", "Lion", "Hyena", "Rabid Chihuahua"]) + " but luckily, one of your soldiers stepped in and saved them! (+1 <img src='img/strength.png' />)", 10000);
            game.military.strength += 1;
          }
        }
      }

      if (r == 4) {
        note("An influx of immigrants brought in more people! (+1 <img src='img/citizens.png' />)");
        game.empire.pop += 1;
        game.empire.popUnemployed += 1;
        calculatePop();
        checkUnemployed();
      }

      if (r == 5) {
        meetNewNation();
      }

      else {
        //note("No event roll.");
      }

    };

    var updateYear = function() {
      if (game.totalClicks > 0) {
        game.year += 1;
      }
      $(".year-marker").text(game.year + " AC");
    };
    updateYear();

    var updateCulture = function() {
      game.culture.total += game.culture.pm / 60;
    };

    var updateFaith = function() {
      game.faith.total += game.faith.pm / 60;
    };




    var populationGrow = function() {
      if (checkPop() == true) {
        //var popCost = 10;
        game.resources.food.total -= game.empire.popCostBase;
        if (game.buildings[6].num > 0) {
          game.resources.food.total += (game.empire.popCostBase / 2);
        }

        //var popCost = Math.ceil((game.empire.popCostBase * game.empire.popCostMult));
        var popCost = Math.ceil(Math.log(game.empire.popCostBase) + game.empire.popCostBase);
        game.empire.popCostBase = popCost;

        $("#popCost").text(abbrNum(game.empire.popCostBase, 2));



        game.empire.anger += 1;
        game.empire.pollution += 1;
        game.empire.pop += 1;
        game.empire.popUnemployed += 1;
        checkUnemployed();
        calculatePop();
      }

    };

    var checkUnemployed = function() {
      if (game.empire.popUnemployed > 0) {
        // ADD NOTE!
        $("#unemployedAmt").text(game.empire.popUnemployed).addClass('red-text-big');
      } else {
        $("#unemployedAmt").text("0").removeClass('red-text-big');
      }

    };

    var calculatePop = function() {
      var population;
      var rand = Math.ceil(Math.random() * 1000);
      switch (game.era) {
        case "Ancient":
          population = game.empire.pop * 100 + rand;
          break;
        case "Classical":
          population = game.empire.pop * 250 + rand;
          break;
        case "Medieval":
          population = game.empire.pop * 500 + rand;
          break;
        case "Renaissance":
          population = game.empire.pop * 1000 + rand;
          break;
        case "Enlightenment":
          population = game.empire.pop * 1550 + rand;
          break;
        case "Industrial":
          population = game.empire.pop * 2100 + rand;
          break;
        default:
          population = game.empire.pop * 10000;
      }

      $('.population').attr('data-hint', population + ' people');
    };

    // $('[data-job]').click(function() {
    //   var type = $(this).attr('data-job');
    //
    //   $(this).text(type);
    // });

    var updateMoney = function(amt) {
      if (amt == null || amt == '') {
        amt = (((((game.empire.pop - 1 - game.empire.popUnemployed) * 1) - (game.empire.popUnemployed * 5) + (game.citizens.merchants.num * game.citizens.merchants.pm)) * game.empire.cashMult) - (calcBuildingCost() + calcUnitCost()))  / 60;
      } else {
        amt = amt;
      }

      game.empire.cashPM = amt * 60;
      game.empire.cash += amt;
    };

    for(var i = 0; i < game.buildings.length; i++) {
      game.buildings[i].maintenance = 1;
    }

    var calcBuildingCost = function() {
      var m = 0;
      for(var i = 0; i < game.buildings.length; i++) {
        m += game.buildings[i].maintenance * game.buildings[i].num;
      }
      $('.total-maintenance-cost').text(m);
      return m;
    }

    var calcUnitCost = function() {
      var m = (game.citizens.soldiers.num * 3);
      return m;
    }





    $('[data-num]').click(function() {
      var amt = $(this).attr('data-num');
      amt = parseInt(amt);
      var job = $(this).parent().attr('data-job');


      if (game.empire.popUnemployed != 0 && amt > 0) {
        if (job == "farmer") {
          game.citizens.farmers.num += amt;
          game.resources.food.ps += game.citizens.farmers.ps;
          game.resources.food.pc += game.citizens.farmers.pc;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='farmer']").text(game.citizens.farmers.num);
          checkUnemployed();
        }
        if (job == "soldier") {
          game.citizens.soldiers.num += amt;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='soldier']").text(game.citizens.soldiers.num);
          $(".soldier-assign input").attr('max', game.citizens.soldiers.num);
          $("input[name='foot-soldier']").val(amt);
          game.military.soldiers.total += amt;
          game.military.soldiers.assigned += amt;
          //console.log(game.military.soldiers.army[0].num);
          game.military.soldiers.army[0].num += amt;
          note("Your nation conscripted a new Soldier! They were automatically assigned as a Foot Soldier, which you can change in the military panel.", 10000);
          checkUnemployed();
        }
        if (job == "woodcutter") {
          game.citizens.woodcutters.num += amt;
          game.resources.prod.ps += game.citizens.woodcutters.ps;
          game.resources.prod.pc += game.citizens.woodcutters.pc;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='woodcutter']").text(game.citizens.woodcutters.num);
          checkUnemployed();
        }
        if (job == "miner") {
          game.citizens.miners.num += amt;
          game.resources.prod.ps += game.citizens.miners.ps;
          game.resources.prod.pc += game.citizens.miners.pc;
          game.empire.pollution += amt;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='miner']").text(game.citizens.miners.num);
          checkUnemployed();
        }
        if (job == "artist") {
          game.citizens.artists.num += amt;
          game.culture.pm += game.citizens.artists.pm;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='artist']").text(game.citizens.artists.num);
          checkUnemployed();
        }

        if (job == "cleric") {
          game.citizens.clerics.num += amt;
          game.faith.pm += game.citizens.clerics.pm;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='cleric']").text(game.citizens.clerics.num);
          checkUnemployed();
        }
        if (job == "merchant") {
          game.citizens.merchants.num += amt;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='merchant']").text(game.citizens.merchants.num);
          checkUnemployed();
        }

        if (job == "engineer") {
          game.citizens.engineers.num += amt;
          game.resources.prod.ps += game.citizens.engineers.ps;
          game.resources.prod.pc += game.citizens.engineers.pc;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='engineer']").text(game.citizens.engineers.num);
          checkUnemployed();
        }

        if (job == "scientist") {
          game.citizens.scientists.num += amt;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='scientist']").text(game.citizens.scientists.num);
          checkUnemployed();
        }
      }

      if (amt < 0) {
        if (job == "farmer" && game.citizens.farmers.num > 0) {
          game.citizens.farmers.num += amt;
          game.resources.food.ps -= game.citizens.farmers.ps;
          game.resources.food.pc -= game.citizens.farmers.pc;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='farmer']").text(game.citizens.farmers.num);
          checkUnemployed();
        }
        if (job == "soldier" && game.citizens.soldiers.num > 0) {
          game.citizens.soldiers.num += amt;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='soldier']").text(game.citizens.soldiers.num);
          checkUnemployed();
        }
        if (job == "miner" && game.citizens.miners.num > 0) {
          game.citizens.miners.num += amt;
          game.resources.prod.ps -= game.citizens.miners.ps;
          game.resources.prod.pc -= game.citizens.miners.pc;
          game.empire.pollution -= amt;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='miner']").text(game.citizens.miners.num);
          checkUnemployed();
        }
        if (job == "artist" && game.citizens.artists.num > 0) {
          game.citizens.artists.num += amt;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='artist']").text(game.citizens.artists.num);
          checkUnemployed();
        }
        if (job == "cleric" && game.citizens.clerics.num > 0) {
          game.citizens.clerics.num += amt;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='cleric']").text(game.citizens.clerics.num);
          checkUnemployed();
        }
        if (job == "merchant" && game.citizens.merchants.num > 0) {
          game.citizens.merchants.num += amt;
          game.empire.popUnemployed -= amt;
          $("[data-job-total='merchant']").text(game.citizens.merchants.num);
          checkUnemployed();
        }
      }

      // if (game.empire.popUnemployed =< 0) {
      //
      // }

    });
    $("[data-button='alter-num']").click(function(){
      var amt = $(this).attr('data-alter');
      $("[data-num]").each(function(){
        var original = $(this).text();
        if (original == "_") {

        } else if (original < 0) {
          $(this).text("-" + amt);
          $(this).attr('data-num', -1 * amt);
        } else {
          $(this).text("+" + amt);
          $(this).attr('data-num', amt);
        }
      });
    });




    var active = true;
    var purchaseMode = function() {

      if (active == true) {
        $('[data-button="purchase-mode"]').addClass('active');
        $('.cost-type').html("<img src='img/coin.png' />");
        game.purchaseMode = true;
        setBuildings();
        active = false;
      } else {
        //$('[data-button="purchase-mode"]').removeClass('active');
        $('[data-button="purchase-mode"]').removeClass('active');
        $('.cost-type').html("<img src='img/production.png' />");
        game.purchaseMode = false;
        setBuildings();
        active = true;
      }


    };

    // <div class="button" data-button="nation">
    //   <img src="img/empire-6.png" /> Nation of Mopmarkio
    //   <span class="nation-mood"><img src="img/neutral.png" /></span>
    // </div>

    var setNations = function() {
      var nationContainer = $('.nations');
      nationContainer.html('');

      for (var i = 0; i < game.nations.length; i++) {
        //console.log("<div class='button' data-button='nation' data-nation='" + game.nations[i].name + "'><img src='img/empire-" + game.nations[i].img + ".png' /> Nation of " + game.nations[i].name + "<span class='nation-mood'><img src='img/" + game.nations[i].mood + ".png' />" + game.nations[i].mood + "</span></div>");
        if (game.nations[i].met) {
          nationContainer.append("<div style='border: 2px solid " + game.nations[i].color + "' class='button' data-button='nation' data-nation='" + game.nations[i].name + "'><img src='img/empire-" + game.nations[i].img + ".png' /> Nation of " + game.nations[i].name + "<br/><img src='img/strength.png' />" + game.nations[i].strength + "<img src='img/defense.png' />" + game.nations[i].defense + "<img title='" + game.nations[i].env1 + "' alt='" + game.nations[i].env1 + "' src='img/" + game.nations[i].env1 + ".png' /><img title='" + game.nations[i].env2 + "' alt='" + game.nations[i].env2 + "' src='img/" + game.nations[i].env2 + ".png' /><span class='nation-mood'><img src='img/" + game.nations[i].mood + ".png' data-hint='" + game.nations[i].mood + "' class='hint--bottom' /></span></div>");
        }

      }

      $('[data-button]').click(function(){
        var type = $(this).attr('data-button');

        if (type == "nation") {
          console.log("Nation clicked!");
          var n = $(this).data('nation');
          nationPanel(n);
        }

        game.totalClicks += 1;

        setMax();
        checkPop();
        updateResources();
      });
    };
    setNations();

    var nationPanel = function(nation) {
      $('.nations').addClass('move-left');
      var panel = $('.nation-panel');
      panel.html('');


      for (var i = 0; i < game.nations.length; i++) {
        if (game.nations[i].name == nation) {
          panel.append("<h3 class='nation-title'><img src='img/empire-" + game.nations[i].img + ".png' /> Nation of " + nation + "</h3>");
          $(".diplomacy").css("backgroundColor", game.nations[i].color);
          panel.append("<p class='nation-military'><img src='img/strength.png'/> Strength: "+ game.nations[i].strength + " <img src='img/defense.png'/> Defense: " + game.nations[i].defense + "</p>");
          panel.append("<p class='nation-description'>" + game.nations[i].description + "</p>");
          panel.append("<div class='row'><div class='nation-diplo' data-button='nation-trade'>Trade</div><div class='nation-diplo' data-button='declare-war'>Declare War!!</div><div class='nation-diplo' data-button='return'> &larr; Go Back</div></div>");
          $("[data-button='return']").click(function(){
            $('.diplomacy').css("backgroundColor", "rgba(255, 255, 255, 0.7)");
            $('.nation-panel').html('');
            $('.nations').removeClass('move-left');
          });

        }
        else {

        }
      }


    };

    var meetNewNation = function() {
      var nation = choose(game.nations);
      if (nation.met == false) {
        nation.met = true;
        setNations();
        note("After much travel, one of your citizens met and engaged in new diplomatic ties with the Nation of " + nation.name + "!", 10000, "diplomacy-r");
      } else {
        meetNewNation();
      }
    };
    //meetNewNation();

    var updateResearch = function() {
      var researchFromEmpire = ((game.empire.pop - 1) * 2) - (game.empire.popUnemployed * .5);
      var researchFromBuildings = game.tech.researchFromBuildings;
      var researchFromCitizens = (game.citizens.scientists.num * game.citizens.scientists.pm);
      var techPM = 0;
      techPM = (researchFromEmpire + researchFromBuildings + researchFromCitizens) / 60;
      game.tech.research += techPM;
      $('.research-PM').text(techPM * 60);
      game.tech.researchTotal += (researchFromEmpire + researchFromBuildings + researchFromCitizens) / 60;

    };

    var setTechnologies = function() {
      var techContainer = $(".tech-container");
      techContainer.html('');

      for (var i = 0; i < game.tech.techs.length; i++) {
        //game.tech.techs[i].effects = ["Unlocks Farmers.", "Can build Strip Club", "Unlocks Merchant Culture"];
        if (game.tech.techs[i].visible == true) {
          if (game.tech.techs[i].unlocked == true) {
            techContainer.append("<div class='tech unlocked hint--top' data-n='" + i + "' data-hint='" + game.tech.techs[i].description + "'><img src='img/research.png' /><span class='tech-cost'>" + abbrNum(game.tech.cost, 2) + "</span><span class='tech-name'>" + game.tech.techs[i].name + "</span><span class='tech-flavor'>" + game.tech.techs[i].flavor + "</span>" + i + "</div>");
          } else {
            techContainer.append("<div class='tech hint--top' data-n='" + i + "' data-hint='" + game.tech.techs[i].description + "'><img src='img/research.png' /><span class='tech-cost'>" + abbrNum(game.tech.cost, 2) + "</span><span class='tech-name'>" + game.tech.techs[i].name + "</span><span class='tech-flavor'>" + game.tech.techs[i].flavor + "</span>" + i + "<br/><ul></ul></div>");
            for (var j = 0; j < game.tech.techs[i].effects.length; j++) {
              $("[data-n='" + i + "'] ul").append("<li>" + game.tech.techs[i].effects[j] + "</li>");
            }
          }

        } else {
          techContainer.append("<div class='tech locked hint--top' data-n='" + i + "' data-hint='" + game.tech.techs[i].description + "'><img src='img/research.png' /><span class='tech-cost'>" + abbrNum(game.tech.cost, 2) + "</span><span class='tech-name'>" + game.tech.techs[i].name + "</span><span class='tech-flavor'>" + game.tech.techs[i].flavor + "</span>" + i + "<br/><ul></ul></div>");
          for (var j = 0; j < game.tech.techs[i].effects.length; j++) {
            $("[data-n='" + i + "'] ul").append("<li>" + game.tech.techs[i].effects[j] + "</li>");
          }
        }
      }

      $(".tech").on("click", function(){

          // For the boolean value
          var n = $(this).attr('data-n');
          //var n = 2;
          //console.log(n);
          if (game.tech.techs[n].visible) {
            if (game.tech.research >= game.tech.cost) {
              game.tech.techs[n].unlocked = true;
              game.tech.research -= game.tech.cost;
              game.tech.cost = (game.tech.cost * game.tech.costMult).toFixed(1);
            } else {
              note("Not enough research points!", 5000, "tech");
            }

            checkTechnologies();
            setTechnologies();
          } else {
            noet("You can't create that technology yet!", 5000, "tech");
          }


          //console.log(n);
      });

    };
    setTechnologies();
    var checkTechnologies = function() {
      for (var i = 0; i < game.tech.techs.length; i++) {
        if (game.tech.techs[i].unlocked && !game.tech.techs[i].activated) {
          if (i == 0) {
            $("[data-resource='horse']").removeClass('locked');
            game.resources.horse.unlocked = true;
            recalculateJob('farmer', 1.15, 1.15);
            //game.tech.techs[2].visible = true;
            game.tech.techs[11].visible = true;
            setTechnologies();
          }
          if (i == 1) {
            game.military.defense += 3;
          }
          if (i == 2) {
            $("[data-resource='fish']").removeClass('locked');
            game.resources.fish.unlocked = true;

          }
          if (i == 3) {
            $("[data-job='miner']").removeClass('locked');
            $("[data-resource='stone']").removeClass('locked');
            $("[data-resource='gold']").removeClass('locked');
            $("[data-resource='gems']").removeClass('locked');
            game.buildings[2].visible = true;
            setBuildings();
            game.tech.techs[12].visible = true;
            setTechnologies();
          }
          if (i == 4) {
            $("[data-resource='faith']").removeClass('locked');
            $("[data-job='cleric']").removeClass('locked');
            game.buildings[3].visible = true;
            setBuildings();
            game.wonders[0].visible = true;
            setWonders();
          }
          if (i == 5) {
            $("[data-resource='culture']").removeClass('locked');
            $("[data-job='artist']").removeClass('locked');
            game.buildings[1].visible = true;
            setBuildings();
            game.tech.techs[6].visible = true;
            game.tech.techs[18].visible = true;
            setTechnologies();
            game.wonders[1].visible = true;
            setWonders();
          }
          if (i == 6) {
            $("[data-job='merchant']").removeClass('locked');
          }
          if (i == 7) {
            $("[data-job='woodcutter']").removeClass('locked');
            $("[data-resource='spices']").removeClass('locked');
            game.tech.techs[8].visible = true;
            setTechnologies();
          }
          if (i == 8) {
            game.buildings[4].visible = true;
            setBuildings();
            game.tech.techs[14].visible = true;
            setTechnologies();
          }

          if (i == 9) {
            game.buildings[5].visible = true;
            setBuildings();
          }

          if (i == 10) {
            $("[data-job='engineer']").removeClass('locked');
            game.buildings[6].visible = true;
            setBuildings();
            game.tech.techs[13].visible = true;
            setTechnologies();
          }
          if (i == 12) {
            game.tech.techs[21].visible = true;
            game.tech.techs[22].visible = true;
            game.tech.techs[23].visible = true;
            setTechnologies();
          }
          if (i == 13) {
            game.resources.food.max += 2000;
            recalculateJob('farmer', 2, 2);
            game.tech.techs[29].visible = true;
            setTechnologies();
          }
          if (i == 14) {
            game.tech.techs[9].visible = true;
            setTechnologies();
          }
          if (i == 15) {
            $("[data-job='scientist']").removeClass('locked');
          }
          if (i == 16) {
            game.buildings[7].visible = true;
            setBuildings();
            game.tech.techs[19].visible = true;
            setTechnologies();
          }
          if (i == 17) {
            game.resources.prod.max += 2000;
            game.buildings[12].visible = true;
            setBuildings();
          }

          if (i == 18) {
            $("[data-job='stripper']").removeClass('locked');
          }

          if (i == 19) {
            enableMercenaries();
            game.tech.techs[20].visible = true;
            game.tech.techs[25].visible = true;
            setTechnologies();
          }

          if (i == 20) {
            game.tech.techs[28].visible = true;
            game.tech.techs[26].visible = true;
            setTechnologies();
          }

          if (i == 22) {
            game.tech.techs[24].visible = true;
            setTechnologies();
          }



          if (i == 23) {
            game.tech.techs[27].visible = true;
            setTechnologies();
            recalculateJob('miner', 2, 2);
          }

          if (i == 29) {
            game.empire.popCostMult *= .9;
            recalculateJob('farmer', 2, 2);
          }

          game.tech.techs[i].activated = true;
          if (game.tech.techs[2].unlocked && game.tech.techs[10].unlocked) {
            game.tech.techs[17].visible = true;
            setTechnologies();
          }
          if (game.tech.techs[3].unlocked && game.tech.techs[5].unlocked) {
            game.tech.techs[9].visible = true;
            setTechnologies();
          }
          if (game.tech.techs[5].unlocked && game.tech.techs[8].unlocked) {
            game.tech.techs[16].visible = true;
            setTechnologies();
          }
          if (game.tech.techs[9].unlocked && game.tech.techs[12].unlocked) {
            game.tech.techs[10].visible = true;
            setTechnologies();
          }
          if (game.tech.techs[4].unlocked && game.tech.techs[8].unlocked && game.tech.techs[6].unlocked) {
            game.tech.techs[15].visible = true;
            setTechnologies();
          }
          if (game.tech.techs[13].unlocked && game.tech.techs[23].unlocked) {
            game.tech.techs[29].visible = true;
            setTechnologies();
          }
          if (game.tech.techs[20].unlocked && game.tech.techs[22].unlocked) {
            game.tech.techs[30].visible = true;
            setTechnologies();
          }
          if (game.tech.techs[0].unlocked && game.tech.techs[1].unlocked && game.tech.techs[2].unlocked && game.tech.techs[3].unlocked && game.tech.techs[4].unlocked && game.tech.techs[5].unlocked && game.tech.techs[6].unlocked && game.tech.techs[7].unlocked && game.tech.techs[8].unlocked) {
            setEra("Classical");
            setTechnologies();
          }
          if (game.tech.techs[9].unlocked && game.tech.techs[10].unlocked && game.tech.techs[11].unlocked && game.tech.techs[12].unlocked && game.tech.techs[13].unlocked && game.tech.techs[14].unlocked && game.tech.techs[15].unlocked && game.tech.techs[16].unlocked && game.tech.techs[17].unlocked && game.tech.techs[18].unlocked) {
            if (!game.flags.entered_medieval_era) {
              setEra("Medieval");
              setTechnologies();
            }
            game.flags.entered_medieval_era = true;
          }
        }
      }
    };
    checkTechnologies();
    var recalculateJob = function(job, ps, pc) {
      if (job == "farmer") {
        game.resources.food.ps -= (game.citizens.farmers.num * game.citizens.farmers.ps);
        console.log((game.citizens.farmers.num * game.citizens.farmers.ps));
        game.resources.food.pc -= (game.citizens.farmers.num * game.citizens.farmers.pc);
        game.citizens.farmers.ps *= ps;
        game.citizens.farmers.pc *= pc;
        game.resources.food.ps += (game.citizens.farmers.num * game.citizens.farmers.ps);
        game.resources.food.pc += (game.citizens.farmers.num * game.citizens.farmers.pc);
      }
      if (job == "miner") {
        game.resources.prod.ps -= (game.citizens.miners.num * game.citizens.miners.ps);
        console.log((game.citizens.farmers.num * game.citizens.farmers.ps));
        game.resources.prod.pc -= (game.citizens.miners.num * game.citizens.miners.pc);
        game.citizens.miners.ps *= ps;
        game.citizens.miners.pc *= pc;
        game.resources.prod.ps += (game.citizens.miners.num * game.citizens.miners.ps);
        game.resources.prod.pc += (game.citizens.miners.num * game.citizens.miners.pc);
      }
    };

    var setBuildings = function() {
      var buildingContainer = $('.buildings-container');
      buildingContainer.html("");

      for (var i = 0; i < game.buildings.length; i++) {
        if (game.buildings[i].visible == true) {
          if (game.buildings[i].misc === null) { game.buildings[i].misc = "_" };
          if (game.buildings[i].misc2 == null) { game.buildings[i].misc2 = "_" };
          if (game.purchaseMode == false) {
            // I KNOW THE +1 IS REALLY FUCKING WEIRD
            if (game.buildings[i].prod >= game.resources.prod.total + 1) {
              buildingContainer.append("<div class='row'><div data-button='build' data-building='" + game.buildings[i].name + "' class='locked'>Build " + game.buildings[i].name + " " + i + "</div><div>" + game.buildings[i].num + "</div><div>" + abbrNum(game.buildings[i].prod, 2) + "</div><div class='misc-cost'>" + game.buildings[i].misc + "</div><div class='misc-cost'>" + game.buildings[i].misc2 + "</div><div class='effect'>" + game.buildings[i].effect + "</div><div class='description'>" + game.buildings[i].description + "</div></div>");
            } else {
              buildingContainer.append("<div class='row'><div data-button='build' data-building='" + game.buildings[i].name + "'>Build " + game.buildings[i].name + " " + i + "</div><div>" + game.buildings[i].num + "</div><div>" + abbrNum(game.buildings[i].prod, 2) + "</div><div class='misc-cost'>" + game.buildings[i].misc + "</div><div class='misc-cost'>" + game.buildings[i].misc2 + "</div><div class='effect'>" + game.buildings[i].effect + "</div><div class='description'>" + game.buildings[i].description + "</div></div>");
            }

          }
          else {

              buildingContainer.append("<div class='row'><div data-button='build' data-building='" + game.buildings[i].name + "'>Build " + game.buildings[i].name + " " + i + "</div><div>" + game.buildings[i].num + "</div><div>" + abbrNum(game.buildings[i].cost, 2) + "</div><div class='misc-cost'>" + game.buildings[i].misc + "</div><div class='misc-cost'>" + game.buildings[i].misc2 + "</div><div class='effect'>" + game.buildings[i].effect + "</div><div class='description'>" + game.buildings[i].description + "</div></div>");


          }
        }
      }

      $("[data-button='build']").click(function(){
        var b = $(this).data('building');

        for (var i = 0; i < game.buildings.length; i++) {
          if (game.buildings[i].name == b) {
            // manage costs
            if (game.purchaseMode == false) {
              if (game.buildings[i].prod <= game.resources.prod.total) {
                if (i == 4) {
                  if (game.resources.stone.total >= 2) {
                    game.resources.stone.total -= 2;
                  } else {
                    alert("You don't have enough stones!");
                    break;
                  }
                }
                if (i == 3) {
                  if (game.resouces.spices.total >= 10) {
                    game.resources.spices.total -= 10;
                  } else {
                    alert("You don't have enough spices!");
                    break;
                  }
                }
                game.buildings[i].num += 1;
                game.resources.prod.total -= game.buildings[i].prod;
                game.buildings[i].prod = Math.floor(game.buildings[i].prod + Math.log(game.buildings[i].prod));

                buildingContainer.html("");
                setBuildings();
                checkBuildings();
                updateResources();
              } else {
                alert("Not enough production resources!");
              }
            }
            else {
              if (game.buildings[i].cost <= game.empire.cash) {
                game.buildings[i].num += 1;
                game.empire.cash -= game.buildings[i].cost;

                buildingContainer.html("");
                setBuildings();
                checkBuildings();
                updateResources();
              }
              else {
                alert("Not enough cash!");
              }
            }

          }
        }



      });


    };
    setBuildings();

    var checkBuildings = function() {
      // Hut
      game.empire.happiness += (1 * ((game.buildings[0].num - game.buildings[0].numApplied)));
      // Granary
      game.resources.food.max += (200 * (game.buildings[1].num - game.buildings[1].numApplied));
      //game.resources.food.ps += (1 * (game.buildings[1].num - game.buildings[1].numApplied));
      // Quarry
      game.resources.prod.max += (100 * (game.buildings[2].num - game.buildings[2].numApplied));
      // Temple
      game.faith.pm += (game.buildings[3].num - game.buildings[3].numApplied);
      // Library
      game.tech.researchFromBuildings += (5 * (game.buildings[4].num - game.buildings[4].numApplied));
      // Walls
      game.military.defense += (5 * (game.buildings[5].num - game.buildings[5].numApplied));
      // Ampitheatre
      game.culture.pm += (1 * (game.buildings[7].num - game.buildings[7].numApplied));
      // Colosseum
      game.empire.happiness += (3 * (game.buildings[11].num - game.buildings[11].numApplied));
      // Workshop
      game.resources.prod.max += (500 * (game.buildings[13].num - game.buildings[13].numApplied));
      game.resources.prod.ps += (2 * (game.buildings[13].num - game.buildings[13].numApplied));

      for (var i = 0; i < game.buildings.length; i++) {
        game.buildings[i].numApplied = game.buildings[i].num;
      }

    };
    checkBuildings();

    var setWonders = function() {
      var section = $('.wonders-container');
      section.html('');

      for (var i = 0; i < game.wonders.length; i++) {
        if (game.wonders[i].visible) {
          if (!game.wonders[i].built) {
            var ot = [60, 145, 360, 450, 495, 515, 1020, 1320, 1500, 2220, 2000, 1800, 2100, 2500, 2300, 2770, 2860];
            var percent = (((ot[i] - game.wonders[i].time) / ot[i]) * 100) + '%';

            section.append("<div class='row wonder'><img class='wonder-img' src='img/" + game.wonders[i].img + ".png' /><div data-button='wonder' data-n='" + i + "' data-time='" + game.wonders[i].time + "' style='background: linear-gradient(to right, #7BDE2A " + percent + ", #eee " + percent + ", #eee);'>Build " + game.wonders[i].name + "</div> <span class='time'>" + time(game.wonders[i].time) + "</span><span class='req'>" + game.wonders[i].required + "</span><span class='effect'>" + game.wonders[i].effect + "</span><span class='description'>" + game.wonders[i].description + "</span></div>");
          } else {
            section.append("<div class='row wonder'><img class='wonder-img' src='img/" + game.wonders[i].img + ".png' /><div data-button='wonder' data-n='" + i + "' data-time='" + game.wonders[i].time + "'>" + game.wonders[i].name + "</div> <span class='time'>DONE</span><span class='req'>" + game.wonders[i].required + "</span><span class='effect'>" + game.wonders[i].effect + "</span><span class='description'>" + game.wonders[i].description + "</span></div>");
          }
        }


      }

      $("[data-button='wonder']").click(function(){
        var n = $(this).attr('data-n');
        var t = $(this).attr('data-time');
        //note(game.wonders[0].time);

        var percent = (((t - game.wonders[n].time) / t) * 100);
        $("[data-button] progress").val(percent);

        //buildWonder(n);
        if (!game.wonders[n].progress) {

          if (n == 0 && game.resources.stone.total >= 10) {
            game.resources.stone.total -= 10;
            setInterval(function(){
              if (game.wonders[n].time > 0 && !game.wonders[n].built) {
                game.wonders[n].time -= 1;

                game.wonders[n].progress = true;
                setWonders();
              } else if (game.wonders[n].time == 0 && !game.wonders[n].built) {
                note(game.wonders[n].name + " has been built!");
                game.wonders[n].built = true;
                setWonders();
              } else {

              }
            }, 1000);
          } else {
            alert("Not enough stone!");
          }

          if (n == 1 && game.resources.stone.total >= 25) {
            game.resources.stone.total -= 25;
            setInterval(function(){
              if (game.wonders[n].time > 0 && !game.wonders[n].built) {
                game.wonders[n].time -= 1;

                game.wonders[n].progress = true;
                setWonders();
              } else if (game.wonders[n].time == 0 && !game.wonders[n].built) {
                note(game.wonders[n].name + " has been built!");
                game.wonders[n].built = true;
                setWonders();
                checkWonders();
              } else {

              }
            }, 1000);
          } else {
            alert("Not enough stone!");
          }

        } else if (game.wonders[n].progress && !game.wonders[n].built) {
          alert("You are already in the middle of building that wonder!");
        }
          else if (game.wonders[n].progress && game.wonders[n].built) {
          alert("You already built that wonder!");
        }



      });

    };
    setWonders();

    var checkWonders = function(){
      for (var i = 0; i < game.wonders.length; i++) {
        if (game.wonders[i].built && !game.wonders[i].active) {
          if (i == 0) {
            game.faith.pm += 3;
          }

          game.wonders[i].active = true;
        }
      }
    };






    var setCulturalUpgrades = function(){
      var section = $(".cultural-upgrades");
      section.html('');

      for (var i = 0; i < game.culture.upgrades.length; i++) {
        if (game.culture.upgrades[i].visible) {
          if (game.culture.upgrades[i].unlocked) {
            section.append("<div class='hint--top unlocked culture-" + game.culture.upgrades[i].type + "' data-n='" + i + "' data-hint='" + game.culture.upgrades[i].effect + "' data-button='culture-purchase' data-name='" + game.culture.upgrades[i].name + "'><img src='img/" + game.culture.upgrades[i].img + ".png' /> <img  class='hidden' src='img/culture.png' /><span class='culture-cost'>" + game.culture.upgrades[i].cost + "</span>  " + game.culture.upgrades[i].name + "</div>");
          } else {
            section.append("<div class='hint--top culture-" + game.culture.upgrades[i].type + "' data-n='" + i + "' data-hint='" + game.culture.upgrades[i].effect + "' data-button='culture-purchase' data-name='" + game.culture.upgrades[i].name + "'><img src='img/" + game.culture.upgrades[i].img + ".png' /> <img  class='hidden' src='img/culture.png' /><span class='culture-cost'>" + game.culture.upgrades[i].cost + "</span>  " + game.culture.upgrades[i].name + "</div>");
          }
        }
      }

      $("[data-button='culture-purchase']").click(function(){
        var n = $(this).attr('data-n');
        if (game.culture.total >= game.culture.upgrades[n].cost) {

          game.culture.total -= game.culture.upgrades[n].cost;
          game.culture.upgrades[n].unlocked = true;
          setCulturalUpgrades();
          if (!game.culture.upgrades[n].activated) {
            if (n == 0) {
              game.military.strength += 2;
            }

            game.culture.upgrades[n].activated = true;
          } else {
            alert("You already activated that culture purchase!");
          }
        } else {
          alert("You don't have enough culture to purchase this upgrade!");
        }
      });
    };
    setCulturalUpgrades();

    var setFaithUpgrades = function() {
      var section = $(".faith-upgrades");
      var cost = 10;

      for (var i = 0; i < game.faith.upgrades.length; i++) {

        $(".faith-upgrades." + game.faith.upgrades[i].level).append("<div data-button='faith-upgrade'><img src='img/faith.png' /> <strong>" + (cost * game.faith.upgrades[i].costMult) + "</strong> " + game.faith.upgrades[i].name + "&nbsp;&nbsp;&nbsp;<em class='faith-upgrade-effect'>" + game.faith.upgrades[i].effect + "</em></div>");
      }
    };
    setFaithUpgrades();

    var checkFaithUpgrades = function() {

    };
    checkFaithUpgrades();

    var updateStrength = function() {
      game.military.strength = 10;
      game.military.strength += (game.military.army[0].num * game.military.army[0].strength) * game.military.strengthMod;

    };

    var enableMercenaries = function() {
      $("[data-button='hire-mercenary']").removeClass('hidden');
      $("[data-button='hire-mercenary']").click(function(){
        if (game.empire.cash >= 1000) {
          game.empire.cash -= 1000;
          game.citizens.soldiers.num += 1;
          $("[data-job-total='soldier']").text(game.citizens.soldiers.num);
          $(".soldier-assign input").attr('max', game.citizens.soldiers.num);
          updateResources();
        } else {
          note("You don't have enough cash to hire a Mercenary!");
        }

      });
    };

    $("#economy").change(function(){
      var choice = $("#economy option:selected").text();
      if (choice == "Communism") {
          $("body").css("backgroundColor", "#F03A3A");
          $("section").css("backgroundColor", "white");
          $(".economy-description").text("Allows you to earn the highest Marx.")
      }
    });

    // $(document).ready(function() {
    //   //Tipped.create('[data-resource="fish"]', 'Fish add .5 <img src="img/health.png" /> per Fish and are sought after by many desert nations.');
    //   Tipped.create('[data-resource="fish"]', function() {
    //     var health = game.resources.fish.healthBonus;
    //     return "<img src='img/fish.png' /> add " + health + " <img src='img/health.png' /> per <img src='img/fish.png' /> and are sought after by many desert nations.";
    //   }, {
    //     cache: false
    //   });
    //
    //   Tipped.create('[data-button="anger"]', '<ul><li>From Citizens (+10)</li><li>From Buildings (+3)</li></ul>');
    //
    //
    //   Tipped.create('[data-resource="banana"]', 'Banana adds 1 <img src="img/health.png" />.', {skin: 'light'});
    // });





  }


};

game.init();











//
// var game = {
//   achievements: [
//     ['click1', 'Noob: click once.', 'locked'],
//     ['click2', 'Less noob: click 10 times.', 'locked'],
//     ['click3', 'Click 100 times.', 'locked'],
//     ['click4', 'Click 1K times', 'locked'],
//     ['click5', 'Click 10K times', 'locked'],
//     ['click6', 'Click 666666 times', 'locked'],
//     ['click7', 'Click 7777777 times', 'locked'],
//     ['pop1', 'Childbirth: Grow pop. once.', 'locked'],
//     ['pop2', 'Boomtown: Grow pop. ten times', 'locked'],
//     ['pop3', 'Megapolis: Grow pop. 100 times', 'locked'],
//     ['pop4', 'Mexico City: Grow pop. 1k times', 'locked'],
//     ['faith1', 'Devout follower: Gain 10 Faith', 'locked']],
//   // Ancient, Classical, Medieval, Renaissance, Industrial, Modern, Atomic, Information, Space
//
//   unlockAchievement: function(n) {
//     game.achievements[n][2] == "unlocked";
//     game.displayNote("Achievement unlocked! " + game.achievements[n][1]);
//   },
//
//   generateAchievements: function() {
//     var aH = "";
//     var aC = document.getElementById("achievementsContainer");
//     for (var i = 0; i < game.achievements.length; i++) {
//       //achievementHTML += game.achievements[i][0];
//
//       aH += "<div class='achievement hint--bottom " + game.achievements[i][2] + " " + game.achievements[i][0] + "' data-hint=" + game.achievements[i][1] + "></div>";
//     }
//     //console.log(aH);
//     aC.innerHTML = aH;
//   }
// }
