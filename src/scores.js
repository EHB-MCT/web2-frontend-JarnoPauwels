window.onload = function(){
    document.getElementById('scoreContainer').innerHTML = "";
    document.getElementById('scoreContainer').style.display = "block";

        fetch(`https://web2-courseproject-jarno.herokuapp.com/coursedata`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(response => {
            return response.json()
        }).then(async data => {
            console.log('Success:', data);
            var array = data;
            console.log(array);
    
            let htmlString = "";
            array.forEach(element => {
                    htmlString += 
                    `   <div class="rowContainer>
                          <div class="row">
                            <div class="col">
                              <form id="deleteGame">         
                                <button type="submit" onclick="deleteScore();">Delete Score</button>
                              </form>
                            </div>
                          </div>
                            <div class="row">
                                <div class="col">
                                    <h1 id="userName">${element.user}</h1>
                                </div>
                                <div class="col">
                                    <h1 id="gameName">${element.game}</h1>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">    
                                    <p id="gameScore">Score: ${element.score}</p>
                                </div>   
                                <div class="col">       
                                    <p>
                                      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${element._id}" aria-expanded="false" aria-controls="collapseExample" id="gameId"value="${element._id}">
                                        Description
                                      </button>
                                    </p>
                                      <div class="collapse multi-collapse" id="collapse${element._id}">
                                        <div class="card card-body">
                                            <div class="row">
                                              <div class="col" id="gameDesc">
                                                ${element.desc}
                                              </div>
                                              <div class="col">
                                                <img src="${element.img}" alt="">
                                              </div>
                                            </div>
                                        </div>
                                      </div>
                                </div>
                            </div>
                        </div>           
                    `;
                document.getElementById('scoreContainer').innerHTML = htmlString;
            });
        });
}

async function deleteScore (){
  let id  = document.getElementById("gameId").value;
  
  console.log (id);
  
    //deleteGame
      fetch(`https://web2-courseproject-jarno.herokuapp.com/coursedata/${id}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({
                  _id: id
          })
      }).then(response => {
          return response.json()
      }).then(async data => {
          console.log(data);
      });
      document.getElementById('deleteGame').addEventListener('submit', (e) => {
      e.preventDefault();
    });

}