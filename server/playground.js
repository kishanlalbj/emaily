// fetchAlbums = () => {
//   fetch("https://rallycoding.herokuapp.com/api/music_albums")
//     .then(res => res.json())
//     .then(albums => console.log(albums))
//     .catch(err => console.log(err));
// };

const fetchAlbums = async () => {
  const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums");
  const albums = await res.json();
  console.log(albums);
};

fetchAlbums();
