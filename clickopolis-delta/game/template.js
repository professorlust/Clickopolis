"use strict";
var Utils = require('./utils');
var u = new Utils();
var Templates = (function () {
    function Templates() {
        this.settingsScreen = "\n    <section class='clickopolis-intro'>\n      <img class='clickopolis-logo custom-size-img' src='img/clickopolis-logo.png'>\n      <p>Starting from the flames of the ancient world, you will progress steadily towards modernity&hellip;and beyond. You, the leader of a small faction of hunter-gatherers, have decided to settle\n        <select id=\"location\">\n          <option value=\"none\">select an option!</option>\n          <option value=\"coast\">by the Coast</option>\n          <option value=\"oasis\">in an Oasis</option>\n          <option value=\"forest\">in a Forest</option>\n          <option value=\"tundra\">in a Tundra</option>\n          <option value=\"iceberg\">on an Iceberg</option>\n        </select>\n      </p>\n      <p>Your name is <input type=\"text\" id=\"leaderName\" maxlength=\"10\" size=\"10\" placeholder=\"Jake\"> of <input type=\"text\" id=\"civName\" placeholder=\"Jaketopia\" maxlength=\"20\"></p>\n      <p>You are a(n)\n        <select id=\"trait\">\n          <option value=\"aggressive\">aggressive</option>\n          <option value=\"cosmpolitan\">cosmpolitan</option>\n          <option value=\"daring\">daring</option>\n          <option value=\"expansionist\">expansionist</option>\n          <option value=\"industrious\">industrious</option>\n          <option value=\"isolationist\">isolationist</option>\n          <option value=\"pacifistic\">pacifistic</option>\n          <option value=\"persuasive\">persuasive</option>\n        </select>\n       leader.</p>\n\n       <button class='begin-btn'>Begin Game!</button>\n\n    </section>\n  ";
    }
    Templates.prototype.createStartScreen = function (playerCiv, game) {
        var startScreen = "\n      <section class='clickopolis-intro'>\n        <h1><img class='clickopolis-logo custom-size-img' alt='Clickopolis' src='img/clickopolis-logo.png'></h1>\n        <div class=\"start-options\">\n          <button class=\"large-btn start-btn load-btn\">Load Game...</button>\n          <button class=\"large-btn start-btn new-btn\">New Game</button>\n          <button class=\"large-btn start-btn current-btn\">\n            <p class=\"current-game-heading\">Current Game: " + playerCiv.leaderName + " of " + playerCiv.civName + "</p>\n            <p class='center-text'>" + game.era + " era</p>\n            <p>\n              <span>\n                <img src=\"img/achievements.png\"> 5\n              </span>\n              <span>\n                <img src=\"img/strength.png\"> 33\n              </span>\n              <span>\n                <img src=\"img/defense.png\"> 44\n              </span>\n              <span>\n                <img src=\"img/legacy.png\"> 2\n              </span>\n              <span>\n                <img src=\"img/coin.png\"> 1K\n              </span>\n              <span>\n                <img src=\"img/wonder.png\"> 1\n              </span>\n            </p>\n          </button>\n        </div>\n        <!-- <button class='next-btn'>Next &rarr;</button> -->\n      </section>\n    ";
        return startScreen;
    };
    ;
    Templates.prototype.createResourcesScreen = function (playerCiv, resources) {
        var resourcesScreen = "\n      <section class='screen resources-screen' id='resources'>\n        <h2><img src='img/resources.png'> Resources</h2>\n        <section class='resources-screen-inner'>\n          <div class='panel food-panel'>\n            <button class='food-btn'><img src='img/food-alt.png'> Grow Food</button>\n\n            <span class='resource-info r-food-pc'>" + resources.get('food').perClick + " PC</span>\n            <span class='resource-info r-food-ps'>" + resources.get('food').perSecond + " PS</span>\n            <span class='resource-info r-food-max'>" + resources.get('food').max + " max</span>\n            <span class='resource-info r-food-total'>" + resources.get('food').total + " total</span>\n\n          </div>\n          <div class='panel prod-panel'>\n            <button class='prod-btn'><img src='img/prod.png'> Create Production</button>\n\n            <span class='resource-info'>" + resources.get('prod').perClick + " PC</span>\n            <span class='resource-info'>" + resources.get('prod').perSecond + " PS</span>\n            <span class='resource-info'>" + resources.get('prod').max + " max</span>\n            <span class='resource-info r-prod-total'>" + resources.get('prod').total + " total</span>\n\n          </div>\n\n          <div class='panel location-panel'>\n            <p>Biome (" + playerCiv.location + ") Bonus: +10% <img src='img/food.png'> PC</p>\n          </div>\n\n\n          <div class='panel resources-panel'>\n            <span class='resource'>\n              <img src='img/health.png'> Health\n            </span>\n\n            <span class='resource active' data-resource='fish'>\n              <img src='img/fish.png'> <span>" + resources.get('fish').total + "</span>\n            </span>\n\n            <span class='resource' data-resource='banana'>\n              <img src='img/banana.png'> <span>22</span>\n            </span>\n\n            <br>\n\n            <span class='resource'>\n              <img src='img/buildings.png'> Building\n            </span>\n\n            <span class='resource' data-resource='stone'>\n              <img src='img/stone.png'> <span>25</span>\n            </span>\n\n            <span class='resource' data-resource='iron'>\n              <img src='img/iron.png'> <span>22</span>\n            </span>\n\n\n\n            <br>\n\n            <span class='resource'>\n              <img src='img/cavalry.png'> Strategic\n            </span>\n\n            <span class='resource' data-resource='horse'>\n              <img src='img/horse.png'> <span>35</span>\n            </span>\n\n            <span class='resource' data-unlocked='false' data-resource='oil'>\n              <img src='img/oil.png'> <span>22</span>\n            </span>\n\n            <span class='resource' data-resource='uranium'>\n              <img src='img/uranium.png'> <span>22</span>\n            </span>\n\n            <br>\n\n            <span class='resource'>\n              <img src='img/crown.png'> Luxury\n            </span>\n\n            <span class='resource' data-resource='spices'>\n              <img src='img/spices.png'> <span>15</span>\n            </span>\n\n            <span class='resource' data-resource='gold'>\n              <img src='img/gold.png'> <span>0</span>\n            </span>\n\n            <span class='resource' data-resource='gems'>\n              <img src='img/gems.png'> <span>34</span>\n            </span>\n\n            <br>\n\n            <span class='resource'>\n              <img src='img/illuminati.png'> Power\n            </span>\n\n            <span class='resource' data-resource='spaghetti'>\n              <img src='img/spaghetti.png'> 22\n            </span>\n\n            <span class='resource' data-resource='chihuahua'>\n              <img src='img/chihuahua.png'> 2\n            </span>\n\n          </div>\n\n\n\n        </section>\n        <br>\n        <section class='resource-screen-inner resource-info-screen'>\n          <h3><img src='img/fish.png'> Fish<br></h3>\n          <p>Fish are caught in nets by citizens every now and then. Each fish provides +.5 <img src='img/health.png'> Fish are a popular trade item with Desert nations.</p>\n\n        </section>\n      </section>\n    ";
        return resourcesScreen;
    };
    Templates.prototype.createScreenHeader = function (playerCiv, game) {
        var screenHeader = "\n      <header class='screen-header'>\n        <h1>Clickopolis</h1>\n        <h2>" + playerCiv.leaderName + " of " + playerCiv.civName + " &mdash; " + game.era + " era &mdash; " + game.year + " AC</h2>\n      </header>\n    ";
        return screenHeader;
    };
    Templates.prototype.createCitizenScreen = function (playerCiv) {
        var citizensScreen = "\n      <section class='screen citizens-screen' id='citizens'>\n        <h2><img src='img/citizens.png'> Citizens</h2>\n        <section class='citizens-screen-inner'>\n          <p class='center-text'>Each citizen provides 1 <img src='img/coin.png'>, 2 <img src='img/research.png'>, 1 <img src='img/angry.png'>, and 1 <img src='img/pollution.png'></p>\n          <p class='center-text'>Each citizen also consumes 1 <img src='img/food.png'> PS</p>\n          <div class='row citizen-farmer'>\n            <button data-citizien-amount='-1'>-1</button>\n            <span class='citizen-icon'><img src='img/farmer.png'></span>\n            <button data-citizen-amount='1'>+1</button>\n            <span class='citizen-info'>\n              Farmers: <strong>12</strong> | Farmers provide +1 <img src='img/food.png'> PC and +.2 PC.\n            </span>\n          </div>\n          <div class='row citizen-miner'>\n            <button data-citizien-amount='-1'>-1</button>\n            <span class='citizen-icon'><img src='img/miner.png'></span>\n            <button data-citizen-amount='1'>+1</button>\n            <span class='citizen-info'>\n              Miners: <strong>14</strong> | Miners provide +1 <img src='img/prod.png'> PC and +.2 PC.\n            </span>\n          </div>\n          <div class='row citizen-soldier'>\n            <button data-citizien-amount='-1'>-1</button>\n            <span class='citizen-icon'><img src='img/soldier-alt.png'></span>\n            <button data-citizen-amount='1'>+1</button>\n            <span class='citizen-info'>\n              Soldiers: <strong>3</strong> | Soldiers defend and fight for your empire. -3 <img src='img/coin.png'>\n            </span>\n          </div>\n        </section>\n      </section>\n    ";
        return citizensScreen;
    };
    Templates.prototype.createCivilizationScreen = function (playerCiv) {
        var civilizationScreen = "\n      <section class='screen civilization-screen' id='civilization'>\n        <h2><img src='img/empire.png'> Civilization</h2>\n        <section class='civilization-screen-inner'>\n          <div class='panel population-panel'>\n            <button class='pop-btn'>+1 Population (<img src='img/food.png'> <span class='pop-growth-cost'>" + playerCiv.populationGrowthCost + "</span>)</button>\n            <span class='civ-metric metric-population' title='" + (playerCiv.populationReal + ' people') + "'>Population: <img src='img/citizen.png'> <span class='population-text'>" + playerCiv.population + "</span></span>\n          </div>\n          <div class='panel civ-metric-panel'>\n            <span class='civ-metric metric-happiness'>\n              <img src='img/happy.png'> " + playerCiv.happiness + "\n            </span>\n            <span class='civ-metric metric-anger'>\n              <img src='img/angry.png'> " + playerCiv.anger + "\n            </span>\n            <span class='civ-metric metric-health'>\n              <img src='img/health.png'> " + playerCiv.health + "\n            </span>\n            <span class='civ-metric metric-pollution'>\n              <img src='img/pollution.png'> " + playerCiv.pollution + "\n            </span>\n            <span class='civ-metric metric-influence'>\n              <img src='img/influence.png'> " + playerCiv.influence + "\n            </span>\n            <span class='civ-metric metric-golden-age'>\n              <img src='img/golden-age.png'> Golden Age Points <span class='golden-age-progress'>" + playerCiv.goldenAgeProgress + "</span> / <span class='golden-age-goal'>" + u.abbrNum(playerCiv.goldenAgeGoal, 2) + "</span>\n            </span>\n          </div>\n        </section>\n      </section>\n    ";
        return civilizationScreen;
    };
    Templates.prototype.createEconomyScreen = function (playerCiv) {
        var economyScreen = "\n      <section class='screen economy-screen' id='economy'>\n        <h2><img src='img/money.png'> Economy</h2>\n        <section class='economy-screen-inner'>\n          <div class='total-cash'>\n            <img src='img/coin.png'> <span class='cash-text'>" + playerCiv.cash + "</span>\n          </div>\n          <span class='cash-breakdown'>\n            <span class='cash-item'>From Workers: <span class='cash-from-workers'>23</span></span>\n            <span class='cash-item'>From Trade Routes: <span class='cash-from-routes'>45</span></span>\n            <span class='cash-item'>From Buildings: <span class='cash-from-buildings'>12</span></span>\n            <span class='cash-item'>From Military: <span class='cash-from-military'>24</span></span>\n            <span class='cash-item cash-item-total'>Per Minute: <span class='cash-PM'>25</span></span>\n          </span>\n          <div class='trade-deal-history'>\n            <table>\n              <tr>\n                <td colspan='4'><img src='img/trade-deal.png'> Trade Deal History</td>\n              </tr>\n              <tr>\n                <td>Nation</td>\n                <td>Gave...</td>\n                <td>For...</td>\n                <td>Year</td>\n              </tr>\n              <tr>\n                <td>Ulonia</td>\n                <td>10 <img src='img/horse.png'></td>\n                <td>5 <img src='img/gold.png'></td>\n                <td>25 AC</td>\n              </tr>\n            </table>\n\n\n          </div>\n        </section>\n      </section>\n    ";
        return economyScreen;
    };
    Templates.prototype.createBuildingsScreen = function () {
        var buildingsScreen = "\n      <section class='screen buildings-screen' id='buildings'>\n        <h2><img src='img/buildings.png'> Buildings</h2>\n        <section class='buildings-screen-inner'>\n\n        </section>\n      </section>\n    ";
        return buildingsScreen;
    };
    Templates.prototype.createTechnologyScreen = function (playerCiv) {
        var technologyScreen = "\n      <section class='screen technology-screen' id='technology'>\n        <h2><img src='img/research.png'> Technology</h2>\n        <section class='technology-screen-inner'>\n          <div class='center-text current-research'>Currently researching towards: <span class='researching-techs'>Mining</span></div>\n          <span class='research-text r-text'>" + playerCiv.research + "</span>\n          <div class='research-progress-bar'></div>\n          <span class='research-cost-text r-text'>" + playerCiv.researchCost + "</span>\n        </section>\n        <section class='technology-screen-inner search'>\n          <input type='search' placeholder='filter...'>\n          <span class='research-filters'>\n            <label><input type='checkbox'>Show Unavailable Techs</label><br>\n            <label><input type='checkbox'>Show Purchased Techs</label>\n          </span>\n        </section>\n        <section class='technology-screen-inner technologies'>\n          <div class='tech' data-tech='agriculture'>\n            <span class='tech-name'>Agriculture</span>\n            <span class='tech-description'>This is a description</span>\n            <ul class='tech-list'>\n              <li>+.2 <img src='img/food.png'> PS per farmer</li>\n              <li>Unlocks: Animal Husbandry, Mining</li>\n            </ul>\n          </div>\n\n          <div class='tech active' data-tech='mining'>\n            <span class='tech-name'>Mining</span>\n            <span class='tech-description'>This is a description</span>\n            <ul class='tech-list'>\n              <li>+.2 <img src='img/prod.png'> PS per miner</li>\n              <li>Unlocks: Masonry, Pottery</li>\n            </ul>\n          </div>\n        </section>\n      </section>\n    ";
        return technologyScreen;
    };
    return Templates;
}());
module.exports = Templates;
//# sourceMappingURL=template.js.map