import s from './header.module.css';
import cn from 'classnames';

function Header({user, onUpdateUser, children}) {

  const handleClickButtonEdit = (e)=> {
    e.preventDefault();
    onUpdateUser({name: 'Алексей', about: 'Инженер'})
  }

  return (
    <header className={cn(s.header,'cover')}>
      <div className={s.profile}>
        {user.email && <span>{user.email}</span>}
        {user.name && <span>{user.name}: {user.about}</span>}
        <button className='btn' onClick={handleClickButtonEdit}>Изменить</button>

        <div className={s.wrapper}>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;