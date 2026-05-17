import React, { ChangeEvent, FormEvent, useState } from "react";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";

import { notification } from "../../App/app.utils";

import CustomInput from "../../components/custom-input/custom-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import PageContainer from "../../components/page-container/page-container";
import PageHeaderContainer from "../../components/page-header-container/page-header-container";

type ContactForm = {
  name: string;
  email: string;
  msg: string;
};

const ContactPage = (): JSX.Element => {
  const history = useHistory();
  const [userInput, setUserInput] = useState<ContactForm>({
    name: "",
    email: "",
    msg: "",
  });
  const { name, email, msg } = userInput;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setUserInput({ ...userInput, [name]: value });
  };

  const sendContactForm = async ({ name, email, msg }: ContactForm) => {
    const templateParams = {
      name: name,
      email: email,
      message: msg,
    };
    await emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID || "",
        process.env.REACT_APP_TEMPLATE_ID || "",
        templateParams,
        process.env.REACT_APP_USER_ID || "",
      )
      .catch((error) => {
        console.log("error sending contact form", error);
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactForm(userInput);
    setUserInput({
      name: "",
      email: "",
      msg: "",
    });
    notification("", "Message Sent", "success");

    setTimeout(() => history.push("/"), 3000);
  };

  return (
    <PageContainer>
      <PageHeaderContainer title="Contact Us">
        <h4>Any questions, comments or feature requests?</h4>

        <form className="sign-in-form" onSubmit={handleSubmit}>
          <CustomInput
            className="form-input"
            name="name"
            onChange={handleChange}
            value={name}
            label="Your Name"
            required
          />

          <CustomInput
            className="form-input"
            name="email"
            onChange={handleChange}
            value={email}
            label="Email"
            required
          />

          <div className="group">
            <textarea
              className="form-input"
              name="msg"
              onChange={handleChange}
              value={msg}
              required
              rows={4}
            />
            <label className={`${msg.length ? "shrink" : ""} form-input-label`}>
              What would you like to say?
            </label>
          </div>

          <CustomButton type="submit" className="button">
            Submit
          </CustomButton>
        </form>
      </PageHeaderContainer>
    </PageContainer>
  );
};

export default ContactPage;
