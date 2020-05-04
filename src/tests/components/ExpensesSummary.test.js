import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';


test('should render ExpensesSummary with 1 expense', ()=>{
	const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={235}/>);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multiple expense',() => {
	const wrapper = shallow(<ExpensesSummary expensesCount={23} expensesTotal={235345}/>);
	expect(wrapper).toMatchSnapshot();
})