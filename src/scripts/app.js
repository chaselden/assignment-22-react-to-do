const Backbone = require('backbone')
const React = require('react')
const ReactDOM = require('react-dom')
const $ = require('jquery')


const TodoListItems = React.createClass({
  getInitialState: function() {
    return {
        items: []
        // items: [{text:'todo', completed: false},{text:'todo', completed: false}]
    };
  },
   updateItems: function(newItem) {

     let newObj = {text: newItem, completed: false}

    let allItems = this.state.items.map(function(el){
      return el
    })

    allItems.unshift(newObj)

      this.setState({items: allItems});
      //** write funct/method to send items to database**//
   },

   updateCheck: function(item) {
    //  console.log('parentNode', item);
     console.log("text", item.innerText);
     let text = item.innerText

     let allItems = this.state.items.map(function(el){
       if(el.text === text) {
         el.completed = !el.completed
       }
       return el
     })

     this.setState({items: allItems});

   },

   removeItems(){
     console.log("state", this.state.items);
      let newState = this.state.items.filter(function(el){

        return el.completed === false
      })

        this.setState({items: newState})
   },


    render: function() {
      return (
        <div>
  				<TodoBanner/>
  				<TodoList items={this.state.items} onCheck={this.updateCheck}/>
  				<TodoForm items={this.state.items} onFormSubmit={this.updateItems} removeCompleted={this.removeItems}/>
  			</div>
      );
    }
})
var TodoBanner = React.createClass({
	  render: function(){
		  return (
			  <h1>Sh¡t  I  Gotta  Do</h1>

		  )
	  }
});
var TodoList = React.createClass({
    handleCheck: function(e){
      console.log('event', e.target.parentNode);
      this.props.onCheck(e.target.parentNode);
    },

  	render: function() {
        let self = this

    		return(

               <ul className= "to-do-container">
                 {this.props.items.map(function(item, i){return <div key={i} ><li><input onChange={self.handleCheck} type="checkbox" checked={item.completed}/>{item.text}</li></div>})}
               </ul>
       )
  	},

});

var TodoForm = React.createClass({

	handleSubmit: function(e){
		e.preventDefault();
    // if(this.refs.itemInput.value === 0)
    // this.refs.itemInput.value = this.refs.itemInput
		this.props.onFormSubmit(this.refs.itemInput.value);
		this.refs.itemInput.value = ''
		return
	},

  handleRemove: function(e){
    e.preventDefault();
    this.props.removeCompleted()
    },

  // %%%%%%%%%%%%% SHIT SUBMISSION AREA %%%%%%%%%%%%%%% //
	render: function(){
    		return(
          <div>
        			<form onSubmit={this.handleSubmit}>
                <input type='submit' value='Add Sh¡t'/>
                  <br/>
        				<input type='text'  ref='itemInput' />
                  <br/>
                <input type="button" value="Remove Sh¡t" onClick={this.handleRemove}/>
        			</form>
          </div>
		)
	}

});

ReactDOM.render(<TodoListItems/>, document.querySelector('#app-container'))
