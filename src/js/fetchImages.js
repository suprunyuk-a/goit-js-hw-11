const axios = require('axios');

async function fetchImages(imageSearch, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=29856627-9b7b630dedd46d7774f360de0&q=${imageSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    const result = await response;
    return result;
  } catch (error) {
    console.log(error);
  }
}

export { fetchImages };
