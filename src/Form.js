import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Form() {
    const [formState, setFormState] = useState({
       name: "",
       email: "",
       password: "",
       system: "",
       terms: true 
    });
    const [buttonDisabled, setButtonDisable] = useState(true)
    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup.string().email("Must be a valid email address").required("Must include email"),
        password: yup.string().min(6).required("Password must be at least 6 characters"),
        system: yup.mixed().oneOf(["mac", "windows", "linux"]).defined(),
        terms: yup.boolean().oneOf([true])
    })

    useEffect(() => {
        console.log("checking for form validation")
        formSchema.isValid(formState).then(valid => {
            console.log("is form valid?", valid)
            setButtonDisable(!valid)
        })
    }, [formState]);

    const inputChange = e => {
        e.persist();
        console.log("changed", e.target.value);
        console.log("name of input that fired event", e.target.name);
        const newFormData = {
            ...formState,
            [e.target.name]:e.target.name === "terms" ? e.target.checked : e.target.value
        }
        setFormState(newFormData);
    }

    return (
        <form>
            <label htmlFor="name">
                Name
                <input id="name" type="text" name="name" value={formState.name} onChange={inputChange} />
            </label>
            <label htmlFor="email">
                Email
                <input id="email" type="email" name="email" />
            </label>
            <label htmlFor="password">
                Password
                <input id="password" type="password" name="password" />
            </label>
            <label htmlFor="system">
                Your current operating system?
                <select id="system" name="system">
                    <option>--Please select an option--</option>
                    <option value="mac">macOS</option>
                    <option value="windows">Microsoft Windows</option>
                    <option value="linux">Linux</option>
                </select>
            </label>
            <label htmlFor="terms" className="terms">
                Terms and Conditions
                <input id="terms" type="checkbox" name="terms" checked={true} />
            </label>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )
}
