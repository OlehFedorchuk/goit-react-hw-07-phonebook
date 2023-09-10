import React, { useState } from 'react';
import { ContactItem } from './ContactItem/ContactItem';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations/contactsThunk';
import css from './ContactList.module.css';


export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const [nameFilter, setNameFilter] = useState('');

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(nameFilter.toLowerCase().trim())
  );

  const handleNameInputChange = event => {
    const { value } = event.target;
    setNameFilter(value);
  };

  const contactElem = filteredContacts.map(contact => (
    <ContactItem
      key={contact.id}
      contact={contact}
      onDeleteContact={() => handleDeleteContact(contact.id)}
    />
  ));

  return (
    <label className={css.label}>
      
      <input 

      className={css.input}
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        
        onChange={handleNameInputChange}
      />
      <ul className={css.list}>{contactElem}</ul>
    </label>
  );
};