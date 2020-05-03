import {createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE
const addExpense = (
	{ 
		description = '', 
		note ='', 
		amount = 0, 
		createdAt = 0
	}={}
	) => ({
		type: 'ADD_EXPENSE',
		expense:{
			id:uuid(),
			description,
			note,
			amount,
			createdAt
		}
});

//REMOVE_EXPENSE
const removeExpense = ({ id }) =>({
	type: 'REMOVE_EXPENSE',
	id
	});

// EDIT EXPENSE
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id, 
	updates
});


const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
  	case 'ADD_EXPENSE':
  		return [...state, action.expense];
  	case 'REMOVE_EXPENSE':
  		return state.filter(({ id }) => id !== action.id);
  	case 'EDIT_EXPENSE':
  		return state.map((expense) => {
  			if (expense.id === action.id){
  				return{
  				...expense,
  				...action.updates
  			};
  			}else{
  			return expense;
  			};
  		});
    default:
      return state;
  }
};

// SET TEXT FILTER

const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text
});

// SORT BY AMOUNT
const sortByAmount = () =>({
	type: 'SORT_BY_AMOUNT',
	sortBy: 'amount'
});

// SORT BY DATE

const sortByDate = () =>({
	type: 'SORT_BY_AMOUNT',
	sortBy: 'date'
});

// SET START DATE
const setStartDate = (date) =>({
	type: 'SET_START_DATE',
	date
});

// SET END DATE

const setEndDate = (date) =>({
	type: 'SET_END_DATE',
	date
});

const filterReducerDefaultState = {
	text: '',
	sortBy: 'date', // date or amount
	startDate: undefined,
	endDate: undefined
};

const filtersReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
  	case 'SET_TEXT_FILTER':
  		return {...state, text: action.text};	
  	case 'SORT_BY_AMOUNT':
  		return {...state, sortBy: action.sortBy};	
  	case 'SORT_BY_DATE':
  		return {...state, sortBy: action.sortBy};
  	case 'SET_START_DATE':
  		return {...state, startDate: action.date};
  	case 'SET_END_DATE':
  		return {...state, endDate: action.date};	
    default:
      return state;
  }
};

//Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
return expenses.filter((expense) => {
	const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
	const endDateMatch = typeof endDate !== 'number' || expense.createdAt >= endDate;
	const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())  

	return startDateMatch && endDateMatch && textMatch;
}).sort((a, b)=>{
	if (sortBy === 'date'){
		return a.createdAt < b.createdAt ? 1 : -1
	}
	else if (sortBy === 'amount'){
		return a.amount < b.amount ? 1 : -1
	}
});
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filter: filtersReducer
  
  })
);


store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filter)
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense ({ description: 'Rent', amount:1000, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense ({ description: 'Coffe', amount:300, createdAt: 2000 }));

// store.dispatch(removeExpense ({ id: expenseOne.expense.id }));
// store.dispatch(editExpense (expenseTwo.expense.id, { amount:500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));




const demoState = {
	expenses: [{
		id:'hjvh',
		description: 'Januray Rent',
		note: 'This was the final payment for that adress',
		amount:54500,
		createAt: 0
	}],
	filter: {
		text: 'rent',
		sortBy: 'amount', // date or amount
		startDate: undefined,
		endDate: undefined
	}

};