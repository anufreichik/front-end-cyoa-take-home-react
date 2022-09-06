import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Comment from './Comment';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));
const commentData = {
    id:1,
    name:'Marina',
    message:'12345',
    created:new Date().toDateString()
}
describe('testing comment component', ()=>{
    test('Initial setup',()=>{
        render(<Comment comment={commentData}/>);
        const name = screen.getByText(/Marina/i);
        expect(name).toBeInTheDocument();
    })

    test('navigate', ()=>{
        render(<Comment comment={commentData}/>);
        const detailsButton = screen.getByRole('button', {name: /Details/i},);
        userEvent.click(detailsButton);
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/comment/1')
    })
})
