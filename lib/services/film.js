'use strict';

const { Service } = require('schmervice'); 

module.exports = class FilmService extends Service {

        create(film){

             const { Film } = this.server.models();
        
             return Film.query().insertAndFetch(film);
        }    

        update(film) {
          const { Film } = this.server.models();

          return Film.query().findById(film.id).patch({
            title: film.title,
            description: film.description,
            releaseDate: film.releaseDate,
            director: film.director,

            type: film.type,
            duration: film.duration,
          });
        };

        getAllFilms(){
            const { Film } = this.server.models();
        
            // requête d'objection pour récup tous les users
            return Film.query();
        }   
}