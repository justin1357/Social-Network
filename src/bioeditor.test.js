import React from "react";
import { shallow } from "enzyme";
import BioEditor from "./bioeditor";
import axios from "./axios";

jest.mock("./axios");

test(`Clicking the "Save" button causes an ajax request. The request should
not actually happen during your test. To prevent it from actually happening,
you should mock axios.`, async () => {
    axios.post.mockResolvedValue(
        { text: "bio" },
        {
            data: {
                bio: "bio"
            }
        }
    );
    const wrapper = shallow(<BioEditor />, {
        disableLifecycleMethods: true
    });

    await wrapper.find("button").simulate("click");

    expect(axios.post).toHaveBeenCalledTimes(1);
});
