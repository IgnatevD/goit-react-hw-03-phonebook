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
{id: "0c58ac40-28c6-4491-98e3-d740b86261d1", name: "Альберт Энштейн", number: "+380996367611"},
{id: "26d10266-3f29-4641-ab86-3b48d8b4d404", name: "Никола Тесла", number: "+380996367690"},
{id: "f0a140d1-e257-4708-b566-6987f2030e68", name: "Чарльз Дарвин", number: "8888888899"},
{id: "fca7e0b5-9c54-44b7-accd-59bffbd9333d", name: "Алессандро Вольт", number: " 459-12-95"},
{id: "d8ef9780-b439-473e-9cc5-a641e2fd2819", name: "Исак Ньютон", number: "+380996367600"},
{id: "d991f3bb-4207-4f65-afaa-ff35678a6dff", name: "Галилео Галилей", number: " 459-12-56"},
{id: "014ae595-ef7d-4059-bedf-dbcd8522b6a8", name: "Леонардо да Винчи", number: "+380996367655"},
{id: "4a1a202e-5d2f-4228-b630-2864d7d2ac99", name: "Пифагор", number: "+380998888887"},
{id: "2b465edf-41a1-4a9b-9f1a-9498079d9962", name: "Архимед", number: " 459-12-56"},
{id: "55405431-aec4-407d-b697-84b23d81a23d", name: "Аристотель", number: "+380996367899"},
    ],
    filter: "",
  };
  componentDidMount () {
    const saveState = JSON.parse(localStorage.getItem('contacts'));
    this.setState({contacts: saveState});
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem ("contacts", JSON.stringify(this.state.contacts))
    }
  }

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
