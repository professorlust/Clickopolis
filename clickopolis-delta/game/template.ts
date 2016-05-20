import Game = require('./game');
import Civilization = require('./civilization');
import Resource = require('./resource');
import Resources = require('./resources');
import Utils = require('./utils');

let u = new Utils();

class Templates {

  createStartScreen(playerCiv:Civilization, game:Game) {

    let startScreen = `
      <section class='clickopolis-intro'>
        <h1><img class='clickopolis-logo custom-size-img' alt='Clickopolis' src='img/clickopolis-logo.png'></h1>
        <div class="start-options">
          <button class="large-btn start-btn load-btn">Load Game...</button>
          <button class="large-btn start-btn new-btn">New Game</button>
          <button class="large-btn start-btn current-btn">
            <p class="current-game-heading">Current Game: ${playerCiv.leaderName} of ${playerCiv.civName}</p>
            <p class='center-text'>${game.era} era</p>
            <p>
              <span>
                <img src="img/achievements.png"> 5
              </span>
              <span>
                <img src="img/strength.png"> 33
              </span>
              <span>
                <img src="img/defense.png"> 44
              </span>
              <span>
                <img src="img/legacy.png"> 2
              </span>
              <span>
                <img src="img/coin.png"> 1K
              </span>
              <span>
                <img src="img/wonder.png"> 1
              </span>
            </p>
          </button>
        </div>
        <!-- <button class='next-btn'>Next &rarr;</button> -->
      </section>
    `;
    return startScreen;
  };

  settingsScreen:string = `
    <section class='clickopolis-intro'>
      <img class='clickopolis-logo custom-size-img' src='img/clickopolis-logo.png'>
      <p>Starting from the flames of the ancient world, you will progress steadily towards modernity&hellip;and beyond. You, the leader of a small faction of hunter-gatherers, have decided to settle
        <select id="location">
          <option value="none">select an option!</option>
          <option value="coast">by the Coast</option>
          <option value="oasis">in an Oasis</option>
          <option value="forest">in a Forest</option>
          <option value="tundra">in a Tundra</option>
          <option value="iceberg">on an Iceberg</option>
        </select>
      </p>
      <p>Your name is <input type="text" id="leaderName" maxlength="10" size="10" placeholder="Jake"> of <input type="text" id="civName" placeholder="Jaketopia" maxlength="20"></p>
      <p>You are a(n)
        <select id="trait">
          <option value="aggressive">aggressive</option>
          <option value="cosmpolitan">cosmpolitan</option>
          <option value="daring">daring</option>
          <option value="expansionist">expansionist</option>
          <option value="industrious">industrious</option>
          <option value="isolationist">isolationist</option>
          <option value="pacifistic">pacifistic</option>
          <option value="persuasive">persuasive</option>
        </select>
       leader.</p>

       <button class='begin-btn'>Begin Game!</button>

    </section>
  `;

  createResourcesScreen(playerCiv:Civilization, resources:Resources) {
    let resourcesScreen = `
      <section class='screen resources-screen' id='resources'>
        <h2><img src='img/resources.png'> Resources</h2>
        <section class='resources-screen-inner'>
          <div class='panel food-panel'>
            <button class='food-btn'><img src='img/food-alt.png'> Grow Food</button>

            <span class='resource-info r-food-pc'>${resources.get('food').perClick} PC</span>
            <span class='resource-info r-food-ps'>${resources.get('food').perSecond} PS</span>
            <span class='resource-info r-food-max'>${resources.get('food').max} max</span>
            <span class='resource-info r-food-total'>${resources.get('food').total} total</span>

          </div>
          <div class='panel prod-panel'>
            <button class='prod-btn'><img src='img/prod.png'> Create Production</button>

            <span class='resource-info'>${resources.get('prod').perClick} PC</span>
            <span class='resource-info'>${resources.get('prod').perSecond} PS</span>
            <span class='resource-info'>${resources.get('prod').max} max</span>
            <span class='resource-info r-prod-total'>${resources.get('prod').total} total</span>

          </div>

          <div class='panel location-panel'>
            <p>Biome (${playerCiv.location}) Bonus: +10% <img src='img/food.png'> PC</p>
          </div>


          <div class='panel resources-panel'>
            <span class='resource'>
              <img src='img/health.png'> Health
            </span>

            <span class='resource' data-resource='fish'>
              <img src='img/fish.png'> <span>${resources.get('fish').total}</span>
            </span>

            <span class='resource' data-resource='banana'>
              <img src='img/banana.png'> <span>22</span>
            </span>

            <br>

            <span class='resource'>
              <img src='img/buildings.png'> Building
            </span>

            <span class='resource' data-resource='stone'>
              <img src='img/stone.png'> <span>25</span>
            </span>

            <span class='resource' data-resource='iron'>
              <img src='img/iron.png'> <span>22</span>
            </span>



            <br>

            <span class='resource'>
              <img src='img/cavalry.png'> Strategic
            </span>

            <span class='resource' data-resource='horse'>
              <img src='img/horse.png'> <span>35</span>
            </span>

            <span class='resource' data-unlocked='false' data-resource='oil'>
              <img src='img/oil.png'> <span>22</span>
            </span>

            <span class='resource' data-resource='uranium'>
              <img src='img/uranium.png'> <span>22</span>
            </span>

            <br>

            <span class='resource'>
              <img src='img/crown.png'> Luxury
            </span>

            <span class='resource' data-resource='spices'>
              <img src='img/spices.png'> <span>15</span>
            </span>

            <span class='resource' data-resource='gold'>
              <img src='img/gold.png'> <span>0</span>
            </span>

            <span class='resource' data-resource='gems'>
              <img src='img/gems.png'> <span>34</span>
            </span>

            <br>

            <span class='resource'>
              <img src='img/illuminati.png'> Power
            </span>

            <span class='resource' data-resource='spaghetti'>
              <img src='img/spaghetti.png'> 22
            </span>

            <span class='resource' data-resource='chihuahua'>
              <img src='img/chihuahua.png'> 2
            </span>

          </div>



        </section>
        <br>
        <section class='resource-screen-inner resource-info-screen'>
          <p></p>
        </section>
      </section>
    `;
    return resourcesScreen;
  }



  createScreenHeader(playerCiv:Civilization, game:Game):string {
    let screenHeader = `
      <header class='screen-header'>
        <h1>Clickopolis</h1>
        <h2>${playerCiv.leaderName} of ${playerCiv.civName} &mdash; ${game.era} era &mdash; <span class='game-year-text'>${game.year}</span> AC</h2>
      </header>
    `;
    return screenHeader;
  }

  createCitizenScreen(playerCiv:Civilization):string {
    let citizensScreen = `
      <section class='screen citizens-screen' id='citizens'>
        <h2><img src='img/citizens.png'> Citizens</h2>
        <section class='citizens-screen-inner'>
          <p class='center-text'>Each citizen provides 1 <img src='img/coin.png'>, 2 <img src='img/research.png'>, 1 <img src='img/angry.png'>, and 1 <img src='img/pollution.png'></p>
          <p class='center-text'>Each citizen also consumes 1 <img src='img/food.png'> PS</p>
          <div class='row citizen-farmer'>
            <button data-citizien-amount='-1'>-1</button>
            <span class='citizen-icon'><img src='img/farmer.png'></span>
            <button data-citizen-amount='1'>+1</button>
            <span class='citizen-info'>
              Farmers: <strong>12</strong> | Farmers provide +1 <img src='img/food.png'> PC and +.2 PC.
            </span>
          </div>
          <div class='row citizen-miner'>
            <button data-citizien-amount='-1'>-1</button>
            <span class='citizen-icon'><img src='img/miner.png'></span>
            <button data-citizen-amount='1'>+1</button>
            <span class='citizen-info'>
              Miners: <strong>14</strong> | Miners provide +1 <img src='img/prod.png'> PC and +.2 PC.
            </span>
          </div>
          <div class='row citizen-soldier'>
            <button data-citizien-amount='-1'>-1</button>
            <span class='citizen-icon'><img src='img/soldier-alt.png'></span>
            <button data-citizen-amount='1'>+1</button>
            <span class='citizen-info'>
              Soldiers: <strong>3</strong> | Soldiers defend and fight for your empire. -3 <img src='img/coin.png'>
            </span>
          </div>
        </section>
      </section>
    `;
    return citizensScreen;
  }

  createCivilizationScreen(playerCiv:Civilization):string {
    let civilizationScreen = `
      <section class='screen civilization-screen' id='civilization'>
        <h2><img src='img/empire.png'> Civilization</h2>
        <section class='civilization-screen-inner'>
          <div class='panel population-panel'>
            <button class='pop-btn'>+1 Population (<img src='img/food.png'> <span class='pop-growth-cost'>${playerCiv.populationGrowthCost}</span>)</button>
            <span class='civ-metric metric-population' title='${playerCiv.populationReal + ' people'}'>Population: <img src='img/citizen.png'> <span class='population-text'>${playerCiv.population}</span></span>
          </div>
          <div class='panel civ-metric-panel'>
            <span class='civ-metric metric-happiness'>
              <img src='img/happy.png'> ${playerCiv.happiness}
            </span>
            <span class='civ-metric metric-anger'>
              <img src='img/angry.png'> ${playerCiv.anger}
            </span>
            <span class='civ-metric metric-health'>
              <img src='img/health.png'> ${playerCiv.health}
            </span>
            <span class='civ-metric metric-pollution'>
              <img src='img/pollution.png'> ${playerCiv.pollution}
            </span>
            <span class='civ-metric metric-influence'>
              <img src='img/influence.png'> ${playerCiv.influence}
            </span>
            <span class='civ-metric metric-golden-age'>
              <img src='img/golden-age.png'> Golden Age Points <span class='golden-age-progress'>${playerCiv.goldenAgeProgress}</span> / <span class='golden-age-goal'>${u.abbrNum(playerCiv.goldenAgeGoal, 2)}</span>
            </span>
          </div>
        </section>
      </section>
    `;
    return civilizationScreen;
  }

  createEconomyScreen(playerCiv:Civilization) {
    let economyScreen = `
      <section class='screen economy-screen' id='economy'>
        <h2><img src='img/money.png'> Economy</h2>
        <section class='economy-screen-inner'>
          <div class='total-cash'>
            <img src='img/coin.png'> <span class='cash-text'>${playerCiv.cash}</span>
          </div>
          <span class='cash-breakdown'>
            <span class='cash-item'>From Workers: <span class='cash-from-workers'>23</span></span>
            <span class='cash-item'>From Trade Routes: <span class='cash-from-routes'>45</span></span>
            <span class='cash-item'>From Buildings: <span class='cash-from-buildings'>12</span></span>
            <span class='cash-item'>From Military: <span class='cash-from-military'>24</span></span>
            <span class='cash-item cash-item-total'>Per Minute: <span class='cash-PM'>25</span></span>
          </span>
          <div class='trade-deal-history'>
            <table>
              <tr>
                <td colspan='4'><img src='img/trade-deal.png'> Trade Deal History</td>
              </tr>
              <tr>
                <td>Nation</td>
                <td>Gave...</td>
                <td>For...</td>
                <td>Year</td>
              </tr>
              <tr>
                <td>Ulonia</td>
                <td>10 <img src='img/horse.png'></td>
                <td>5 <img src='img/gold.png'></td>
                <td>25 AC</td>
              </tr>
            </table>


          </div>
        </section>
      </section>
    `;
    return economyScreen;
  }

  createBuildingsScreen() {
    let buildingsScreen = `
      <section class='screen buildings-screen' id='buildings'>
        <h2><img src='img/buildings.png'> Buildings</h2>
        <section class='buildings-screen-inner'>
          <div class='panel buildings-mode'>
            <button class='purchase-mode-btn'>Purchase Mode</button>
          </div>
        </section>
        <section class='buildings-screen-inner'>
          <div class='building'>
            <span class='building-total' title='how many you own'>0</span>
            <span class='building-cost'><span class='building-cost-text'>15</span> <img src='img/prod.png'></span>
            <span class='building-name'>Hut</span>
            <span class='building-description'>A simple hut. Could use air conditioning.</span>
            <span class='building-effect'>+1 <img src='img/happy.png'></span>
          </div>
          <div class='building'>
            <span class='building-total' title='how many you own'>0</span>
            <span class='building-cost'><span class='building-cost-text'>25</span> <img src='img/prod.png'></span>
            <span class='building-name'>Granary</span>
            <span class='building-description'>A granary for storing food.</span>
            <span class='building-effect'>+200 <img src='img/food.png'> Max</span>
          </div>
        </section>
      </section>
    `;
    return buildingsScreen;
  }

  createTechnologyScreen(playerCiv:Civilization) {
    let technologyScreen = `
      <section class='screen technology-screen' id='technology'>
        <h2><img src='img/research.png'> Technology</h2>
        <section class='technology-screen-inner'>
          <div class='center-text current-research'>Currently researching towards: <span class='researching-techs'>Mining</span></div>
          <div class='center-text research-exceeding'></div>
          <span class='research-text r-text'>${playerCiv.research}</span>
          <div class='research-progress-bar'></div>
          <span class='research-cost-text r-text'>${playerCiv.researchCost}</span>
        </section>
        <section class='technology-screen-inner search'>
          <input type='search' placeholder='filter...'>
          <span class='research-filters'>
            <label><input type='checkbox'>Show Unavailable Techs</label><br>
            <label><input type='checkbox'>Show Purchased Techs</label>
          </span>
        </section>
        <section class='technology-screen-inner technologies'>
          <div class='tech' data-tech='agriculture'>
            <span class='tech-name'>Agriculture</span>
            <span class='tech-description'>This is a description</span>
            <ul class='tech-list'>
              <li>+.2 <img src='img/food.png'> PS per farmer</li>
              <li>Unlocks: Animal Husbandry, Mining</li>
            </ul>
          </div>

          <div class='tech active' data-tech='mining'>
            <span class='tech-name'>Mining</span>
            <span class='tech-description'>This is a description</span>
            <ul class='tech-list'>
              <li>+.2 <img src='img/prod.png'> PS per miner</li>
              <li>Unlocks: Masonry, Pottery</li>
            </ul>
          </div>
        </section>
      </section>
    `;
    return technologyScreen;
  }


  createDiplomacyScreen(playerCiv:Civilization) {
    let diplomacyScreen = `
    <section class='screen diplomacy-screen' id='diplomacy'>
      <h2>
        <img src='img/deal.png'> Diplomacy
      </h2>
      <section class='diplomacy-screen-inner'>
        <div class='diplomacy-summary'>
          Nations Met: <span class='nations-met-text'>25</span>
        </div>
      </section>
    </section>
    `;
    return diplomacyScreen;
  }



  createSettingsScreen() {
    let settingsScreen = `
      <section class='screen settings-screen' id='settings'>
        <h2>
          <img src='img/gear.png'> Settings
        </h2>
        <section class='settings-screen-inner'>

        </section>
      </section>
    `;
    return settingsScreen;
  }


}

export = Templates;
