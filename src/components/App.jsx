import React, { Component } from "react";
import PropTypes from 'prop-types';
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import s from "../components/App.module.css";

import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  formSubmit = ({ name, number }) => {
    const newContact = { id: uuidv4(), name, number };
    const { contacts } = this.state;
    const arryFindName = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
   
    if (arryFindName) return alert (`Ошибка, контакт с данным именем ${name} существует`);

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  newContactsFilter = () => {
    const { contacts, filter } = this.state;
    const normalFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalFilter)
    );
  };
  deleteContact = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const newContacts = this.newContactsFilter();

    return (
      <>
        <section className={s.section}>
          <div className={s.divConteiner}>
            <h1>Телефонная книга</h1>
            <ContactForm onSubmit={this.formSubmit} />
          </div>
        </section>
        <section className={s.section}>
          <div className={s.divContactList}>
            <h2>Контакты</h2>
            <Filter
              handleFilterChange={this.handleFilterChange}
              value={filter}
            />
            <ContactList
              contacts={newContacts}
              deleteContact={this.deleteContact}
            />
          </div>
        </section>
      </>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.array,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default App;
