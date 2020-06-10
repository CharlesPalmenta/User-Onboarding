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
    return (
        <form>
            <label htmlFor="name">
                Name
                <input id="name" type="text" name="name" />
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
            <button>Submit</button>
        </form>
    )
}
