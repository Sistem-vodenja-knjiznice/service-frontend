import React, {PropsWithChildren} from 'react';
import Nav from "./Nav";
import Menu from "./Menu";

const Wrapper = (props: PropsWithChildren<any>) => {
    return (
        <div>
            <Nav/>

            <div className="container-fluid">
                <div className="row">

                    <Menu/>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Wrapper;