import { updatePopulation } from './population';
import { citizens, resources } from '../data';
import {
  Civilization,
  Collection,
  Building,
  notify,
  Resource,
  Soldier,
  Citizen
} from '../classes';
import { Utils } from './utils';

let u = new Utils();

function choose(arr:any[]):any {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface ClickopolisEvent {
  func: Function;
  rarity: 'rare' | 'uncommon' | 'common';
}

const Events:ClickopolisEvent[] = [
  {
    func: (options) => {
      let banana = options.resources.get('banana');
      if (banana.unlocked) {
        banana.total += 1;
      }
    },
    rarity: 'rare'
  },
  {
    func: (options) => {
      let mienrs = options.citizens.get('miner');
      let gems = options.resources.get('gems');
      if (gems.unlocked) {
        gems.total += 1;
      }
    },
    rarity: 'rare'
  },
  {
    func: (options) => {
      let miners = options.citizens.get('miner');
      let gold = options.resources.get('gold');
      if (gold.unlocked) {
        gold.total += miners.amount;
      }
    },
    rarity: 'rare'
  },
  {
    func: (options) => {
      let miners = options.citizens.get('miner');
      let silver = options.resources.get('silver');
      if (silver.unlocked) {
        silver.total += miners.amount;
      }
    },
    rarity: 'rare'
  },
  {
    func: (options) => {
      if (options.playerCiv.population > 10 && (options.playerCiv.pollution / 2 > options.playerCiv.health)) {
        updatePopulation(-1, options.playerCiv, options.game, options.citizens, options);
      }
      notify({ message: `The pollution in your Empire is overwhelming! The flue has decimated your population. -5 Pop.`, icon: 'pollution' });
    },
    rarity: 'rare'
  },
  {
    func: function (options) {
      let horse = options.resources.get('horse');
      if (horse.unlocked) {
        horse.total += 1;
      }
    },
    rarity: 'uncommon'
  },
  {
    func: (options) => {
      let spices = options.resources.get('spices');
      let wooductters = options.citizens.get('woodcutter');
      if (spices.unlocked) {
        spices.total += wooductters.amount;
      }
    },
    rarity: 'uncommon'
  },
  {
    func: (options) => {
      let marble = options.resources.get('marble');
      let quarries = options.buildings.get('Quarry').amount;
      if (marble.unlocked) {
        marble.total += quarries;
      }
    },
    rarity: 'uncommon'
  },
  {
    func: (options) => {
      let cattle = options.resources.get('cattle');
      if (cattle.unlocked) {
        cattle.total += 1;
      }
    },
    rarity: 'common'
  },
  {
    func: (options) => {
      if (options.playerCiv.pollution > options.playerCiv.health) {
        updatePopulation(-1, options.playerCiv, options.game, options.citizens, options);
      }
      notify({ message: `Due to the pollution of your Empire, several citizens died! -1 Pop.`, icon: 'pollution' });
    },
    rarity: 'common'
  },
  {
    func: (options) => {
      let wood = options.resources.get('wood');
      let woodcutters = options.citizens.get('woodcutter');
      wood += woodcutters * 10;
    },
    rarity: 'common'
  },
  {
    func: (options) => {
      let stone = options.resources.get('stone');
      let miners = options.citizens.get('miner');
      if (stone.unlocked) {
        stone.total += miners.amount;
      }
    },
    rarity: 'common'
  },
];

const filterEvents = function(rarity:string) {
  return Events.filter((value) => {
    return value.rarity === rarity;
  });
}

interface RollEventOptions {
  playerCiv: Civilization;
  resources: Collection<Resource>;
  citizens: Collection<Citizen>;
  buildings: Collection<Building>;
  game: any;
  military: Collection<Soldier>;
  isWindowActive: boolean;
}

export function rollEvent(options:RollEventOptions) {
  let roll = Math.floor(Math.random() * 100);
  let cb;

  console.log(roll);

  if (roll <= 10) {
    cb = choose(filterEvents('rare'));
    console.log(cb);
  } else if (10 < roll && roll <= 35) {
    cb = choose(filterEvents('uncommon'));
    console.log(cb);
  } else if (35 < roll && roll <= 100) {
    cb = choose(filterEvents('common'));
    console.log(cb);
  }

  cb.func(options);
}
