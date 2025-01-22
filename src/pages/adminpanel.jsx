import react from "react";
import './adminpanel.css'
function AdminPanel(){
    return (
        <>
            <header className="header-admin-panel">
                <div>Здравствуйте! Добро пожаловать в админ панель магазина Mediv's shop</div>
            </header>
            <main className="main-admin-panel">
                <ul>Добавить продукты:</ul>
                <li className="gapforLi">
                    Категории:
                    <form className="form-for-createCategory">
                        Создать категорию
                        <input type="text" placeholder="Введи тэг"/>
                        <button type="submit">Создать категорию</button>
                    </form>
                    <form className="form-for-createCategory">
                        
                    </form>
                </li>
            </main>
        </>
    )
}

export default AdminPanel;