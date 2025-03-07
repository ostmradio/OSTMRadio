$(document).ready(function () {
    function updateSongTitle() {
        // Make an HTTP GET request to the URL
        $.ajax({
            type: 'GET',
            //This uses a CORS proxy which is needed to get access to the file
            url: 'https://api.codetabs.com/v1/proxy?quest=https://zenoplay.zenomedia.com/api/zenofm/nowplaying/qbrhuwbdmzzuv',
            success: function (data) {
                // Update the song title element with the data

                $('#song-name').text(data.title);
            },
            error: function (xhr, type) {
                console.error('An error occurred getting the metadata for the song name: ' + type);
                $('#song-name').text("LIVE");
            }
        });
    }

    // Update the song title when the page loads

    updateSongTitle();

    // Update the song title every 30 seconds
    setInterval(updateSongTitle, 30000);
});
