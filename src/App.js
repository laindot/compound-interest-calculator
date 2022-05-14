import { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './components/Input';
import Button from './components/Button';
import Container from './components/Container';
import Balance from './components/Balance';

const Section = styled.section`
  background-color: #eee;
  border-top: solid 2px palevioletred;
  padding: 20px 25px;
  width: 500px;
  box-shadow: 0px 2px 3px rgb(0, 0, 0, 0.2);
`;

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1);
  }

  return Math.round(total);
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const App = () => {
  const [balance, setBalance] = useState('');
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate)
    );
    setBalance(formatter.format(val));
  };

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required('Required')
              .typeError('Must be a number'),
            contribution: Yup.number()
              .required('Required')
              .typeError('Must be a number'),
            years: Yup.number()
              .required('Required')
              .typeError('Must be a number'),
            rate: Yup.number()
              .required('Required')
              .typeError('Must be a number')
              .min(0)
              .max(1),
          })}
        >
          <Form>
            <Input name='deposit' label='Initial Deposit' />
            <Input name='contribution' label='Annual Contribution' />
            <Input name='years' label='Years' />
            <Input name='rate' label='Estimated Interest' />
            <Button type='submit'>Calculate</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Final balance: {balance}</Balance> : null}
      </Section>
    </Container>
  );
};

export default App;
