import React, {useState ,useEffect} from 'react';
import axios from 'axios';


const todo = props => {
const [todoName,setTodoName] = useState('');
const [submittedTodo, setSubmittedTodo] = useState(null);
const [todoList,setTodoList] = useState([]);

//const [todoState, setTodoState] = useState({userInput:'', todoList:[]})


useEffect(() => {
    axios.get('https://webpacks-4e54b.firebaseio.com/todo.json')
    .then(result => {
        console.log(result);
        const todoData = result.data;
        const todos = [];
        for (const key in todoData){
            todos.push({id:key,name:todoData[key].name})
        }
        setTodoList(todos);
    });
    return () => {
        console.log('clean up');
    };

}, []);

const mouseMoveHandler = event => {
    console.log(event.clientX,event.clientY);
};

useEffect(() => {
document.addEventListener('mousemove',mouseMoveHandler);
return() =>{
    document.removeEventListener('mousemove',mouseMoveHandler);
    };  

}, []);

useEffect(() => {
    if(submittedTodo){
    setTodoList(todoList.concat(submittedTodo));
    }
},
[submittedTodo]
);   

const inputchangehandler = event => {
    setTodoName(event.target.value);
    // setTodoState({
    // userInput:event.target.value,
    // todoList:todoState.todoList
    // });
};
const nameChangeHandler = () => {
   
//    setTodoState({
//     userInput : todoState.todoList,
//     todoList: todoState.todoList.concat(todoState.userInput)
//    });

        axios.post('https://webpacks-4e54b.firebaseio.com/todo.json',{name:todoName})
        .then(res => { 
            setTimeout(() =>{
            console.log(res);
            const todoItem = {id:res.data.name, name:todoName};
            setSubmittedTodo(todoItem);
        }, 3000);
    })
        .catch(err => {
            console.log(err);
        });
    };

    return(
        <React.Fragment>
            <input type="text" 
            placeholder="todo"
            onChange={inputchangehandler}
            value={todoName}
            //value={todoState.userInput}
            />
            <button type = "button" onClick={nameChangeHandler}>ADD</button>
            <ul>{todoList.map( todo => (
               <li key={todo.id}>{todo.name}</li> 
            ))}</ul>
        </React.Fragment>
    )    
}

export default todo;