export const getAllAlbums = async (accessToken) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Error fetching genre categories:', error);
        throw error;
    }
  }

export const getAlbum = async (accessToken, albumId) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Error fetching genre categories:', error);
        throw error;
    }
  }

  export const getSearchLists = async (accessToken, query, type) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=20`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Error fetching genre categories:', error);
        throw error;
    }
  }

  // https://api.spotify.com/v1/search?q=2024 in Music&type=playlist bu şekilde category nin playlistlerini çekebilirim

 // https://api.spotify.com/v1/search?q=Pop&type=playlist&limit=20

 // https://api.spotify.com/v1/search?q=Popüler Albümler&type=album