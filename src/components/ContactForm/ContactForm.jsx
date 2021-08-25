import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';
import s from "../ContactForm/ContactForm.module.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handelSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.resetInput();
  };

  resetInput = () => {
    this.setState({ name: "", number: "" });
  };

  handleIputChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handelSubmit}>
        <label htmlFor={this.nameInputId}>Имя</label>
        <input
          id={this.nameInputId}
          className={s.formInputName}
          type="text"
          name="name"
          value={name}
          onChange={this.handleIputChange}
          placeholder="Имя Фамилия"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          minLength="2"
          maxLength="40"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        />

        <label htmlFor={this.numberInputId}>Телефон</label>
        <input
          id={this.numberInputId}
          className={s.formInputNumber}
          type="tel"
          name="number"
          value={number}
          onChange={this.handleIputChange}
          placeholder="Номер телефона"
          pattern="\+?[0-9\s\-\(\)]+"
          minLength="10"
          maxLength="13"
          title="+380223332222 или (044)7881000"
        />

        <button type="submit" className={s.formSubmitButton}>Добавить контакт</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};


export default ContactForm;
