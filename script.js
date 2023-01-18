//Initial References
let movieNameRef = document.getElementById("title-search-box");
let movieYearRef = document.getElementById("year-search-box");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetch response from API
let Movie = () => {
  let movieName = movieNameRef.value;
  let yearName = movieYearRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&y=${yearName}&apikey=ee4b7d4a`;
  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h4 class="msg">Please Enter A Movie Name</h4>`;
  }
  //If input field is NOT empty
  else {
    fetch(url)
      .then((data) => data.json())
      .then((response) => {
        //If movie exists in responsebase
        if (response.Response == "True") {
          result.innerHTML = `
          <div class="info">
                <img src=${response.Poster} class="poster">
                <div>
                  <h4>${response.Title}</h4>
                    <div class="rating">
                        <h4>imdbRating:</h4>
                        <img src="star-icon.svg">
                        <h4>${response.imdbRating}</h4>
                    </div>
                    <div class="details">
                         
                        <span><b>Released Date:</b> ${response.Released}</span>
                        <span><b>Duration:</b> ${response.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${response.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Language:</h3>
            <p>${response.Language}</p>
            <h3>Actors:</h3>
            <p>${response.Actors}</p> 
            <h3>Writer:</h3>
            <p>${response.Writer}</p>
            <h3>Director:</h3>
            <p>${response.Director}</p>
            <h3>Plot:</h3>
            <p>${response.Plot}</p>
           
        `;
        }
        else {
          result.innerHTML = `<h3 class='msg'>${response.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h4 class="msg">Error Occured</h4>`;
      });
  }
};
searchBtn.addEventListener("click", Movie);
window.addEventListener("load", Movie);