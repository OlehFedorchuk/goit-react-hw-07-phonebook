import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector, errorSelector, filterSelector, isLoadingSelector } from 'redux/selectors/selectors';
import { fetchContacts, addContact, deleteContact } from 'redux/operations/contactsThunk';
import Notiflix from 'notiflix';

import { Loader } from './components/Loader/Loader';
import { Error } from './components/Error/Error';
import { ContactForm } from './components/Form/form';
import { ContactList } from './components/ContactList/ContactList';
import css from './App.css';
import { Total } from './components/Total/Total';

export const App = () => {
  const contacts = useSelector(contactsSelector);
  const filter = useSelector(filterSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch]);

  const handleAddContact = contact => {
    const { name, number } = contact;


    if (contacts.find(contact => contact.name === name)) {
      Notiflix.Notify.warning(`${name} is already in the phonebook.`)
      return;
    } else if (contacts.find(contact => contact.number === number)) {
      Notiflix.Notify.warning(`${number} is already in the phonebook.`)
      return;
    } else if (name.trim() === '' || number.trim() === '') {
      Notiflix.Notify.info('Please, enter name and number!')
      return;
    }

    dispatch(addContact(contact))

  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id))
  };


  return (
    <section>
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2 className={css.titleh2}>Contacts</h2>
      <Total contacts={contacts}/>
      {isLoading ? 
      <Loader /> : 
      <ContactList
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
        filter={filter}
      />
      }
      {error && (<Error errorText={`Something went wrong... ${error}. Please try again.`} />)}
    </div>
    </section>
  );
}