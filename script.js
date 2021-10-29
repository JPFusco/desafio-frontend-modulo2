const carrossel = document.querySelector(".movies");
const prox = document.querySelector(".btn-next");
const anterior = document.querySelector(".btn-prev");
const input = document.querySelector(".input");

const modal = document.querySelector(".modal");
const mTitulo = document.querySelector(".modal__title");
const mImg = document.querySelector(".modal__img");
const mSinopse = document.querySelector(".modal__description");
const mGenres = document.querySelector(".modal__genres");
const mNota = document.querySelector(".modal__average");

fetch("https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR")
    .then(promise => promise.json())
    .then(body => {
        let filmes = body.results;
        let i = 0;
        for (i; i < 5; i++) {
            const titulo = document.createElement("span");
            titulo.classList.add("movie__title");
            titulo.textContent = filmes[i].title;

            const rating = document.createElement("span");
            rating.classList.add("movie__rating");
            rating.textContent = filmes[i].vote_average;
            const estrela = document.createElement("img");
            estrela.src = "./assets/estrela.svg";
            rating.appendChild(estrela);

            const divMovieInfo = document.createElement("div");
            divMovieInfo.classList.add("movie__info");
            divMovieInfo.appendChild(titulo);
            divMovieInfo.appendChild(rating);

            const divMovie = document.createElement("div");
            divMovie.classList.add("movie");
            divMovie.dataset.movieId = filmes[i].id;
            divMovie.appendChild(divMovieInfo);
            divMovie.style.backgroundImage = `url(${filmes[i].poster_path})`;

            carrossel.appendChild(divMovie);
        }
        const filmesCarrossel = document.querySelectorAll(".movie");
        function atualizarCarrossel() {
            filmesCarrossel.forEach(filme => {
                if (!filmes[i]) {
                    filme.classList.add("hidden");
                    return;
                }

                filme.firstChild.children[0].textContent = filmes[i].title;
                filme.firstChild.children[1].textContent = filmes[i].vote_average;
                const estrela = document.createElement("img");
                estrela.src = "./assets/estrela.svg";
                filme.firstChild.children[1].appendChild(estrela);
                filme.style.backgroundImage = `url(${filmes[i].poster_path})`;
                filme.dataset.movieId = filmes[i].id;
                i++;
            });
        }
        prox.addEventListener("click", () => {
            if (i >= filmes.length) {
                i = 0;
            }
            atualizarCarrossel();
        });
        anterior.addEventListener("click", () => {
            i -= 10;
            if (i <= -4) {
                i = 15;
            }
            atualizarCarrossel();
        });

        filmesCarrossel.forEach(filme => {
            filme.addEventListener("click", () => {
                while (mGenres.firstChild) {
                    mGenres.removeChild(mGenres.lastChild);
                }
                fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${filme.dataset.movieId}?language=pt-BR`)
                    .then(res => res.json())
                    .then(body => {
                        const filmeClicado = body;
                        mTitulo.textContent = filmeClicado.title;
                        mImg.src = filmeClicado.backdrop_path;
                        mSinopse.textContent = filmeClicado.overview;
                        mNota.textContent = filmeClicado.vote_average;
                        filmeClicado.genres.forEach(genero => {
                            const novoGenero = document.createElement("span");
                            novoGenero.classList.add("modal__genre");
                            novoGenero.textContent = genero.name;
                            mGenres.appendChild(novoGenero);
                        });
                    });
                modal.classList.remove("hidden");
            });
        });

        modal.addEventListener("click", () => {
            modal.classList.add("hidden");
        })

        input.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") {
                return;
            }
            filmesCarrossel.forEach(filme => filme.classList.remove("hidden"));
            if (!input.value.trim()) {
                filmes = body.results;
                input.value = "";
                i = 0;
                atualizarCarrossel();
                return;
            }
            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`)
                .then(promise => promise.json())
                .then(body => {
                    input.value = "";
                    filmes = body.results;
                    i = 0;
                    atualizarCarrossel();
                });
        });
    });

const hLinkVideo = document.querySelector(".highlight__video-link");
const hTitulo = document.querySelector(".highlight__title");
const hRating = document.querySelector(".highlight__rating");
const hGeneros = document.querySelector(".highlight__genres");
const hLancamento = document.querySelector(".highlight__launch");
const hSinopse = document.querySelector(".highlight__description");

fetch("https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR")
    .then(res => res.json())
    .then(body => {
        const filme = body;
        hLinkVideo.style.backgroundImage = `url(${filme.backdrop_path})`
        hLinkVideo.style.backgroundSize = "cover";
        hTitulo.textContent = filme.title;
        hRating.textContent = filme.vote_average;
        let generos = "";
        filme.genres.forEach((genero, index) => {
            if (index === filme.genres.length - 1) {
                generos += `${genero.name}`
                return;
            }
            generos += `${genero.name}, `;
        });
        hGeneros.textContent = generos;
        const data = filme.release_date.split("-");
        const meses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
        const mes = meses[data[1] - 1];
        hLancamento.textContent = `${data[2]} DE ${mes} DE ${data[0]}`;
        hSinopse.textContent = filme.overview;
    });

fetch("https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR")
    .then(res => res.json())
    .then(body => {
        const trailer = body.results[1].key;
        hLinkVideo.href = `https://www.youtube.com/watch?v=${trailer}`;
    });


const mudarTema = document.querySelector(".btn-theme");
const body = document.querySelector("body");

function setDarkMode() {
    mudarTema.src = "./assets/dark-mode.svg";
    body.style.setProperty("--background-color", "#242424");
    body.style.setProperty("--color", "#FFF");
    body.style.setProperty("--shadow-color", "0px 4px 8px rgba(255, 255, 255, 0.15)");
    body.style.setProperty("--input-border-color", "#FFF");
    body.style.setProperty("--highlight-background", "#454545");
    body.style.setProperty("--highlight-color", "rgba(255, 255, 255, 0.8");
    body.style.setProperty("--highlight-description", "#FFF");
    prox.src = "./assets/seta-direita-branca.svg";
    anterior.src = "./assets/seta-esquerda-branca.svg";
    localStorage.setItem("tema", "dark");
}

const setLightMode = () => {
    mudarTema.src = "./assets/light-mode.svg";
    body.style.setProperty("--background-color", "#FFF");
    body.style.setProperty("--color", "#000");
    body.style.setProperty("--shadow-color", "0px 4px 8px rgba(0, 0, 0, 0.15)");
    body.style.setProperty("--input-border-color", "#979797");
    body.style.setProperty("--highlight-background", "#FFF");
    body.style.setProperty("--highlight-color", "rgba(0, 0, 0, 0.7");
    body.style.setProperty("--highlight-description", "#000");
    prox.src = "./assets/seta-direita-preta.svg";
    anterior.src = "./assets/seta-esquerda-preta.svg";
    localStorage.setItem("tema", "light");
}

localStorage.getItem("tema") === "dark" ? setDarkMode() : setLightMode();
mudarTema.addEventListener("click", () => {
    localStorage.getItem("tema") === "light" ? setDarkMode() : setLightMode();
});