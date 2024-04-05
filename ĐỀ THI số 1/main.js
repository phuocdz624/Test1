
//         We're building a football betting app (soccer for my American friends)!
// Suppose we get data from a web service about a certain game (below).
// In this challenge we're gonna work with the data. So here are your tasks:

// 1. Create one player array for each team (variables 'players1' and 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field players.
// For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. 
//So create a new array ('players Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')

//6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals who were scored (number of player names passed in)

//7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

//TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. 
//Then, cal the function again with players from game.scorerd 1

'use-strict';

//============>Lab1_1<================

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1.
console.log('******Bai 1*******');
const [players1, players2] = game.players;
console.log(players1, players2);

//2.
console.log('******Bai 2*******');
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//3.
console.log('******Bai 3*******');
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//4.
console.log('******Bai 4*******');
const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(playersFinal);

//5.
console.log('******Bai 5*******');
const { odds: { team1, x: draw, team2 } } = game; // Destructing twice.
console.log(team1, draw, team2);
//6.
console.log('******Bai 6*******');

const printGoals = (...players) => { // players: rest
  console.log('All players are scored:');
  players.forEach((player, index) => {
    console.log(`${index + 1}. ${player}`);
  });
  console.log(`The number of goals scored: ${players.length}`);
}

printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels');
printGoals(...game.scored);// ...game.scored: spread

//7.
console.log('******Bai 7*******');
const winningTeam = team1 < team2 && 'team1' || team1 > team2 && 'team2' || 'draw';
console.log(`The winning team is: ${winningTeam}`);

//Bai 2.
const calcAverageHumanAge = function (ages) {
  // 1.
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  // 2.
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);

  // 3.Cách 1
  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  //3.Cách 2
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// Bai 3.

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded',img);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
