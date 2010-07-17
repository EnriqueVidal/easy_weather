// Easy weather uses the geoname web service to get the current weather it is not a geolocation solution, use a different plugin for that
// Be nice to geonames use some sort of cache when you use this.
$.fn.easy_weather = function(latitude, longitude, country, city) { 
		var selector 	= this;
    
		latitude 	= (latitude 	== undefined) ? "34.0452" 	: latitude;
		longitude = (longitude 	== undefined) ? "-118.284" 	: longitude;
		country		= (country 		== undefined) ? "Mexico" 		: country;
		city			= (city 			== undefined) ? "Tijuana" 	: city;
		

    var url = "http://ws.geonames.org/findNearByWeatherJSON?lat=" + latitude + "&lng=" + longitude + "&callback=?";
    $.getJSON(url, function(data) {

        var clouds      = data.weatherObservation.clouds;
        var weather     = data.weatherObservation.weatherCondition;
        var temp        = data.weatherObservation.temperature;
        var humidity    = data.weatherObservation.humidity;

        var conditions_img = select_weather_image(clouds, weather);

        var conditions = '';
        if (weather == 'n/a')
            if (clouds == 'n/a') conditions = 'fine'; else conditions = clouds;
        else
            conditions = weather;
            
        create_weather_conditions_wrapper(conditions, conditions_img, temp, humidity, selector, city + ", " + country);
    });
   };

// Select a weather image from google, based on the weather or clouds
// Be nice to google use cache
function select_weather_image(clouds, weather) {
    if (weather == 'n/a') {
        switch (clouds) {
            case 'n/a':                 return 'sunny.gif';
            case 'clear sky':           return 'sunny.gif';
            case 'few clouds':          return 'partly_cloudy.gif';
            case 'scattered clouds':    return 'partly_cloudy.gif';
            case 'broken clouds':       return 'partly_cloudy.gif';
            default:                    return 'cloudy.gif';
        }
    } else {
        weather = weather.replace('light ', '').replace('heavy ', '').replace(' in vicinity', '');
        switch (weather) {
			      case 'smoke':                   return 'smoke.gif';
	          case 'volcanic ash':            return 'smoke.gif';
	          case 'sand':                    return 'dust.gif';
	          case 'haze':                    return 'haze.gif';
	          case 'spray':                   return 'rain.gif';
	          case 'widespread dust':         return 'dust.gif';
            case 'drizzle':                 return 'rain.gif';
            case 'rain':                    return 'rain.gif';
            case 'snow':                    return 'snow.gif';
            case 'tornado':                 return 'storm.gif';
            case 'waterspout':              return 'storm.gif';
            case 'showers':                 return 'storm.gif';
            case 'thunderstorm':            return 'thunderstorm.gif';
            case 'snow grains':             return 'sleet.gif';
            case 'ice crystals':            return 'icy.gif';
            case 'ice pellets':             return 'icy.gif';
            case 'hail':                    return 'sleet.gif';
            case 'small hail':              return 'sleet.gif';
            case 'snow pellets':            return 'sleet.gif';
            case 'unknown precipitation':   return 'rain.gif';
            case 'mist':                    return 'mist.gif';
            case 'fog':                     return 'fog.gif';
            case 'squall':                  return 'flurries.gif';
            case 'sandstorm':               return 'dust.gif';
            case 'duststorm':               return 'dust.gif';
            case 'well developed dust':     return 'dust.gif';
            case 'sand whirls':             return 'dust.gif';
            case 'funnel cloud':            return 'flurries.gif';

            default:
                if (weather.indexOf("rain") > -1)					return 'rain.gif';
                else if (weather.indexOf("snow") > -1) 		return 'snow.gif';
                else if (weather.indexOf("thunder") > -1) return 'thunderstorm.gif';
                else if (weather.indexOf("dust") > -1) 		return 'dust.gif';
                else 																			return 'sunny.gif';
        }
    }
}

// Finally appending our content to the selector that called easy_weather
function create_weather_conditions_wrapper(conditions, conditions_img, temp, humidity, selector, location) {
    temp_f = parseInt(temp) + 32;

    $(selector).append("<img id='weather_img' src='http://www.google.com/images/weather/" + conditions_img + "' />");
    $(selector).append("<div id='weather_conditions'></div>");
		$("#weather_conditions").append("<p id='weather_location'>Location: " + location + "</p>")
		$("#weather_conditions").append("<p id='weather_temp'>Temp: " + temp + "&deg; C/" + temp_f + "&deg; F</p>");
		$("#weather_conditions").append("<p id='weather_hum'>Humidity: " + humidity + "%</p>");
		$("#weather_conditions").append("<p id='weather_cond'>Conditions: " + conditions.substr(0, 1).toUpperCase() + conditions.substr(1) + "</p>");
}