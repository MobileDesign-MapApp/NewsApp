/*///////////////////////////////////////
main.js

This file contains all of the necessary 
javascript for our mobile NewsApp.
///////////////////////////////////////*/


// called when any page loads.
$(document).ready(function(){
	
	// first time running the app
	if (localStorage.getItem("newsAppFirstTime") == null){
		// force the user to go to the settings page.
		$.mobile.changePage("#settingsPage");	
	}
});


// called whenever the user navigates to the home page.
$("#homePage").on("pagechange pageshow", function(event){
	
	
	// show the loading widget while the feed is loading.
	$.mobile.loading( 'show', {
		text: 'Loading...',
		textVisible: true,
		theme: 'a'
	});
	
	// the active fees for the application
	var activeFeeds = JSON.parse(localStorage.getItem("newsAppActiveFeeds"));
	
	// the current feed for the user.
	var currentFeed = localStorage.getItem("newsAppCurrentFeed");
	
	// user needs to select news first
	if (currentFeed == "none" && activeFeeds.length == 0){
		displayNoFeeds();
		updateControls();
		return;
	}
	// the user doesn't have a current feed and we will assign one until he does.
	else if (currentFeed == "none" && activeFeeds.length > 0){
		currentFeed = activeFeeds[0];
		
		localStorage.setItem("newsAppCurrentFeed",currentFeed);
	}
	
	// load up the feed.
	showFeed(currentFeed);	
			
});

// called whenever the settings page loads.
$("#settingsPage").on("pagechange pageshow", function(event){
	// if the user is there for the first time, then display a welcome message to them.
	if (localStorage.getItem("newsAppFirstTime") == null){
		initializeSettings();
		alert("Welcome to MyNews\n\nIn order to get your news, please take the time to select the type of news you " +
			"would like to view by selecting from the list.  You can revisit this page at any time by clicking on the " + 
			"settings button");
	}
	// otherwise, just load up the current settings.
	else{
		displayCurrentSettings();
	}
});


/**
 * showFeed
 * 
 * This function is used to determine which url to hit, in order to grab the correct
 * feed data.
 *
 * params: feed - the feed to display
 */
function showFeed(feed){
	
	// use switch statement to determine which url to hit.
	switch(feed){
		case "reddit_front_page_hot":
			addFeed("http://www.reddit.com/r/frontpage/hot.json?sort=new","reddit","Reddit Hot");
			break;
		case "reddit_front_page_new":
			addFeed("http://www.reddit.com/r/frontpage/new.json?sort=new","reddit","Reddit New");
			break;
		case "reddit_front_page_top":
			addFeed("http://www.reddit.com/r/frontpage/top.json?sort=new","reddit", "Reddit Top");
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
		case "usa_movie_reviews":
			addFeed("http://api.usatoday.com/open/reviews/movies/recent?count=10&api_key=3d7kths6ep6px86etvrsjwdn","usa_today","Movie Reviews");
			break;
		case "usa_home_news":
			addFeed("http://api.usatoday.com/open/articles?section=home&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - Home");
			break;
		case "usa_news":
			addFeed("http://api.usatoday.com/open/articles?section=news&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - News");
			break;
		case "usa_travel":
			addFeed("http://api.usatoday.com/open/articles?section=travel&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - Travel");
			break;
		case "usa_money":
			addFeed("http://api.usatoday.com/open/articles?section=money&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - Money");
			break;
		case "usa_tech":
			addFeed("http://api.usatoday.com/open/articles?section=tech&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - Tech");
			break;
		case "usa_weather":
			addFeed("http://api.usatoday.com/open/articles?section=weather&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - Weather");
			break;
		case "usa_world":
			addFeed("http://api.usatoday.com/open/articles?section=world&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - World");
			break;
		case "usa_health":
			addFeed("http://api.usatoday.com/open/articles?section=health&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - Health");
			break;
		case "usa_books":
			addFeed("http://api.usatoday.com/open/articles?section=books&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - Books");
			break;
		case "usa_music":
			addFeed("http://api.usatoday.com/open/articles?section=music&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - Music");
			break;
		case "usa_movies":
			addFeed("http://api.usatoday.com/open/articles?section=movies&encoding=json&api_key=gyjxrxrew7pe5k53ut5dpvda","usa_today","USA Today - Movies");
			break;
	}    
}


/**
 * addFeed
 *
 * function used to make JSON request to the url specified, so the result
 * can be displayed to the user.
 *
 * params: 	url   - the url to send the JSON request to.
 			type  - the type of feed. (espn = ESPN API, reddit = Reddit API, usa_today = USA Today API
 			title - the title to display to the user at the top of the feed.
 */
function addFeed(url, type, title){
	
	// executes for espn feeds
	if (type == "espn"){
		$.getJSON(url,function(data){
			// display the feed
			displayEspnFeed(data,title);
			
			// refresh the list so that it uses the jquery mobile list widget
			$("#feedList").listview("refresh");
			
			// disable or re-enable the navigation buttons
			updateControls();
			
			// hide the loading widget, because we are all loaded.
			$.mobile.loading("hide");
		});
	}
	// executes for reddit feeds
	else if (type == "reddit"){
		$.getJSON(url,function(data){
			// display the feed
			displayRedditFeed(data,title);
			
			// refresh the list so that it uses the jquery mobile list widget
			$("#feedList").listview("refresh");
			
			// disable or re-enable the navigation controls.
			updateControls();
			
			// hide the loading widget, because we are all loaded.
			$.mobile.loading("hide");
		});
	}
	// executes for usa today feeds
	else if (type == "usa_today"){
		$.getJSON(url,function(data){
			// display the feed.
			displayUSAFeed(data,title);
			
			// refresh the list so that it uses the jquery mobile list widget
			$("#feedList").listview("refresh");
			
			// disable or re-enable the navigation controls.
			updateControls();
			
			// hide the loading widget, because we are all loaded.
			$.mobile.loading("hide");
		});
	}
	
}

/**
 * displayUSAFeed
 *
 * this function is used to display a feed from the USA today api.
 *
 * params -	feedData - the data sent back from the ajax request
 *			title	 - the title to display to the user for the feed
 */
function displayUSAFeed(feedData,title){
	
	// clear the existing header and display the new one
	$("#feedHeader").html("");
	var header = document.getElementById("feedHeader");
	header.appendChild(document.createTextNode(title));
	
	// clear out the existing feed to make way for the new feed.
	$("#feedList").html("");
	var feedList = document.getElementById("feedList");
	
	var data;
	// movie reviews response data is structured different from the article requests.
	if (title == "Movie Reviews"){
		
		data = feedData.MovieReviews;
		
		// loop over all of the reviews and add them to the feed.
		for(var i = 0; i < data.length; i++){
			var feedItem = document.createElement("li");
			
			// MovieName
			var title = document.createElement("h2");
			title.setAttribute("class","articleTitle");
			
			if (data[i].MovieName == undefined){
				title.appendChild(document.createTextNode("No Title Listed"));
			}
			else{
				title.appendChild(document.createTextNode(data[i].MovieName));
			}
			
			// MPAARating
			var rating = document.createElement("h5");
			rating.setAttribute("class","articleSource");
			
			if (data[i].MPAARating == undefined){
				rating.appendChild(document.createTextNode("Rating: No Rating Listed"));
			}
			else{
				rating.appendChild(document.createTextNode("Rating: " + data[i].MPAARating));
			}
			
			// ActorName
			var actors = document.createElement("h5");
			actors.setAttribute("class","articleSource");
			
			if (data[i].ActorName == undefined){
				actors.appendChild(document.createTextNode("Actors: No Actors Listed"));
			}
			else{
				actors.appendChild(document.createTextNode("Actors: " + data[i].ActorName));
			}
			
			// Director
			var director = document.createElement("h5");
			director.setAttribute("class","articleSource");
			
			if (data[i].Director == undefined){
				director.appendChild(document.createTextNode("Director: No Director Listed"));
			}
			else{
				director.appendChild(document.createTextNode("Director: " + data[i].Director));
			}
			
			// Review
			var review = document.createElement("p");
			review.setAttribute("class","articleSummary");
			
			if (data[i].Review == undefined){
				review.appendChild(document.createTextNode("Review: No Review Listed"));
			}
			else{
				// need to strip out the <p> tags that are sent with the review
				var text = data[i].Review;
				text = text.replace("<p>","");
				text = text.replace("</p>","");
			
				review.appendChild(document.createTextNode("Review: " + text));
			}
			
			// WebUrl
			var url = document.createElement("a");
			url.setAttribute("href",data[i].WebUrl);
			
			url.appendChild(title);
			url.appendChild(actors);
			url.appendChild(director);
			url.appendChild(rating);
			url.appendChild(review);
			
			feedItem.appendChild(url);
			
			feedList.appendChild(feedItem);
		}
		
	}
	// the request for a feed of articles
	else{
		data = feedData.stories;
		
		// loop over all of the articles and add them to the feed.
		for (var i = 0; i < data.length; i++){
			var feedItem = document.createElement("li");
			
			// title
			var title = document.createElement("h2");
			title.setAttribute("class","articleTitle");
			
			if (data[i].title == undefined){
				title.appendChild(document.createTextNode("No Title Listed"));
			}
			else{
				title.appendChild(document.createTextNode(data[i].title));
			}
			
			//pubDate
			var date = document.createElement("h5");
			date.setAttribute('class','articleSource');
			
			if (data[i].pubDate == undefined){
				date.appendChild(document.createTextNode("Publish Date: No Date Listed"));
			}
			else{
				date.appendChild(document.createTextNode("Publish Date: " + data[i].pubDate));
			}
			
			// description
			var description = document.createElement("p");
			description.setAttribute("class","articleSummary");
			
			if (data[i].description == undefined){
				description.appendChild(document.createTextNode("Summary: No Summary Listed"));
			}
			else{
				description.appendChild(document.createTextNode("Summary: " + data[i].description));
			}
			
			// link
			var url = document.createElement("a");
			url.setAttribute("href",data[i].link);
			
			url.appendChild(title);
			url.appendChild(date);
			url.appendChild(description);
			
			feedItem.appendChild(url);
			
			feedList.appendChild(feedItem);
		}
	}
}

/**
 * displayEspnFeed
 *
 * function used to display an espn feed to the user
 *
 * params -	feedData - the json response from the ajax request.
 *			title    - the title of the feed.
 */
function displayEspnFeed(feedData, title){
	// clear out any existing header and display the new one
	$("#feedHeader").html("");
	var header = document.getElementById("feedHeader");
	header.appendChild(document.createTextNode(title));
	
	// clear out the existing feed to make way for the new one.
	$("#feedList").html("");
	var feedList = document.getElementById("feedList");
	
	// have to do this because the api treats headlines and all of the others
	// slightly differently in terms of the json structure returned.
	var data;
	if (title == "ESPN Headlines"){
		data = feedData.headlines;
	}
	else{
		data = feedData.feed;
	}
	
	// loop over the articles and display them in the new feed
	for(var i = 0; i < data.length; i++){
		var feedItem = document.createElement("li");
		
		
		// headline
		var title = document.createElement("h2");
		title.setAttribute("class","articleTitle");
		
		if (data[i].headline == undefined){
			title.appendChild(document.createTextNode("No Title Listed"));
		}
		else{
			title.appendChild(document.createTextNode(data[i].headline));
		}
		
		// byline
		var byline = document.createElement("h5");
		byline.setAttribute("class","articleAuthor");
		
		if (data[i].byline == undefined){
			byline.appendChild(document.createTextNode("Author: No Author Listed"));
		}
		else{
			byline.appendChild(document.createTextNode("Author: " + data[i].byline));
		}
		
		// description
		var description = document.createElement("p");
		description.setAttribute("class","articleSummary");
		
		if (data[i].description == undefined){
			description.appendChild(document.createTextNode("Summary: No Summary Listed"));
		}
		else{
			description.appendChild(document.createTextNode("Summary: " + data[i].description));
		}
		
		// published
		var publishDate = document.createElement("h5");
		publishDate.setAttribute("class","publishDate");
		
		if (data[i].published == undefined){
			publishDate.appendChild(document.createTextNode("Date: No Date Listed"));
		}
		else{
			var date = new Date(data[i].published);
		
			publishDate.appendChild(document.createTextNode("Date: " + date.toDateString()));
		}
		
		// url
		var url = document.createElement("a");
		url.setAttribute("href",data[i].links.mobile.href);
		
		
		url.appendChild(title);
		url.appendChild(byline);
		url.appendChild(publishDate);
		url.appendChild(description);
		
		feedItem.appendChild(url);
		
		feedList.appendChild(feedItem);
	}
}

/**
 * displayRedditFeed
 *
 * function used to display a reddit feed to the user
 *
 * params - feedData - the json response from the ajax request
 * 			title    - the feed title to display to the user
 */
function displayRedditFeed(feedData, title){
	
	// clear out any existing header and add the new one
	$("#feedHeader").html("");
	var header = document.getElementById("feedHeader");
	header.appendChild(document.createTextNode(title));
	
	// clear out the existing feed to make way for the new one
	$("#feedList").html("");
	var feedList = document.getElementById("feedList");
	
	
	// loop over the json and add them to the feed.
	for(var i = 0 ;i < feedData.data.children.length; i++){
		var feedItem = document.createElement("li");
		
		// title
		var articleTitle = document.createElement("h2");
		articleTitle.setAttribute("class","articleTitle");
		
		
		
		if (feedData.data.children[i].data.title == undefined){
			articleTitle.appendChild(document.createTextNode("No Title Listed"));
		}
		else{
			articleTitle.appendChild(document.createTextNode(feedData.data.children[i].data.title));
		}
		
		// author
		var articleAuthor = document.createElement("h5");
		articleAuthor.setAttribute("class","articleAuthor");
		
		if (feedData.data.children[i].data.author == undefined){
			articleAuthor.appendChild(document.createTextNode("Author: No Author Listed"));
		}
		else{
			articleAuthor.appendChild(document.createTextNode("Author: " + feedData.data.children[i].data.author));
		}
		
		// ups and downs
		var articleVotes = document.createElement("h5");
		articleVotes.setAttribute("class","articleVotes");
		
		var ups;
		var downs;
		if (feedData.data.children[i].data.ups == undefined){
			ups = 0;
		}
		else {
			ups = feedData.data.children[i].data.ups;
		}
		
		if (feedData.data.children[i].data.downs == undefined){
			downs = 0;
		}
		else{
			downs = feedData.data.children[i].data.downs
		}
		
		articleVotes.appendChild(document.createTextNode("Up Votes: " + ups + " --- Down Votes: " + downs));
		
		// created
		var publishDate = document.createElement("h5");
		publishDate.setAttribute("class","publishDate");
		
		if (feedData.data.children[i].data.created == undefined){
			publishDate.appendChild(document.createTextNode("Date: No Date Listed"));
		}
		else{
			var created = new Date(feedData.data.children[i].data.created);
		
			publishDate.appendChild(document.createTextNode("Date: " + created.toDateString()));
		}
		
		// url
		var url = document.createElement("a");
		url.setAttribute("href",feedData.data.children[i].data.url);
		
		url.appendChild(articleTitle);
		url.appendChild(articleAuthor);
		url.appendChild(articleVotes);
		url.appendChild(publishDate);
		
		feedItem.appendChild(url);
		
		feedList.appendChild(feedItem);
	}
	
}

/**
 * Deprecated Code
 * 
 * displayNewsFeed
 * 
 * This method was used to display feeds from the Feedzilla api.
 * We took this out of the project, because the links that it gave to
 * the articles, didn't work well.
 *
 * params - feedData - the json response from the ajax request
 *   		title    - the feed title to display to the user
 */
function displayNewsFeed(feedData, title){
	
	// clear out any existing header and add the new one
	$("#feedHeader").html("");
	var header = document.getElementById("feedHeader");
	header.appendChild(document.createTextNode(title));
	
	// clear out the existing feed to make way for the new one
	$("#feedList").html("");
	var feedList = document.getElementById("feedList");
	
	// loop over the items and add them to the feed
	for(var i = 0; i < feedData.articles.length; i++){
		// list item
		var feedItem = document.createElement("li");
		
		// title
		var articleTitle = document.createElement("h2");
		articleTitle.setAttribute("class","articleTitle");
		
		if (feedData.articles[i].title == undefined){
			articleTitle.appendChild(document.createTextNode("No Title Listed"));
		}
		else{
			articleTitle.appendChild(document.createTextNode(feedData.articles[i].title));
		}
		
		// author
		var articleAuthor = document.createElement("h5");
		articleAuthor.setAttribute("class","articleAuthor");
		
		if (feedData.articles[i].author == undefined){
			articleAuthor.appendChild(document.createTextNode("Author: No Author Listed"));
		}
		else{
			articleAuthor.appendChild(document.createTextNode("Author: " + feedData.articles[i].author));
		}
		
		// source
		var source = document.createElement("h5");
		source.setAttribute("class","articleSource");
		
		if (feedData.articles[i].source == undefined){
			source.appendChild(document.createTextNode("Source: No Source Listed"));
		}
		else{
			source.appendChild(document.createTextNode("Source: " + feedData.articles[i].source));
		}
		
		// publish date
		var publishDate = document.createElement("h5");
		publishDate.setAttribute("class","publishDate");
		
		if (feedData.articles[i].publish_date == undefined){
			publishDate.appendChild(document.createTextNode("Date: No Publish Date Listed"));
		}
		else{
			var date = new Date(feedData.articles[i].publish_date);
		
			publishDate.appendChild(document.createTextNode("Date: " + date.toDateString()));
		}
		
		// summary
		var articleSummary = document.createElement("p");
		articleSummary.setAttribute("class","articleSummary");
		
		if (feedData.articles[i].summary == undefined || feedData.articles[i].summary.trim() == ""){
			articleSummary.appendChild(document.createTextNode("Summary: No Summary Listed"));
		}
		else{
			articleSummary.appendChild(document.createTextNode("Summary: " + feedData.articles[i].summary));
		}
		
		// url
		var url = document.createElement("a");
		url.setAttribute("href",feedData.articles[i].url);
		
		url.appendChild(articleTitle);
		url.appendChild(articleAuthor);
		url.appendChild(source);
		url.appendChild(publishDate);
		url.appendChild(articleSummary);
		
		feedItem.appendChild(url);
		
		feedList.appendChild(feedItem);
	}
	
}





/**
 * initializeSettings
 *
 * function used to initialize the localStorage variables.  Called 
 * only once, when the user initially uses the application.
 */
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
		espn_mens_college_basketball : false,
		usa_movie_reviews : false,
		usa_home_news : false,
		usa_news : false,
		usa_travel : false,
		usa_money : false,
		usa_tech : false,
		usa_weather : false,
		usa_world : false,
		usa_health : false,
		usa_books : false,
		usa_music : false,
		usa_movies : false
	});
	
	localStorage.setItem("newsAppSettings", JSON.stringify(sources));
	
	// setup a localstorage variable to keep track of active feeds
	var feeds = [];
	localStorage.setItem("newsAppActiveFeeds",JSON.stringify(feeds));
	
	// setup a localstorage variable for the current feed
	var currentFeed = "none";
	localStorage.setItem("newsAppCurrentFeed",currentFeed);
	
}

/**
 * toggleNewsItem
 *
 * function called when the user checks or unchecks a feed option from the settings page
 *
 * params - newsItem - the feed to enable or disable.
 */
function toggleNewsItem(newsItem){
	// get the settings for that news app
	var settings = JSON.parse(localStorage.getItem("newsAppSettings"));
	
	// get the active feeds
	var activeFeeds = JSON.parse(localStorage.getItem("newsAppActiveFeeds"));
	
	// get the current feed
	var currentFeed = localStorage.getItem("newsAppCurrentFeed");
	
	// get the current setting for the news item selected
	var currentValue = settings[0][newsItem.id];
	
	// toggle the setting
	if (currentValue == false){
		settings[0][newsItem.id] = true;
		activeFeeds.push(newsItem.id);
	}
	else{
		settings[0][newsItem.id] = false;
		
		// remove it from the active feeds
		var index = activeFeeds.indexOf(newsItem.id);
		if (index != -1){
			activeFeeds.splice(index,1);
		}
		
		// if the one removed was the current feed, remove it as the current feed
		if (currentFeed == newsItem.id){
			currentFeed = "none";
		}
	}
	
	// save the changes
	localStorage.setItem("newsAppSettings",JSON.stringify(settings));
	localStorage.setItem("newsAppActiveFeeds",JSON.stringify(activeFeeds));
	localStorage.setItem("newsAppCurrentFeed",currentFeed);
} 


/**
 * displayCurrentSettings
 *
 * function called in order to load up the settings list on the settings page.
 */
function displayCurrentSettings(){
	// get the settings for the news app
	var settings = JSON.parse(localStorage.getItem("newsAppSettings"));
	
	// go through all of the settings and make sure they are correctly setup for the user
	for(var key in settings[0]){
		
		var currentItem = document.getElementById(key);
		
		// set up the checkbox values.
		if (settings[0][key] == false){
			currentItem.checked = false;
			
		}
		else{
			currentItem.checked = true;
			
		}
		
	}
	
	// refresh the list and checkboxes, so that we can use the jquery widgets
	$("#settingsList").listview('refresh');
	$("input").checkboxradio("refresh");
}

/**
 * displayNoFeeds
 *
 * function used to display a message to the user when they have selected no feeds.
 */
function displayNoFeeds(){
	// clear out the feed list
	$("#feedList").html("");

	// create and add the message.
	var noFeed = document.createElement("li");
	
	var message = document.createElement("h5");
	message.appendChild(document.createTextNode("You currently have no feeds selected.  Please go to the Settings and select "
		+ "atleast one feed."));
	message.style.padding = ".75em";
	
	noFeed.appendChild(message);
	document.getElementById("feedList").appendChild(noFeed);	
	
	// hide the loading widget.
	$.mobile.loading("hide");
}

/**
 * updateControls
 *
 * function used to enable or disable the navigation controls when a feed is displayed.
 * this is needed so that there is no overflow of the active feeds array.
 */
function updateControls(){
	// get the active feeds
	var activeFeeds = JSON.parse(localStorage.getItem("newsAppActiveFeeds"));
	
	// get the current feed
	var currentFeed = localStorage.getItem("newsAppCurrentFeed");
	
	// both of the buttons need to be disabled
	if (activeFeeds.length == 1 || activeFeeds.length == 0){
		
		$("#prevButton").button('disable');
		$("#nextButton").button('disable');
	}
	// might need to disable depending on where were are in the active feeds.
	else {
		// first element, so disable the previous button
		if (currentFeed == activeFeeds[0]){
			$("#prevButton").button('disable');
			$("#nextButton").button('enable');
		}
		// last element, so disable the next button
		else if (currentFeed == activeFeeds[activeFeeds.length - 1]){
			$("#prevButton").button('enable');
			$("#nextButton").button('disable');
		}
		// make sure that both buttons are enabled.
		else{
			$("#prevButton").button('enable');
			$("#nextButton").button('enable');
		}
	}
}

/**
 * previousFeed
 *
 * function called in order to change the feed to previous feed in the active
 * feeds array.
 */
function previousFeed(){
	
	// get the current feed and the active feeds
	var currentFeed = localStorage.getItem("newsAppCurrentFeed");
	var activeFeeds = JSON.parse(localStorage.getItem("newsAppActiveFeeds"));
	
	// get the index of the current feed in the active feeds array
	var index = activeFeeds.indexOf(currentFeed);
	
	// get the next feed
	var nextFeed = activeFeeds[index - 1];
	
	// set the current feed to the next feed and save it
	currentFeed = nextFeed;
	localStorage.setItem("newsAppCurrentFeed",currentFeed);
	
	// show the loading widget and load up the feed.
	$.mobile.loading( 'show', {
		text: 'Loading...',
		textVisible: true,
		theme: 'a'
	});
	showFeed(currentFeed);
}

/** 
 * nextFeed
 *
 * function used to grab the next feed when the user clicks on the "next" button.
 */
function nextFeed(){
	// get the current and active feeds
	var currentFeed = localStorage.getItem("newsAppCurrentFeed");
	var activeFeeds = JSON.parse(localStorage.getItem("newsAppActiveFeeds"));
	
	// get the index of the current feed in the active feeds array
	var index = activeFeeds.indexOf(currentFeed);
	
	// get the next feed
	var nextFeed = activeFeeds[index + 1];
	
	// set the current feed to the next feed and save it
	currentFeed = nextFeed;
	localStorage.setItem("newsAppCurrentFeed",currentFeed);
	
	// show the loading widget and load up the feed
	$.mobile.loading( 'show', {
		text: 'Loading...',
		textVisible: true,
		theme: 'a'
	});
	showFeed(currentFeed);
}