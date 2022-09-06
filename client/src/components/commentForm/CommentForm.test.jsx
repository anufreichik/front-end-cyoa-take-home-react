import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import CommentForm from './CommentForm';

const mockedAddComment = jest.fn();
describe('testing CommentForm component',()=>{

    test('initial setup button rendered',()=>{
        render(<CommentForm addComment={mockedAddComment}/>);
        const buttonEl = screen.getByRole("button");
        expect(buttonEl).toBeInTheDocument();
    })
    test("name input should be empty", async() => {
        render(<CommentForm addComment={mockedAddComment}/>);
        const nameInputEl = await screen.findByRole('textbox', { name: /name/i});
        await waitFor(() => expect(nameInputEl).toHaveValue(""));
    });
    test("name input should change", async () => {
        render(<CommentForm addComment={mockedAddComment}/>);
        const nameInputEl = await screen.findByRole("textbox", { name: /name/i });
        const testValue = "Marina";
        fireEvent.change(nameInputEl, { target: { value: testValue } });
        expect(nameInputEl.value).toBe(testValue);
    });
})
