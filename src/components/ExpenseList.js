import React from 'react';
import ExpenseListItem from './ExpenseListItem';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
	<div className="content-container">
		<div className="list_header">
			<div className="show-for-mobile">Expenses</div>
			<div className="show-for-desktop">Expense</div>
			<div className="show-for-desktop">Amount</div>
		</div>
		<div className="list-body">
		{
			props.expenses.length === 0 ? (
				<div className="list-item list-item--message">
					<span>No expenses</span>
				</div>
			) : (
			props.expenses.map((exp) => {
			return <ExpenseListItem key={exp.id} {...exp}/>;
			})
			)
		}
		</div>
	</div>
);

const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filter)
	};
}

export default connect(mapStateToProps)(ExpenseList);

