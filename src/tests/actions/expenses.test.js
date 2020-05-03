import { addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should set up remove expense action object', ()=>{
	const action= removeExpense ({id:'123abc'});
	expect(action).toEqual({
		type:'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('should set up edit expense action object',()=>{
	const action = editExpense ('1', { note: 'New Note Value' });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id:'1',
		updates: {
			note: 'New Note Value'
		}
	});
});


test('should set up add expense action object with priovided values',()=>{
	const expenseData = {
		description: 'Rent',
		amount:109500,
		createdAt: 1000,
		note:'This was last month'
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			...expenseData
		}
	});
});	


test('should set up add expense action object with default objects',()=>{
	const expenseData = {
		description: '', 
		note:'', 
		amount: 0, 
		createdAt: 0
	};
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			...expenseData
		}
	});
});	