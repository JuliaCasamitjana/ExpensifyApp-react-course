import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'; 
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({expensesCount, expensesTotal}) =>{

const word = expensesCount === 1 ? 'expense' : 'expenses';
const formatTotal = numeral(expensesTotal/100).format('$0,0.00')
	return(
		<div>
			<h1> 
			Viewing {expensesCount} {word} totalling {formatTotal}
			</h1>

		</div>

);
};

const mapStateToProps = (state) => {
	const visibleExpenses = selectExpenses(state.expenses, state.filter);
	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: selectExpensesTotal(visibleExpenses)
	};
};

export default connect(mapStateToProps)(ExpensesSummary);