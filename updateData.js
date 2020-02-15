// Generate object with google trends per country
// Semidan, February 2019

const googleTrends = require('google-trends-api');
const fs = require('fs');
const countriesWithTrend = JSON.parse(fs.readFileSync('CountriesWithTrend.json', 'utf8'));
// const translate = require('@vitalets/google-translate-api');

function isEmpty(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object
}

function extractTopSearches(obj) {
    // Extract top searches from object
    let result = {}
    let trendingSearches = obj.default.trendingSearchesDays[0].trendingSearches
    for (search of trendingSearches) {
        let searchTitle = search.title.query;

        // translate(searchTitle, {to: 'en'}).then(res => {
        //   translatedTitle = res;
        //
        // }).catch(err => {
        //     console.error(err);
        // });

        result[searchTitle] = search.formattedTraffic
    }
    return result
}

async function getGoogleTrends(countries, date) {
    // Gets search Trends
    let output;
    let countryTrends = {};
    if (date === undefined) {
        date = new Date();
    }
    for (country of Object.keys(countries)) {

        await googleTrends.dailyTrends({
            trendDate: date,
            geo: country,
        })
        .then(results => output = extractTopSearches(JSON.parse(results)))
        .catch(error => output = {})

        if (!isEmpty(output)) {
            // let countryCode = countries[country].code;
            countryTrends[country] = {'name': countries[country].name,
                                                      'trends': output};
        }

    }
    return countryTrends
}

getGoogleTrends(countriesWithTrend)
    .then(function(result) {
        countryTrends = result;
        fs.writeFile("CountryTrends.json", 'trendsData = ' + JSON.stringify(result), 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
                console.log("JSON file has been saved.");
            });
     });
