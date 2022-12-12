import { DefaultInput } from "../input/input";

export default function TopBarNav(props) {

    const { imageSrc, sideBarLabel } = props
    const navItem = ['Home', 'Dashboard', 'Orders', 'Products', 'Customers']

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample05">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navItem.map((e, i) => {
                            return <li className="nav-item" key={i}>
                                        <a className="nav-link active" aria-current="page" href="#">{e}</a>
                                   </li>
                        })}
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> */}
                    </ul>
                    <form role="search">
                        <DefaultInput placeholder='Search' />
                    </form>
                </div>
            </div>
        </nav>
    </>
};
