// <reference path="store.d.ts" />
// <reference path="underscore.d.ts" />
"use strict";
var _ = require('underscore');
var Utils = require('./utils');
var Game = require('./game');
var Civilization = require('./civilization');
var Resource = require('./resource');
var Resources = require('./resources');
var Tech = require('./tech');
var Techs = require('./techs');
var Templates = require('./template');
console.log(_.random(0, 100));
var game = new Game(0);
var playerCiv;
var templates = new Templates();
var food = new Resource('food', 1, 0, 1000, 0, 'food', 'Food.');
var prod = new Resource('prod', 1, 0, 2000, 0, 'prod', 'Prod.');
var stone = new Resource('stone', 0, 0, -1, 0, 'stone', 'Stone');
var fish = new Resource('fish', 0, 0, -1, 0, 'fish', 'Fish are caught in nets by citizens periodically. Each fish provides +.5 <img src="img/health.png"> Fish are a popular trade item with Desert nations.');
var banana = new Resource('banana', 0, 0, -1, 0, 'banana', 'Banana');
var spices = new Resource('spices', 0, 0, -1, 0, 'spices', 'Spices');
var gold = new Resource('gold', 0, 0, -1, 0, 'gold', 'Gold');
var gems = new Resource('gems', 0, 0, -1, 0, 'gems', 'Gemss');
var oil = new Resource('oil', 0, 0, -1, 0, 'oil', 'Oil');
var uranium = new Resource('uranium', 0, 0, -1, 0, 'uranium', 'Uranium');
var iron = new Resource('iron', 0, 0, -1, 0, 'iron', 'Iron');
var horse = new Resource('horse', 0, 0, -1, 0, 'horse', 'Horsies :]');
var spaghetti = new Resource('spaghetti', 0, 0, -1, 0, 'spaghetti', 'Spaghetts');
var chihuahua = new Resource('chihuahua', 0, 0, -1, 0, 'chihuahua', 'Bark!');
//notify('hello');
var resources = new Resources([food, prod, stone, fish, spices, banana, gold, gems, oil, iron, uranium, chihuahua, spaghetti, horse]);
var agriculture = new Tech('agriculture', 'ancient', 'a technology', ['+.2 <img src="img/food.png"> PS per farmer', 'Unlocks: Animal Husbandry, Mining']);
var masonry = new Tech('masonry', 'ancient', 'wububuu', ['', '']);
var mining = new Tech('mining', 'ancient', 'not safe for minors', ['+.2 <img src="img/prod.png"> PS per miner', 'Unlocks: Masonry, Pottery']);
var techs = new Techs([agriculture, masonry, mining]);
var u = new Utils();
var isWindowActive = true;
window.addEventListener('focus', function () {
    isWindowActive = true;
});
window.addEventListener('blur', function () {
    isWindowActive = false;
});
function saveGame() {
    store.set('game', game);
    store.get('game');
}
function savePlayer() {
    store.set('playerCiv', playerCiv);
    console.log(store.get('playerCiv'));
}
function removeItem(arr, item) {
    for (var i = arr.length - 1; i--;) {
        if (arr[i] === item)
            arr.splice(i, 1);
    }
}
function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);
    // Enumerate number abbreviations
    var abbrev = ["k", "m", "b", "t"];
    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);
        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round(number * decPlaces / size) / decPlaces;
            // Handle special case where we round up to the next abbreviation
            if ((number == 1000) && (i < abbrev.length - 1)) {
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
}
;
function time(d) {
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}
;
function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function prepend(node, html) {
    var el = document.querySelector(node);
    el.insertAdjacentHTML('beforeend', html);
}
function append(node, html) {
    var el = document.querySelector(node);
    el.insertAdjacentHTML('afterend', html);
}
function bindElement(node, eventType, callback) {
    var el = document.querySelector(node);
    el.addEventListener(eventType, function (event) {
        console.log(callback);
        return callback();
    });
}
function hideElement(element) {
    element = element;
    element.className += " hidden";
}
function removeElement(element) {
    element = element;
    element.remove();
}
function elt(query, all) {
    if (all === void 0) { all = false; }
    if (all === false)
        return document.querySelector(query);
    else
        return document.querySelectorAll(query);
}
function startGame() {
    if (store.get('playerCiv') !== undefined) {
        var loadCiv = store.get('playerCiv');
        playerCiv = new Civilization(loadCiv.civName, loadCiv.leaderName, loadCiv.location);
        startSavedGame();
    }
    else {
        startNewGame();
        playerCiv = new Civilization('', '', '');
    }
}
function startSavedGame() {
    console.debug("Loading Saved Game...");
    append('body', templates.createStartScreen(playerCiv, game));
    //store.clear();
    bindElement('.load-btn', 'click', function () {
        createGameUI();
    });
    bindElement('.current-btn', 'click', function () {
        createGameUI();
    });
}
;
function startNewGame() {
    console.debug("Starting New Game...");
    append('body', templates.settingsScreen);
    // bindElement('.new-btn', 'click', function () {
    //   console.log('Hey...is this thing working??');
    // });
    bindElement('.begin-btn', 'click', function () {
        //console.log('hi');
        setPlayerCiv();
        createGameUI();
    });
    document.querySelector('#trait').addEventListener('change', function () {
        traitsSelection(0);
    });
}
;
function setPlayerCiv() {
    var civNameInput = document.querySelector('#civName'), leaderNameInput = document.querySelector('#leaderName'), location = document.querySelector('#location');
    playerCiv.civName = civNameInput.value;
    playerCiv.leaderName = leaderNameInput.value;
    playerCiv.location = location.value;
    savePlayer();
}
function traitsSelection(index) {
    var traitSelect = document.querySelector('#trait');
    var trait = traitSelect.value;
    playerCiv.leaderTraits[index] = trait;
    console.log(traitSelect.value, playerCiv.leaderTraits);
    savePlayer();
}
function createGameUI() {
    var intro = document.querySelector('.clickopolis-intro');
    var clickopolisGame = document.createElement('section');
    clickopolisGame.innerHTML = '';
    clickopolisGame.setAttribute('class', 'clickopolis');
    clickopolisGame.setAttribute('id', 'clickopolis');
    drawUI(clickopolisGame);
    intro != undefined ? intro.remove() : console.log('intro not defined');
    document.body.appendChild(clickopolisGame);
    //append('body', templates.resourcesScreen);
    bindElement('.food-btn', 'click', function () {
        event.preventDefault();
        addClickToTotal('.r-food-total', 'food');
        checkPopulationGrowthCost();
    });
    bindElement('.prod-btn', 'click', function () {
        event.preventDefault();
        addClickToTotal('.r-prod-total', 'prod');
        checkPopulationGrowthCost();
    });
    resourceClick();
    bindElement('.pop-btn', 'click', function () {
        event.preventDefault();
        var popGrowthCost = document.querySelector('.pop-growth-cost');
        var populationText = document.querySelector('.population-text');
        resources.get('food').total -= playerCiv.populationGrowthCost;
        playerCiv.population += 1;
        playerCiv.populationGrowthCost = Math.round(playerCiv.populationGrowthCost * playerCiv.population * .9);
        populationText.textContent = playerCiv.population.toString();
        popGrowthCost.textContent = playerCiv.populationGrowthCost.toString();
        checkPopulationGrowthCost();
    });
    populateTechnologies();
}
function addClickToTotal(el, item) {
    var element = elt(el);
    if (resources.get(item).total >= resources.get(item).max)
        resources.get(item).total = resources.get(item).max;
    else
        resources.get(item).total += resources.get(item).perClick;
    element.innerHTML = resources.get(item).total.toString() + ' total';
}
setInterval(function () {
    if (isWindowActive) {
        if (resources.get('food').total >= resources.get('food').max)
            resources.get('food').total = resources.get('food').max;
        else
            resources.get('food').total += resources.get('food').perSecond;
        elt('.r-food-total').textContent = resources.get('food').total.toString() + ' total';
        if (resources.get('prod').total >= resources.get('prod').max)
            resources.get('prod').total = resources.get('prod').max;
        else
            resources.get('food').total += resources.get('prod').perSecond;
        elt('.r-prod-total').textContent = resources.get('prod').total.toString() + ' total';
        updateTime();
        addGoldenAgePoints();
        checkPopulationGrowthCost();
    }
}, 1000);
setInterval(function () {
    if (isWindowActive) {
        updateYear();
        addCash();
        addResearchPoints();
    }
}, 1000 * 60);
function drawUI(el) {
    el.innerHTML = templates.createScreenHeader(playerCiv, game) +
        templates.createResourcesScreen(playerCiv, resources) +
        templates.createCivilizationScreen(playerCiv) +
        templates.createCitizenScreen(playerCiv) +
        templates.createEconomyScreen(playerCiv) +
        templates.createBuildingsScreen() +
        templates.createTechnologyScreen(playerCiv) +
        templates.createDiplomacyScreen(playerCiv) +
        templates.createSettingsScreen();
}
function populateTechnologies() {
    var technologies = document.querySelector('.technologies');
    console.debug("tech element", technologies);
    for (var i = 0; i < techs.items.length; i++) {
        var t = techs.items[i];
        console.log(techs.items[i]);
        technologies.innerHTML += "\n    <div class='tech' data-tech='" + t.name + "' data-selected=" + t.selected + ">\n      <span class='tech-name'>" + t.name + "</span>\n      <span class='tech-description'>" + t.description + "</span>\n      <ul class='tech-list'>\n        <li>" + t.effects[0] + "</li>\n        <li>" + t.effects[1] + "</li>\n      </ul>\n    </div>";
    }
}
function updateYear() {
    game.year += 1;
    elt('.game-year-text').textContent = game.year;
}
function updateTime() {
    game.time += 1;
    elt('.game-year-text').title = time(game.time);
}
function addGoldenAgePoints() {
    var goldenAgeProgress = elt('.golden-age-progress');
    var goldenAgeMeter = elt('.metric-golden-age');
    var goldenAgePoints = playerCiv.happiness - playerCiv.anger;
    playerCiv.goldenAgeProgress += goldenAgePoints;
    goldenAgeProgress.textContent = u.abbrNum(playerCiv.goldenAgeProgress);
    var goldenAgePercent = ((playerCiv.goldenAgeProgress / goldenAgePoints) / 100) + '%';
    var bgString = "linear-gradient(to right, #BDBD6C 0%, #BDBD6C " + goldenAgePercent + ", #222 " + goldenAgePercent + ", #222)";
    goldenAgeMeter.style.background = bgString;
}
function addResearchPoints() {
    playerCiv.research += playerCiv.population;
    elt('.research-text').textContent = playerCiv.research.toString();
    var researchPercent = ((playerCiv.research / playerCiv.researchCost) * 100) + '%';
    var bgString = "linear-gradient(to right, #83D4D4 0%, #83D4D4 " + researchPercent + ", #444 " + researchPercent + ", #444 100%)";
    elt('.research-progress-bar').style.background = bgString;
    if (playerCiv.research > playerCiv.researchCost) {
        elt('.research-exceeding').textContent = 'You are currently exceeding your current tech goal.';
    }
    else {
        elt('.research-exceeding').textContent = '';
    }
}
function addCash() {
    playerCiv.cash += 10;
    var cashText = elt('.cash-text');
    cashText.textContent = playerCiv.cash.toString();
}
function resourceClick() {
    var resourceButtons = document.querySelectorAll('.resource');
    [].forEach.call(resourceButtons, function (item) {
        item.addEventListener('click', function () {
            item.className = "resource";
            var name = this.getAttribute('data-resource');
            var r = resources.get(name);
            if (this.className === "resource active") {
                this.className = "resource";
            }
            else {
                this.className += " active";
                elt('.resource-info-screen').innerHTML = "\n          <h3><img src='img/" + r.image + ".png'> " + r.name + "<br></h3>\n          <p>" + r.description + "</p>\n        ";
            }
            showResourceInfo(name);
        });
    });
}
function showResourceInfo(name) {
    console.log(name);
}
function checkPopulationGrowthCost() {
    var button = document.querySelector('.pop-btn');
    if (playerCiv.populationGrowthCost > resources.get('food').total) {
        console.log(playerCiv.populationGrowthCost);
        button.className = 'disabled pop-btn';
        return false;
    }
    else {
        console.log(playerCiv.populationGrowthCost);
        button.className = 'pop-btn';
        return true;
    }
}
function checkAchievements() {
}
function init() {
    startGame();
}
init();
//# sourceMappingURL=index.js.map