$(document).ready(function(){
  $('#randomize').click((event)=>{
    console.log('getting a word');
    generateRandomWord()
  })

  async function generateRandomWord(){
    try {
      const url = 'https://sat-words-api.herokuapp.com/api/v1/words/random'
      const response =
        await axios.get(url)
        updateWordAndDefinition(response)
        scrabbleScore(response.data.name);
    }catch (error){
      console.log((error));
    }
  }

  async function scrabbleScore (word){
    try{
      const url = 'https://scrabble-scorer-api.herokuapp.com/api/v1/words/score'
      const response =
        await axios.get(url, {
          params: {
            word: word
          }
        })
        console.log(response.data.score);
        updateScrabbleScore(response.data.score)
    } catch (error){
      console.log(error);
    }
  }

  function updateWordAndDefinition (response){
    $('#word').text(response.data.name)
    //color name
    $('#definition').text(response.data.definition)
    //color definition
  }

  function updateScrabbleScore(score){
    $('#score').text(score)
  }
})
