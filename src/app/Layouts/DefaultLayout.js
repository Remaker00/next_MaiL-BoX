// layouts/DefaultLayout.js
import Navbar from "../Components/Navbar";

const DefaultLayout = ({ children, onSearch }) => {
    return (
        <div>
            {/* <Navbar1 /> */}
            <Navbar onSearch={onSearch} />
            <main>{children}</main>
            {/* Add footer or other components here */}
        </div>
    );
};

export default DefaultLayout;
