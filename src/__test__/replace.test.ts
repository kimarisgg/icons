import replace from "../replace"

jest.mock('../generated/icons.json', () => ([
    {
        name: "icon1",
        type: "common",
        value: '<line x1="23" y1="1" x2="1" y2="23" /><line x1="1" y1="1" x2="23" y2="23" />',
    },
    {
        name: "icon2",
        type: "common",
        value: '<circle cx="12" cy="12" r="11" />',
    }
]));

test("replaces [data-kimaris] elements with SVG markup", () => {
    document.body.innerHTML = '<i data-kimaris="icon1"></i><span data-kimaris="icon2"></i>'
    expect(document.body.innerHTML).toMatchSnapshot()
    replace()
    expect(document.body.innerHTML).toMatchSnapshot()
})

test("copies placeholder element attributes to <svg> tag", () => {
    document.body.innerHTML = '<i data-kimaris="icon1" id="test" class="foo bar" stroke-width="1"></i>'
    expect(document.body.innerHTML).toMatchSnapshot()
    replace()
    expect(document.body.innerHTML).toMatchSnapshot()
})
