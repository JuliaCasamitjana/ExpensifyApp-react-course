import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import numeral from 'numeral'; 
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({expensesCount, expensesTotal}) =>{

const word = expensesCount === 1 ? 'expense' : 'expenses';
const formatTotal = numeral(expensesTotal/100).format('$0,0.00')
	return(
		<div className="page-header">
		<div className ="content-container">
			<h1 className="page-header__title"> 
			Viewing <span>{expensesCount}</span> {word} totalling <span>{formatTotal}</span>
			</h1>
			<div className="page-header__actions">
				<Link className="button" to="/create">Add Expense</Link>
			</div>
		</div>
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