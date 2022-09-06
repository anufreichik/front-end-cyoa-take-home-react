import React from 'react';
import {render, screen} from '@testing-library/react';
import CommentsList from './CommentsList';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('testing CommentsList component',()=>{

    test('initial load when no comments',()=>{
        const comments=[];
        render(<CommentsList comments={comments}/>);
        const noCommentsText = screen.getByText(/No Comments to Display!/i);
        expect(noCommentsText).toBeInTheDocument();
    })

    test('initial load when 2 comments',async()=>{
        const comments=[
            {id:1, name:"Marina", message:"33333", created:"333"},
            {id:2, name:"Dan", message:"44444", created:"555"},
        ];
        render(<CommentsList comments={comments}/>);
        const detailsButtons = await screen.findAllByRole('button', {name: /Details/i},);
        expect(detailsButtons).toHaveLength(2);
    })
})
