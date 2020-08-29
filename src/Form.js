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
    const [errors, setErrors] = useState({
       name: "",
       email: "",
       password: "",
       system: "",
       terms: ""       
    });
    const [post, setPost] = useState();
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

    const formSubmit = e => {
        e.preventDefault();
        console.log("form submitted!");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data)
                console.log("success!")
                setFormState({
                    name: "",
                    email: "",
                    motivation: "",
                    positions: "",
                    terms: true 
                })
            })
            .catch(err => console.log("error", err))
    };

    const validateChange = e => {
        yup.reach(formSchema, e.target.name).validate(e.target.value).then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
        }).catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })
        })
    }

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
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input id="name" type="text" name="name" data-cy="name" value={formState.name} onChange={inputChange} />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor="email">
                Email
                <input id="email" type="email" name="email" data-cy="email" value={formState.email} onChange={inputChange} />
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
            </label>
            <label htmlFor="password">
                Password
                <input id="password" type="password" name="password" data-cy="password" value={formState.password} onChange={inputChange} />
                {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
            </label>
            <label htmlFor="system">
                Your current operating system?
                <select id="system" name="system" data-cy="system" onChange={inputChange}>
                    <option>--Please select an option--</option>
                    <option value="mac">macOS</option>
                    <option value="windows">Microsoft Windows</option>
                    <option value="linux">Linux</option>
                </select>
                {errors.system.length > 0 ? <p className="error">{errors.system}</p> : null}
            </label>
            <label htmlFor="terms" className="terms">
                Terms and Conditions
                <input id="terms" type="checkbox" name="terms" data-cy="terms" checked={formState.terms} onChange={inputChange} />
            </label>
            <button type="submit" data-cy="submit" disabled={buttonDisabled}>Submit</button>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </form>
    )
}
