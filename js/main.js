// ***** JS DEMO HOMEWORK *****


// WHAT SHOULD YOU DO ?

// - Try to recreate Youtube app we were building (you may watch video if you get stuck).

// BONUS:

// - Once video is opened, instead of showing a list of searched videos, show a list of 5 videos related to video opened (you can find URL and QUERY example for related videos in Youtube API documentation).

var key = 'AIzaSyCg90n5ifXb10h2WjpIJwovvYg-uBfnIfA';
var videoList = document.querySelector('.video-list');
var searchBttn = document.querySelector('i');
var input = document.querySelector('input');


searchBttn.addEventListener('click', function() {
    if(input.value) {
        searchVideos();
    }    
});
document.addEventListener('keypress', function(e) {
    if(e.key === 'Enter' && input.value) {
        searchVideos();
    }
});

function searchVideos() {
    videoList.innerHTML = "";
    
    var url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&q=' + input.value + '&key=' + key;

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
        }
    }
    newReq.send();
}

function insertVideoList(videos) {
    videos.forEach(function(video) {
        createVideoArticle(video);
    });
}

function createVideoArticle(video) {
    if(video.snippet) {
        var article = document.createElement('article');
        var text = document.createElement('div');

        var image = document.createElement('img');
        image.setAttribute('src', video.snippet.thumbnails.default.url);
        article.appendChild(image);

        text.appendChild(newEl('h4', video.snippet.title));
        text.appendChild(newEl('p', video.snippet.description))

        article.appendChild(text);

        videoList.appendChild(article);

        article.addEventListener('click', function() {
            var iframe = document.querySelector('iframe');
            var iframeWrapper = document.getElementById('inner');
            var videoID = video.id.videoId;

            videoList.innerHTML = "";
            
            iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID + '?autoplay=1');
            iframeWrapper.classList.add('visible');

            document.querySelector('.big-video h1').textContent = video.snippet.title;
            
            document.querySelector('.big-video p').textContent = video.snippet.description;
            
            var urlRelated = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&relatedToVideoId=' + videoID + '&key=' + key;

            getInfo(urlRelated);
        });
    }   
}

function newEl(el, value) {
    var element = document.createElement(el);
    element.textContent = value;
    return element;
}