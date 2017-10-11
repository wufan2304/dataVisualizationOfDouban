import axios from 'axios';
// import top250 from '../top250.json';

export default function getDataFromDouban(movieType) {
    return new Promise(function (resolve, reject) {
        if (window.localStorage.getItem(movieType) && window.localStorage.getItem(movieType) !== []) {
            // 如果本地存储有数据
            resolve(JSON.parse(window.localStorage.getItem(movieType)));
        } else {
            // 如果本地没有存储数据
            axios.get('/v2/movie/' + movieType + '?count=100').then((res) => {
                var data = processDataForSave(res.data);
                window.localStorage.setItem(movieType, JSON.stringify(data));
                // console.log(data)
                resolve(data);
            })
        }
   
    })
}

function processDataForSave(res) {
    var length = res.count;
    var subjects = res.subjects;
    var temps = [];
    for (var i = 0; i < length; i++) {
        var item = subjects[i];
        if (item && item.rating && item.rating.average !== 0) {
            var rating = item.rating.average;
            var year = item.year;
            var collectionCount = item.collect_count;
            var title = item.title;
            var id = item.id;
            var poster = item.images.large;
            var genres = item.genres;
            var temp = { Rating: rating, Year: year, Count: collectionCount, Name: title, Id: id, Poster: poster, Genres: genres };
            temps.push(temp);
        }
    }
    // 按上映日期排序
    temps.sort((a, b) => {
        return (a.Year - b.Year);
    })
    return temps;
}

export function processDataByGenres() {
    return new Promise(function(resolve, reject){
        getDataFromDouban('top250').then((res)=>{
            var top250 = res;
            // var genresAll = ['剧情','爱情','喜剧','科幻','动作','悬疑','犯罪','恐怖','青春','励志','战争','文艺','黑色幽默','传记','情色','暴力','音乐','家庭','同性','奇幻'];
            var genresAll = [];
            var data = top250;
            var genresArr = [];
            var map = [];
            var map2 = [];
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var genres = item.Genres;
                var rating = item.Rating;
                for(var j in genres) {
                    if(genresAll.indexOf(genres[j]) === -1){
                        genresAll.push(genres[j])
                        var index = genresAll.indexOf(genres[j])
                        map[index] = []
                        map2[index] = []
                    }
                    map[genresAll.indexOf(genres[j])].push(rating)
                    map2[genresAll.indexOf(genres[j])].push(item.Name);
                }
            }
            var GenresRating = []
            for(var i = 0 ; i < genresAll.length ; i ++){
                var temp = {
                    movieCount: map[i].length,
                    movieRating: arrAverage(map[i]),
                    movieRatings: map2[i].toString(),
                    movieType: genresAll[i]
                }
                GenresRating.push(temp)
            }
            resolve(GenresRating)
        })  
    })
}

function arrAverage(arr){
    var sum = eval(arr.join("+"));
    return (sum / arr.length).toFixed(2)
}
