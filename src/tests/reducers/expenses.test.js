import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test ('should set default state', ()=>{
	const state = expensesReducer(undefined, {type:'@@INT'});
	expect(state).toEqual([]);
});

test ('should remove expense by id', ()=>{
	const action = {
		type:'REMOVE_EXPENSE',
		id:expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]])
});

test ('should not remove expense if id not found', ()=>{
	const action = {
		type:'REMOVE_EXPENSE',
		id: -1
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses)
});


test ('should add an expense', ()=>{
	const action = {
		type:'ADD_EXPENSE',
		expense:{
			id:'4',
			description:'hola',
			note:'',
			amount:3,
			createdAt:0
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, action.expense])

})

test ('should edit an expense', ()=>{
	const action = {
		type:'EDIT_EXPENSE',
		id:expenses[2].id,
		updates:{
			amount:10
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state[2].amount).toBe(action.updates.amount)

})

test ('should not edit expense if not found', ()=>{
	const action = {
		type:'EDIT_EXPENSE',
		id:'90',
		updates:{
			amount:10
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses)

})








