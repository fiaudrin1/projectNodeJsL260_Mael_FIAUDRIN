'use strict';

const { Service } = require('schmervice'); 

module.exports = class FavoriteService extends Service {

     async create(idUser, favorite){

          const { Favorite } = this.server.models();
          const { Film } = this.server.models();
          favorite.id_user = idUser;
          // check if user have already this film
          let isAlreadyInFavorite;
          isAlreadyInFavorite = await Favorite.query()
          .where('id_user', favorite.id_user)
          .where('id_film', favorite.id_film)
          if(isAlreadyInFavorite.length != 0)
               throw new Error("Error : You can't add this film to your favorite list because it is already added.");

          let isExisting;
          isExisting = await Film.query()
          .where('id', favorite.id_film)
          if(isExisting.length == 0)
               throw new Error("Error : You can't add this film to your favorite list because it doesn't exist.");

          return Favorite.query().insertAndFetch(favorite);
     }    

     async delete(idUser, favorite) {
          const { Favorite } = this.server.models();

          // check if user have already this film
          let isAlreadyExisting;
          isAlreadyExisting = await Favorite.query()
          .where('id_user', idUser)
          .where('id_film', favorite.id_film)
          if(isAlreadyExisting.length == 0)
               throw new Error("Error : You can't delete this film from your favorite list because it is not inside.");

          return Favorite.query()
          .delete()
          .where('id_user', idUser)
          .where('id_film', favorite.id_film)
     }

     getList(idUser){
          const { Favorite } = this.server.models();
          const { Film } = this.server.models();

          let listFilms = Film.query().whereIn(
               "id",
               Favorite.query().select("id_film").where("id_user", idUser)
             )

          return listFilms;
     }  


}