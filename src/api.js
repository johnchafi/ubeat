const NoSeCurEntry = "unsecure";
export const baseUrl = "https://ubeat.herokuapp.com/";
const md5 = require("md5");

// const name = "owner";
// const email = "florian-aurelien.amette.1@ulaval.ca";
const id = "5e6d60b472a35a00046facc0";

export const getPlaylists = () => {
  return fetch(`${baseUrl}${NoSeCurEntry}/playlists`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch playlist");
    });
};
export const getArtistsInfos = artistId => {
  return fetch(`${baseUrl}${NoSeCurEntry}/artists/${artistId}`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch information d'artist");
    });
};
export const getAlbumsInfos = artistId => {
  return fetch(`${baseUrl}${NoSeCurEntry}/albums/${artistId}`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch albums");
    });
};
export const getOneAlbumsInfos = collectionId => {
  return fetch(`${baseUrl}${NoSeCurEntry}/albums/${collectionId}`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch albums");
    });
};

export const getAllMusicInOnAlbum = collectionId => {
  return fetch(`${baseUrl}${NoSeCurEntry}/albums/${collectionId}/tracks`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch albums");
    });
};

//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

let urlencoded = new URLSearchParams();
urlencoded.append("email", "florian-aurelien.amette.1@ulaval.ca");
urlencoded.append("password", "ulaval2020");

let requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};
export const getLoginInfo = () => {
  return fetch("https://ubeat.herokuapp.com/login", requestOptions)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => console.log("error", error));
};

export const getPlalistAtSpecificId = () => {
  return fetch(`${baseUrl}${NoSeCurEntry}/users/${id}/playlists/`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch albums");
    });
};

//-----------------------------------------------------------------------------------------------//
//---------------------------------- Login and Sing up -----------------------------------------------//
//-----------------------------------------------------------------------------------------------//

export const LoginApi = params => {
  return fetch("https://ubeat.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params,
    redirect: "follow"
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => console.log("error", error));
};


export const SignUp = params => {
  return fetch("https://ubeat.herokuapp.com/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params,
    redirect: "follow"
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => console.log("error", error));
};


//-----------------------------------------------------------------------------------------------//
// Implémentation de la méthode POST avec `fetch`
// Permet de créer une nouvelle playlist et retourne la tache crée avec son id.
export const createPlaylist = (name, owner) => {
  return fetch(`${baseUrl}${NoSeCurEntry}/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      owner: owner
    })
  })
    .then(response => response.json())
    .then(task => {
      // Il est important de retourner task ici car c'est le serveur qui fourni l'id de la tâche
      // On devra utiliser cet id pour les update ou les delete
      return task;
    })
    .catch(() => {
      console.error("unable to create tasks");
    });
};

// Implémentation de la méthode DELETE avec `fetch`
// Permet de suprimmer une tache existante
export const deletePlaylist = id => {
  return fetch(`${baseUrl}${NoSeCurEntry}/playlists/${id}`, {
    method: "DELETE"
  }).catch(() => {
    console.error("unable to delete tasks");
  });
};

// Implémentation de la méthode PUT avec `fetch`
// Permet d'écraser une tache existante
export const updatePlaylistAtSpecificId = (name, owner, id) => {
  return fetch(`${baseUrl}${NoSeCurEntry}/playlists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      owner: owner
    })
  })
    .then(response => response.json())
    .then(task => {
      return task;
    })
    .catch(() => {
      console.error("unable to update tasks");
    });
};

//-----------------------------------------------------------------------------------------------//
//----------------------------- Music        -------------------------------------//
//-----------------------------------------------------------------------------------------------//
//addMusicInPlaylist
export const addMusicInPlaylist = id => {
  return fetch(`${baseUrl}${NoSeCurEntry}/playlists/${id}/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(task => {
      // Il est important de retourner task ici car c'est le serveur qui fourni l'id de la tâche
      // On devra utiliser cet id pour les update ou les delete
      return task;
    })
    .catch(() => {
      console.error("unable to create tasks");
    });
};

//deleteMusicInPlaylist
export const deleteMusicInPlaylist = (playlistId, id) => {
  return fetch(
    `${baseUrl}${NoSeCurEntry}/playlists/${playlistId}/tracks/${id}`,
    {
      method: "DELETE"
    }
  ).catch(() => {
    console.error("unable to delete tasks");
  });
};

//-----------------------------------------------------------------------------------------------//
//-----------------------------  Log In , Register and log Out       -------------------------------------//
//-----------------------------------------------------------------------------------------------//


var myHeads = new Headers();
myHeads.append(
  "Authorization",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZTZkNjBiNDcyYTM1YTAwMDQ2ZmFjYzAiLCJleHAiOjE1ODcxMDMyMDYxNDJ9.IDYh9i_FrSkEIEM8hcGTHixEtt5GcO79EZUNqs2-06g"
);

var request = {
  method: "GET",
  headers: myHeads,
  redirect: "follow"
};

// global search
export const getGlobalSearchApi = (query, limit, data) => {
  const queryParams = { q: query, limit: limit };
  const queryString = new URLSearchParams(queryParams).toString();
  return fetch(`https://ubeat.herokuapp.com/search?${queryString}`, {
    method: "GET",
    redirect: "follow",
    headers: data
  })
    .then(response => response.json())
    .then(json => {
      return json.results;
    })
    .catch(error => console.log("error", error));
};
/// search by album
export const getAlbumSearch = (query, limit, data) => {
  const queryParams = { q: query, limit: limit };
  const queryString = new URLSearchParams(queryParams).toString();
  return fetch(
    `https://ubeat.herokuapp.com/search/albums?${queryString}`,
    {
      method: "GET",
      redirect: "follow",
      headers: data
    }
  )
    .then(response => response.json())
    .then(json => {
      return json.results;
    })
    .catch(error => console.log("error", error));
};

/// search by song
export const getSongSearch = (query, limit, data) => {
  const queryParams = { q: query, limit: limit };
  const queryString = new URLSearchParams(queryParams).toString();
  return fetch(
    `https://ubeat.herokuapp.com/search/tracks?${queryString}`,
    {
      method: "GET",
      redirect: "follow",
      headers: data
    }
  )
    .then(response => response.json())
    .then(json => {
      return json.results;
    })
    .catch(error => console.log("error", error));
};


/// search by artist
export const getArtistSearch = (query, limit, data) => {
  const queryParams = { q: query, limit: limit };
  const queryString = new URLSearchParams(queryParams).toString();
  return fetch(
    `https://ubeat.herokuapp.com/search/artists?${queryString}`,
    {
      method: "GET",
      redirect: "follow",
      headers: data
    }
  )
    .then(response => response.json())
    .then(json => {
      return json.results;
    })
    .catch(error => console.log("error", error));
};

///search by user name
export const getUserSearch = (query, limit) => {
  const queryParams = { q: query, limit: limit };
  const queryString = new URLSearchParams(queryParams).toString();
  return fetch(
    `https://ubeat.herokuapp.com/search/users?${queryString}`,
    request
  )
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => console.log("error", error));
};

// get avatar d'utilisateur

export const getAvatarImage = email => {
  const urlAvatar = md5(email.toLowerCase());

  // console.log(urlAvatar);
  return fetch(`https://www.gravatar.com/avatar/${urlAvatar}`)
    .then(response => {
      return response.url;
    })
    .catch(error => console.log("error", error));
};

//n get information de l'artiste
var requestOpt = {
  method: 'GET',
  redirect: 'follow'
};
export const  getInfoArtist = artist =>{
  return fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=a50616993c790e7cc95869b79ce98252&format=json`, requestOpt)
    .then(response => response.json())
    .then(json => {
      return {
        json
      }
    })
    .catch(error => console.log("error", error));
};



export const getAllUsers = (requestParameters)=> {
  return fetch(`https://ubeat.herokuapp.com/users/`, requestParameters)
    .then(response => response.json())
    .then(json => {return json})
    .catch(error => console.log('error', error));

}



export const getInfoUser = (idUser, requestParameters)=> {
  return fetch(`https://ubeat.herokuapp.com/users/${idUser}`, requestParameters)
    .then(response => response.json())
    .then(json => {return json})
    .catch(error => console.log('error', error));

}



export const getPlaylistUser = (idUser, requestParameters)=> {
  return fetch(`https://ubeat.herokuapp.com/users/${idUser}/playlists`, requestParameters)
    .then(response => response.json())
    .then(json => {
      return json})
    .catch(error => console.log('error', error));



}






