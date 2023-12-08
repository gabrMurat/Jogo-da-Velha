const cellElements = document.querySelectorAll('[data-cell]');
let isCircleTurn = false;
const winningMensageText = document.querySelector('[data-winning-text]');
const winningMensage =  document.querySelector('[data-winning]')
const dataButton = document.querySelector('[data-button]')
const dataReset = document.querySelector('[dataReset]');
let vitoria1 = 0;
let vitoria2 = 0;

const winningCombination = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

window.onload =	function() { document.getElementById('table').style.visibility = 'hidden' };

function startGame(){
    var nomeJogador1 = document.getElementById('jogador1').value;
	var nomeJogador2 = document.getElementById('jogador2').value;

    document.getElementById('X').innerText = nomeJogador1;
    document.getElementById('O').innerText = nomeJogador2;

    document.getElementById('cadastro').style.visibility = 'hidden'
    document.getElementById('table').style.visibility = 'visible';
    for (const cell of cellElements){
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    }

    isCircleTurn = false;
    winningMensage.classList.remove("showWinningMensage");

}

function startIA(){
    let nomeJogador1 = document.getElementById('jogador1').value;
	let nomeJogador2 = "AMEBA IA";

    document.getElementById('X').innerText = nomeJogador1;
    document.getElementById('O').innerText = nomeJogador2;

    document.getElementById('cadastro').style.visibility = 'hidden';
    document.getElementById('table').style.visibility = 'visible';
    for (const cell of cellElements){
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    }
    isCircleTurn = false;
    winningMensage.classList.remove("showWinningMensage");
}

const endGame = (isDraw) => {
    var nomeJogador1 = document.getElementById('jogador1').value;
	var nomeJogador2 = document.getElementById('jogador2').value;
    if (isDraw){
        winningMensageText.innerText = 'Empate'
    } else if(isCircleTurn) {
        winningMensageText.innerText = nomeJogador2 + ' Venceu!'
        vitoria1++;
        document.getElementById('nVitorias2').innerHTML = vitoria1;
    } else{
        winningMensageText.innerText = nomeJogador1 + ' Venceu!'
        vitoria2++;
        document.getElementById('nVitorias1').innerHTML = vitoria2;
    }

    winningMensage.classList.add("showWinningMensage")
}

function reset(){
    vitoria1 = 0;
    vitoria2 = 0;

    document.getElementById('nVitorias2').innerHTML = vitoria1;
    document.getElementById('nVitorias1').innerHTML = vitoria2;

    document.getElementById('cadastro').style.visibility = 'visible'
    document.getElementById('table').style.visibility = 'hidden';

    document.getElementById('jogador2').value = '';
    document.getElementById('jogador1').value = '';

    
}

const checkForWin = (currentPlayer) =>{
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () =>{
        return [...cellElements].every(cell => {
            return cell.classList.contains('x') || cell.classList.contains('circle');
        })
}


const placeMark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd)
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
}


const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw()

    if(isWin){
        endGame(false);
    } else if (isDraw){
        endGame(true)
    } else { 
        swapTurns()
    }

    

}

dataButton.addEventListener('click', startGame)


