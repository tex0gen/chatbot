const inquirer = require('inquirer');
const helper = require('./helper')

const cities = ['berlin', 'london', 'paris']

const wiseCrack = ['tomato', 'pineapple', 'whale', 'boatyMcBoatFace']

const askCity = {
    type: 'input',
    name: 'city',
    message: 'Hello! This is ultimate.ai Virtual agent. Which city are you looking for today?\n',
    filter: function (city) {
        return city.toLowerCase();
    }
}

function chooseCity() {
    inquirer
        .prompt(
            responseCity()
        )
        .then((answers) => {
            const cityName = answers['city'];
            return checkCity(cityName)
        }
        )
        .catch(error => {
            console.error(error)
        });
}


const helper = require('./helper')
function suggestSights(city) {
    const sight = helper.sights(city)
    return sight;
}

// console.log(suggestSights('BERlin'))

function responseCity() {
    return askCity;
}

function checkCity(city) {
    if (city.match(new RegExp(cities.join("|"), "gi"))) {
        return suggestSights(city);
    } else if (city.match(new RegExp(wiseCrack.join("|"), "gi"))) {
        console.log("hahaha, you got me there, even I know that's not a real city, do you want to choose a 'real' city this time?");
        return askCityAgain();
    } else {
        console.log("We bots don't get around that much, why don't you try a different city?");
        return wrongCity();
    }
}

function cityWeather(city) {
    // console.log(helper.weather(city))
    const {temp, lowTemp, highTemp} = helper.weather(city)
    console.log(temp, lowTemp, highTemp)
    return temp;

}

function wrongCity() {
    askCity['message'] = 'Which city do you want to visit?\n'
    inquirer
        .prompt(
            askCity
        ).then((answers) => {
            const responseCity = answers['name'];
            console.log(responseCity);
            return cityWeather();
        })

}

function askCityAgain() {
    askCity['message'] = 'Will you give me a real city name this?\n'
    inquirer
        .prompt(
            askCity
        )
}

function main() {
    return chooseCity();
}

main();