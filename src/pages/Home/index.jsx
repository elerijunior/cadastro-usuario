import './style.css'
import Trash from '../../assets/trash.svg'
import Pen from '../../assets/pen.svg'
import { useState } from 'react'

function Home() {
  const [users, setUsers] = useState([])

  //iniciando inputs zerados
  const [name, setName] = useState ('')
  const [age, setAge] = useState ('')
  const [email, setEmail] = useState ('')

  //estado para editar usuario por id
  const [editengid, setEditingId] = useState(null)

 function saveUser() {
  
  //validar entrada dos dados
  if(!name.trim() || !email.trim() || age === ''){
    alert('Preencha todos os campos!')
    return
  }
  //editar usuario
  if(editengid){
    const updateUser = users.map(user =>
      user.id === editengid ? {
        ...user,
        Name: name, 
        Age: age, 
        Email: email
      } : user
    )
    setUsers(updateUser)
    setEditingId(null)

  // criar usuario
  } else {
    const newUser = { 
      id: Date.now().toString(), 
      Name: name, 
      Age: age, 
      Email: email}
    setUsers([...users,newUser])
  }
  // Limpar campos
    setName('')
    setAge('')
    setEmail('')
  }

  //deletar usuario
  function deleteUser(id){
    setUsers(users.filter(user => user.id !== id))
  }

  //acessar usuario para editar
  function editUser(user) {
    setName(user.Name)
    setAge(user.Age)
    setEmail(user.Email)
    setEditingId(user.id)
  }

  return (
        <div className="container">
          <form>
            <h2>{editengid ? 'Editar Usuário' : 'Cadastro de Usuários'}</h2>
            
            <input 
            onChange={e => setName(e.target.value)}
            name='name' 
            type='text' 
            placeholder='Nome'
            value={name}
            />
            
            <input
            onChange={e => setAge(e.target.value)}
            name='age' 
            type='number' 
            placeholder='Idade'
            value={age}
            />

            <input
            onChange={e => setEmail(e.target.value)}
            name='email'
            type='email' 
            placeholder='E-mail'
            value={email}
            />

            <button
            onClick={saveUser}
            className='cta-button'
            type='button'
            >
              {editengid ? 'Salvar' : 'Cadastrar'}
            </button>

          </form>
         
          {/* lista de usuários */}
          {users.map( user => (
            <div key={user.id} className='card-user'>
              <div>
                <p>Nome: <span>{user.Name}</span> </p>
                <p>Idade: <span>{user.Age} </span></p>
                <p>Email: <span>{user.Email}</span> </p>
              </div>
            <div className='action-buttons'>
              <button
              onClick={() => editUser(user)}
              className='edit-btn'
              >
                <img src={Pen} alt="Editar" />
              </button>

              <button
              onClick={() => deleteUser(user.id)}
              className='trash-btn'
              >
                <img src={Trash} alt='Excluir'/>
              </button>
            </div>
          </div>
          ))}
        </div>   
  )
}

export default Home