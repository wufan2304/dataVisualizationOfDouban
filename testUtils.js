var top250 = require('./src/top250.json');
processDataByGenres()
function processDataByGenres() {
    // var data = JSON.parse(window.localStorage.getItem('top250'));
    // var genresAll = ['剧情','爱情','喜剧','科幻','动作','悬疑','犯罪','恐怖','青春','励志','战争','文艺','黑色幽默','传记','情色','暴力','音乐','家庭','同性','奇幻'];
    var genresAll = [];
    var data = top250.subjects;
    var genresArr = [];
    var map = [];
    // console.log(data)
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var genres = item.genres;
        var rating = item.rating.average;
        // console.log(genres)
        for(var j in genres) {
            if(genresAll.indexOf(genres[j]) === -1){
                genresAll.push(genres[j])
                var index = genresAll.indexOf(genres[j])
                map[index] = []
                // map.genresAll[genresAll.indexOf(genres[j])].push(rating)    
            }
            map[genresAll.indexOf(genres[j])].push(rating)
            // console.log(genresAll[genresAll.indexOf(genres[j])])
            // map.genresAll[genresAll.indexOf(genres[j])].push(rating)
        }
    }
    var GenresRating = []
    for(var i = 0 ; i < genresAll.length ; i ++){
        var temp = {
            movieCount: map[i].length,
            movieRating: arrAverage(map[i]),
            movieType: genresAll[i]
        }
        GenresRating.push(temp)
    }
    console.log(GenresRating)
}

function arrAverage(arr){
    var sum = eval(arr.join("+"));
    return (sum / arr.length).toFixed(2)
}
