/*DarrayIDescrizione
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore,
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
Non è necessario creare date casuali
Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const risultatoHtml = document.getElementById("container");

function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
}


for(let i = 0; i < posts.length; i++){
    let dataLocale = new Date(posts[i].created)
    let profilePicHTML = '';

    if(posts[i].author.image == null){
        const initials = getInitials(posts[i].author.name);
        profilePicHTML = profilePicHTML = `<div class="profile-pic-default">${initials}</div>`;
    }else{
        profilePicHTML = `<img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">`;
    }

    risultatoHtml.innerHTML+= `
    <div class= "post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${profilePicHTML}       
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${posts[i].author.name}</div>
                    <div class="post-meta__time">${dataLocale.toLocaleDateString()}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${posts[i].content}</div>
        <div class="post__image">
            <img src="${posts[i].media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#like-counter-${posts[i].id}" data-postid="${posts[i].id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${posts[i].id}" class="js-likes-counter">${posts[i].likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `
};

function updateLikes(postId, increment) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === parseInt(postId)) {
            posts[i].likes += increment;

            const likeCounter = document.getElementById(`like-counter-${postId}`);
            if (likeCounter) {
                likeCounter.textContent = posts[i].likes;
            }
        }
    }
}

const likeButton = document.querySelectorAll(".js-like-button")


const arrayID = []
likeButton.forEach( button => {
    button.addEventListener("click", function(event){
        event.preventDefault();
        

        const postId = button.getAttribute('data-postid');
        

        if (arrayID.includes(postId)) {
            
            arrayID.splice(arrayID.indexOf(postId), 1);
            button.classList.remove("like-button--liked") 
            updateLikes(postId, -1); 

        } else {
           
            arrayID.push(postId);
            button.classList.add("like-button--liked"); 
            updateLikes(postId, 1);
        }
    });
});

