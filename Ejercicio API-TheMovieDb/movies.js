//KEYS

const API_KEY = '6fd76393eacd04ed102f64ec12258cbf',
    BASE_URL = 'https://api.themoviedb.org/3',
    API_URL = BASE_URL+'/discover/movie?sort_by=popularity.desc&api_key='+API_KEY,
    urll = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc',
    IMG_URL= 'https://image.tmdb.org/t/p/w300',
    SEARCH_URL = BASE_URL+'/search/movie?api_key='+API_KEY,
    fetchOptions = {
        headers:{
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": 'application/json; charset=utf-8'
        }
    };
    
const d = document,
    //$movies = d.getElementById('movies'),
    $form = d.getElementById("form"),
    $search = d.getElementById("search"),
    $template = d.getElementById('movie-template').content,
    $fragment = d.createDocumentFragment(),
    $fragmentGenres = d.createDocumentFragment(),
    $tags = d.getElementById("tags");

    //Lista de generos de peliculas
    const genres = [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 12,
          "name": "Adventure"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 99,
          "name": "Documentary"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Family"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Music"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10749,
          "name": "Romance"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        },
        {
          "id": 10770,
          "name": "TV Movie"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "War"
        },
        {
          "id": 37,
          "name": "Western"
        }
    ];

const getMovies = (url)=>{

    fetch(url)
    .then(res =>
        res.json()
    )
    .then(json => {
        console.log(json);
        showMovies(json.results);
    })
    .catch((err)=>{
        let message = err.statusText || "Ocurrióoo un error al conectarse con la API de The Movie DB";
        $movies.innerHTML= `<p>Error $${err.status}: ${message}</p>` 
    })

}

const showMovies = (json)=>{
    const $moviess = d.getElementById('movies');
    let $contenedor = $moviess;
    $contenedor.parentNode.removeChild($contenedor);

    const $contenedorM = d.createElement("div");
    $contenedorM.id = "movies";
    d.querySelector("main").insertAdjacentElement("afterbegin",$contenedorM);

    const $movies = d.getElementById('movies');

    json.forEach(movie=>{
        //$template.querySelector("figure").setAttribute("data-price",el.id);
        $template.querySelector("img").src = IMG_URL+movie.poster_path;
        $template.querySelector("img").alt = movie.title;
        $template.querySelector(".movie-info h2").textContent = movie.title;
        $template.querySelector(".movie-info span").textContent = movie.vote_average;
        $template.querySelector(".movie-info span").classList.add(`${getColor(movie.vote_average)}`)
        $template.querySelector(".overview").textContent = movie.overview;

        let $clone = d.importNode($template,true);
        $fragment.appendChild($clone);

    });

    $movies.appendChild($fragment);
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

const generos = ()=>{
    genres.forEach((gender)=>{
        const $div = d.createElement("div");
        $div.classList.add("tag");
        $div.id = gender.id;
        //console.log(gender.id);
        $div.innerText = gender.name;

        //let $clone = d.importNode($div,true);
        $fragmentGenres.appendChild($div);
    });

    $tags.appendChild($fragmentGenres);
}

d.addEventListener('DOMContentLoaded',(e)=>{
    getMovies(API_URL);
    generos();
});

let selectedGenre = [];
d.addEventListener('click',(e)=>{
    if(e.target.matches(".tag")){
        if(selectedGenre.length == 0){
            selectedGenre.push(e.target.id);
            //console.log(e.target.id);
        }else{
            if(selectedGenre.includes(e.target.id)){
                selectedGenre.forEach((id, idx) => {
                    if(id == e.target.id){
                        selectedGenre.splice(idx, 1);
                    }
                })
            }else{
                selectedGenre.push(e.target.id);
            }
        }
        //console.log(selectedGenre)
        getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
        tagsSeleccionados();
    }
});


const tagsSeleccionados = ()=> {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('iluminado')
    })

    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const $tagS = document.getElementById(id);
            $tagS.classList.add('iluminado');
        });
    }
}


d.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(e.target === $form){
        const pelicula = $search.value;
        console.log(pelicula);

        if(pelicula){
            getMovies(SEARCH_URL+'&query='+pelicula);
        }else{
            getMovies(API_URL);
        }

    }
})





