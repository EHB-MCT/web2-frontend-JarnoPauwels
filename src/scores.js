window.onload = function(){
        fetch(`https://web2-courseproject-jarno.herokuapp.com/coursedata`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },

        }).then(response => {
            return response.json()
        }).then(async data => {
            console.log('Success:', data);
            var array = data;
            console.log(array);
    
            let htmlString = ` `;
            array.forEach(element => {
                    htmlString += 
                    `   <div class="rowContainer custom-rc">
                          <div class="row">
                            <div class="col">
                              <form id="deleteGame" onSubmit="window.location.reload()">         
                                <button type="submit" class="btn btn-primary custom-btn-del" onclick="deleteScore();">Delete Score</button>
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
                                      <button class="btn btn-primary custom-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${element._id}" aria-expanded="false" aria-controls="collapseExample" id="gameId"value="${element._id}">
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
  // Only deletes first object in array
  let id  = document.getElementById("gameId").value;
  
  console.log (id);
  
    //deleteGame
      fetch(`https://web2-courseproject-jarno.herokuapp.com/coursedata/${id}`, {
          mode: 'cors',
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
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
    alert("Score Deleted");
}