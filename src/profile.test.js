import React from "react";
import { shallow } from "enzyme";
import Profile from "./profile";

test('When no bio is passed to it, an "Add" button is rendered.', () => {
    const wrapper = shallow(<Profile />);

    expect(wrapper.contains("Add Your Bio!")).toBe(true);
});

test('When no bio is passed to it, an "Add" button is rendered.', () => {
    const wrapper = shallow(<Profile bio="this is great new bio" />);

    expect(wrapper.contains("Edit Your Bio!")).toBe(true);
});

test('Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Profile onClick={onClick} />);

    wrapper.find("a").simulate("click");

    expect(wrapper.state()).toEqual({
        editorIsVisible: true
    });
});
