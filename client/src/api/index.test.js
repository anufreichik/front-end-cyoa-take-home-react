import {Api} from "./index";

let mockData = [
    {id:1, name:"Marina", message:"33333", created:"333"},
    {id:2, name:"Dan", message:"44444", created:"555"},
]

const unmockedFetch = global.fetch;

beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve(mockData),
        })
})

afterAll(() => {
    global.fetch = unmockedFetch
})


test("call Api.get", async()=>{
        const commentsData = await Api.get('/getComments');
        expect(commentsData).toEqual([
            {id:1, name:"Marina", message:"33333", created:"333"},
            {id:2, name:"Dan", message:"44444", created:"555"},
        ])

})
