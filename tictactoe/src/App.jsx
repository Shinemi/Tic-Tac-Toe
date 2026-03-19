import { useState } from 'react'
import './App.css'

const WINNING_LINES = [
  [0,1,2], [3,4,5], [6,7,8], //lignes
  [0,3,6], [1,4,7], [2,5,8], //colonnes
  [0,4,8], [2,4,6]           //diagonales
]

function GetWinner(board){
    //parcourir chaque ligne gagnate possible définie dans WINNING_LINES
    //Chaque lignes est un tableau de 3 indices [a,b,c] représentant les positions à vérifier
    for(const [a , b , c] of WINNING_LINES){
      // vérifie si les trois conditions sont remplies pour une victoire
      // 1. board[a] n'est pas null (la case 'a' doit etre occupée)
      // 2. board[a] === board[b] (contiennent le meme symbole)
      // 3. board[a] === board[c] (contiennent le meme symbole)
      if (board[a] && board[a] === board[b] && board[a] === board[c]){
        // si les trois cases correspondent 
        // retourne le symbole ('X' ou 'O') comme gagnant
        return board[a]
      }
    }

    // si aucune ligne gagnante n'est trouvée, retourne null (pas de gagnant)
    return null
    
}

function coupOrdi (newBoard) {
  const caseJouables = newBoard.map((cell, i) => cell === null ? i : null).filter(i => i !== null)
  const coupOrdi = Math.floor(Math.random() * caseJouables.length)

  return coupOrdi
}

function App() {

  //utilisation de useState pour le tableau pour un nouveau rendu à chaque changement
  const [board, setBoard]= useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)
  const [scores, setScores]= useState([0,0])

  const winner = GetWinner(board)
  const isDraw = !winner && board.every(Boolean) // retourne true si chaque element du tableau est "truthy", cad ni null, ni undefined, ni une chaine vide

  function handleClick(i){
    //Est ce qu'il n'y a pas deja quelque chose sur la case ?
    if (board[i] || winner) return
    //est-ce qu'il y a un vainqueur ?
    const newBoard = [...board] // crée une copie conforme du tableau pour pouvoir le modifier
    newBoard[i] = isX ? 'X' : coupOrdi(newBoard) // old version : 'O'
    setBoard(newBoard)
    setIsX(!isX)
    const newWinner = GetWinner(newBoard)
    if (newWinner==='X') {
      setScores(s => [s[0]+1, s[1]])

    } else if (newWinner === "O"){
      setScores(s => [s[0], s[1]+1])
    }

    
  }

  function reset (){
      setBoard(Array(9).fill(null))
      setIsX(true)      
  }



  return (
      <div className='game'>
        <h1>Tic Tac Toe</h1>

          <p className='score'>
            x : {scores[0]}  <br />o : {scores[1]}
          </p>

          <p className='status'>
            {winner ?
              <span>Gagnant : <img className='status-img' src={winner === 'X' ? '/cross.png' : '/circle.png'}/></span>
              : isDraw ? "Match nul !"
              : <span>Tour du joueur : <img className='status-img' src={isX ? '/cross.png' : '/circle.png'}/></span>
            }
          </p>

        <div className='board'>
            {board.map((cell,i) => (
              <button key={i} className='cell' onClick={() => handleClick(i)}>
                {cell && <img src={cell === 'X' ? '/cross.png' : '/circle.png'}/>}
              </button>
          
            ))}
        </div>

            <button className="reset" onClick={reset}>Rejouer</button>

      </div>
    )
}

export default App
