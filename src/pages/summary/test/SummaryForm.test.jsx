import { fireEvent, render,screen } from "@testing-library/react"
import SummaryForm from "../SummaryForm"

test("Is checkbox unchecked and button disabled", ()=>{
    render(<SummaryForm/>);
    const checkbox=screen.getByRole("checkbox", {name:"I agree to Terms and Conditions"});
    const confirmButton=screen.getByRole("button", {name:"Confirm Order"});
    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
});

test("Is checkbox checked and button enabled", ()=>{
    render(<SummaryForm/>);
    const checkbox=screen.getByRole("checkbox",{name:"I agree to Terms and Conditions"});
    const confirmButton=screen.getByRole("button", {name:"Confirm Order"});
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();
})
