import './SidebarLayout.css'

const SidebarLayout = ({ children }) => {
    return (
        <div className="layout">
            <section className="menu__section">
                <div className="menu__container">
                    {children}
                </div>
            </section>
            <div className="layout__map"></div>
        </div>
    )
}

export default SidebarLayout