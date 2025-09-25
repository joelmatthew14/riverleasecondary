function loadCSS2(filename) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = filename;
  document.head.appendChild(link);
}

loadCSS2('/riverleasecondary/css/05.video-popup-player.css');


const API_KEY = "AIzaSyBZTSsjn0glpatons6Tf_Sy5txuvJOPOWE"; // <-- Replace with your API key

// Load the popup HTML first
fetch("../html/02.video-popup-player.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("video-popup-container").innerHTML = data;

    // Now that the popup is in the DOM, run the rest of the logic
    document.querySelectorAll('.pdf-containers[data-playlist-id]').forEach(container => {
      if (!container.querySelector('.choose-video-btn')) {
        const btn = document.createElement('button');
        btn.textContent = "Choose Video";
        btn.className = "choose-video-btn";
        container.querySelector('div').appendChild(btn);
      }
    });

    const popup = document.getElementById('video-popup');
    const videoList = document.getElementById('video-list');
    const closeBtn = document.getElementById('popup-close');

    // Handle popup close
    closeBtn.onclick = () => {
      popup.style.display = 'none';
      videoList.innerHTML = '';
    };

    // Delegate click for all choose-video-btn buttons
    document.querySelectorAll('.choose-video-btn').forEach(btn => {
      btn.onclick = function () {
        const container = btn.closest('.pdf-containers');
        const playlistId = container.getAttribute('data-playlist-id');
        const iframe = container.querySelector('iframe');
        if (playlistId && iframe) {
          popup.style.display = 'block';
          videoList.innerHTML = '<li>Loading...</li>';
          fetchPlaylistVideos(playlistId, iframe);
        }
      };
    });

    // Fetch and display playlist videos
    function fetchPlaylistVideos(playlistId, iframe, pageToken = "") {
      fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${API_KEY}${pageToken ? '&pageToken=' + pageToken : ''}`)
        .then(res => res.json())
        .then(data => {
          if (pageToken === "") videoList.innerHTML = "";
          data.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.snippet.title;
            li.onclick = () => {
              iframe.src = `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`;
              popup.style.display = 'none';
              videoList.innerHTML = '';
            };
            videoList.appendChild(li);
          });
          // If there are more videos, fetch next page
          if (data.nextPageToken) fetchPlaylistVideos(playlistId, iframe, data.nextPageToken);
        })
        .catch(err => {
          videoList.innerHTML = "<li>Error loading videos.</li>";
        });
    }
  });

