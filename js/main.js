
$(document).ready(function(){
	
	// first time running the app
	if (localStorage.getItem("newsAppFirstTime") == null){
		$.mobile.changePage("#settingsPage");	
	}
});

$("#homePage").on("pagechange pageshow", function(event){
	if (document.getElementById("feedNavBar")){
		$("#navBarContainer").html("");
	}
	
	var settings = JSON.parse(localStorage.getItem("newsAppSettings"));
	
	for(var key in settings[0]){
		var currentItem = document.getElementById(key);
		
		// if the setting is set to true, then add those feeds to the home page
		if (settings[0][key] == true){
			
			
			switch(key){
				case "reddit_front_page_hot":
					addFeed("http://www.reddit.com/r/subreddit/hot.json?sort=new","reddit","Reddit Hot");
					break;
				case "reddit_front_page_new":
					addFeed("http://www.reddit.com/r/subreddit/new.json?sort=new","reddit","Reddit New");
					break;
				case "reddit_front_page_top":
					addFeed("http://www.reddit.com/r/subreddit/top.json?sort=new","reddit", "Reddit Top");
					break;
				case "espn_headlines":
					addFeed("http://api.espn.com/v1/sports/news/headlines/top?apikey=8pd2xcptcppm6rxxyfwx3psk","espn","ESPN Headlines");
					break;
				case "espn_latest_news":
					addFeed("http://api.espn.com/v1/now/top?apikey=8pd2xcptcppm6rxxyfwx3psk","espn", "ESPN Latest News");
					break;
				case "espn_popular_stories":
					addFeed("http://api.espn.com/v1/now/popular?apikey=8pd2xcptcppm6rxxyfwx3psk","espn", "ESPN Popular");
					break;
				case "espn_nba":
					addFeed("http://api.espn.com/v1/now?apikey=8pd2xcptcppm6rxxyfwx3psk&leagues=nba","espn", "NBA");
					break;
				case "espn_nfl":
					addFeed("http://api.espn.com/v1/now?apikey=8pd2xcptcppm6rxxyfwx3psk&leagues=nfl","espn","NFL");
					break;
				case "espn_mlb":
					addFeed("http://api.espn.com/v1/now?apikey=8pd2xcptcppm6rxxyfwx3psk&leagues=mlb","espn","MLB");
					break;
				case "espn_nhl":
					addFeed("http://api.espn.com/v1/now?apikey=8pd2xcptcppm6rxxyfwx3psk&leagues=nhl","espn","NHL");
					break;
				case "espn_soccer":
					addFeed("http://api.espn.com/v1/now?apikey=8pd2xcptcppm6rxxyfwx3psk&leagues=soccer","espn","Soccer");
					break;
				case "espn_golf":
					addFeed("http://api.espn.com/v1/now?apikey=8pd2xcptcppm6rxxyfwx3psk&leagues=golf","espn","Golf");
					break;
				case "espn_college_football":
					addFeed("http://api.espn.com/v1/now?apikey=8pd2xcptcppm6rxxyfwx3psk&leagues=college-football","espn","College Football");
					break;
				case "espn_mens_college_basketball":
					addFeed("http://api.espn.com/v1/now?apikey=8pd2xcptcppm6rxxyfwx3psk&leagues=mens-college-basketball","espn","College Basketball");
					break;		
			}
			
			
		}
		
	}
});

$("#settingsPage").on("pagechange pageshow", function(event){
	if (localStorage.getItem("newsAppFirstTime") == null){
		initializeSettings();
		alert("Welcome to MyNews\n\nIn order to get your news, please take the time to select the type of news you " +
			"would like to view by selecting from the list.  You can revisit this page at any time by clicking on the " + 
			"settings button");
	}
	else{
		displayCurrentSettings();
	}
});



function addFeed(url, type, title){
	
	if (type == "espn"){
		
	}
	else if (type == "reddit"){
		
	}
	
}


function displayEspnFeed(feedData){

}

function displayRedditFeed(feedData){

}


function initializeSettings(){
	// set the first time flag, so this function doesn't run again.
	localStorage.setItem("newsAppFirstTime",false);
	
	// set the flags for each of the possible news items
	var sources = [];
	sources.push({
		reddit_front_page_hot : false,
		reddit_front_page_new : false,
		reddit_front_page_top : false,
		espn_headlines : false,
		espn_latest_news: false,
		espn_popular_stories : false,
		espn_nba : false,
		espn_nfl : false,
		espn_mlb : false,
		espn_nhl : false,
		espn_soccer : false,
		espn_golf : false,
		espn_college_football : false,
		espn_mens_college_basketball : false
	});
	
	localStorage.setItem("newsAppSettings", JSON.stringify(sources));
}

function toggleNewsItem(newsItem){
	// get the settings for that news app
	var settings = JSON.parse(localStorage.getItem("newsAppSettings"));
	
	// get the current setting for the news item selected
	var currentValue = settings[0][newsItem.id];
	
	// toggle the setting
	if (currentValue == false){
		settings[0][newsItem.id] = true;
	}
	else{
		settings[0][newsItem.id] = false;
	}
	
	// save the changes
	localStorage.setItem("newsAppSettings",JSON.stringify(settings));
} 

function displayCurrentSettings(){
	// get the settings for the news app
	var settings = JSON.parse(localStorage.getItem("newsAppSettings"));
	
	
	for(var key in settings[0]){
		
		var currentItem = document.getElementById(key);
		
		if (settings[0][key] == false){
			currentItem.checked = false;
			
		}
		else{
			currentItem.checked = true;
			
		}
		
	}
	
	$("#settingsList").listview('refresh');
	$("input").checkboxradio("refresh");
}