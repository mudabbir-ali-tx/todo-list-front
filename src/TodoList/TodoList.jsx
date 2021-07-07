import React, { Component } from 'react'
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import Grid from '@material-ui/core/Grid'
const api_url = `https://rails-tx-backend.herokuapp.com/api/v1/todos`
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.updateTodoList = this.updateTodoList.bind(this);
    }

    componentDidMount() {
        this.getTasks();
    }
    getTasks() {
        fetch(api_url)
            .then(response => response.json())
            .then(response_items => {

                this.setState({
                    items: response_items
                })
            });

    }
    updateTodoList(item) {
        let _items = this.state.items
        _items.unshift(item)
        this.setState({
            item: _items
        })
        // document.findElementById("todo_list")
        //     .insertAdjacentHtml("afterbegin", <TodoItem key={item.id} item={item})

    }
    deleteItem = (item) => {
        let deleteURL = api_url + `/${item.id}`;



        fetch(deleteURL, {
            method: "DELETE"
        }).then(response => response.json())
            .then(response => {


                let newList = this.state.items;
                let index = newList?.indexOf(item)
                newList?.splice(index, 1);
                this?.setState({
                    items: newList

                })

            })
    }

    render() {
        console.log(this.state.items)

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TodoForm api_url={api_url} updateTodoList={this.updateTodoList} />

                </Grid>
                <Grid item xs={12} id="todo_list">
                    {this.state.items.map((item) => (

                        <TodoItem key={item.id}
                            item={item}
                            deleteItem={this.deleteItem} />

                    ))}
                </Grid>


            </Grid >
        );
    }
}

export default TodoList;
