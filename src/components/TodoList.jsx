import React, { useEffect, useState } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm';

function TodoList() {
    const [todos, setTodos] = useState([]);

    

    const addTodo = todo=>{
        if(!todo.text || /^\s*$/.test(todo.text)){
            return;
        }
        

        const newTodos = [todo,...todos];
        setTodos(newTodos);
        saveData(newTodos);
    }

    const saveData = (todo) => {
        localStorage.setItem("TodoList",JSON.stringify(todo))
    }

    const getData = ()=>{
        if(localStorage.getItem("TodoList")){
            setTodos(JSON.parse(localStorage.getItem("TodoList")))
        }
        else{
            setTodos([]);
        }
    }

    const removeTodo = id =>{
        const remoceArr = [...todos].filter(todo => todo.id !== id);
        setTodos(remoceArr);
    }

    const updateTodo = (todoid,newValue) =>{
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoid ? newValue : item)))
    }

    const completeTodo = id =>{
        let updatedTodos = todos.map(todo =>{
            if(todo.id === id){
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    // useEffect(() => {
    //     getData();
    //   });

    return (
        <div>
            <h1>what's the plan for today</h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
    )
}

export default TodoList
