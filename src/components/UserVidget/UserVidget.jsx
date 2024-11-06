import './UserVidget.css'
import Button from '@/components/Button/Button'
import authLine from '@img/icons/auth_line.svg';
import spinner from '@img/icons/spinner.png'
import avatar from '@img/avatar.png'

function UserVidget() {
     
  return (
    <>
    {/* <div id="app-header-auth" className='auth flex'>
            <div className='auth__reg'>
                <a className='grey' href="/">Зарегистрироваться</a>
            </div>
            <img src={authLine} className="auth__line" alt="|" />
            <div className='auth__btn'>
                <Button type="auth" label="Войти" style="btn-small"/>
            </div>
        </div>    
      */}
     <div id="app-header-user" className='user flex flex-btw'>
          <div className='counters flex'>
            {/* <img src={spinner} className="counters__img" alt="загрузка..." /> */}
            <div className='flex'>
                <div className='counters__text'>
                    Использовано компаний 
                </div>
                <div className='counters__sum'>
                    34
                </div>                
            </div>
            <div className='flex'>
                <div className='counters__text'>
                    Лимит по компаниям
                </div>
                <div className='counters__sum bright'>
                    100
                </div>                
            </div>
            
          </div>
          <div className='user-block flex'>
            <div className='user-block__main'>
              <div className='main__name'>
                Алексей&nbsp;А. 
              </div>
              <Button type="logout" label="Выйти" style="btn-transparent"/>
            </div>
            <div className='user-block__avatar'>
              <img src={avatar} className="avatar__img" alt="avatar" />
            </div>            
          </div>
        </div>  
     


    </>
  )
}

export default UserVidget
