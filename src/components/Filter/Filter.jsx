import s from "../Filter/Filter.module.css";
import { v4 as uuidv4 } from "uuid";

const Filter = ({ handleFilterChange, value }) => {
  const idFilter = uuidv4();
  return (
    <div className={s.filterContener}>
      <label htmlFor={idFilter} className={s.labelFilter}>Поиск контактов по имени и фамили</label>
      <input
        id={idFilter}
        className={s.inputFilter}
        type="text"
        value={value}
        onChange={handleFilterChange}
        placeholder="Поиск"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
      />
    </div>
  );
};

export default Filter;
