// ***** JS DEMO HOMEWORK *****


// WHAT SHOULD YOU DO ?

// - Try to recreate Youtube app we were building (you may watch video if you get stuck).

// BONUS:

// - Once video is opened, instead of showing a list of searched videos, show a list of 5 videos related to video opened (you can find URL and QUERY example for related videos in Youtube API documentation).

//YT app Cubes 2

var key = 'AIzaSyCg90n5ifXb10h2WjpIJwovvYg-uBfnIfA';
var videoList = document.querySelector('.video-list');
var searchBttn = document.querySelector('i');
var iframe = document.querySelector('iframe');

searchBttn.addEventListener('click', function() {
    searchVideos();
});
document.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        searchVideos();
    }
});

function searchVideos() {
    videoList.innerHTML = "";
    var input = document.querySelector('input');

    var url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&q=' + input.value + '&key=' + key;
    console.log('url', url);

    getInfo(url);

    input.value = "";
}

function getInfo(url) {
    var newReq = new XMLHttpRequest();
    newReq.open('GET', url);
    newReq.onload = function() {
        if(newReq.status === 200) {
            var data = JSON.parse(newReq.responseText);
            insertVideoList(data.items);
            // console.log('newReq.responseText', newReq.responseText);
        }
    }
    newReq.send();
}

function insertVideoList(videos) {
    console.log('videos:', videos);
    videos.forEach(function(video) {
        // console.log('video', video);
        createVideoArticle(video);
    });
}

function createVideoArticle(video) {

    console.log('video', video);

    if(video.snippet) {
        var article = document.createElement('article');
        var text = document.createElement('div');

        var image = document.createElement('img');
        image.setAttribute('src', video.snippet.thumbnails.default.url);
        article.appendChild(image);

        var title = document.createElement('h4');
        title.textContent = video.snippet.title;
        text.appendChild(title);

        var desc = document.createElement('p');
        desc.textContent = video.snippet.description;
        text.appendChild(desc);

        text.appendChild(title);
        text.appendChild(desc);

        article.appendChild(text);

        videoList.appendChild(article);
    
    

        // console.log(video);

        article.addEventListener('click', function() {

            videoList.innerHTML = "";

            var videoID = video.id.videoId;
            console.log('videoID', videoID);

            iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID);
            iframe.classList.add('visible');

            var bigTitle = document.querySelector('.big-video h1');
            bigTitle.textContent = video.snippet.title;

            var bigDesc = document.querySelector('.big-video p');
            bigDesc.textContent = video.snippet.description;

            var urlRelated = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&relatedToVideoId=' + videoID + '&key=' + key;

            console.log('urlRelated', urlRelated);

            getInfo(urlRelated);

        });

    }   
}

// var url = 
// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=' + input.value + '&key=' + key;

// var urlRelated = 
// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=' + videoID + '&type=video&key=' + key;

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=























